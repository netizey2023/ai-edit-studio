import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from "@/shared/ui/dialog"
import { Button } from "@/shared/ui/button"
import { Input } from "@/shared/ui/input"
import { Label } from "@/shared/ui/label"
import { Checkbox } from "@/shared/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/shared/ui/radio-group"
import { Switch } from "@/shared/ui/switch"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs"
import { Separator } from "@/shared/ui/separator"
import { FolderOpen, HelpCircle } from "lucide-react"
import { useTranslation } from "react-i18next";

interface ProjectSettingsModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function ProjectSettingsModal({ open, onOpenChange }: ProjectSettingsModalProps) {
    const { t } = useTranslation();
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-[600px] bg-[#18181b] border-zinc-800 text-gray-200 p-0 gap-0 overflow-hidden">
                <DialogHeader className="px-6 py-4 border-b border-zinc-800 shrink-0">
                    <DialogTitle className="text-sm font-medium">{t('project.settings.title')}</DialogTitle>
                </DialogHeader>

                <Tabs defaultValue="detalhes" className="flex flex-col h-full">
                    <div className="px-6 pt-4">
                        <TabsList className="bg-zinc-900 w-full justify-start p-1 h-9">
                            <TabsTrigger value="detalhes" className="w-1/2 text-xs data-[state=active]:bg-zinc-800">{t('project.settings.details')}</TabsTrigger>
                            <TabsTrigger value="desempenho" disabled className="w-1/2 text-xs data-[state=active]:bg-zinc-800 opacity-50 cursor-not-allowed">{t('project.settings.performance')}</TabsTrigger>
                        </TabsList>
                    </div>

                    <div className="p-6 space-y-6">
                        {/* Name */}
                        <div className="grid grid-cols-[140px_1fr] items-center gap-4">
                            <Label className="text-xs text-gray-400">{t('project.settings.name')}</Label>
                            <Input className="h-8 bg-zinc-900 border-zinc-700 text-xs" defaultValue="0114" />
                        </div>

                        {/* Save Path */}
                        <div className="grid grid-cols-[140px_1fr] gap-4">
                            <Label className="text-xs text-gray-400 pt-2">{t('project.settings.saveTo')}</Label>
                            <div className="space-y-1">
                                <div className="text-xs text-gray-500 break-all leading-relaxed">
                                    C:/Users/matri/AppData/Local/CapCut/User Data/Projects/com.lveditor.draft/0114
                                </div>
                            </div>
                        </div>

                        {/* Media Import */}
                        <div className="grid grid-cols-[140px_1fr] gap-4">
                            <Label className="text-xs text-gray-400 pt-1">{t('project.settings.importedMedia')}</Label>
                            <RadioGroup defaultValue="keep" className="flex flex-col gap-2">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="copy" id="copy" className="border-zinc-600 text-cyan-500" />
                                    <Label htmlFor="copy" className="text-xs font-normal">{t('project.settings.copyMedia')}</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="keep" id="keep" className="border-zinc-600 text-cyan-500" />
                                    <Label htmlFor="keep" className="text-xs font-normal">{t('project.settings.keepMedia')}</Label>
                                </div>
                            </RadioGroup>
                        </div>

                        <Separator className="bg-zinc-800" />

                        {/* Aspect Ratio */}
                        <div className="grid grid-cols-[140px_1fr] items-center gap-4">
                            <Label className="text-xs text-gray-400">{t('project.settings.aspectRatio')}</Label>
                            <Select defaultValue="original">
                                <SelectTrigger className="h-8 bg-zinc-900 border-zinc-700 text-xs"><SelectValue /></SelectTrigger>
                                <SelectContent className="bg-zinc-900 border-zinc-800">
                                    <SelectItem value="original">Original</SelectItem>
                                    <SelectItem value="16:9">16:9</SelectItem>
                                    <SelectItem value="9:16">9:16</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Resolution */}
                        <div className="grid grid-cols-[140px_1fr] items-center gap-4">
                            <Label className="text-xs text-gray-400">{t('project.settings.resolution')}</Label>
                            <Select defaultValue="adapted">
                                <SelectTrigger className="h-8 bg-zinc-900 border-zinc-700 text-xs"><SelectValue /></SelectTrigger>
                                <SelectContent className="bg-zinc-900 border-zinc-800">
                                    <SelectItem value="adapted">Adapted</SelectItem>
                                    <SelectItem value="1080p">1080p</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Frame Rate */}
                        <div className="grid grid-cols-[140px_1fr] items-center gap-4">
                            <Label className="text-xs text-gray-400 flex items-center gap-1">{t('project.settings.frameRate')} <HelpCircle size={10} className="text-gray-600" /></Label>
                            <Select defaultValue="60">
                                <SelectTrigger className="h-8 bg-zinc-900 border-zinc-700 text-xs"><SelectValue /></SelectTrigger>
                                <SelectContent className="bg-zinc-900 border-zinc-800">
                                    <SelectItem value="60">60.00 fps</SelectItem>
                                    <SelectItem value="30">30.00 fps</SelectItem>
                                    <SelectItem value="24">24.00 fps</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Color Space */}
                        <div className="grid grid-cols-[140px_1fr] items-center gap-4">
                            <Label className="text-xs text-gray-400">{t('project.settings.colorSpace')}</Label>
                            <Select defaultValue="rec709">
                                <SelectTrigger className="h-8 bg-zinc-900 border-zinc-700 text-xs"><SelectValue /></SelectTrigger>
                                <SelectContent className="bg-zinc-900 border-zinc-800">
                                    <SelectItem value="rec709">Rec. 709 SDR</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Organize Layers */}
                        <div className="grid grid-cols-[140px_1fr] gap-4 pt-2">
                            <Label className="text-xs text-gray-400 flex items-center gap-1 pt-1">{t('project.settings.organizeLayers')} <HelpCircle size={10} className="text-gray-600" /></Label>
                            <div className="space-y-1">
                                <Switch className="scale-75 origin-left data-[state=checked]:bg-cyan-500" />
                                <p className="text-[10px] text-yellow-500/80">{t('project.settings.cannotDisable')}</p>
                            </div>
                        </div>

                    </div>
                </Tabs>

                <div className="p-4 border-t border-zinc-800 bg-[#18181b] flex items-center justify-between shrink-0">
                    <div className="flex-1"></div>
                    <div className="flex gap-2">
                        <Button variant="ghost" className="h-8 text-xs hover:bg-zinc-800 w-24" onClick={() => onOpenChange(false)}>{t('project.settings.cancel')}</Button>
                        <Button className="h-8 text-xs bg-cyan-500 hover:bg-cyan-600 text-black font-medium w-24" onClick={() => onOpenChange(false)}>{t('project.settings.save')}</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
