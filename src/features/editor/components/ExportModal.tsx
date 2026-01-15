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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/ui/select"
import { Separator } from "@/shared/ui/separator"
import { FolderOpen, Edit3, CheckCircle2 } from "lucide-react"
import { useState } from "react"

interface ExportModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function ExportModal({ open, onOpenChange }: ExportModalProps) {
    const [exportVideo, setExportVideo] = useState(true);
    const [exportAudio, setExportAudio] = useState(false);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-[800px] bg-[#18181b] border-zinc-800 text-gray-200 p-0 gap-0 overflow-hidden">
                <div className="flex bg-[#18181b] h-[500px]">
                    {/* Left: Preview / Cover */}
                    <div className="w-[300px] bg-black p-4 flex flex-col gap-4 border-r border-zinc-800">
                        <div className="aspect-video bg-zinc-900 rounded-lg relative group border border-zinc-800 overflow-hidden">
                            <div className="absolute top-2 left-2">
                                <Button variant="ghost" size="sm" className="h-6 bg-black/60 hover:bg-black/80 text-xs gap-1 text-white border border-white/10">
                                    <Edit3 size={12} /> Editar capa
                                </Button>
                            </div>
                            {/* Placeholder for video preview */}
                            <div className="w-full h-full flex items-center justify-center text-zinc-700 text-xs">
                                Preview
                            </div>
                        </div>
                    </div>

                    {/* Right: Settings */}
                    <div className="flex-1 flex flex-col">
                        <DialogHeader className="px-6 py-4 border-b border-zinc-800">
                            <DialogTitle className="text-sm font-medium">Exportar</DialogTitle>
                        </DialogHeader>

                        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin">
                            {/* Name & Path */}
                            <div className="space-y-4">
                                <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                                    <Label className="text-xs text-gray-400">Nome</Label>
                                    <Input className="h-8 bg-zinc-900 border-zinc-700 text-xs" defaultValue="Project 01" />
                                </div>
                                <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                                    <Label className="text-xs text-gray-400">Exportar para</Label>
                                    <div className="flex gap-2">
                                        <Input className="h-8 bg-zinc-900 border-zinc-700 text-xs" defaultValue="/Users/mateusgomes/Movies/CapCut..." disabled />
                                        <Button size="icon" variant="outline" className="h-8 w-8 border-zinc-700 bg-zinc-900"><FolderOpen size={14} /></Button>
                                    </div>
                                </div>
                            </div>

                            {/* Video Settings */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <Checkbox id="video" checked={exportVideo} onCheckedChange={(checked) => setExportVideo(checked as boolean)} className="border-cyan-500 data-[state=checked]:bg-cyan-500 data-[state=checked]:text-black" />
                                    <Label htmlFor="video" className="text-sm font-medium cursor-pointer">Vídeo</Label>
                                </div>

                                {exportVideo && (
                                    <div className="space-y-4 pl-6 border-l-2 border-zinc-800 ml-2.5">
                                        <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                                            <Label className="text-xs text-gray-400">Resolução</Label>
                                            <Select defaultValue="1080p">
                                                <SelectTrigger className="h-8 bg-zinc-900 border-zinc-700 text-xs"><SelectValue /></SelectTrigger>
                                                <SelectContent className="bg-zinc-900 border-zinc-800">
                                                    <SelectItem value="4k">4K</SelectItem>
                                                    <SelectItem value="2k">2K</SelectItem>
                                                    <SelectItem value="1080p">1080p</SelectItem>
                                                    <SelectItem value="720p">720p</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                                            <Label className="text-xs text-gray-400">Taxa de bits</Label>
                                            <Select defaultValue="high">
                                                <SelectTrigger className="h-8 bg-zinc-900 border-zinc-700 text-xs"><SelectValue /></SelectTrigger>
                                                <SelectContent className="bg-zinc-900 border-zinc-800">
                                                    <SelectItem value="high">Superior</SelectItem>
                                                    <SelectItem value="rec">Recomendado</SelectItem>
                                                    <SelectItem value="lower">Inferior</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                                            <Label className="text-xs text-gray-400">Codec</Label>
                                            <Select defaultValue="h264">
                                                <SelectTrigger className="h-8 bg-zinc-900 border-zinc-700 text-xs"><SelectValue /></SelectTrigger>
                                                <SelectContent className="bg-zinc-900 border-zinc-800">
                                                    <SelectItem value="h264">H.264</SelectItem>
                                                    <SelectItem value="hevc">HEVC</SelectItem>
                                                    <SelectItem value="prores">ProRes</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                                            <Label className="text-xs text-gray-400">Formato</Label>
                                            <Select defaultValue="mp4">
                                                <SelectTrigger className="h-8 bg-zinc-900 border-zinc-700 text-xs"><SelectValue /></SelectTrigger>
                                                <SelectContent className="bg-zinc-900 border-zinc-800">
                                                    <SelectItem value="mp4">MP4</SelectItem>
                                                    <SelectItem value="mov">MOV</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                                            <Label className="text-xs text-gray-400">Taxa de quadros</Label>
                                            <Select defaultValue="30">
                                                <SelectTrigger className="h-8 bg-zinc-900 border-zinc-700 text-xs"><SelectValue /></SelectTrigger>
                                                <SelectContent className="bg-zinc-900 border-zinc-800">
                                                    <SelectItem value="60">60fps</SelectItem>
                                                    <SelectItem value="30">30fps</SelectItem>
                                                    <SelectItem value="24">24fps</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Space Sync Option */}
                            <div className="flex items-center gap-2">
                                <Checkbox id="sync" className="border-zinc-600" />
                                <Label htmlFor="sync" className="text-xs text-gray-400 font-normal">Sincronize os vídeos exportados com o espaço</Label>
                            </div>

                            {/* Audio Settings */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <Checkbox id="audio" checked={exportAudio} onCheckedChange={(checked) => setExportAudio(checked as boolean)} className="border-zinc-600 data-[state=checked]:bg-cyan-500 data-[state=checked]:text-black" />
                                    <Label htmlFor="audio" className="text-sm font-medium cursor-pointer text-gray-400">Áudio</Label>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-4 border-t border-zinc-800 bg-[#18181b] flex items-center justify-between">
                            <div className="text-xs text-gray-500 flex items-center gap-2">
                                <Film className="w-3 h-3" />
                                <span>Duração: 19m 40s</span>
                                <span className="mx-1">|</span>
                                <span>Tamanho: cerca de 2.20 GB</span>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="ghost" className="h-8 text-xs hover:bg-zinc-800" onClick={() => onOpenChange(false)}>Cancelar</Button>
                                <Button className="h-8 text-xs bg-cyan-500 hover:bg-cyan-600 text-black font-medium px-6" onClick={() => onOpenChange(false)}>Exportar</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
