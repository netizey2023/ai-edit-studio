import {
    Undo2,
    Redo2,
    Scissors,
    Trash2,
    MoreHorizontal,
    ZoomIn,
    ZoomOut,
    MousePointer2,
    Hand
} from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { Separator } from '@/shared/ui/separator';
import { Slider } from '@/shared/ui/slider';

export function TimelineToolbar() {
    return (
        <div className="h-10 border-b border-editor-border bg-editor-panel flex items-center px-4 justify-between select-none">
            {/* Left Tools */}
            <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-secondary/30 p-0.5 rounded-lg border border-border/50">
                    <Button variant="ghost" size="icon" className="h-7 w-7 rounded-sm hover:bg-secondary text-primary">
                        <MousePointer2 size={14} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 rounded-sm hover:bg-secondary text-muted-foreground">
                        <Hand size={14} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 rounded-sm hover:bg-secondary text-muted-foreground">
                        <Scissors size={14} />
                    </Button>
                </div>

                <Separator orientation="vertical" className="h-6 mx-2" />

                <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-7 w-7 rounded-sm hover:bg-secondary text-muted-foreground">
                        <Trash2 size={14} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 rounded-sm hover:bg-secondary text-muted-foreground">
                        <MoreHorizontal size={14} />
                    </Button>
                </div>
            </div>

            {/* Right Tools */}
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-7 w-7 rounded-sm hover:bg-secondary text-muted-foreground">
                        <Undo2 size={14} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 rounded-sm hover:bg-secondary text-muted-foreground">
                        <Redo2 size={14} />
                    </Button>
                </div>

                <Separator orientation="vertical" className="h-6" />

                <div className="flex items-center gap-2 w-32">
                    <ZoomOut size={14} className="text-muted-foreground" />
                    <Slider defaultValue={[50]} max={100} step={1} className="flex-1" />
                    <ZoomIn size={14} className="text-muted-foreground" />
                </div>
            </div>
        </div>
    );
}
