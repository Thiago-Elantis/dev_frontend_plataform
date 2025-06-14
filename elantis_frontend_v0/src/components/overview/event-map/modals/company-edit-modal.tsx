import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/overview/event-map/ui/dialog";
import { Button } from "@/components/overview/event-map/ui/button";
import { Input } from "@/components/overview/event-map/ui/input";
import { Label } from "@/components/overview/event-map/ui/label";
import { MapElement } from "../types";
import { useState } from "react";

interface CompanyEditModalProps {
  element: MapElement;
  onSave: (updatedElement: MapElement) => void;
  onCancel: () => void;
}

export function CompanyEditModal({ element, onSave, onCancel }: CompanyEditModalProps) {
  const [name, setName] = useState(element.name);
  const [company, setCompany] = useState(element.company || "");
  const [description, setDescription] = useState(element.description || "");
  const [price, setPrice] = useState(element.price || 0);

  const handleSave = () => {
    const updatedElement = {
      ...element,
      name,
      company,
      description,
      price,
    };
    onSave(updatedElement);
  };

  return (
    <Dialog open onOpenChange={onCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Empresa</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nome
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="company" className="text-right">
              Empresa
            </Label>
            <Input
              id="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Descrição
            </Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Preço
            </Label>
            <Input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="col-span-3"
            />
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>Salvar</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}