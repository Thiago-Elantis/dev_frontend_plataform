import { Button } from "@/components/overview/event-map/ui/button";
import { Calendar, Building, Clock, Edit3, Trash2, Store, Mic, Settings } from "lucide-react";
import { PropertiesSidebarProps } from "./types";


export function PropertiesSidebar({
  selectedElement,
  viewMode,
  setShowCompanyModal,
  setShowScheduleModal,
  setEditingElement,
  deleteElement,
}: PropertiesSidebarProps) {
  return (
    <div className="w-[320px] bg-white/90 backdrop-blur-sm border-l border-slate-200 shadow-lg flex flex-col">
      <div className="p-6 border-b border-slate-200 bg-slate-50/50">
        <div className="flex items-center gap-3">
          {selectedElement ? (
            <>
              {selectedElement.type === "stand" && (
                <Store className="w-4 h-4 text-blue-500" />
              )}
              {selectedElement.type === "talk" && (
                <Mic className="w-4 h-4 text-amber-500" />
              )}
              {selectedElement.type === "workshop" && (
                <Settings className="w-4 h-4 text-green-500" />
              )}
              <div>
                <h3 className="text-sm font-semibold text-slate-800 mb-1">
                  Propriedades
                </h3>
                <p className="text-xs text-slate-500 m-0">
                  {selectedElement.type === "stand"
                    ? "Stand selecionado"
                    : selectedElement.type === "talk"
                    ? "Palestra selecionada"
                    : "Workshop selecionado"}
                </p>
              </div>
            </>
          ) : (
            <>
              <Edit3 className="w-4 h-4 text-slate-400" />
              <div>
                <h3 className="text-sm font-semibold text-slate-800 mb-1">
                  Propriedades
                </h3>
                <p className="text-xs text-slate-500 m-0">
                  Nenhum elemento selecionado
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="flex-1 p-6 overflow-y-auto">
        {selectedElement ? (
          <div className="flex flex-col gap-6">
            {/* Basic Info */}
            <div>
              <h4 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Informações Básicas
              </h4>
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <div className="mb-2">
                  <span className="text-xs text-slate-500">Nome:</span>
                  <div className="text-sm font-medium text-slate-800">
                    {selectedElement.name}
                  </div>
                </div>
                <div className="mb-2">
                  <span className="text-xs text-slate-500">Tipo:</span>
                  <div className="text-sm font-medium text-slate-800">
                    {selectedElement.type === "stand"
                      ? "Stand"
                      : selectedElement.type === "talk"
                      ? "Palestra"
                      : "Workshop"}
                  </div>
                </div>
                {selectedElement.price && (
                  <div>
                    <span className="text-xs text-slate-500">Preço:</span>
                    <div className="text-sm font-semibold text-green-600">
                      R$ {selectedElement.price.toFixed(2)}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Company Info */}
            {!["line", "circle", "triangle", "box"].includes(
              selectedElement.type
            ) && (
              <div>
                <h4 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
                  <Building className="w-4 h-4" />
                  Empresa Responsável
                </h4>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Building className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-800">
                      {selectedElement.company}
                    </span>
                  </div>
                  {selectedElement.description && (
                    <p className="text-xs text-blue-800 m-0">
                      {selectedElement.description}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Schedule Info for talks and workshops */}
            {(selectedElement.type === "talk" ||
              selectedElement.type === "workshop") &&
              selectedElement.schedules && (
                <div>
                  <h4 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Horários
                  </h4>
                  <div className="flex flex-col gap-2">
                    {selectedElement.schedules.map((schedule: any, index: number) => (
                      <div
                        key={index}
                        className="bg-green-50 border border-green-200 rounded p-3 text-xs"
                      >
                        <div className="font-medium text-green-800 mb-1">
                          {schedule.date}
                        </div>
                        <div className="text-green-700">
                          {schedule.startTime} - {schedule.endTime}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            {/* Action Buttons */}
            {viewMode === "edit" && (
              <div className="flex flex-col gap-2 pt-4 border-t border-slate-200">
                {!["line", "circle", "triangle", "box"].includes(
                  selectedElement.type
                ) && (
                  <>
                    <Button
                      variant="outline"
                      onClick={() => setShowCompanyModal(true)}
                      className="w-full text-sm flex items-center justify-center gap-2"
                    >
                      <Building className="w-4 h-4" />
                      Editar Empresa
                    </Button>
                    {(selectedElement.type === "talk" ||
                      selectedElement.type === "workshop") && (
                      <Button
                        variant="outline"
                        onClick={() => {
                          setEditingElement(selectedElement);
                          setShowScheduleModal(true);
                        }}
                        className="w-full text-sm flex items-center justify-center gap-2"
                      >
                        <Clock className="w-4 h-4" />
                        Editar Horários
                      </Button>
                    )}
                  </>
                )}
                <Button
                  variant="destructive"
                  onClick={() => deleteElement(selectedElement.id)}
                  className="w-full text-sm flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Excluir Elemento
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center h-48 text-center">
            <div>
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Edit3 className="w-6 h-6 text-slate-400" />
              </div>
              <p className="text-sm font-medium text-slate-500 mb-1">
                Selecione um elemento
              </p>
              <p className="text-xs text-slate-400 m-0">
                Clique em um elemento no mapa para ver suas propriedades
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}