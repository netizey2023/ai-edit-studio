import { useState, useRef, useEffect } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Headphones, 
  Lock, 
  Eye, 
  EyeOff,
  Film,
  Music,
  Sparkles,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface Clip {
  id: string;
  name: string;
  type: 'video' | 'audio' | 'ai';
  start: number;
  duration: number;
  trackId: string;
}

interface Track {
  id: string;
  name: string;
  type: 'video' | 'audio';
  muted: boolean;
  solo: boolean;
  locked: boolean;
  visible: boolean;
}

interface TimelineProps {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
  onClipSelect: (clip: { id: string; name: string; type: 'video' | 'audio' | 'ai' } | null) => void;
  selectedClipId: string | null;
}

const initialTracks: Track[] = [
  { id: 'v3', name: 'V3', type: 'video', muted: false, solo: false, locked: false, visible: true },
  { id: 'v2', name: 'V2', type: 'video', muted: false, solo: false, locked: false, visible: true },
  { id: 'v1', name: 'V1', type: 'video', muted: false, solo: false, locked: false, visible: true },
  { id: 'a1', name: 'A1', type: 'audio', muted: false, solo: false, locked: false, visible: true },
  { id: 'a2', name: 'A2', type: 'audio', muted: false, solo: false, locked: false, visible: true },
];

const initialClips: Clip[] = [
  { id: 'clip1', name: 'intro_sequence.mp4', type: 'video', start: 0, duration: 3, trackId: 'v1' },
  { id: 'clip2', name: 'main_footage.mp4', type: 'video', start: 3.5, duration: 8, trackId: 'v1' },
  { id: 'clip3', name: 'AI Generated Take', type: 'ai', start: 2, duration: 4, trackId: 'v2' },
  { id: 'clip4', name: 'b-roll_city.mp4', type: 'video', start: 12, duration: 5, trackId: 'v1' },
  { id: 'clip5', name: 'overlay_text.mp4', type: 'video', start: 5, duration: 3, trackId: 'v3' },
  { id: 'clip6', name: 'background_music.mp3', type: 'audio', start: 0, duration: 18, trackId: 'a1' },
  { id: 'clip7', name: 'voiceover.wav', type: 'audio', start: 2, duration: 10, trackId: 'a2' },
];

