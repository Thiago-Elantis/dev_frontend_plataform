"use client";

import { Trophy } from 'lucide-react';

interface Seller {
  name: string;
  contatos: number;
  reunioes: number;
  ganhos: number;
}

export default function TopSellersRanking() {
  const sellers: Seller[] = [
    { name: 'Ana Souza', contatos: 128, reunioes: 34, ganhos: 12 },
    { name: 'Carlos Lima', contatos: 112, reunioes: 29, ganhos: 9 },
    { name: 'João Melo', contatos: 87, reunioes: 21, ganhos: 7 },
    { name: 'João Melo', contatos: 90, reunioes: 81, ganhos: 6 },
    { name: 'Maria Silva', contatos: 78, reunioes: 18, ganhos: 5 },
    { name: 'Lucas Martins', contatos: 70, reunioes: 15, ganhos: 4 },
    { name: 'Fernanda Rocha', contatos: 65, reunioes: 13, ganhos: 3 },
    { name: 'Bruno Nunes', contatos: 60, reunioes: 12, ganhos: 2 },
    { name: 'Patrícia Souza', contatos: 55, reunioes: 11, ganhos: 1 },
  ].sort((a, b) => b.ganhos - a.ganhos);

  const rankColors = [
    'border-l-amber-500',
    'border-l-slate-400',
    'border-l-amber-700',
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md h-full">
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="w-5 h-5 text-amber-500" />
        <h4 className="text-lg font-semibold text-gray-800">Ranking de Vendedores</h4>
      </div>

      <div className="max-h-[400px] overflow-y-auto pr-2">
        <ul className="space-y-3">
          {sellers.map((seller, index) => (
            <li
              key={index}
              className={`
                flex flex-col md:flex-row justify-between p-3 rounded-lg transition-all
                hover:bg-gray-50 border-l-4 ${rankColors[index] || 'border-l-gray-200'}
              `}
            >
              <div className="flex items-center gap-2 mb-1 md:mb-0">
                <span className="font-medium flex items-center">
                  <span className="inline-block w-6 h-6 text-center text-xs bg-gray-100 rounded-full mr-2 flex items-center justify-center">
                    {index + 1}
                  </span>
                  {seller.name}
                </span>

                {index === 0 && (
                  <span className="bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded-full">
                    TOP SELLER
                  </span>
                )}
              </div>

              <div className="grid grid-cols-3 gap-4 text-xs">
                <div className="flex flex-col items-center">
                  <span className="text-gray-500">Contatos</span>
                  <span className="font-medium">{seller.contatos}</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-gray-500">Reuniões</span>
                  <span className="font-medium">{seller.reunioes}</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-gray-500">Ganhos</span>
                  <span className="font-medium text-green-600">{seller.ganhos}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
