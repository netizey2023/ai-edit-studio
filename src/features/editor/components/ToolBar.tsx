import { useState } from 'react';
import { 
  MousePointer2, 
  Scissors, 
  Hand, 
  Type, 
  ZoomIn,
  Magnet
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/shared/ui/tooltip';

interface Tool {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  shortcut: string;
}

const tools: Tool[] = [
  { id: 'select', icon: MousePointer2, label: 'Selection Tool', shortcut: 'V' },
  { id: 'blade', icon: Scissors, label: 'Blade Tool', shortcut: 'B' },
  { id: 'hand', icon: Hand, label: 'Hand Tool', shortcut: 'H' },
  { id: 'text', icon: Type, label: 'Text Tool', shortcut: 'T' },
  { id: 'zoom', icon: ZoomIn, label: 'Zoom Tool', shortcut: 'Z' },
];

interface ToolBarProps {
  activeTool: string;
  onToolChange: (tool: string) => void;
}

export function ToolBar({ activeTool, onToolChange }: ToolBarProps) {
  const [snapEnabled, setSnapEnabled] = useState(true);

  return (
    <aside className="w-11 bg-editor-panel border-r border-editor-border flex flex-col items-center py-2 gap-1">
      {tools.map((tool) => (
        <Tooltip key={tool.id} delayDuration={200}>
          <TooltipTrigger asChild>
            <button
              className="tool-button"
              data-active={activeTool === tool.id}
              onClick={() => onToolChange(tool.id)}
            >
              <tool.icon className="w-5 h-5" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="right" className="flex items-center gap-2">
            <span>{tool.label}</span>
            <kbd className="px-1.5 py-0.5 text-xs bg-muted rounded">{tool.shortcut}</kbd>
          </TooltipContent>
        </Tooltip>
      ))}
      
      <div className="flex-1" />
      
      {/* Snap Toggle */}
      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild>
          <button
            className="tool-button"
            data-active={snapEnabled}
            onClick={() => setSnapEnabled(!snapEnabled)}
          >
            <Magnet className="w-5 h-5" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="right">
          <span>Snapping {snapEnabled ? 'On' : 'Off'}</span>
        </TooltipContent>
      </Tooltip>
    </aside>
  );
}