export function Timeline({ currentTime, duration, onSeek, onClipSelect, selectedClipId }: TimelineProps) {
  const [tracks, setTracks] = useState(initialTracks);
  const [clips] = useState(initialClips);
  const [zoom, setZoom] = useState(50);
  const [scrollPosition, setScrollPosition] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);

  const pixelsPerSecond = zoom * 2;
  const totalWidth = duration * pixelsPerSecond;

  const toggleTrackProperty = (trackId: string, property: 'muted' | 'solo' | 'locked' | 'visible') => {
    setTracks(tracks.map(track => 
      track.id === trackId ? { ...track, [property]: !track[property] } : track
    ));
  };

  const formatTimecode = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!timelineRef.current) return;
    const rect = timelineRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left + scrollPosition;
    const time = x / pixelsPerSecond;
    onSeek(Math.max(0, Math.min(duration, time)));
  };

  const getClipClass = (type: Clip['type']) => {
    switch (type) {
      case 'video': return 'clip-video';
      case 'audio': return 'clip-audio';
      case 'ai': return 'clip-ai';
    }
  };

  // Generate waveform bars for audio clips
  const renderWaveform = () => {
    const bars = [];
    for (let i = 0; i < 60; i++) {
      const height = 20 + Math.random() * 60;
      bars.push(
        <div 
          key={i} 
          className="w-0.5 bg-clip-audio/60 rounded-full mx-px" 
          style={{ height: `${height}%` }}
        />
      );
    }
    return bars;
  };

  return (
    <div className="flex flex-col h-full bg-timeline-bg border-t border-editor-border">
      {/* Timeline Header / Toolbar */}
      <div className="h-8 px-2 flex items-center gap-2 border-b border-editor-border bg-editor-panel">
        <span className="text-xs text-muted-foreground">Timeline</span>
        <div className="flex-1" />
        
        {/* Zoom Controls */}
        <div className="flex items-center gap-2">
          <Button size="sm" variant="ghost" className="h-6 w-6 p-0" onClick={() => setZoom(Math.max(10, zoom - 10))}>
            <ZoomOut className="w-3.5 h-3.5" />
          </Button>
          <Slider
            value={[zoom]}
            onValueChange={([v]) => setZoom(v)}
            min={10}
            max={100}
            step={5}
            className="w-24"
          />
          <Button size="sm" variant="ghost" className="h-6 w-6 p-0" onClick={() => setZoom(Math.min(100, zoom + 10))}>
            <ZoomIn className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Track Headers */}
        <div className="w-28 flex-shrink-0 border-r border-editor-border bg-editor-panel">
          {/* Ruler header spacer */}
          <div className="h-6 border-b border-editor-border" />
          
          {tracks.map((track) => (
            <div 
              key={track.id} 
              className="timeline-track px-2 gap-1"
              style={{ height: track.type === 'audio' ? '48px' : '64px' }}
            >
              <div className="flex items-center gap-1 flex-1">
                {track.type === 'video' ? (
                  <Film className="w-3 h-3 text-clip-video" />
                ) : (
                  <Music className="w-3 h-3 text-clip-audio" />
                )}
                <span className="text-xs font-medium">{track.name}</span>
              </div>
              
              <div className="flex items-center gap-0.5">
                <Tooltip delayDuration={200}>
                  <TooltipTrigger asChild>
                    <button 
                      className={`p-1 rounded hover:bg-secondary ${track.muted ? 'text-destructive' : 'text-muted-foreground'}`}
                      onClick={() => toggleTrackProperty(track.id, 'muted')}
                    >
                      {track.muted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>Mute</TooltipContent>
                </Tooltip>
                
                <Tooltip delayDuration={200}>
                  <TooltipTrigger asChild>
                    <button 
                      className={`p-1 rounded hover:bg-secondary ${track.solo ? 'text-primary' : 'text-muted-foreground'}`}
                      onClick={() => toggleTrackProperty(track.id, 'solo')}
                    >
                      <Headphones className="w-3 h-3" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>Solo</TooltipContent>
                </Tooltip>
                
                <Tooltip delayDuration={200}>
                  <TooltipTrigger asChild>
                    <button 
                      className={`p-1 rounded hover:bg-secondary ${track.locked ? 'text-yellow-500' : 'text-muted-foreground'}`}
                      onClick={() => toggleTrackProperty(track.id, 'locked')}
                    >
                      <Lock className="w-3 h-3" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>Lock</TooltipContent>
                </Tooltip>

                {track.type === 'video' && (
                  <Tooltip delayDuration={200}>
                    <TooltipTrigger asChild>
                      <button 
                        className={`p-1 rounded hover:bg-secondary ${!track.visible ? 'text-muted-foreground/50' : 'text-muted-foreground'}`}
                        onClick={() => toggleTrackProperty(track.id, 'visible')}
                      >
                        {track.visible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>Visibility</TooltipContent>
                  </Tooltip>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Timeline Content */}
        <div className="flex-1 overflow-x-auto scrollbar-thin" onScroll={(e) => setScrollPosition(e.currentTarget.scrollLeft)}>
          <div style={{ width: `${totalWidth}px`, minWidth: '100%' }}>
            {/* Time Ruler */}
            <div 
              className="h-6 bg-timeline-ruler border-b border-editor-border relative cursor-pointer"
              onClick={handleTimelineClick}
              ref={timelineRef}
            >
              {Array.from({ length: Math.ceil(duration) + 1 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute top-0 bottom-0 flex flex-col justify-end"
                  style={{ left: `${i * pixelsPerSecond}px` }}
                >
                  <div className="h-2 w-px bg-muted-foreground/50" />
                  <span className="text-[10px] text-muted-foreground ml-1">{formatTimecode(i)}</span>
                </div>
              ))}
              
              {/* Playhead */}
              <div 
                className="absolute top-0 bottom-0 w-0.5 bg-playhead z-10 animate-playhead-pulse"
                style={{ left: `${currentTime * pixelsPerSecond}px` }}
              >
                <div className="absolute -top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-playhead" 
                     style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }} />
              </div>
            </div>

            {/* Tracks */}
            {tracks.map((track) => (
              <div 
                key={track.id} 
                className="timeline-track relative"
                style={{ height: track.type === 'audio' ? '48px' : '64px' }}
              >
                {clips
                  .filter(clip => clip.trackId === track.id)
                  .map(clip => (
                    <div
                      key={clip.id}
                      className={`clip ${getClipClass(clip.type)} ${selectedClipId === clip.id ? 'clip-selected' : ''} absolute top-2`}
                      style={{
                        left: `${clip.start * pixelsPerSecond}px`,
                        width: `${clip.duration * pixelsPerSecond}px`,
                        height: track.type === 'audio' ? '32px' : '48px',
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onClipSelect({ id: clip.id, name: clip.name, type: clip.type });
                      }}
                    >
                      <div className="h-full px-2 py-1 flex flex-col justify-between overflow-hidden">
                        <div className="flex items-center gap-1">
                          {clip.type === 'ai' && <Sparkles className="w-3 h-3 flex-shrink-0" />}
                          <span className="text-[10px] font-medium truncate">{clip.name}</span>
                        </div>
                        
                        {/* Waveform for audio */}
                        {track.type === 'audio' && (
                          <div className="flex items-center h-4 overflow-hidden">
                            {renderWaveform()}
                          </div>
                        )}
                        
                        {/* Thumbnail placeholders for video */}
                        {track.type === 'video' && (
                          <div className="flex gap-px h-6 mt-1">
                            {Array.from({ length: Math.max(3, Math.floor(clip.duration * pixelsPerSecond / 40)) }).map((_, i) => (
                              <div key={i} className="flex-1 bg-black/30 rounded-sm" />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                
                {/* Playhead line through tracks */}
                <div 
                  className="absolute top-0 bottom-0 w-0.5 bg-playhead/50 pointer-events-none z-10"
                  style={{ left: `${currentTime * pixelsPerSecond}px` }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mini-map */}
      <div className="h-6 px-2 flex items-center gap-2 border-t border-editor-border bg-editor-panel">
        <div className="flex-1 h-3 bg-secondary rounded-full overflow-hidden relative">
          {/* Mini clip indicators */}
          {clips.map(clip => (
            <div
              key={clip.id}
              className={`absolute top-0 bottom-0 ${clip.type === 'video' ? 'bg-clip-video/60' : clip.type === 'audio' ? 'bg-clip-audio/60' : 'bg-clip-ai/60'}`}
              style={{
                left: `${(clip.start / duration) * 100}%`,
                width: `${(clip.duration / duration) * 100}%`,
              }}
            />
          ))}
          
          {/* Viewport indicator */}
          <div 
            className="absolute top-0 bottom-0 border border-foreground/50 bg-foreground/10 rounded"
            style={{
              left: `${(scrollPosition / totalWidth) * 100}%`,
              width: '30%',
            }}
          />
          
          {/* Playhead indicator */}
          <div 
            className="absolute top-0 bottom-0 w-0.5 bg-playhead"
            style={{ left: `${(currentTime / duration) * 100}%` }}
          />
        </div>
        
        <span className="text-[10px] text-muted-foreground tabular-nums">
          {formatTimecode(currentTime)} / {formatTimecode(duration)}
        </span>
      </div>
    </div>
  );
}
