import {
    Undo2,
    Redo2,
    Scissors,
    Trash2,
    MoreHorizontal,
    ZoomIn,
    ZoomOut,
    MousePointer2,
    Hand,
    Magnet,
    AlignStartVertical
} from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { Separator } from '@/shared/ui/separator';
import { Slider } from '@/shared/ui/slider';

interface TimelineToolbarProps {
    currentTime?: number;
    formatTimecode?: (seconds: number) => string;
    zoom: number;
    onZoomChange: (zoom: number) => void;
    onSplit?: () => void;
    onDelete?: () => void;
    magnetEnabled?: boolean;
    onToggleMagnet?: () => void;
    snappingEnabled?: boolean;
    onToggleSnapping?: () => void;
}

export function TimelineToolbar({
    zoom,
    onZoomChange,
    onSplit,
    onDelete,
    magnetEnabled = true,
    onToggleMagnet,
    snappingEnabled = true,
    onToggleSnapping
}: TimelineToolbarProps) {
    return (
        <div className="h-10 border-b border-[#27272a] bg-[#18181b] flex items-center px-4 justify-between select-none z-20 relative">
            {/* Left Tools */}
            <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-[#27272a] p-0.5 rounded-lg border border-white/5">
                    <Button variant="ghost" size="icon" className="h-7 w-7 rounded-sm hover:bg-[#3f3f46] text-blue-400 bg-[#3f3f46]">
                        <MousePointer2 size={14} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 rounded-sm hover:bg-[#3f3f46] text-gray-400">
                        <Hand size={14} />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 rounded-sm hover:bg-[#3f3f46] text-gray-400"
                        onClick={onSplit}
                    >
                        <Scissors size={14} />
                    </Button>
                </div>

                <Separator orientation="vertical" className="h-5 mx-1 bg-[#27272a]" />

                <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-7 w-7 rounded-sm hover:bg-[#3f3f46] text-gray-400" onClick={onDelete}>
                        <Trash2 size={14} />
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        className={`h-7 w-7 rounded-sm hover:bg-[#3f3f46] ${magnetEnabled ? 'text-blue-400' : 'text-gray-400'}`}
                        onClick={onToggleMagnet}
                    >
                        <Magnet size={14} className={magnetEnabled ? "fill-current" : ""} />
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        className={`h-7 w-7 rounded-sm hover:bg-[#3f3f46] ${snappingEnabled ? 'text-blue-400' : 'text-gray-400'}`}
                        onClick={onToggleSnapping}
                    >
                        <AlignStartVertical size={14} />
                    </Button>
                </div>
            </div>

            {/* Right Tools */}
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-7 w-7 rounded-sm hover:bg-[#3f3f46] text-gray-400">
                        <Undo2 size={14} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 rounded-sm hover:bg-[#3f3f46] text-gray-400">
                        <Redo2 size={14} />
                    </Button>
                </div>

                <Separator orientation="vertical" className="h-5 bg-[#27272a]" />

                <div className="flex items-center gap-2 w-40">
                    <Button size="icon" variant="ghost" className="h-6 w-6 text-gray-400 hover:text-white" onClick={() => onZoomChange(Math.max(10, zoom - 10))}>
                        <ZoomOut size={14} />
                    </Button>
                    <Slider
                        value={[zoom]}
                        onValueChange={([v]) => onZoomChange(v)}
                        min={10}
                        max={200}
                        step={5}
                        className="flex-1"
                    />
                    <Button size="icon" variant="ghost" className="h-6 w-6 text-gray-400 hover:text-white" onClick={() => onZoomChange(Math.min(200, zoom + 10))}>
                        <ZoomIn size={14} />
                    </Button>
                </div>
            </div>
        </div>
    );
}
