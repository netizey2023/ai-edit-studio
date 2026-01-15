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
import { ExportModal } from './ExportModal';

import { Clip } from '../types';

export function VideoEditor() {
  const [activeTab, setActiveTab] = useState('media');
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedClip, setSelectedClip] = useState<Clip | null>(null);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

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
        return prev + 1 / 60; // ~60fps
      });
    }, 1000 / 60);

    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  const handlePlayPause = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  const handleSeek = useCallback((time: number) => {
    setCurrentTime(time);
  }, []);

  const handleClipSelect = useCallback((clip: Clip | null) => {
    setSelectedClip(clip);
  }, []);

  return (
    <div className="h-screen w-full flex flex-col bg-black overflow-hidden text-foreground p-1.5">
      {/* Main Workspace */}
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="vertical" className="h-full w-full rounded-none border-0">

          {/* Upper Section (Panels) */}
          <ResizablePanel defaultSize={60} minSize={30} className="overflow-hidden flex flex-col">
            <ResizablePanelGroup direction="horizontal">

              {/* Left Panel (Assets) */}
              <ResizablePanel defaultSize={25} minSize={15} className="flex flex-col min-h-0">
                <div className="h-full w-full bg-editor-panel rounded-xl border border-zinc-800 overflow-hidden flex flex-col relative">
                  <TopNavigation activeTab={activeTab} onTabChange={setActiveTab} />
                  <AssetPanel activeCategory={activeTab} />
                </div>
              </ResizablePanel>

              <ResizableHandle className="w-2 bg-transparent" />

              {/* Center Panel (Preview) */}
              <ResizablePanel defaultSize={50} minSize={30}>
                <div className="h-full w-full bg-editor-panel rounded-xl border border-zinc-800 overflow-hidden flex flex-col relative">
                  <PreviewMonitor
                    currentTime={currentTime}
                    duration={duration}
                    isPlaying={isPlaying}
                    onPlayPause={handlePlayPause}
                    onSeek={handleSeek}
                  />
                </div>
              </ResizablePanel>

              <ResizableHandle className="w-2 bg-transparent" />

              {/* Right Panel (Inspector) */}
              <ResizablePanel defaultSize={25} minSize={25}>
                <div className="h-full w-full bg-editor-panel rounded-xl border border-zinc-800 overflow-hidden flex flex-col relative">
                  <InspectorPanel selectedClip={selectedClip} onExport={() => setIsExportModalOpen(true)} />
                </div>
              </ResizablePanel>

            </ResizablePanelGroup>
          </ResizablePanel>

          <ResizableHandle className="h-2 bg-transparent" />

          {/* Lower Section (Timeline) */}
          <ResizablePanel defaultSize={40} minSize={20} className="flex flex-col">
            <div className="flex-1 overflow-hidden h-full">
              <div className="h-full w-full bg-editor-panel rounded-xl border border-zinc-800 overflow-hidden flex flex-col relative">
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
      <ExportModal open={isExportModalOpen} onOpenChange={setIsExportModalOpen} />
    </div>
  );
}

