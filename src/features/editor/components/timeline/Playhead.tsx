import React, { memo } from 'react';

interface PlayheadProps {
    currentTime: number;
    zoom: number;
    height: string | number;
}

export const Playhead = memo(({ currentTime, zoom, height }: PlayheadProps) => {
    // Calculate position
    const position = currentTime * zoom;

    return (
        <div
            className="absolute top-0 z-50 pointer-events-none flex flex-col items-center"
            style={{
                transform: `translateX(${position}px) translateX(-50%)`, // Center horizontally
                height: height,
                left: 0, // Anchor to left
                willChange: 'transform' // Hint for browser optimization
            }}
        >
            {/* Arrow Head/Handle */}
            <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-white transform translate-y-0" />

            {/* Line */}
            <div className="w-px flex-1 bg-white shadow-[0_0_4px_rgba(0,0,0,0.5)]" />
        </div>
    );
});

Playhead.displayName = 'Playhead';
