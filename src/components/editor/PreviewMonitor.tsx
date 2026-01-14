import { useState } from 'react';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  ChevronLeft, 
  ChevronRight,
  Maximize2,
  Volume2,
  Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface PreviewMonitorProps {
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  onPlayPause: () => void;
  onSeek: (time: number) => void;
}

export function PreviewMonitor({ 
  currentTime, 
  duration, 
  isPlaying, 
  onPlayPause, 
  onSeek 
}: PreviewMonitorProps) {
  const [quality, setQuality] = useState('full');
  const [volume, setVolume] = useState(80);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const frames = Math.floor((seconds % 1) * 30);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}:${frames.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col h-full bg-editor-bg">
      {/* Preview Header */}
      <div className="h-8 px-3 flex items-center justify-between border-b border-editor-border bg-editor-panel">
        <span className="text-xs text-muted-foreground">Program Monitor</span>
        <div className="flex items-center gap-2">
          <Select value={quality} onValueChange={setQuality}>
            <SelectTrigger className="h-6 w-24 text-xs bg-secondary border-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="full">Full Quality</SelectItem>
              <SelectItem value="half">1/2 Quality</SelectItem>
              <SelectItem value="quarter">1/4 Quality</SelectItem>
            </SelectContent>
          </Select>
          <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
            <Settings className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {/* Video Display Area */}
      <div className="flex-1 flex items-center justify-center p-4 relative">
        {/* Rulers */}
        <div className="absolute top-0 left-4 right-4 h-4 bg-timeline-ruler flex items-end">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="flex-1 border-r border-muted-foreground/30 text-[8px] text-muted-foreground pl-0.5">
              {i * 50}
            </div>
          ))}
        </div>
        <div className="absolute left-0 top-4 bottom-20 w-4 bg-timeline-ruler flex flex-col">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="flex-1 border-b border-muted-foreground/30 text-[8px] text-muted-foreground">
              {i * 50}
            </div>
          ))}
        </div>

        {/* Video Frame */}
        <div className="relative w-full max-w-2xl aspect-video bg-black rounded-sm overflow-hidden border border-editor-border">
          {/* Safe Zone Guides */}
          <div className="absolute inset-[5%] border border-dashed border-primary/30 pointer-events-none" />
          <div className="absolute inset-[10%] border border-dashed border-primary/20 pointer-events-none" />
          
          {/* Center Crosshair */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8">
            <div className="absolute top-1/2 left-0 right-0 h-px bg-primary/40" />
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-primary/40" />
          </div>

          {/* Placeholder Content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full border-2 border-muted-foreground/30 flex items-center justify-center mb-2 mx-auto">
                <Play className="w-6 h-6 text-muted-foreground/50 ml-1" />
              </div>
              <p className="text-sm text-muted-foreground">No clip selected</p>
            </div>
          </div>
        </div>
      </div>

      {/* Transport Controls */}
      <div className="h-16 px-4 border-t border-editor-border bg-editor-panel flex items-center gap-4">
        {/* Timecode Display */}
        <div className="font-mono text-sm bg-secondary px-3 py-1.5 rounded tabular-nums">
          {formatTime(currentTime)}
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-1">
          <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={() => onSeek(0)}>
            <SkipBack className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={() => onSeek(Math.max(0, currentTime - 1/30))}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button 
            size="sm" 
            variant="ghost" 
            className="h-10 w-10 p-0 hover:bg-primary/20"
            onClick={onPlayPause}
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
          </Button>
          <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={() => onSeek(Math.min(duration, currentTime + 1/30))}>
            <ChevronRight className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={() => onSeek(duration)}>
            <SkipForward className="w-4 h-4" />
          </Button>
        </div>

        {/* Duration */}
        <div className="font-mono text-xs text-muted-foreground tabular-nums">
          / {formatTime(duration)}
        </div>

        <div className="flex-1" />

        {/* Volume Control */}
        <div className="flex items-center gap-2 w-32">
          <Volume2 className="w-4 h-4 text-muted-foreground" />
          <Slider
            value={[volume]}
            onValueChange={([v]) => setVolume(v)}
            max={100}
            step={1}
            className="flex-1"
          />
        </div>

        {/* Fullscreen */}
        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
          <Maximize2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
