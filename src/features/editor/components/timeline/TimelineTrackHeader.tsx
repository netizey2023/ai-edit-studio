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
            case 'video': return <Film className="w-4 h-4 text-blue-400" />;
            case 'audio': return <Music className="w-4 h-4 text-green-400" />;
            default: return <Film className="w-4 h-4" />;
        }
    };

    return (
        <div
            className="w-full bg-editor-panel border-b border-editor-border flex flex-col items-center justify-center px-0 relative group gap-2"
            style={{ height: `${height}px` }}
        >
            {/* Track Controls (Always visible or visible on hover) */}
            <div className="flex flex-col items-center gap-1.5 w-full">
                <div className="flex items-center justify-center gap-2 px-1">
                    <div className="opacity-70 mr-1 flex-shrink-0">
                        {getIcon()}
                    </div>
                    <button
                        onClick={() => onToggleTrackProperty(track.id, 'muted')}
                        className={`p-0 rounded-sm hover:bg-white/10 flex-shrink-0 ${track.muted ? 'text-red-400' : 'text-gray-500 hover:text-gray-300'}`}
                        title={track.muted ? "Unmute" : "Mute"}
                    >
                        {track.muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                    <button
                        onClick={() => onToggleTrackProperty(track.id, 'locked')}
                        className={`p-0 rounded-sm hover:bg-white/10 flex-shrink-0 ${track.locked ? 'text-yellow-400' : 'text-gray-500 hover:text-gray-300'}`}
                        title={track.locked ? "Unlock" : "Lock"}
                    >
                        <Lock className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => onToggleTrackProperty(track.id, 'visible')}
                        className={`p-0 rounded-sm hover:bg-white/10 flex-shrink-0 ${!track.visible ? 'text-gray-600' : 'text-gray-500 hover:text-gray-300'}`}
                        title={track.visible ? "Hide" : "Show"}
                    >
                        {track.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                </div>
            </div>

            {/* Minimal Capa Icon for Main Track */}
            {isMain && (
                <div className="absolute left-1 top-1">
                    {/* Placeholder if needed, but for w-14, icons are enough */}
                </div>
            )}
        </div>
    );
};
