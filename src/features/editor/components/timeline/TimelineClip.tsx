import React, { memo } from 'react';
import { Clip } from '../../types';
import { Sparkles } from 'lucide-react';

interface TimelineClipProps {
    clip: Clip;
    zoom: number;
    isSelected: boolean;
    onSelect: (e: React.MouseEvent) => void;
    height: number;
}

export const TimelineClip = memo(({ clip, zoom, isSelected, onSelect, height }: TimelineClipProps) => {
    const width = clip.duration * zoom;
    const left = clip.start * zoom;

    const getClipStyle = () => {
        switch (clip.type) {
            case 'video':
                return 'bg-[#2A2A2A]'; // Dark base for video
            case 'audio':
                return 'bg-[#1E3A2F]'; // Dark green for audio
            case 'ai':
                return 'bg-[#2E2038]'; // Dark purple for AI
            default:
                return 'bg-[#2A2A2A]';
        }
    };

    const getBorderColor = () => {
        return isSelected ? 'ring-2 ring-[#00C2C2] z-10' : 'hover:ring-1 hover:ring-gray-400';
    };

    return (
        <div
            className={`absolute top-1 rounded-sm cursor-pointer overflow-hidden transition-shadow ${getClipStyle()} ${getBorderColor()}`}
            style={{
                left: `${left}px`,
                width: `${width}px`,
                height: `${height - 8}px`, // Slight padding from track height
            }}
            onClick={onSelect}
        >
            {/* Clip Content */}
            <div className="w-full h-full flex flex-col relative group">

                {/* Header / Name */}
                <div className="absolute top-0 left-0 right-0 h-4 bg-black/20 flex items-center px-1 z-20 overflow-hidden">
                    {clip.type === 'ai' && <Sparkles className="w-2.5 h-2.5 text-purple-400 mr-1" />}
                    <span className="text-[9px] text-gray-200 truncate font-medium">{clip.name}</span>
                </div>

                {/* Thumbnail Strip (Simplified simulation) */}
                {clip.type === 'video' && (
                    <div className="absolute inset-0 flex opacity-30 mt-4 pointer-events-none">
                        {/* Generate placeholder divs to simulate filmstrip */}
                        {Array.from({ length: Math.ceil(width / 60) }).map((_, i) => (
                            <div key={i} className="flex-1 border-r border-white/5 bg-gray-500 h-full" />
                        ))}
                    </div>
                )}

                {/* Audio Waveform (Simplified) */}
                {clip.type === 'audio' && (
                    <div className="absolute inset-0 flex items-end pb-1 px-1 opacity-50">
                        <div className="w-full h-1/2 bg-green-500/20" style={{ clipPath: 'polygon(0 40%, 10% 20%, 20% 80%, 30% 30%, 40% 90%, 50% 10%, 60% 70%, 70% 20%, 80% 60%, 90% 40%, 100% 50%, 100% 100%, 0 100%)' }} />
                    </div>
                )}

                {/* Selection Handles */}
                {isSelected && (
                    <>
                        <div className="absolute left-0 top-0 bottom-0 w-3 bg-white/20 hover:bg-white/40 cursor-ew-resize flex items-center justify-center">
                            <div className="w-0.5 h-4 bg-white rounded-full" />
                        </div>
                        <div className="absolute right-0 top-0 bottom-0 w-3 bg-white/20 hover:bg-white/40 cursor-ew-resize flex items-center justify-center">
                            <div className="w-0.5 h-4 bg-white rounded-full" />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
});

TimelineClip.displayName = 'TimelineClip';
