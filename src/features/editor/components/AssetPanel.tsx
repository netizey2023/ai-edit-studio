import { useState } from 'react';
import { 
  Film, 
  Music, 
  Image, 
  Folder,
  Sparkles,
  Search,
  Plus,
  LayoutGrid,
  List,
  Globe
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';

interface Asset {
  id: string;
  name: string;
  type: 'video' | 'audio' | 'image';
  duration?: string;
  thumbnail?: string;
}

const mockAssets: Asset[] = [
  { id: '1', name: 'intro_sequence.mp4', type: 'video', duration: '0:12' },
  { id: '2', name: 'main_footage.mp4', type: 'video', duration: '2:34' },
  { id: '3', name: 'b-roll_city.mp4', type: 'video', duration: '0:45' },
  { id: '4', name: 'background_music.mp3', type: 'audio', duration: '3:20' },
  { id: '5', name: 'voiceover_final.wav', type: 'audio', duration: '1:55' },
  { id: '6', name: 'logo_overlay.png', type: 'image' },
  { id: '7', name: 'lower_third.png', type: 'image' },
];

const transitions = [
  'Cross Dissolve', 'Dip to Black', 'Dip to White', 'Wipe Left', 
  'Wipe Right', 'Push', 'Slide', 'Zoom', 'Spin', 'Blur'
];

const effects = [
  'Color Correction', 'Blur', 'Sharpen', 'Vignette', 'Glow',
  'Noise Reduction', 'Stabilization', 'Speed Ramp', 'Crop', 'Mirror'
];

export function AssetPanel() {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [webSearchQuery, setWebSearchQuery] = useState('');

  const getAssetIcon = (type: Asset['type']) => {
    switch (type) {
      case 'video': return Film;
      case 'audio': return Music;
      case 'image': return Image;
    }
  };

  return (
    <div className="flex flex-col h-full bg-editor-panel border-r border-editor-border">
      <Tabs defaultValue="project" className="flex flex-col h-full">
        <div className="editor-panel-header flex items-center justify-between">
          <TabsList className="bg-transparent h-auto p-0 gap-4">
            <TabsTrigger 
              value="project" 
              className="px-0 py-1 text-xs data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
            >
              Project
            </TabsTrigger>
            <TabsTrigger 
              value="transitions" 
              className="px-0 py-1 text-xs data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
            >
              Transitions
            </TabsTrigger>
            <TabsTrigger 
              value="effects" 
              className="px-0 py-1 text-xs data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
            >
              Effects
            </TabsTrigger>
            <TabsTrigger 
              value="ai-search" 
              className="px-0 py-1 text-xs data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3" />
              AI Web Search
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="project" className="flex-1 m-0 flex flex-col overflow-hidden">
          <div className="p-2 border-b border-editor-border flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search assets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 h-8 text-sm bg-secondary border-0"
              />
            </div>
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}>
              {viewMode === 'grid' ? <List className="w-4 h-4" /> : <LayoutGrid className="w-4 h-4" />}
            </Button>
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex-1 overflow-y-auto scrollbar-thin p-2">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-2 gap-2">
                {mockAssets.map((asset) => {
                  const Icon = getAssetIcon(asset.type);
                  return (
                    <div
                      key={asset.id}
                      className="bg-secondary/50 rounded-md p-2 cursor-pointer hover:bg-secondary transition-colors group"
                    >
                      <div className="aspect-video bg-muted rounded flex items-center justify-center mb-2">
                        <Icon className="w-8 h-8 text-muted-foreground group-hover:text-foreground transition-colors" />
                      </div>
                      <p className="text-xs truncate">{asset.name}</p>
                      {asset.duration && (
                        <p className="text-xs text-muted-foreground">{asset.duration}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="space-y-1">
                {mockAssets.map((asset) => {
                  const Icon = getAssetIcon(asset.type);
                  return (
                    <div
                      key={asset.id}
                      className="flex items-center gap-3 p-2 rounded-md cursor-pointer hover:bg-secondary transition-colors"
                    >
                      <Icon className="w-4 h-4 text-muted-foreground" />
                      <span className="flex-1 text-sm truncate">{asset.name}</span>
                      {asset.duration && (
                        <span className="text-xs text-muted-foreground">{asset.duration}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="transitions" className="flex-1 m-0 overflow-y-auto scrollbar-thin p-2">
          <div className="grid grid-cols-2 gap-2">
            {transitions.map((transition) => (
              <div
                key={transition}
                className="bg-secondary/50 rounded-md p-3 cursor-pointer hover:bg-secondary transition-colors text-center"
              >
                <div className="w-full h-8 bg-gradient-to-r from-muted via-foreground/20 to-muted rounded mb-2" />
                <p className="text-xs">{transition}</p>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="effects" className="flex-1 m-0 overflow-y-auto scrollbar-thin p-2">
          <div className="grid grid-cols-2 gap-2">
            {effects.map((effect) => (
              <div
                key={effect}
                className="bg-secondary/50 rounded-md p-3 cursor-pointer hover:bg-secondary transition-colors text-center"
              >
                <Sparkles className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                <p className="text-xs">{effect}</p>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="ai-search" className="flex-1 m-0 flex flex-col overflow-hidden">
          <div className="p-3 border-b border-editor-border">
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
              <Input
                placeholder="Search web for assets..."
                value={webSearchQuery}
                onChange={(e) => setWebSearchQuery(e.target.value)}
                className="pl-10 h-10 text-sm bg-secondary border-0"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Search for images, videos, and audio from the web using AI-powered multimodal search.
            </p>
          </div>
          
          <div className="flex-1 flex items-center justify-center p-4">
            <div className="text-center">
              <Globe className="w-12 h-12 mx-auto mb-3 text-muted-foreground/50" />
              <p className="text-sm text-muted-foreground">Enter a search query to find assets</p>
              <p className="text-xs text-muted-foreground/70 mt-1">Powered by AI multimodal search</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
