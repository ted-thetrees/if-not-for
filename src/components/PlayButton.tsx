'use client';

import { useAudio } from './AudioContext';

interface PlayButtonProps {
  src: string;
  title: string;
}

export default function PlayButton({ src, title }: PlayButtonProps) {
  const { currentTrack, isPlaying, play, pause } = useAudio();
  
  const isCurrentTrack = currentTrack?.src === src;
  const isThisPlaying = isCurrentTrack && isPlaying;

  const handleClick = () => {
    if (isThisPlaying) {
      pause();
    } else {
      play({ src, title });
    }
  };

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handleClick}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-900 hover:bg-gray-700 transition-colors shrink-0"
      >
        {isThisPlaying ? (
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
      <span className="text-sm font-medium text-gray-900">{title}</span>
    </div>
  );
}
