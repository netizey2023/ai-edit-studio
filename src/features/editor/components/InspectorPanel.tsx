import { useState } from 'react';
import {
  Sliders,
  MonitorPlay,
  Layers,
  Crop
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { Slider } from '@/shared/ui/slider';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';
import { Switch } from '@/shared/ui/switch';
import { Separator } from '@/shared/ui/separator';

import { Clip } from '../types';

interface InspectorPanelProps {
  selectedClip: Clip | null;
}

const blendModes = [
  'Normal', 'Multiply', 'Screen', 'Overlay', 'Soft Light',
  'Hard Light', 'Color Dodge', 'Color Burn', 'Difference'
];

export function InspectorPanel({ selectedClip }: InspectorPanelProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [opacity, setOpacity] = useState(100);
  const [blendMode, setBlendMode] = useState('Normal');

  if (!selectedClip) {
    return (
      <div className="w-[320px] bg-editor-panel border-l border-editor-border flex flex-col h-full items-center justify-center text-center p-6">
        <Sliders className="w-12 h-12 text-muted-foreground/20 mb-4" />
        <h3 className="text-sm font-medium mb-1">No Clip Selected</h3>
        <p className="text-xs text-muted-foreground">Select a clip in the timeline to make adjustments.</p>
      </div>
    );
  }

  return (
    <div className="w-[320px] bg-editor-panel border-l border-editor-border flex flex-col h-full">
      <Tabs defaultValue="video" className="flex flex-col h-full">
        {/* Main Tabs */}
        <div className="bg-editor-panel-header px-2 pt-2 border-b border-editor-border">
          <TabsList className="bg-transparent w-full h-auto p-0 justify-start gap-6 border-b border-transparent">
            {['video', 'audio', 'animation', 'speed', 'adjust'].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="
                  px-0 py-2 text-xs font-medium bg-transparent rounded-none border-b-2 border-transparent
                  data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-primary
                  hover:text-foreground transition-colors
                "
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {/* Video Tab Content */}
        <TabsContent value="video" className="flex-1 m-0 overflow-y-auto scrollbar-thin">
          <Tabs defaultValue="basic" className="flex flex-col">
            <div className="px-2 py-2 border-b border-editor-border">
              <TabsList className="bg-secondary/30 h-8 p-0.5 rounded-lg w-full flex">
                {['basic', 'cutout', 'mask', 'enhance'].map(sub => (
                  <TabsTrigger
                    key={sub}
                    value={sub}
                    className="flex-1 text-[10px] rounded-md h-7 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                  >
                    {sub.charAt(0).toUpperCase() + sub.slice(1)}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <TabsContent value="basic" className="p-4 space-y-6">

              {/* Transform */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MonitorPlay size={14} className="text-muted-foreground" />
                    <Label className="text-xs font-semibold">Transform</Label>
                  </div>
                  <Switch />
                </div>

                <div className="grid grid-cols-2 gap-4 pl-6">
                  <div className="space-y-2">
                    <Label className="text-[10px] text-muted-foreground">Scale</Label>
                    <div className="flex items-center gap-2">
                      <Slider
                        value={[scale]}
                        onValueChange={([v]) => setScale(v)}
                        min={0}
                        max={200}
                        className="flex-1"
                      />
                      <span className="text-xs w-8 text-right">{scale}%</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] text-muted-foreground">Rotation</Label>
                    <div className="flex items-center gap-2">
                      <Slider
                        value={[rotation]}
                        onValueChange={([v]) => setRotation(v)}
                        min={-180}
                        max={180}
                        className="flex-1"
                      />
                      <span className="text-xs w-8 text-right">{rotation}°</span>
                    </div>
                  </div>
                </div>

                <div className="pl-6 space-y-2">
                  <Label className="text-[10px] text-muted-foreground">Position</Label>
                  <div className="flex gap-2">
                    <div className="flex-1 relative">
                      <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground">X</span>
                      <Input
                        type="number"
                        value={position.x}
                        onChange={(e) => setPosition(p => ({ ...p, x: Number(e.target.value) }))}
                        className="h-7 pl-6 text-xs bg-secondary border-0 text-right"
                      />
                    </div>
                    <div className="flex-1 relative">
                      <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground">Y</span>
                      <Input
                        type="number"
                        value={position.y}
                        onChange={(e) => setPosition(p => ({ ...p, y: Number(e.target.value) }))}
                        className="h-7 pl-6 text-xs bg-secondary border-0 text-right"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="bg-editor-border" />

              {/* Blend */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Layers size={14} className="text-muted-foreground" />
                    <Label className="text-xs font-semibold">Blend</Label>
                  </div>
                </div>

                <div className="pl-6 space-y-3">
                  <div className="space-y-2">
                    <Label className="text-[10px] text-muted-foreground">Opacity</Label>
                    <div className="flex items-center gap-2">
                      <Slider
                        value={[opacity]}
                        onValueChange={([v]) => setOpacity(v)}
                        min={0}
                        max={100}
                        className="flex-1"
                      />
                      <span className="text-xs w-8 text-right">{opacity}%</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[10px] text-muted-foreground">Mode</Label>
                    <Select value={blendMode} onValueChange={setBlendMode}>
                      <SelectTrigger className="h-7 text-xs bg-secondary border-0">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {blendModes.map((mode) => (
                          <SelectItem key={mode} value={mode}>{mode}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Separator className="bg-editor-border" />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Crop size={14} className="text-muted-foreground" />
                    <Label className="text-xs font-semibold">Stabilize</Label>
                  </div>
                  <Switch />
                </div>
              </div>

            </TabsContent>
          </Tabs>
        </TabsContent>
        {/* Placeholder for other tabs */}
        <TabsContent value="audio" className="p-4 flex items-center justify-center text-muted-foreground">
          <p className="text-xs">Audio adjustments coming soon</p>
        </TabsContent>
        <TabsContent value="animation" className="p-4 flex items-center justify-center text-muted-foreground">
          <p className="text-xs">Animation presets coming soon</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
