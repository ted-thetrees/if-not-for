'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useAudio } from '@/components/AudioContext';

interface Story {
  id: number;
  name: string;
  notes: string;
  duration: number | null;
  guestName: string;
  infTargetName: string;
  imageUrl: string;
  audioUrl: string;
  tags: string[];
}

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export default function StoryDetail() {
  const params = useParams();
  const storyId = params.id;
  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { currentSrc, isPlaying, currentTime, duration, play, pause, seek } = useAudio();

  useEffect(() => {
    async function fetchStory() {
      try {
        const res = await fetch('/api/stories');
        if (!res.ok) {
          if (res.status === 401) {
            setError('Please sign in to view this story');
            return;
          }
          throw new Error('Failed to fetch stories');
        }
        const data = await res.json();
        const found = data.stories.find((s: Story) => s.id === Number(storyId));
        if (!found) {
          setError('Story not found');
          return;
        }
        setStory(found);
      } catch (err) {
        setError('Failed to load story');
      } finally {
        setLoading(false);
      }
    }
    fetchStory();
  }, [storyId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-50 to-stone-100 flex items-center justify-center">
        <p className="text-stone-500">Loading...</p>
      </div>
    );
  }

  if (error || !story) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-50 to-stone-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-stone-500 mb-4">{error || 'Story not found'}</p>
          <Link href="/" className="text-stone-700 hover:underline">
            ← Back to home
          </Link>
        </div>
      </div>
    );
  }

  const isThisPlaying = isPlaying && currentSrc === story.audioUrl;
  const isThisLoaded = currentSrc === story.audioUrl;
  const progress = isThisLoaded && duration > 0 ? (currentTime / duration) * 100 : 0;

  const togglePlay = () => {
    if (isThisPlaying) {
      pause();
    } else {
      play(story.audioUrl, story.guestName || story.name);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isThisLoaded || duration === 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    seek(percent * duration);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-stone-100">
      {/* Back link */}
      <div className="px-6 py-4">
        <Link 
          href="/" 
          className="text-sm text-stone-500 hover:text-stone-700 transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to stories
        </Link>
      </div>

      {/* Main content */}
      <div className="max-w-2xl mx-auto px-6 pb-32">
        
        {/* Guest identifier */}
        <div className="mb-8">
          <p className="text-stone-400 text-sm tracking-wide uppercase mb-2">
            {story.guestName}
          </p>
          <h1 className="text-3xl font-light text-stone-900 leading-snug">
            If not for <span className="italic">{story.infTargetName}</span>…
          </h1>
        </div>

        {/* Audio player card */}
        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6 mb-8">
          <div className="flex items-center gap-4">
            {/* Play button */}
            <button
              onClick={togglePlay}
              className="w-14 h-14 rounded-full bg-stone-900 hover:bg-stone-800 transition-colors flex items-center justify-center shrink-0"
            >
              {isThisPlaying ? (
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            {/* Progress and time */}
            <div className="flex-1">
              <div
                className="h-2 bg-stone-100 rounded-full cursor-pointer mb-2"
                onClick={handleSeek}
              >
                <div
                  className="h-full bg-stone-900 rounded-full transition-all duration-100"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-stone-400">
                <span>{formatDuration(Math.floor(isThisLoaded ? currentTime : 0))}</span>
                <span>{formatDuration(Math.floor(isThisLoaded ? duration : (story.duration || 0)))}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Story notes */}
        {story.notes && (
          <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6 mb-8">
            <h2 className="text-sm font-medium text-stone-500 uppercase tracking-wide mb-3">
              About this story
            </h2>
            <p className="text-stone-700 leading-relaxed">
              {story.notes}
            </p>
          </div>
        )}

        {/* Tags */}
        {story.tags && story.tags.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {story.tags.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-white border border-stone-200 rounded-full text-xs text-stone-500"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
