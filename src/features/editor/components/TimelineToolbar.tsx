import {
    Undo2,
    Redo2,
    Scissors,
    Trash2,
    ZoomIn,
    ZoomOut,
    MousePointer2,
    ChevronDown,
    Mic,
    Magnet,
    Link,
    Maximize,
    GalleryHorizontalEnd,
    ArrowLeftToLine,
    ArrowRightToLine,
    Shield,
    AlignStartVertical
} from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { Slider } from '@/shared/ui/slider';
import { Separator } from '@/shared/ui/separator';

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
        <div className="h-10 border-b border-editor-border bg-editor-panel flex items-center px-2 justify-between select-none z-20 relative">
            {/* Left Tools */}
            <div className="flex items-center gap-1">
                {/* Select Mode */}
                <div className="flex items-center mr-2">
                    <Button variant="ghost" size="icon" className="h-7 w-7 rounded-sm hover:bg-secondary text-foreground p-0 gap-0.5 w-auto px-1.5">
                        <MousePointer2 size={14} className="fill-current" />
                        <ChevronDown size={10} className="text-muted-foreground" />
                    </Button>
                </div>

                <Separator orientation="vertical" className="h-4 mx-1 bg-border/30" />

                {/* Undo/Redo */}
                <div className="flex items-center gap-0.5">
                    <Button variant="ghost" size="icon" className="h-7 w-7 rounded-sm hover:bg-secondary text-muted-foreground">
                        <Undo2 size={14} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 rounded-sm hover:bg-secondary text-muted-foreground">
                        <Redo2 size={14} />
                    </Button>
                </div>

                <Separator orientation="vertical" className="h-4 mx-1 bg-border/30" />

                {/* Edit Tools */}
                <div className="flex items-center gap-0.5">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 rounded-sm hover:bg-secondary text-muted-foreground"
                        title="Split"
                        onClick={onSplit}
                    >
                        <Scissors size={14} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 rounded-sm hover:bg-secondary text-muted-foreground" title="Delete Left">
                        <ArrowLeftToLine size={14} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 rounded-sm hover:bg-secondary text-muted-foreground" title="Delete Right">
                        <ArrowRightToLine size={14} />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 rounded-sm hover:bg-secondary text-muted-foreground"
                        title="Delete"
                        onClick={onDelete}
                    >
                        <Trash2 size={14} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 rounded-sm hover:bg-secondary text-muted-foreground" title="Freeze">
                        <Shield size={14} />
                    </Button>
                </div>
            </div>

            {/* Right Tools */}
            <div className="flex items-center gap-2">
                {/* Record */}
                <Button variant="ghost" size="icon" className="h-7 w-7 rounded-sm hover:bg-secondary text-muted-foreground" title="Record Audio">
                    <Mic size={14} />
                </Button>

                <Separator orientation="vertical" className="h-4 mx-1 bg-border/30" />

                {/* Snapping/Linking */}
                <div className="flex items-center gap-0.5">
                    <Button
                        variant="ghost"
                        size="icon"
                        className={`h-7 w-7 rounded-sm hover:bg-secondary ${magnetEnabled ? 'text-primary' : 'text-muted-foreground'}`}
                        title="Magnet"
                        onClick={onToggleMagnet}
                    >
                        <Magnet size={14} className={magnetEnabled ? "fill-current" : ""} />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className={`h-7 w-7 rounded-sm hover:bg-secondary ${snappingEnabled ? 'text-primary' : 'text-muted-foreground'}`}
                        title="Snapping"
                        onClick={onToggleSnapping}
                    >
                        <AlignStartVertical size={14} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 rounded-sm hover:bg-secondary text-muted-foreground" title="Link">
                        <Link size={14} />
                    </Button>
                </div>

                <Separator orientation="vertical" className="h-4 mx-1 bg-border/30" />

                {/* Zoom */}
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-7 w-7 rounded-sm hover:bg-secondary text-muted-foreground" title="Fit to Screen">
                        <Maximize size={14} />
                    </Button>

                    <div className="flex items-center gap-2 px-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-muted-foreground hover:text-foreground"
                            onClick={() => onZoomChange(Math.max(10, zoom - 10))}
                        >
                            <ZoomOut size={14} />
                        </Button>
                        <Slider
                            value={[zoom]}
                            onValueChange={([v]) => onZoomChange(v)}
                            min={10}
                            max={200}
                            step={5}
                            className="w-24 cursor-pointer"
                        />
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-muted-foreground hover:text-foreground"
                            onClick={() => onZoomChange(Math.min(200, zoom + 10))}
                        >
                            <ZoomIn size={14} />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
