import { useState, useCallback, useEffect } from 'react';
import { MenuBar } from './MenuBar';
import { ToolBar } from './ToolBar';
import { AssetPanel } from './AssetPanel';
import { PreviewMonitor } from './PreviewMonitor';
import { InspectorPanel } from './InspectorPanel';
import { Timeline } from './Timeline';

interface SelectedClip {
  id: string;
  name: string;
  type: 'video' | 'audio' | 'ai';
}

export function VideoEditor() {
  const [activeTool, setActiveTool] = useState('select');
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
        case 'v':
          setActiveTool('select');
          break;
        case 'b':
          setActiveTool('blade');
          break;
        case 'h':
          setActiveTool('hand');
          break;
        case 't':
          setActiveTool('text');
          break;
        case 'z':
          setActiveTool('zoom');
          break;
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
        return prev + 1/30; // ~30fps
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
    <div className="h-screen w-full flex flex-col bg-editor-bg overflow-hidden">
      {/* Menu Bar */}
      <MenuBar />
      
      <div className="flex-1 flex overflow-hidden">
        {/* Tool Bar */}
        <ToolBar activeTool={activeTool} onToolChange={setActiveTool} />
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Upper Section */}
          <div className="flex-1 flex overflow-hidden min-h-0">
            {/* Asset Panel */}
            <div className="w-72 flex-shrink-0">
              <AssetPanel />
            </div>
            
            {/* Preview Monitor */}
            <div className="flex-1 min-w-0">
              <PreviewMonitor
                currentTime={currentTime}
                duration={duration}
                isPlaying={isPlaying}
                onPlayPause={handlePlayPause}
                onSeek={handleSeek}
              />
            </div>
            
            {/* Inspector Panel */}
            <InspectorPanel selectedClip={selectedClip} />
          </div>
          
          {/* Timeline */}
          <div className="h-72 flex-shrink-0">
            <Timeline
              currentTime={currentTime}
              duration={duration}
              onSeek={handleSeek}
              onClipSelect={handleClipSelect}
              selectedClipId={selectedClip?.id ?? null}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
