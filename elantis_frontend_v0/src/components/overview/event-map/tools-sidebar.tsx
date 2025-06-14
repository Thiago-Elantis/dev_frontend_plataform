import { Input } from "@/components/overview/event-map/ui/input";
import { Search, Store, Mic, Settings, Eye } from "lucide-react";
import { ToolsSidebarProps } from "./types";


export function ToolsSidebar({
  viewMode,
  selectedTool,
  setSelectedTool,
  tools,
  searchQuery,
  setSearchQuery,
  stands,
  talks,
  workshops,
  selectedElement,
  setSelectedElement,
}: ToolsSidebarProps) {
  return (
    <div className="w-[300px] bg-white/90 backdrop-blur-sm border-r border-slate-200 shadow-lg flex flex-col">
      {viewMode === "edit" && (
        <div className="p-6 border-b border-slate-200">
          <h4 className="text-sm font-medium text-slate-800 mb-3">Ferramentas</h4>
          <div className="grid grid-cols-3 gap-2">
            {tools.map((tool) => {
              const Icon = tool.icon;
              const isSelected = selectedTool === tool.id;
              return (
                <button
                  key={tool.id}
                  onClick={() => setSelectedTool(tool.id)}
                  className={`h-12 flex flex-col items-center justify-center gap-1 border rounded-lg transition-all text-xs font-medium ${
                    isSelected
                      ? "bg-blue-500 border-blue-500 text-white"
                      : "bg-white border-slate-200 text-slate-600"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tool.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="flex-1 p-6 overflow-y-auto">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium text-slate-800 m-0">Elementos do Mapa</h4>
          <Eye className="w-4 h-4 text-slate-400" />
        </div>

        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            type="text"
            placeholder="Buscar elementos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white/50 border-slate-200"
          />
        </div>

        {stands.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Store className="w-4 h-4 text-blue-500" />
              <span className="text-xs font-medium text-slate-500">
                Stands ({stands.length})
              </span>
            </div>
            {stands.map((element) => (
              <div
                key={element.id}
                onClick={() => setSelectedElement(element)}
                className={`px-3 py-2 rounded mb-1 text-xs cursor-pointer ${
                  selectedElement?.id === element.id
                    ? "bg-blue-100 border border-blue-300 text-slate-800"
                    : "bg-transparent border-transparent text-slate-700"
                }`}
              >
                {element.name}
              </div>
            ))}
          </div>
        )}

        {talks.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Mic className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-medium text-slate-500">
                Palestras ({talks.length})
              </span>
            </div>
            {talks.map((element) => (
              <div
                key={element.id}
                onClick={() => setSelectedElement(element)}
                className={`px-3 py-2 rounded mb-1 text-xs cursor-pointer ${
                  selectedElement?.id === element.id
                    ? "bg-amber-100 border border-amber-300 text-slate-800"
                    : "bg-transparent border-transparent text-slate-700"
                }`}
              >
                {element.name}
              </div>
            ))}
          </div>
        )}

        {workshops.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Settings className="w-4 h-4 text-green-500" />
              <span className="text-xs font-medium text-slate-500">
                Workshops ({workshops.length})
              </span>
            </div>
            {workshops.map((element) => (
              <div
                key={element.id}
                onClick={() => setSelectedElement(element)}
                className={`px-3 py-2 rounded mb-1 text-xs cursor-pointer ${
                  selectedElement?.id === element.id
                    ? "bg-green-100 border border-green-300 text-slate-800"
                    : "bg-transparent border-transparent text-slate-700"
                }`}
              >
                {element.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}