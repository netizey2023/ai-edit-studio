import { useState } from 'react';
import { 
  ChevronDown, 
  Download, 
  Sparkles 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type MenuItem = { label: string; shortcut?: string } | { type: 'separator' };

interface Menu {
  label: string;
  items: MenuItem[];
}

const menuItems: Menu[] = [
  {
    label: 'File',
    items: [
      { label: 'New Project', shortcut: 'Ctrl+N' },
      { label: 'Open Project', shortcut: 'Ctrl+O' },
      { label: 'Save', shortcut: 'Ctrl+S' },
      { label: 'Save As...', shortcut: 'Ctrl+Shift+S' },
      { type: 'separator' },
      { label: 'Import Media', shortcut: 'Ctrl+I' },
      { label: 'Export', shortcut: 'Ctrl+E' },
    ],
  },
  {
    label: 'Edit',
    items: [
      { label: 'Undo', shortcut: 'Ctrl+Z' },
      { label: 'Redo', shortcut: 'Ctrl+Y' },
      { type: 'separator' },
      { label: 'Cut', shortcut: 'Ctrl+X' },
      { label: 'Copy', shortcut: 'Ctrl+C' },
      { label: 'Paste', shortcut: 'Ctrl+V' },
      { label: 'Delete', shortcut: 'Del' },
    ],
  },
  {
    label: 'View',
    items: [
      { label: 'Zoom In', shortcut: 'Ctrl++' },
      { label: 'Zoom Out', shortcut: 'Ctrl+-' },
      { label: 'Fit to Window', shortcut: 'Ctrl+0' },
      { type: 'separator' },
      { label: 'Show Rulers' },
      { label: 'Show Safe Zones' },
    ],
  },
  {
    label: 'Render',
    items: [
      { label: 'Render Preview', shortcut: 'Enter' },
      { label: 'Render Selection', shortcut: 'Shift+Enter' },
      { type: 'separator' },
      { label: 'Clear Cache' },
      { label: 'Render Settings...' },
    ],
  },
  {
    label: 'Help',
    items: [
      { label: 'Documentation' },
      { label: 'Keyboard Shortcuts', shortcut: 'Ctrl+/' },
      { type: 'separator' },
      { label: 'About' },
    ],
  },
];

export function MenuBar() {
  return (
    <header className="h-10 bg-editor-panel border-b border-editor-border flex items-center justify-between px-2">
      <div className="flex items-center gap-1">
        {/* Logo */}
        <div className="flex items-center gap-2 px-3">
          <Sparkles className="w-5 h-5 text-primary" />
          <span className="font-semibold text-sm">AI Editor</span>
        </div>
        
        {/* Menu Items */}
        <nav className="flex items-center">
          {menuItems.map((menu) => (
            <DropdownMenu key={menu.label}>
              <DropdownMenuTrigger asChild>
                <button className="px-3 py-1.5 text-sm text-secondary-foreground hover:bg-secondary hover:text-foreground rounded-sm transition-colors">
                  {menu.label}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="min-w-48 bg-popover border-editor-border">
                {menu.items.map((item, idx) => 
                  'type' in item && item.type === 'separator' ? (
                    <DropdownMenuSeparator key={idx} className="bg-editor-border" />
                  ) : 'label' in item ? (
                    <DropdownMenuItem key={item.label} className="flex justify-between gap-8">
                      <span>{item.label}</span>
                      {'shortcut' in item && item.shortcut && (
                        <span className="text-muted-foreground text-xs">{item.shortcut}</span>
                      )}
                    </DropdownMenuItem>
                  ) : null
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          ))}
        </nav>
      </div>
      
      {/* Export Button */}
      <Button size="sm" className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-medium">
        <Download className="w-4 h-4" />
        Export
      </Button>
    </header>
  );
}
