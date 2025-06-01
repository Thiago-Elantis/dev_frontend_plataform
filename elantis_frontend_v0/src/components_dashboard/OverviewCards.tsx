'use client';

import { Contact, Handshake, Trophy, CreditCard } from 'lucide-react';
import React from 'react';

interface CardData {
  title: string;
  value: number;
  change: string;
  icon: React.ReactNode;
  color: string;
}

export default function OverviewCards() {
  const cards: CardData[] = [
    {
      title: 'Contatos',
      value: 7265,
      change: '+11.01%',
      icon: <Contact className="w-5 h-5" />,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      title: 'Negócios',
      value: 3671,
      change: '-0.03%',
      icon: <Handshake className="w-5 h-5" />,
      color: 'bg-purple-100 text-purple-600',
    },
    {
      title: 'Ganhos',
      value: 156,
      change: '+15.03%',
      icon: <Trophy className="w-5 h-5" />,
      color: 'bg-amber-100 text-amber-600',
    },
    {
      title: 'Faturamento',
      value: 9999,
      change: '+6.08%',
      icon: <CreditCard className="w-5 h-5" />,
      color: 'bg-green-100 text-green-600',
    },
  ];

  const formatNumber = (num: number): string => {
    if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1) + 'B';
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + 'M';
    if (num >= 1_000) return (num / 1_000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card, idx) => {
        const isPositive = card.change.includes('+');
        const isNegative = card.change.includes('-');

        return (
          <div
            key={idx}
            className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">
                  {card.title}
                </h3>
                <p className="text-2xl font-bold text-gray-900">
                  {formatNumber(card.value)}
                </p>
              </div>
              <div className={`${card.color} p-2 rounded-lg`}>
                {card.icon}
              </div>
            </div>

            <div className="flex items-center mt-4">
              <span
                className={`text-sm font-medium ${
                  isPositive
                    ? 'text-green-600'
                    : isNegative
                    ? 'text-red-600'
                    : 'text-gray-600'
                }`}
              >
                {card.change}
              </span>
              <span className="ml-2 text-xs text-muted-foreground">vs. último mês</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
