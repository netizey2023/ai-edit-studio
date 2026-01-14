import { useState, useCallback, useEffect } from 'react';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from "@/shared/ui/resizable";

import { TopNavigation } from './TopNavigation';
import { AssetPanel } from './AssetPanel';
import { PreviewMonitor } from './PreviewMonitor';
import { InspectorPanel } from './InspectorPanel';
import { Timeline } from './Timeline';
import { TimelineToolbar } from './TimelineToolbar';

interface SelectedClip {
  id: string;
  name: string;
  type: 'video' | 'audio' | 'ai';
}

export function VideoEditor() {
  const [activeTab, setActiveTab] = useState('media');
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedClip, setSelectedClip] = useState<SelectedClip | null>(null);

  const duration = 20; // Total duration in seconds

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Skip if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (e.key.toLowerCase()) {
        case ' ':
          e.preventDefault();
          setIsPlaying(prev => !prev);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Playback simulation
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentTime(prev => {
        if (prev >= duration) {
          setIsPlaying(false);
          return 0;
        }
        return prev + 1 / 30; // ~30fps
      });
    }, 1000 / 30);

    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  const handlePlayPause = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  const handleSeek = useCallback((time: number) => {
    setCurrentTime(time);
  }, []);

  const handleClipSelect = useCallback((clip: SelectedClip | null) => {
    setSelectedClip(clip);
  }, []);

  return (
    <div className="h-screen w-full flex flex-col bg-background overflow-hidden text-foreground">
      {/* Top Navigation */}
      <TopNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Workspace */}
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="vertical">

          {/* Upper Section (Panels) */}
          <ResizablePanel defaultSize={60} minSize={30}>
            <ResizablePanelGroup direction="horizontal">

              {/* Left Panel (Assets) */}
              <ResizablePanel defaultSize={25} minSize={15}>
                <AssetPanel activeCategory={activeTab} />
              </ResizablePanel>

              <ResizableHandle />

              {/* Center Panel (Preview) */}
              <ResizablePanel defaultSize={50} minSize={30}>
                <PreviewMonitor
                  currentTime={currentTime}
                  duration={duration}
                  isPlaying={isPlaying}
                  onPlayPause={handlePlayPause}
                  onSeek={handleSeek}
                />
              </ResizablePanel>

              <ResizableHandle />

              {/* Right Panel (Inspector) */}
              <ResizablePanel defaultSize={25} minSize={20}>
                <InspectorPanel selectedClip={selectedClip} />
              </ResizablePanel>

            </ResizablePanelGroup>
          </ResizablePanel>

          <ResizableHandle />

          {/* Lower Section (Timeline) */}
          <ResizablePanel defaultSize={40} minSize={20}>
            <div className="h-full flex flex-col">
              <TimelineToolbar />
              <div className="flex-1 overflow-hidden">
                <Timeline
                  currentTime={currentTime}
                  duration={duration}
                  onSeek={handleSeek}
                  onClipSelect={handleClipSelect}
                  selectedClipId={selectedClip?.id ?? null}
                />
              </div>
            </div>
          </ResizablePanel>

        </ResizablePanelGroup>
      </div>
    </div>
  );
}
