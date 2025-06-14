'use client';

import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';
import Card from './Card';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: {
    value: string | number;
    type: 'increase' | 'decrease' | 'neutral';
  };
  icon?: LucideIcon;
  iconColor?: string;
  subtitle?: string;
  children?: ReactNode;
}

export default function MetricCard({
  title,
  value,
  change,
  icon: Icon,
  iconColor = 'text-blue-600',
  subtitle,
  children
}: MetricCardProps) {
  const getChangeColor = (type: 'increase' | 'decrease' | 'neutral') => {
    switch (type) {
      case 'increase':
        return 'text-green-600';
      case 'decrease':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getChangeIcon = (type: 'increase' | 'decrease' | 'neutral') => {
    switch (type) {
      case 'increase':
        return '↑';
      case 'decrease':
        return '↓';
      default:
        return '→';
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-600">{title}</p>
            {Icon && (
              <div className={`p-2 rounded-lg bg-gray-50 ${iconColor}`}>
                <Icon className="w-5 h-5" />
              </div>
            )}
          </div>
          
          <div className="space-y-1">
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            
            {change && (
              <div className="flex items-center space-x-1">
                <span className={`text-sm font-medium ${getChangeColor(change.type)}`}>
                  {getChangeIcon(change.type)} {change.value}
                </span>
                {subtitle && (
                  <span className="text-sm text-gray-500">vs {subtitle}</span>
                )}
              </div>
            )}
          </div>
          
          {children && (
            <div className="mt-3">
              {children}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}