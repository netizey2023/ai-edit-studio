import { useState } from 'react';
import { 
  Settings, 
  Sparkles, 
  Move, 
  RotateCw, 
  Maximize, 
  Eye,
  Upload,
  Cloud,
  Cpu,
  ImageIcon
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Clip {
  id: string;
  name: string;
  type: 'video' | 'audio' | 'ai';
}

interface InspectorPanelProps {
  selectedClip: Clip | null;
}

const feelingPresets = [
  'Cinematic', 'Nostalgic', 'Energetic', 'Dramatic',
  'Peaceful', 'Futuristic', 'Vintage', 'Minimalist'
];

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
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');

  return (
    <div className="w-72 bg-editor-panel border-l border-editor-border flex flex-col h-full">
      <Tabs defaultValue="properties" className="flex flex-col h-full">
        <div className="editor-panel-header">
          <TabsList className="bg-transparent h-auto p-0 gap-4">
            <TabsTrigger 
              value="properties" 
              className="px-0 py-1 text-xs data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none flex items-center gap-1"
            >
              <Settings className="w-3 h-3" />
              Properties
            </TabsTrigger>
            <TabsTrigger 
              value="ai-context" 
              className="px-0 py-1 text-xs data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3" />
              Context Generator
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="properties" className="flex-1 m-0 overflow-y-auto scrollbar-thin p-3 space-y-4">
          {!selectedClip ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <Settings className="w-10 h-10 text-muted-foreground/30 mb-2" />
              <p className="text-sm text-muted-foreground">Select a clip to view properties</p>
            </div>
          ) : (
            <>
              {/* Clip Info */}
              <div className="bg-secondary/50 rounded-md p-3">
                <p className="text-xs text-muted-foreground">Selected Clip</p>
                <p className="text-sm font-medium truncate">{selectedClip.name}</p>
              </div>

              {/* Transform Section */}
              <div className="space-y-3">
                <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Transform</h3>
                
                {/* Position */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Move className="w-4 h-4 text-muted-foreground" />
                    <Label className="text-xs">Position</Label>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-xs text-muted-foreground">X</Label>
                      <Input 
                        type="number" 
                        value={position.x} 
                        onChange={(e) => setPosition(p => ({ ...p, x: Number(e.target.value) }))}
                        className="h-8 text-sm bg-secondary border-0"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Y</Label>
                      <Input 
                        type="number" 
                        value={position.y} 
                        onChange={(e) => setPosition(p => ({ ...p, y: Number(e.target.value) }))}
                        className="h-8 text-sm bg-secondary border-0"
                      />
                    </div>
                  </div>
                </div>

                {/* Scale */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Maximize className="w-4 h-4 text-muted-foreground" />
                    <Label className="text-xs">Scale</Label>
                    <span className="ml-auto text-xs text-muted-foreground">{scale}%</span>
                  </div>
                  <Slider
                    value={[scale]}
                    onValueChange={([v]) => setScale(v)}
                    min={0}
                    max={200}
                    step={1}
                  />
                </div>

                {/* Rotation */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <RotateCw className="w-4 h-4 text-muted-foreground" />
                    <Label className="text-xs">Rotation</Label>
                    <span className="ml-auto text-xs text-muted-foreground">{rotation}°</span>
                  </div>
                  <Slider
                    value={[rotation]}
                    onValueChange={([v]) => setRotation(v)}
                    min={-180}
                    max={180}
                    step={1}
                  />
                </div>

                {/* Opacity */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-muted-foreground" />
                    <Label className="text-xs">Opacity</Label>
                    <span className="ml-auto text-xs text-muted-foreground">{opacity}%</span>
                  </div>
                  <Slider
                    value={[opacity]}
                    onValueChange={([v]) => setOpacity(v)}
                    min={0}
                    max={100}
                    step={1}
                  />
                </div>
              </div>

              {/* Blend Mode */}
              <div className="space-y-2">
                <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Blend Mode</h3>
                <Select value={blendMode} onValueChange={setBlendMode}>
                  <SelectTrigger className="h-8 text-sm bg-secondary border-0">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {blendModes.map((mode) => (
                      <SelectItem key={mode} value={mode}>{mode}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </>
          )}
        </TabsContent>

        <TabsContent value="ai-context" className="flex-1 m-0 overflow-y-auto scrollbar-thin p-3 space-y-4">
          {/* Prompt Input */}
          <div className="space-y-2">
            <Label className="text-xs font-medium">Agent Prompt</Label>
            <Textarea
              placeholder="Describe the take you want to generate..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-20 text-sm bg-secondary border-0 resize-none"
            />
          </div>

          {/* Feeling Presets */}
          <div className="space-y-2">
            <Label className="text-xs font-medium">Feeling Presets</Label>
            <div className="grid grid-cols-2 gap-2">
              {feelingPresets.map((preset) => (
                <button
                  key={preset}
                  className="feeling-preset"
                  data-active={selectedPreset === preset}
                  onClick={() => setSelectedPreset(selectedPreset === preset ? null : preset)}
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          {/* Reference Image */}
          <div className="space-y-2">
            <Label className="text-xs font-medium">Reference Image</Label>
            <div className="aspect-video bg-secondary rounded-md border-2 border-dashed border-muted-foreground/30 flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 transition-colors">
              <ImageIcon className="w-8 h-8 text-muted-foreground/50 mb-2" />
              <p className="text-xs text-muted-foreground">Drop image or click to upload</p>
            </div>
          </div>

          {/* Generate Buttons */}
          <div className="space-y-2 pt-2">
            <Button className="w-full gap-2" variant="outline">
              <Cpu className="w-4 h-4" />
              Generate Take Local
            </Button>
            <Button className="w-full gap-2 bg-primary hover:bg-primary/90 text-primary-foreground">
              <Cloud className="w-4 h-4" />
              Generate via Cloud API
            </Button>
          </div>

          {/* Info */}
          <p className="text-xs text-muted-foreground text-center">
            Cloud API provides higher quality results with faster processing.
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
