'use client';

import { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react';
import { Howl } from 'howler';

interface Track {
  src: string;
  title: string;
}

interface AudioContextType {
  currentTrack: Track | null;
  isPlaying: boolean;
  duration: number;
  currentTime: number;
  play: (track: Track) => void;
  pause: () => void;
  toggle: () => void;
  seek: (time: number) => void;
}

const AudioContext = createContext<AudioContextType | null>(null);

export function AudioProvider({ children }: { children: ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const soundRef = useRef<Howl | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const clearInterval = () => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const play = (track: Track) => {
    // If same track, just resume
    if (currentTrack?.src === track.src && soundRef.current) {
      soundRef.current.play();
      return;
    }

    // Stop current track
    if (soundRef.current) {
      soundRef.current.unload();
      clearInterval();
    }

    // Create new Howl
    soundRef.current = new Howl({
      src: [track.src],
      html5: true,
      onload: () => {
        setDuration(soundRef.current?.duration() || 0);
      },
      onplay: () => {
        setIsPlaying(true);
        intervalRef.current = window.setInterval(() => {
          setCurrentTime(soundRef.current?.seek() || 0);
        }, 100);
      },
      onpause: () => {
        setIsPlaying(false);
        clearInterval();
      },
      onstop: () => {
        setIsPlaying(false);
        setCurrentTime(0);
        clearInterval();
      },
      onend: () => {
        setIsPlaying(false);
        setCurrentTime(0);
        clearInterval();
      },
    });

    setCurrentTrack(track);
    setCurrentTime(0);
    soundRef.current.play();
  };

  const pause = () => {
    soundRef.current?.pause();
  };

  const toggle = () => {
    if (isPlaying) {
      pause();
    } else if (currentTrack) {
      soundRef.current?.play();
    }
  };

  const seek = (time: number) => {
    soundRef.current?.seek(time);
    setCurrentTime(time);
  };

  useEffect(() => {
    return () => {
      clearInterval();
      soundRef.current?.unload();
    };
  }, []);

  return (
    <AudioContext.Provider value={{
      currentTrack,
      isPlaying,
      duration,
      currentTime,
      play,
      pause,
      toggle,
      seek,
    }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within AudioProvider');
  }
  return context;
}
