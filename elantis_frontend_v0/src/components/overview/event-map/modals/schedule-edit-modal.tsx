import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/overview/event-map/ui/dialog";
import { Button } from "@/components/overview/event-map/ui/button";
import { Input } from "@/components/overview/event-map/ui/input";
import { Label } from "@/components/overview/event-map/ui/label";
import { MapElement } from "../types";
import { useState } from "react";

interface ScheduleEditModalProps {
  element: MapElement;
  onSave: (updatedElement: MapElement) => void;
  onCancel: () => void;
}

export function ScheduleEditModal({ element, onSave, onCancel }: ScheduleEditModalProps) {
  const [schedules, setSchedules] = useState([...element.schedules || []]);

  const handleAddSchedule = () => {
    setSchedules([...schedules, { date: "", startTime: "", endTime: "" }]);
  };

  const handleRemoveSchedule = (index: number) => {
    const newSchedules = [...schedules];
    newSchedules.splice(index, 1);
    setSchedules(newSchedules);
  };

  const handleScheduleChange = (index: number, field: string, value: string) => {
    const newSchedules = [...schedules];
    newSchedules[index] = { ...newSchedules[index], [field]: value };
    setSchedules(newSchedules);
  };

  const handleSave = () => {
    const updatedElement = { ...element, schedules };
    onSave(updatedElement);
  };

  return (
    <Dialog open onOpenChange={onCancel}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Editar Horários</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {schedules.map((schedule, index) => (
            <div key={index} className="space-y-2 border p-4 rounded">
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <Label htmlFor={`date-${index}`}>Data</Label>
                  <Input
                    id={`date-${index}`}
                    type="date"
                    value={schedule.date}
                    onChange={(e) => handleScheduleChange(index, "date", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor={`startTime-${index}`}>Início</Label>
                  <Input
                    id={`startTime-${index}`}
                    type="time"
                    value={schedule.startTime}
                    onChange={(e) => handleScheduleChange(index, "startTime", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor={`endTime-${index}`}>Fim</Label>
                  <Input
                    id={`endTime-${index}`}
                    type="time"
                    value={schedule.endTime}
                    onChange={(e) => handleScheduleChange(index, "endTime", e.target.value)}
                  />
                </div>
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleRemoveSchedule(index)}
                className="mt-2"
              >
                Remover
              </Button>
            </div>
          ))}
          <Button variant="outline" onClick={handleAddSchedule} className="w-full">
            Adicionar Horário
          </Button>
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