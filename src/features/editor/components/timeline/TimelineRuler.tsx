import React, { useRef, useState, useEffect, memo } from 'react';

interface TimelineRulerProps {
    totalWidth: number;
    maxSeekDuration: number;
    zoom: number;
    onSeek: (time: number) => void;
    offsetX: number;
    fps?: number; // Optional, default to 30 if not provided
}

export const TimelineRuler = memo(({ totalWidth, maxSeekDuration, zoom, onSeek, offsetX, fps = 30 }: TimelineRulerProps) => {
    const rulerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    // Frame rate from prop
    const FRAME_DURATION = 1 / fps;

    // Interaction Logic
    const handleSeek = (clientX: number) => {
        if (!rulerRef.current) return;
        const rect = rulerRef.current.getBoundingClientRect();
        const clickX = clientX - rect.left; // Visual offset inside component

        let time = Math.max(0, clickX / zoom);

        // --- SNAPPING LOGIC ---
        // If zoom is high enough to see frames (e.g., > 30px/s), snap to nearest frame
        if (zoom > 200) {
            time = Math.round(time / FRAME_DURATION) * FRAME_DURATION;
        }

        onSeek(Math.min(maxSeekDuration, time));
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        setIsDragging(true);
        handleSeek(e.clientX);
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (isDragging) {
                e.preventDefault();
                handleSeek(e.clientX);
            }
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
            document.body.style.cursor = 'ew-resize';
        } else {
            document.body.style.cursor = '';
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            document.body.style.cursor = '';
        };
    }, [isDragging, zoom, maxSeekDuration, fps]);


    // --- STRICT SCALE LOGIC ---

    const getScale = () => {
        // Enforce STRICT strict standard intervals.
        const scales = [
            { tick: 1 / fps, label: 1, minZoom: 200 }, // Frames
            { tick: 0.5, label: 1, minZoom: 80 },  // Half-seconds
            { tick: 1, label: 5, minZoom: 30 },  // Seconds
            { tick: 5, label: 15, minZoom: 10 },  // 5 Seconds
            { tick: 10, label: 30, minZoom: 5 },   // 10 Seconds
            { tick: 15, label: 60, minZoom: 2 },   // 15 Seconds
            { tick: 30, label: 60, minZoom: 0 },   // 30 Seconds
        ];

        // Find the first scale that fits the current zoom
        // Iterating from high detail to low detail
        let selectedScale = scales[scales.length - 1];

        for (const s of scales) {
            if (zoom >= s.minZoom) {
                selectedScale = s;
                break;
            }
        }

        return {
            tickSpacing: selectedScale.tick,
            majorTerm: selectedScale.label
        };
    };

    const { tickSpacing, majorTerm } = getScale();

    // --- VIRTUALIZATION ---
    // Only render ticks visible in viewport + buffer
    const viewportWidthEstimate = 2500;
    const startPixel = Math.max(0, offsetX - 500);
    const endPixel = Math.min(totalWidth, offsetX + viewportWidthEstimate + 500);

    // Calculate index range
    const startTimeIndices = Math.floor(startPixel / zoom / tickSpacing);
    const endTimeIndices = Math.ceil(endPixel / zoom / tickSpacing);

    const ticks = [];
    const maxTicks = 2000;
    let count = 0;

    for (let i = startTimeIndices; i <= endTimeIndices; i++) {
        const time = i * tickSpacing;
        const position = time * zoom;

        if (position > totalWidth) break;

        // Epsilon check for major ticks 
        // We check if 'time' is a multiple of 'majorTerm'
        const isMajor = Math.abs(time % majorTerm) < 0.0001 || Math.abs((time % majorTerm) - majorTerm) < 0.0001;

        ticks.push({
            time,
            position,
            isMajor
        });

        count++;
        if (count > maxTicks) break;
    }

    const formatTime = (t: number) => {
        const m = Math.floor(t / 60);
        const s = Math.floor(t % 60);
        // Only show frames/ms if we are at the frame-level zoom
        if (zoom > 200) {
            // For frames:
            const frame = Math.round((t % 1) * fps);
            return `${m}:${s.toString().padStart(2, '0')}:${frame.toString().padStart(2, '0')}`;
        }
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <div
            ref={rulerRef}
            className="h-6 bg-editor-bg border-b border-editor-border relative cursor-pointer select-none overflow-hidden"
            style={{ width: `${totalWidth}px` }}
            onMouseDown={handleMouseDown}
        >
            {ticks.map((tick) => (
                <div
                    key={tick.position}
                    className="absolute top-0 bottom-0 flex flex-col justify-end pointer-events-none"
                    style={{ left: `${tick.position}px` }}
                >
                    <div
                        className={`w-px ${tick.isMajor ? 'h-3 bg-muted-foreground' : 'h-1.5 bg-muted-foreground/30'}`}
                    />
                    {tick.isMajor && (
                        <span className="text-[10px] text-muted-foreground ml-1.5 -mt-4 font-medium whitespace-nowrap">
                            {formatTime(tick.time)}
                        </span>
                    )}
                </div>
            ))}
        </div>
    );
}, (prevProps, nextProps) => {
    // Custom comparison to ensure we don't re-render on onSeek changes (functions usually change identity)
    return prevProps.zoom === nextProps.zoom &&
        prevProps.totalWidth === nextProps.totalWidth &&
        prevProps.offsetX === nextProps.offsetX &&
        prevProps.maxSeekDuration === nextProps.maxSeekDuration &&
        prevProps.fps === nextProps.fps;
});

TimelineRuler.displayName = 'TimelineRuler';
