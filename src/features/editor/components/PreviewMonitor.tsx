import { useState } from 'react';
import {
  Play,
  Pause,
  Maximize2,
  Menu,
  Scan,
  Settings,
  RectangleHorizontal,
  RectangleVertical,
  Square,
  Monitor,
  Settings2
} from 'lucide-react';
import { Button } from '@/shared/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/shared/ui/dropdown-menu";

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
  // Format as HH:MM:SS:FF
  const formatTimeFull = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    const frames = Math.floor((seconds % 1) * 30); // Assuming 30fps for display



    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}:${frames.toString().padStart(2, '0')}`;
  };

  const [aspectRatio, setAspectRatio] = useState("16:9");

  return (
    <div className="flex flex-col h-full bg-editor-panel min-h-0 select-none">
      {/* Header */}
      <div className="h-10 px-4 flex items-center justify-between bg-editor-panel border-b border-editor-border">
        <span className="text-sm font-medium text-gray-200">Reprodutor</span>

        {/* Menu Icon with Dot */}
        <div className="relative">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
            <Menu size={16} />
          </Button>
          <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-cyan-400 rounded-full border border-editor-panel" />
        </div>
      </div>

      {/* Video Display Area */}
      <div className="flex-1 flex items-center justify-center bg-zinc-900/50 relative min-h-0 overflow-hidden group">

        {/* Main Video Frame */}
        <div className="relative aspect-video bg-black w-full max-w-[90%] max-h-[85%] shadow-2xl ring-1 ring-white/10">
          {/* Placeholder Content */}
          <div className="absolute inset-0 flex items-center justify-center">
            {!isPlaying && (
              <div className="text-center opacity-30">
                <div className="w-16 h-16 rounded-full border-2 border-white/20 flex items-center justify-center mb-2 mx-auto">
                  <Play className="w-6 h-6 text-white ml-1" />
                </div>
              </div>
            )}

            {/* Here would be the actual video element */}
          </div>
        </div>
      </div>

      {/* Footer / Transport Controls */}
      <div className="h-12 px-4 border-t border-editor-border bg-editor-panel flex items-center justify-between">

        {/* Left: Timecodes */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="text-cyan-400">{formatTimeFull(currentTime)}</span>
          <span className="text-gray-500">/</span>
          <span className="text-gray-200">{formatTimeFull(duration)}</span>
        </div>

        {/* Center: Play Control */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-200 hover:text-white hover:bg-white/10"
            onClick={onPlayPause}
          >
            {isPlaying ? <Pause className="fill-current" size={18} /> : <Play className="fill-current" size={18} />}
          </Button>
        </div>

        {/* Right: Tools */}
        <div className="flex items-center gap-3">
          {/* Fill Button */}
          <div className="bg-secondary rounded px-2 py-0.5 border border-white/10 cursor-pointer hover:bg-secondary/80 transition-colors">
            <span className="text-[10px] text-gray-300">Preenchimento</span>
          </div>

          {/* Ratio Button */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="bg-secondary rounded px-2 py-0.5 border border-white/10 cursor-pointer hover:bg-secondary/80 transition-colors">
                <span className="text-[10px] text-gray-300">Proporção</span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-editor-panel border-editor-border text-gray-200">
              <DropdownMenuCheckboxItem checked={aspectRatio === "Original"} onCheckedChange={() => setAspectRatio("Original")}>
                <span>Original</span>
                <Monitor className="ml-auto h-4 w-4 text-muted-foreground" />
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked={aspectRatio === "Personalizado"} onCheckedChange={() => setAspectRatio("Personalizado")}>
                <span>Personalizado</span>
                <Settings2 className="ml-auto h-4 w-4 text-muted-foreground" />
              </DropdownMenuCheckboxItem>

              <DropdownMenuSeparator className="bg-editor-border" />

              <DropdownMenuCheckboxItem checked={aspectRatio === "16:9"} onCheckedChange={() => setAspectRatio("16:9")}>
                <span>16:9</span>
                <RectangleHorizontal className="ml-auto h-4 w-4 text-muted-foreground" />
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked={aspectRatio === "4:3"} onCheckedChange={() => setAspectRatio("4:3")}>
                <span>4:3</span>
                <RectangleHorizontal className="ml-auto h-4 w-4 text-muted-foreground" />
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked={aspectRatio === "2.35:1"} onCheckedChange={() => setAspectRatio("2.35:1")}>
                <span>2.35:1</span>
                <RectangleHorizontal className="ml-auto h-4 w-4 text-muted-foreground" />
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked={aspectRatio === "2:1"} onCheckedChange={() => setAspectRatio("2:1")}>
                <span>2:1</span>
                <RectangleHorizontal className="ml-auto h-4 w-4 text-muted-foreground" />
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked={aspectRatio === "1.85:1"} onCheckedChange={() => setAspectRatio("1.85:1")}>
                <span>1.85:1</span>
                <RectangleHorizontal className="ml-auto h-4 w-4 text-muted-foreground" />
              </DropdownMenuCheckboxItem>

              <DropdownMenuSeparator className="bg-editor-border" />

              <DropdownMenuCheckboxItem checked={aspectRatio === "9:16"} onCheckedChange={() => setAspectRatio("9:16")}>
                <span>9:16</span>
                <RectangleVertical className="ml-auto h-4 w-4 text-muted-foreground" />
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked={aspectRatio === "3:4"} onCheckedChange={() => setAspectRatio("3:4")}>
                <span>3:4</span>
                <RectangleVertical className="ml-auto h-4 w-4 text-muted-foreground" />
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked={aspectRatio === "5.8\""} onCheckedChange={() => setAspectRatio("5.8\"")}>
                <span>5.8 polegadas</span>
                <RectangleVertical className="ml-auto h-4 w-4 text-muted-foreground" />
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked={aspectRatio === "1:1"} onCheckedChange={() => setAspectRatio("1:1")}>
                <span>1:1</span>
                <Square className="ml-auto h-4 w-4 text-muted-foreground" />
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="icon" className="h-7 w-7 text-gray-400 hover:text-white" title="Focus Mode">
            <Scan size={16} />
          </Button>

          <Button variant="ghost" size="icon" className="h-7 w-7 text-gray-400 hover:text-white" title="Fullscreen">
            <Maximize2 size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}
