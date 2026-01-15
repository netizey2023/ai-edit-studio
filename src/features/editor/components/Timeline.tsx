import React, { useState, useRef, useEffect } from 'react';
import { Track, Clip } from '../types';
import { TimelineRuler } from './timeline/TimelineRuler';
import { TimelineTrack } from './timeline/TimelineTrack';
import { TimelineTrackHeader } from './timeline/TimelineTrackHeader';
import { Playhead } from './timeline/Playhead';
import { TimelineToolbar } from './TimelineToolbar';

interface TimelineProps {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
  onClipSelect: (clip: Clip | null) => void;
  selectedClipId: string | null;
}

const initialTracks: Track[] = [
  { id: 'v2', name: 'Main Track', type: 'video', muted: false, solo: false, locked: false, visible: true },
  { id: 'v1', name: 'Overlay 1', type: 'video', muted: false, solo: false, locked: false, visible: true },
  { id: 'a1', name: 'Audio 1', type: 'audio', muted: false, solo: false, locked: false, visible: true },
  { id: 'a2', name: 'Audio 2', type: 'audio', muted: false, solo: false, locked: false, visible: true },
];

const initialClips: Clip[] = [
  { id: 'clip1', name: 'intro_sequence.mp4', type: 'video', start: 0, duration: 5, trackId: 'v2' },
  { id: 'clip2', name: 'main_footage.mp4', type: 'video', start: 5, duration: 8, trackId: 'v2' },
  { id: 'clip3', name: 'AI Generated Take', type: 'ai', start: 2, duration: 4, trackId: 'v1' },
  { id: 'clip6', name: 'background_music.mp3', type: 'audio', start: 0, duration: 18, trackId: 'a1' },
];

