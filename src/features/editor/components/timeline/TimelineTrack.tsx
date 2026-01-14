import React, { memo } from 'react';
import { Track, Clip } from '../../types';
import { TimelineClip } from './TimelineClip';

interface TimelineTrackProps {
    track: Track;
    clips: Clip[];
    zoom: number;
    height: number;
    selectedClipId: string | null;
    onClipSelect: (clip: Clip) => void;
}

export const TimelineTrack = memo(({
    track,
    clips,
    zoom,
    height,
    selectedClipId,
    onClipSelect,
}: TimelineTrackProps) => {

    return (
        <div className="flex w-full group">
            {/* Track Lane */}
            <div
                className="flex-1 relative bg-[#0f0f10] border-b border-[#27272a] border-l border-[#27272a]"
                style={{ height: `${height}px` }}
            >
                {clips.map(clip => (
                    <TimelineClip
                        key={clip.id}
                        clip={clip}
                        zoom={zoom}
                        height={height}
                        isSelected={selectedClipId === clip.id}
                        onSelect={(e) => {
                            e.stopPropagation();
                            onClipSelect(clip);
                        }}
                    />
                ))}
            </div>
        </div>
    );
});

TimelineTrack.displayName = 'TimelineTrack';
