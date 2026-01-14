import React from 'react';
import { Track } from '../../types';
import { Volume2, VolumeX, Lock, Eye, EyeOff, ImageIcon, Film, Music } from 'lucide-react';

interface TimelineTrackHeaderProps {
    track: Track;
    height: number;
    onToggleTrackProperty: (trackId: string, property: keyof Track) => void;
    isMain?: boolean;
}

export const TimelineTrackHeader: React.FC<TimelineTrackHeaderProps> = ({
    track,
    height,
    onToggleTrackProperty,
    isMain = false
}) => {

    const getIcon = () => {
        switch (track.type) {
            case 'video': return <Film className="w-3 h-3 text-blue-400" />;
            case 'audio': return <Music className="w-3 h-3 text-green-400" />;
            default: return <Film className="w-3 h-3" />;
        }
    };

    return (
        <div
            className="w-full bg-[#18181b] border-b border-[#27272a] flex flex-col justify-center px-2 relative group"
            style={{ height: `${height}px` }}
        >
            <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1.5 opacity-70 group-hover:opacity-100 transition-opacity">
                    {getIcon()}
                    <span className="text-[10px] text-gray-300 font-medium truncate w-20">{track.name}</span>
                </div>
            </div>

            {/* Track Controls */}
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button
                    onClick={() => onToggleTrackProperty(track.id, 'muted')}
                    className={`p-0.5 rounded ${track.muted ? 'text-red-400' : 'text-gray-500 hover:text-gray-300'}`}
                >
                    {track.muted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                </button>
                <button
                    onClick={() => onToggleTrackProperty(track.id, 'locked')}
                    className={`p-0.5 rounded ${track.locked ? 'text-yellow-400' : 'text-gray-500 hover:text-gray-300'}`}
                >
                    <Lock className="w-3 h-3" />
                </button>
                <button
                    onClick={() => onToggleTrackProperty(track.id, 'visible')}
                    className={`p-0.5 rounded ${!track.visible ? 'text-gray-600' : 'text-gray-500 hover:text-gray-300'}`}
                >
                    {track.visible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                </button>
            </div>

            {/* Cover Button (Main Track Only) */}
            {isMain && (
                <div className="absolute right-2 top-1/2 -translate-y-1/2 z-20">
                    <div className="bg-[#18181b] border border-[#27272a] rounded px-2 py-1 cursor-pointer shadow-sm hover:bg-[#27272a] flex items-center gap-1">
                        <ImageIcon className="w-3 h-3 text-gray-400" />
                        <span className="text-[10px] text-gray-400">Capa</span>
                    </div>
                </div>
            )}
        </div>
    );
};
