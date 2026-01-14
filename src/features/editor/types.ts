export type ClipType = 'video' | 'audio' | 'ai' | 'text' | 'image';

export interface Clip {
    id: string;
    name: string;
    type: ClipType;
    start: number;
    duration: number;
    trackId: string;
}

export interface Track {
    id: string;
    name: string;
    type: 'video' | 'audio';
    muted: boolean;
    solo: boolean;
    locked: boolean;
    visible: boolean;
}
