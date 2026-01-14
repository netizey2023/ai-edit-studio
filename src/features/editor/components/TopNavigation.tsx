import { Button } from "@/shared/ui/button"
import {
    Clapperboard,
    Image as ImageIcon,
    Music,
    Type,
    Sticker,
    Sparkles,
    ArrowRightLeft,
    Sliders,
    Wand2
} from "lucide-react"

interface TopNavigationProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

export function TopNavigation({ activeTab, onTabChange }: TopNavigationProps) {
    const navItems = [
        { id: 'media', label: 'Media', icon: Clapperboard },
        { id: 'audio', label: 'Audio', icon: Music },
        { id: 'text', label: 'Text', icon: Type },
        { id: 'stickers', label: 'Stickers', icon: Sticker },
        { id: 'effects', label: 'Effects', icon: Wand2 },
        { id: 'transitions', label: 'Transitions', icon: ArrowRightLeft },
        { id: 'filters', label: 'Filters', icon: Sparkles },
        { id: 'adjustments', label: 'Adjustments', icon: Sliders },
    ];

    return (
        <div className="h-14 border-b border-border bg-editor-bg flex items-center px-2 gap-1 overflow-x-auto scrollbar-thin">
            {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                    <Button
                        key={item.id}
                        variant="ghost"
                        onClick={() => onTabChange(item.id)}
                        className={`
              flex flex-col items-center justify-center gap-1 h-12 px-3 rounded-md transition-all
              ${isActive
                                ? 'text-primary bg-secondary/50'
                                : 'text-muted-foreground hover:text-foreground hover:bg-secondary/30'}
            `}
                    >
                        <Icon size={18} />
                        <span className="text-[10px] font-medium leading-none">{item.label}</span>
                    </Button>
                );
            })}
        </div>
    );
}
