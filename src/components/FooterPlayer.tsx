'use client';

import { useAudio } from './AudioContext';

export default function FooterPlayer() {
  const { currentTrack, isPlaying, duration, currentTime, toggle, seek } = useAudio();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    seek(parseFloat(e.target.value));
  };

  // Don't render if no track
  if (!currentTrack) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-4">
        {/* Play/Pause */}
        <button
          onClick={toggle}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-900 hover:bg-gray-700 transition-colors shrink-0"
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

        {/* Track info */}
        <div className="min-w-0 shrink-0">
          <p className="text-sm font-medium text-gray-900 truncate">{currentTrack.title}</p>
        </div>

        {/* Progress */}
        <div className="flex-1 flex items-center gap-2">
          <span className="text-xs text-gray-500 w-10 text-right">{formatTime(currentTime)}</span>
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            className="flex-1 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-900"
          />
          <span className="text-xs text-gray-500 w-10">{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
}