export function Timeline({ currentTime, duration, onSeek, onClipSelect, selectedClipId }: TimelineProps) {
  const [tracks, setTracks] = useState<Track[]>(initialTracks);
  const [clips] = useState<Clip[]>(initialClips);
  const [zoom, setZoom] = useState(50); // pixels per second
  const [scrollPosition, setScrollPosition] = useState(0);
  const [magnetEnabled, setMagnetEnabled] = useState(true);
  const [snappingEnabled, setSnappingEnabled] = useState(true);

  // Refs for Scroll Synchronization
  const tracksHeaderRef = useRef<HTMLDivElement>(null);
  const tracksContentRef = useRef<HTMLDivElement>(null);

  const toggleTrackProperty = (trackId: string, property: keyof Track) => {
    setTracks(tracks.map(track =>
      track.id === trackId ? { ...track, [property]: !track[property] } : track
    ));
  };

  const calculateTotalWidth = () => {
    // Determine content end time
    const maxClipEnd = Math.max(...clips.map(c => c.start + c.duration), 0);
    const contentWidth = maxClipEnd * zoom;

    // Determine viewport width (fallback to 0)
    const viewportWidth = tracksContentRef.current?.clientWidth || 0;

    // Ruler should fill the screen OR the content, whichever is larger
    // Add some buffer (e.g. 200px) only to content for editing ease
    return Math.max(contentWidth + 200, viewportWidth);
  }

  // Handle Sync Scrolling (Video vs Header vertical sync)
  const handleContentScroll = (e: React.UIEvent<HTMLDivElement>) => {
    // Sync horizontal scroll state for ruler/rendering
    setScrollPosition(e.currentTarget.scrollLeft);

    // Sync vertical scroll to header
    if (tracksHeaderRef.current) {
      tracksHeaderRef.current.scrollTop = e.currentTarget.scrollTop;
    }
  };

  const handleHeaderScroll = (e: React.UIEvent<HTMLDivElement>) => {
    // Allow scrolling header to scroll content vertically
    if (tracksContentRef.current) {
      tracksContentRef.current.scrollTop = e.currentTarget.scrollTop;
    }
  };

  // Refs to access latest state inside event listeners without re-binding
  const stateRef = useRef({ zoom, currentTime });
  useEffect(() => {
    stateRef.current = { zoom, currentTime };
  }, [zoom, currentTime]);

  // Zoom limits
  const MIN_ZOOM = 5;
  const MAX_ZOOM = 500;

  const performZoom = (newZoom: number, centerTime: number) => {
    const clampedZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, newZoom));
    setZoom(clampedZoom);

    if (tracksContentRef.current) {
      const viewportWidth = tracksContentRef.current.clientWidth;
      const targetScrollLeft = (centerTime * clampedZoom) - (viewportWidth / 2);
      tracksContentRef.current.scrollLeft = Math.max(0, targetScrollLeft);
    }
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const delta = -e.deltaY;
      const zoomFactor = delta > 0 ? 1.2 : 0.8;
      performZoom(zoom * zoomFactor, currentTime);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle zoom if we are focused on the window (simple check)
      // or check if active element is not an input
      if ((e.ctrlKey || e.metaKey) && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        const { zoom: currentZoom, currentTime: time } = stateRef.current;

        if (e.key === '=' || e.key === '+') {
          e.preventDefault();
          performZoom(currentZoom * 1.2, time);
        } else if (e.key === '-' || e.key === '_') {
          e.preventDefault();
          performZoom(currentZoom * 0.8, time);
        } else if (e.key === '0') {
          e.preventDefault();
          performZoom(50, time);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Project settings (move to store/context later)
  const FPS = 60;

  const formatTimecode = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const frames = Math.floor((seconds % 1) * FPS);
    return `${mins}:${secs.toString().padStart(2, '0')}:${frames.toString().padStart(2, '0')}`;
  };

  // Group clips by track ID outside of render loop to stabilize references
  const clipsByTrack = React.useMemo(() => {
    const groups: Record<string, Clip[]> = {};
    tracks.forEach(t => groups[t.id] = []);
    clips.forEach(c => {
      if (groups[c.trackId]) {
        groups[c.trackId].push(c);
      }
    });
    return groups;
  }, [clips, tracks]);

  const totalWidth = calculateTotalWidth();

  return (
    <div className="flex flex-col h-full bg-editor-bg">
      {/* Integrated Toolbar */}
      <TimelineToolbar
        currentTime={currentTime}
        formatTimecode={formatTimecode}
        zoom={zoom}
        onZoomChange={(newZoom) => performZoom(newZoom, currentTime)}
        magnetEnabled={magnetEnabled}
        onToggleMagnet={() => setMagnetEnabled(!magnetEnabled)}
        snappingEnabled={snappingEnabled}
        onToggleSnapping={() => setSnappingEnabled(!snappingEnabled)}
      />

      <div className="flex flex-1 overflow-hidden relative">

        {/* Left Panel: Track Headers (Fixed Width) */}
        <div
          ref={tracksHeaderRef}
          onScroll={handleHeaderScroll}
          className="w-[120px] flex-shrink-0 bg-editor-panel border-r border-editor-border overflow-hidden sticky left-0 z-50 flex flex-col"
        >
          {/* Spacer for Ruler Height (Ruler is ~32px) */}
          <div className="h-8 w-full bg-editor-panel border-b border-editor-border flex-shrink-0" />

          {/* Track Headers List */}
          <div className="flex-1 pb-4">
            {tracks.map((track) => (
              <TimelineTrackHeader
                key={track.id}
                track={track}
                height={track.type === 'audio' ? 48 : 64}
                onToggleTrackProperty={toggleTrackProperty}
                isMain={track.id === 'v2'}
              />
            ))}
          </div>
        </div>

        {/* Right Panel: Content (Scrollable) */}
        <div
          ref={tracksContentRef}
          className="flex-1 overflow-auto scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent bg-zinc-950"
          onScroll={handleContentScroll}
          onWheel={handleWheel}
        >
          <div className="relative min-w-full h-full" style={{ width: `${totalWidth}px` }}>

            {/* Sticky Ruler */}
            <div className="sticky top-0 z-40 bg-editor-panel w-full border-b border-editor-border">
              <TimelineRuler
                totalWidth={totalWidth}
                maxSeekDuration={Math.max(...clips.map(c => c.start + c.duration), 10)}
                zoom={zoom}
                onSeek={onSeek}
                offsetX={scrollPosition}
                fps={FPS}
              />
            </div>

            {/* Playhead (Absolute over the whole area) */}
            <Playhead
              currentTime={currentTime}
              zoom={zoom}
              height="100%"
            />

            {/* Tracks Lanes */}
            <div className="pb-4">
              {tracks.map((track) => (
                <TimelineTrack
                  key={track.id}
                  track={track}
                  clips={clipsByTrack[track.id] || []}
                  zoom={zoom}
                  height={track.type === 'audio' ? 48 : 64}
                  selectedClipId={selectedClipId}
                  onClipSelect={onClipSelect}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mini-map */}
      <div className="h-5 px-2 flex items-center gap-2 border-t border-editor-border bg-editor-panel group">
        <div className="flex-1 h-3 bg-zinc-800/50 rounded-full overflow-hidden relative">
          {/* Mini clip indicators */}
          {clips.map(clip => (
            <div
              key={clip.id}
              className="absolute top-0 bottom-0 bg-white/10"
              style={{
                left: `${(clip.start / duration) * 100}%`,
                width: `${(clip.duration / duration) * 100}%`,
              }}
            />
          ))}

          {/* Viewport indicator */}
          <div
            className="absolute top-0 bottom-0 bg-zinc-600/50 rounded-full hover:bg-zinc-500/50 transition-colors cursor-grab active:cursor-grabbing"
            style={{
              left: `${(scrollPosition / totalWidth) * 100}%`,
              width: `${(tracksContentRef.current?.clientWidth || 0) / totalWidth * 100}%`,
            }}
          />

          {/* Playhead indicator */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-playhead"
            style={{ left: `${(currentTime / duration) * 100}%` }}
          />
        </div>

        <span className="text-[10px] text-muted-foreground tabular-nums min-w-[80px] text-right">
          {formatTimecode(currentTime)} / {formatTimecode(duration)}
        </span>
      </div>
    </div>
  );
}
