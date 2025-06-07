import { ResumoProps } from "./types";

export function Resumo({ label, value, percentage, color }: ResumoProps) {
  const valueColor = color || "text-gray-800";

  return (
    <div className="bg-gray-50 px-3 py-2 rounded-lg border border-gray-100 text-center">
      <p className="text-xs text-gray-500 truncate">{label}</p>
      <p className={`text-md font-bold ${valueColor}`}>{value}</p>
      {percentage !== undefined && (
        <div className="text-xs text-gray-500">{percentage}% do total</div>
      )}
    </div>
  );
}