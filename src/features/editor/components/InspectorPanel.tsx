import { useState } from 'react';
import { Share, Play, AlertCircle, ChevronDown, Layers, Scissors, Wand2, Sliders } from "lucide-react"
import { useTranslation } from "react-i18next";
import { Button } from '@/shared/ui/button';
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
import { ProjectSettingsModal } from './ProjectSettingsModal';
import { Checkbox } from '@/shared/ui/checkbox'; // Added Checkbox import

import { Clip } from '../types';

interface InspectorPanelProps {
  selectedClip: Clip | null;
  onExport: () => void;
}

const blendModes = [
  'Normal', 'Multiply', 'Screen', 'Overlay', 'Soft Light',
  'Hard Light', 'Color Dodge', 'Color Burn', 'Difference'
];

export function InspectorPanel({ selectedClip, onExport }: InspectorPanelProps) {
  const { t } = useTranslation();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [opacity, setOpacity] = useState(100);
  const [blendMode, setBlendMode] = useState('Normal');

  /* Project Settings State */
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <div className="w-full bg-editor-panel flex flex-col h-full min-h-0">
      <ProjectSettingsModal open={isSettingsOpen} onOpenChange={setIsSettingsOpen} />

      <Tabs defaultValue="video" className="relative flex flex-col flex-1 h-full w-full min-h-0">
        {/* Main Tabs and Actions - Always Visible */}
        <div className="bg-editor-panel-header px-2 border-b border-editor-border flex items-center h-12 gap-2 shrink-0 z-20 relative">
          {/* Tabs Container */}
          <div className="flex-1 min-w-0 overflow-hidden">
            <TabsList className="bg-transparent h-full p-0 gap-4 border-b border-transparent w-full justify-start overflow-x-auto no-scrollbar">
              {['video', 'audio', 'animation', 'speed', 'adjust'].map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="
                    px-0 h-full text-xs font-medium bg-transparent rounded-none border-b-2 border-transparent
                    data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-primary
                    hover:text-foreground transition-colors flex-shrink-0
                  "
                  disabled={!selectedClip}
                >
                  {t(`inspector.tabs.${tab}`)}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Actions - Fixed Width */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button size="sm" className="h-6 text-[10px] bg-cyan-500 hover:bg-cyan-600 text-black font-medium px-2 gap-1" onClick={onExport}>
              <Share size={10} className="rotate-90" /> {t('inspector.export')}
            </Button>
          </div>
        </div>

        {/* Content Body */}
        {!selectedClip ? (
          <div className="absolute top-12 bottom-0 left-0 right-0 overflow-y-auto p-6 text-gray-200 text-xs">
            {/* ... Project Details ... */}
            <div className="space-y-6">
              <div className="grid grid-cols-[140px_1fr] gap-4">
                <span className="text-gray-500">{t('inspector.projectDetails.name')}:</span>
                <span>0114</span>
              </div>
              {/* ... truncated for brevity ... */}
            </div>

            <div className="fixed bottom-4 right-4">
              {/* ... */}
            </div>
          </div>
        ) : (
          <>
            {/* Video Tab Content */}
            <TabsContent
              value="video"
              className="absolute top-12 bottom-0 left-0 right-0 m-0 flex flex-col min-h-0 data-[state=inactive]:hidden data-[state=active]:flex text-xs w-full bg-editor-panel"
            >
              <Tabs defaultValue="basic" className="flex flex-col flex-1 w-full min-h-0">
                <div className="px-2 py-2 border-b border-editor-border shrink-0 z-10 bg-editor-panel-header">
                  <TabsList className="bg-secondary/30 h-8 p-0.5 rounded-lg w-full flex">
                    {['basic', 'cutout', 'mask', 'enhance'].map(sub => (
                      <TabsTrigger
                        key={sub}
                        value={sub}
                        className="flex-1 text-[10px] rounded-md h-7 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                      >
                        {t(`inspector.subTabs.${sub}`)}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>

                <div className="flex-1 overflow-y-auto scrollbar-thin w-full min-h-0">
                  <TabsContent value="basic" className="p-3 space-y-4 pb-6 mt-0">

                    {/* Transform */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Checkbox id="transform" defaultChecked className="w-3 h-3 border-zinc-600" />
                          <span className="text-xs font-medium text-gray-300">{t('inspector.transform.title')}</span>
                        </div>
                        <Switch className="scale-75 origin-right" />
                      </div>

                      <div className="grid grid-cols-2 gap-3 pl-4">
                        <div className="grid grid-cols-[80px_1fr] items-center gap-4">
                          <span className="text-[10px] text-gray-500">{t('inspector.transform.scale')}</span>
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
                        <div className="grid grid-cols-[80px_1fr] items-center gap-4">
                          <span className="text-[10px] text-gray-500">{t('inspector.transform.rotation')}</span>
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

                      <div className="pl-4 grid grid-cols-[80px_1fr] items-center gap-4">
                        <span className="text-[10px] text-gray-500">{t('inspector.transform.position')}</span>
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
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Checkbox id="blend" defaultChecked className="w-3 h-3 border-zinc-600" />
                          <span className="text-xs font-medium text-gray-300">{t('inspector.blend.title')}</span>
                        </div>
                      </div>

                      <div className="pl-4 space-y-2">
                        <div className="grid grid-cols-[80px_1fr] items-center gap-4">
                          <span className="text-[10px] text-gray-500">{t('inspector.blend.opacity')}</span>
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

                        <div className="grid grid-cols-[80px_1fr] items-center gap-4">
                          <span className="text-[10px] text-gray-500">{t('inspector.blend.mode')}</span>
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

                    {/* Stabilize */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Checkbox id="stabilize" className="w-3 h-3 border-zinc-600" />
                          <span className="text-xs font-medium text-gray-300">{t('inspector.stabilize.title')}</span>
                        </div>
                        <Switch className="scale-75 origin-right" />
                      </div>
                    </div>

                  </TabsContent>

                </div>
              </Tabs>
            </TabsContent>
            {/* Placeholder for other tabs */}
            <TabsContent value="audio" className="p-4 flex items-center justify-center text-muted-foreground">
              <p className="text-xs">Audio adjustments coming soon</p>
            </TabsContent>
            <TabsContent value="animation" className="p-4 flex items-center justify-center text-muted-foreground">
              <p className="text-xs">Animation presets coming soon</p>
            </TabsContent>
          </>
        )}
      </Tabs>
    </div>
  );
}
