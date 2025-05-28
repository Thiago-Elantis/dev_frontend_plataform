import { GrowthItem } from '@/types';

interface GrowthListProps {
  title: string;
  items: GrowthItem[];
  color: string;
}

export default function GrowthList({ title, items, color }: GrowthListProps) {
  return (
    <div>
      <h3 className="text-md font-medium text-gray-700 mb-3">{title}</h3>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="text-sm text-gray-600">{item.year}</span>
            <span className={`text-sm font-medium ${color}`}>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}