'use client';

import { useState, useEffect, useRef } from 'react';
import { Howl } from 'howler';

interface AudioPlayerProps {
  src: string;
  title?: string;
}

export default function AudioPlayer({ src, title }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const soundRef = useRef<Howl | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    soundRef.current = new Howl({
      src: [src],
      html5: true,
      onload: () => {
        setDuration(soundRef.current?.duration() || 0);
      },
      onplay: () => {
        setIsPlaying(true);
        intervalRef.current = setInterval(() => {
          setCurrentTime(soundRef.current?.seek() || 0);
        }, 100);
      },
      onpause: () => {
        setIsPlaying(false);
        if (intervalRef.current) clearInterval(intervalRef.current);
      },
      onstop: () => {
        setIsPlaying(false);
        setCurrentTime(0);
        if (intervalRef.current) clearInterval(intervalRef.current);
      },
      onend: () => {
        setIsPlaying(false);
        setCurrentTime(0);
        if (intervalRef.current) clearInterval(intervalRef.current);
      },
    });

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      soundRef.current?.unload();
    };
  }, [src]);

  const togglePlay = () => {
    if (isPlaying) {
      soundRef.current?.pause();
    } else {
      soundRef.current?.play();
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    soundRef.current?.seek(time);
    setCurrentTime(time);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 w-full">
      {title && (
        <p className="text-sm font-medium text-gray-900 mb-3 truncate">{title}</p>
      )}
      
      <div className="flex items-center gap-3">
        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-900 hover:bg-gray-700 transition-colors"
        >
          {isPlaying ? (
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          ) : (
            <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          )}
        </button>

        {/* Time & Progress */}
        <div className="flex-1 flex flex-col gap-1">
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-900"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
