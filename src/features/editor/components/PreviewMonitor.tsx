import { useRef, useEffect, useState } from "react"
import { useTranslation } from "react-i18next";
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
  const containerRef = useRef<HTMLDivElement>(null)
  const { t } = useTranslation();
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
        <span className="text-sm font-medium text-gray-200">{t('player.title')}</span>

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
      <div className="h-12 px-2 border-t border-editor-border bg-editor-panel grid grid-cols-[1fr_auto_1fr] items-center gap-2">

        {/* Left: Timecodes */}
        <div className="flex items-center gap-2 font-mono text-xs justify-self-start pl-2 min-w-0">
          <span className="text-cyan-400 whitespace-nowrap">{formatTimeFull(currentTime)}</span>
          <span className="text-gray-500">/</span>
          <span className="text-gray-200 whitespace-nowrap">{formatTimeFull(duration)}</span>
        </div>

        {/* Center: Play Control */}
        <div className="justify-self-center">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-200 hover:text-white hover:bg-white/10 shrink-0"
            onClick={onPlayPause}
          >
            {isPlaying ? <Pause className="fill-current" size={18} /> : <Play className="fill-current" size={18} />}
          </Button>
        </div>

        {/* Right: Tools */}
        <div className="flex items-center gap-1 justify-self-end pr-2">
          {/* Fill Button */}
          <Button variant="ghost" size="icon" className="h-7 w-7 text-gray-400 hover:text-white" title={t('player.fill')}>
            <Scan size={14} />
          </Button>

          {/* Ratio Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-7 w-7 text-gray-400 hover:text-white" title={t('player.ratio')}>
                <RectangleHorizontal size={14} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-editor-panel border-editor-border text-gray-200">
              <DropdownMenuCheckboxItem checked={aspectRatio === "Original"} onCheckedChange={() => setAspectRatio("Original")}>
                <span>{t('player.original')}</span>
                <Monitor className="ml-auto h-4 w-4 text-muted-foreground" />
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked={aspectRatio === "Personalizado"} onCheckedChange={() => setAspectRatio("Personalizado")}>
                <span>{t('player.custom')}</span>
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
                <span>5.8 {t('player.inches')}</span>
                <RectangleVertical className="ml-auto h-4 w-4 text-muted-foreground" />
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked={aspectRatio === "1:1"} onCheckedChange={() => setAspectRatio("1:1")}>
                <span>1:1</span>
                <Square className="ml-auto h-4 w-4 text-muted-foreground" />
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="icon" className="h-7 w-7 text-gray-400 hover:text-white" title="Focus Mode">
            <Scan size={14} />
          </Button>

          <Button variant="ghost" size="icon" className="h-7 w-7 text-gray-400 hover:text-white" title="Fullscreen">
            <Maximize2 size={14} />
          </Button>
        </div>
      </div>
    </div>
  );
}
