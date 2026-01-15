# Audio Player Architecture

## Overview

The site features a persistent audio player that continues playback across page navigation. The player appears in a fixed footer when audio is playing, while individual episode cards have play/pause buttons that control the global player.

## Components

### AudioContext (`src/components/AudioContext.tsx`)

Global state management for audio playback using React Context and Howler.js.

**Provides:**
- `currentTrack` - Currently loaded track (src, title)
- `isPlaying` - Playback state
- `duration` - Track duration in seconds
- `currentTime` - Current playback position
- `play(track)` - Load and play a track
- `pause()` - Pause playback
- `toggle()` - Toggle play/pause
- `seek(time)` - Seek to position

**Usage:**
```tsx
import { useAudio } from '@/components/AudioContext';

const { isPlaying, play, pause } = useAudio();
```

### FooterPlayer (`src/components/FooterPlayer.tsx`)

Fixed footer that appears when a track is loaded. Displays:
- Play/pause button
- Track title
- Progress bar with seek functionality
- Current time / duration

Automatically hidden when no track is loaded.

### PlayButton (`src/components/PlayButton.tsx`)

Compact play/pause button for use in episode cards.

**Props:**
- `src` - Audio file URL
- `title` - Track title for display

**Behavior:**
- Shows play icon when stopped or different track is playing
- Shows pause icon when this track is playing
- Clicking loads track into global player and starts playback

## Audio Hosting

Audio files are hosted on Backblaze B2:
```
https://f004.backblazeb2.com/file/trees-audio/new-site/{filename}.mp3
```

Current episodes:
- Novelist-Maine-001.mp3
- Painter-Colorado-001.mp3
- Sailor-BritishColumbia-001.mp3

## Layout Integration

The `AudioProvider` wraps the entire app in `layout.tsx`:

```tsx
<AudioProvider>
  {children}
  <FooterPlayer />
</AudioProvider>
```

This ensures:
1. Audio state persists across page navigation
2. Footer player is always rendered at the root level
3. Any component can access audio controls via `useAudio()`

## Dependencies

- **howler** - Audio playback library with HTML5 Audio/Web Audio support

## Adding New Episodes

1. Upload MP3 to Backblaze B2 bucket `trees-audio/new-site/`
2. Add a `PlayButton` component in `page.tsx`:

```tsx
<PlayButton 
  src="https://f004.backblazeb2.com/file/trees-audio/new-site/NewEpisode.mp3" 
  title="Guest Name, Location" 
/>
```
