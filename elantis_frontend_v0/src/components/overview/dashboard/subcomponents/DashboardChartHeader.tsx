import { CategoryFilterProps, ChartHeaderProps } from "./types";


export function CategoryFilter<T extends string>({
  categories,
  selected,
  onSelect,
}: CategoryFilterProps<T>) {
  return (
    <div className="flex flex-wrap gap-2 text-xs">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-3 py-1 rounded-full border transition ${
            selected === cat
              ? 'bg-indigo-600 text-white shadow'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}


export function ChartHeader({ title, subtitle }: ChartHeaderProps) {
  return (
    <div>
      <h4 className="text-md font-bold text-gray-800">{title}</h4>
      {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
    </div>
  );
}
