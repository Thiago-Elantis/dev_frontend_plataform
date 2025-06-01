"use client";

import React from "react";
import { Users } from "lucide-react";

const equipe = [
  { nome: "Ana Paula", tarefas: 12 },
  { nome: "Carlos Silva", tarefas: 9 },
  { nome: "Julia Mendes", tarefas: 14 },
  { nome: "Rafael Lima", tarefas: 7 },
];

export default function ResumoTarefasEquipe() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <div className="flex items-center mb-4">
        <Users className="text-gray-500 mr-2" />
        <h4 className="text-lg font-semibold text-gray-800">Resumo de Tarefas da Equipe</h4>
      </div>
      <ul className="space-y-2">
        {equipe.map((membro, idx) => (
          <li key={idx} className="flex justify-between text-sm text-gray-700">
            <span>{membro.nome}</span>
            <span>{membro.tarefas} tarefas</span>
          </li>
        ))}
      </ul>
    </div>
  );
}