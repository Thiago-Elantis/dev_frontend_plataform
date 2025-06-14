import { Button } from "@/components/overview/event-map/ui/button";
import { Edit, Eye, MapPin } from "lucide-react";
import { MapHeaderProps } from "./types";


export function MapHeader({ viewMode, setViewMode }: MapHeaderProps) {
  return (
    <div className="h-[72px] bg-white/90 backdrop-blur-sm border-b border-slate-200 flex items-center justify-between px-6 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <MapPin className="w-6 h-6 text-blue-500" />
          <h1 className="text-xl font-bold text-slate-800 m-0">Mapa do Evento</h1>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === "view" ? "default" : "outline"}
            onClick={() => setViewMode("view")}
            className="flex items-center gap-1.5 text-sm px-4 py-2"
          >
            <Eye className="w-4 h-4" />
            Visualizar
          </Button>
          <Button
            variant={viewMode === "edit" ? "default" : "outline"}
            onClick={() => setViewMode("edit")}
            className="flex items-center gap-1.5 text-sm px-4 py-2"
          >
            <Edit className="w-4 h-4" />
            Editar
          </Button>
        </div>
      </div>
    </div>
  );
}