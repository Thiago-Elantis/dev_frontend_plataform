import { useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/overview/event-map/ui/dialog";
import { Button } from "@/components/overview/event-map/ui/button";
import { Input } from "@/components/overview/event-map/ui/input";
import { Badge } from "@/components/overview/event-map/ui/badge";
import { Search, Building, Phone, Mail } from "lucide-react";
import type { MapElementWithDetails } from "@/shared/schema";
import { mockCompanies } from "./data/mock-companies";

interface CompanyLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedElement: MapElementWithDetails | null;
  onElementUpdate: () => void;
}



export function CompanyLinkModal({
  isOpen,
  onClose,
  selectedElement,
  onElementUpdate
}: CompanyLinkModalProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCompanies = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return mockCompanies.filter(
      (c) =>
        c.name.toLowerCase().includes(query) ||
        c.description.toLowerCase().includes(query) ||
        c.category.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const handleLinkCompany = (companyId: number, companyName: string) => {
    if (!selectedElement) return;

    console.log("Linking company to element:", {
      elementId: selectedElement.id,
      companyId,
      companyName
    });

    onElementUpdate();
    onClose();
  };

  if (!selectedElement) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building className="w-5 h-5 text-blue-600" />
            Vincular Empresa ao {selectedElement.name}
          </DialogTitle>
          <DialogDescription>
            Selecione uma empresa para vincular ao elemento selecionado.
          </DialogDescription>
        </DialogHeader>

        {/* Campo de busca */}
        <div className="relative mb-4">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <Input
            type="text"
            placeholder="Buscar empresas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Lista de empresas */}
        <div className="flex-1 overflow-auto space-y-3 max-h-96">
          {filteredCompanies.length === 0 ? (
            <div className="text-center py-8">
              <Building className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-sm text-slate-500">Nenhuma empresa encontrada</p>
              <p className="text-xs text-slate-400 mt-1">Tente ajustar os termos de busca</p>
            </div>
          ) : (
            filteredCompanies.map((company) => (
              <div
                key={company.id}
                className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-slate-900 dark:text-slate-100">
                        {company.name}
                      </h4>
                      <Badge variant="secondary" className="text-xs">
                        {company.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                      {company.description}
                    </p>
                    <div className="space-y-1 text-xs text-slate-500 dark:text-slate-400">
                      <div className="flex items-center gap-2">
                        <Mail className="w-3 h-3" />
                        {company.email}
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-3 h-3" />
                        {company.phone}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="ml-4 mt-1"
                    onClick={() => handleLinkCompany(company.id, company.name)}
                  >
                    Vincular
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Rodapé */}
        <div className="flex justify-end gap-2 pt-4 border-t border-slate-200 dark:border-slate-700">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
