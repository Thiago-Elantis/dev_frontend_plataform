import { useState, useEffect } from "react";
import { InventoryItem } from "@/types/inventory";
import { FiMap, FiX } from "react-icons/fi";

interface InventoryModalProps {
  item: InventoryItem | null;
  onClose: () => void;
  onSave: (itemData: InventoryItem) => void;
  onMapSelect: () => void;
}

export default function InventoryModal({
  item,
  onClose,
  onSave,
  onMapSelect,
}: InventoryModalProps) {
  const [formData, setFormData] = useState<Omit<InventoryItem, "id">>({
    name: "",
    type: "Estande",
    category: "",
    quantity: 1,
    status: "disponivel",
    description: "",
  });

  useEffect(() => {
    if (item) {
      setFormData(item);
    } else {
      setFormData({
        name: "",
        type: "Estande",
        category: "",
        quantity: 1,
        status: "disponivel",
        description: "",
      });
    }
  }, [item]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const itemData: InventoryItem = {
      ...formData,
      id: item?.id || Date.now().toString(),
    };
    onSave(itemData);
  };

  return (
    <div className="fixed top-16 inset-0 flex justify-end z-50 pointer-events-none">
      {/* Painel lateral */}
      <div className="bg-white w-full max-w-xl h-full shadow-xl border-l border-gray-200 overflow-y-auto pointer-events-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">
            {item ? "Editar Item" : "Novo Item"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Fechar"
          >
            <FiX size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Nome</label>
              <input
                type="text"
                name="name"
                className="mt-1 w-full border rounded-lg px-3 py-2 text-sm"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Tipo</label>
                <select
                  name="type"
                  className="mt-1 w-full border rounded-lg px-3 py-2 text-sm"
                  value={formData.type}
                  onChange={handleChange}
                >
                  <option value="Estande">Estande</option>
                  <option value="Palestra">Palestra</option>
                  <option value="Patrocinio">Patrocínio</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium">Categoria</label>
                <input
                  type="text"
                  name="category"
                  className="mt-1 w-full border rounded-lg px-3 py-2 text-sm"
                  value={formData.category}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium">Quantidade</label>
                <input
                  type="number"
                  name="quantity"
                  className="mt-1 w-full border rounded-lg px-3 py-2 text-sm"
                  value={formData.quantity}
                  onChange={handleNumberChange}
                  min="1"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium">Status</label>
                <select
                  name="status"
                  className="mt-1 w-full border rounded-lg px-3 py-2 text-sm"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="disponivel">Disponível</option>
                  <option value="reservado">Reservado</option>
                  <option value="ocupado">Ocupado</option>
                  <option value="manutencao">Manutenção</option>
                </select>
              </div>

              {formData.type === "Patrocinio" && (
                <div className="md:col-span-2">
                  <label className="text-sm font-medium">Patrocinador</label>
                  <input
                    type="text"
                    name="sponsor"
                    className="mt-1 w-full border rounded-lg px-3 py-2 text-sm"
                    value={formData.sponsor || ""}
                    onChange={handleChange}
                  />
                </div>
              )}
            </div>

            <div>
              <label className="text-sm font-medium">Descrição</label>
              <textarea
                name="description"
                rows={3}
                className="mt-1 w-full border rounded-lg px-3 py-2 text-sm"
                value={formData.description || ""}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Imagem</label>
              <input
                type="file"
                className="mt-1 w-full border rounded-lg px-3 py-2 text-sm"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      setFormData((prev) => ({
                        ...prev,
                        image: event.target?.result as string,
                      }));
                    };
                    reader.readAsDataURL(e.target.files[0]);
                  }
                }}
              />
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t">
            <button
              type="button"
              onClick={onMapSelect}
              className="flex items-center text-sm px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              <FiMap className="mr-2" />
              Vincular ao Mapa
            </button>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg text-sm bg-gray-200 hover:bg-gray-300 text-gray-700"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg text-sm bg-blue-600 hover:bg-blue-700 text-white"
              >
                Salvar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
