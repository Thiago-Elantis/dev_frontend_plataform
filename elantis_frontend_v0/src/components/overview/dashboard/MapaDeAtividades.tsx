"use client";

import React, { useState } from "react";
import { CalendarDays } from "lucide-react";

// Tipos
type NivelUsuario = "membro" | "membro+" | "admin";

interface TarefaDia {
  dia: string;
  tarefas: number;
  detalhado: { usuario: string; tarefas: number }[];
}

// Dados simulados
const dadosAtividades: TarefaDia[] = [
  { dia: "Seg", tarefas: 5, detalhado: [{ usuario: "Ana", tarefas: 2 }, { usuario: "João", tarefas: 3 }] },
  { dia: "Ter", tarefas: 9, detalhado: [{ usuario: "Ana", tarefas: 4 }, { usuario: "João", tarefas: 5 }] },
  { dia: "Qua", tarefas: 3, detalhado: [{ usuario: "Ana", tarefas: 1 }, { usuario: "João", tarefas: 2 }] },
  { dia: "Qui", tarefas: 7, detalhado: [{ usuario: "Ana", tarefas: 4 }, { usuario: "João", tarefas: 3 }] },
  { dia: "Sex", tarefas: 4, detalhado: [{ usuario: "Ana", tarefas: 1 }, { usuario: "João", tarefas: 3 }] },
];

export default function MapaDeAtividades({
  nivelUsuario,
  usuarioLogado,
}: {
  nivelUsuario: NivelUsuario;
  usuarioLogado: string;
}) {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  // Dados adaptados com base no nível de acesso
  const atividadesFiltradas = dadosAtividades.map((item) => {
    if (nivelUsuario === "membro") {
      const tarefaUsuario = item.detalhado.find((t) => t.usuario === usuarioLogado);
      return {
        dia: item.dia,
        tarefas: tarefaUsuario ? tarefaUsuario.tarefas : 0,
        detalhado: tarefaUsuario ? [tarefaUsuario] : [],
      };
    }
    return item;
  });

  const maxTarefas = Math.max(...atividadesFiltradas.map((item) => item.tarefas), 1);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
      <div className="flex items-center mb-5">
        <CalendarDays className="text-indigo-600 mr-3 size-5" />
        <h4 className="text-lg font-bold text-gray-800">Mapa de Atividades</h4>
      </div>

      <ul className="space-y-4">
        {atividadesFiltradas.map((item, idx) => {
          const percentage = Math.round((item.tarefas / maxTarefas) * 100);
          const isSelected = selectedDay === idx;

          return (
            <li
              key={idx}
              className="group"
              onMouseEnter={() => setSelectedDay(idx)}
              onMouseLeave={() => setSelectedDay(null)}
            >
              <div className="flex items-center justify-between mb-1">
                <span
                  className={`text-sm font-medium transition-colors ${
                    isSelected ? "text-indigo-600" : "text-gray-600"
                  }`}
                >
                  {item.dia}
                </span>
                <span
                  className={`text-xs font-semibold ${
                    isSelected ? "text-indigo-600" : "text-gray-500"
                  }`}
                >
                  {item.tarefas} tarefa{item.tarefas !== 1 && "s"}
                </span>
              </div>

              <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full transition-all duration-500 ease-out rounded-full"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: isSelected
                      ? "oklch(57.5% 0.23 276.5)"
                      : "oklch(50% 0.23 276.5)",
                  }}
                />
              </div>

              {/* Exibe tarefas detalhadas */}
              {isSelected && item.detalhado?.length > 0 && (
                <ul className="mt-2 pl-2 border-l-2 border-indigo-200 space-y-1">
                  {item.detalhado.map((det, i) => (
                    <li key={i} className="text-xs text-gray-600 flex justify-between pr-2">
                      <span>{det.usuario}</span>
                      <span>{det.tarefas}</span>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>

      <div className="mt-5 pt-4 border-t border-gray-100">
        <div className="flex justify-between text-xs text-gray-500">
          <span>Menos tarefas</span>
          <span>Mais tarefas</span>
        </div>
        <div className="mt-1.5 h-1.5 w-full bg-gradient-to-r from-gray-100 via-indigo-300 to-indigo-500 rounded-full" />
      </div>
    </div>
  );
}
