// ToolContext.tsx
"use client";
import { createContext, useContext } from "react";

type ToolContextType = {
  selectedTool: string;
  viewMode: "view" | "edit";
  isEditMode: boolean;
};

const ToolContext = createContext<ToolContextType | null>(null);

export const ToolProvider = ({ children, ...value }: { children: React.ReactNode } & ToolContextType) => (
  <ToolContext.Provider value={value}>{children}</ToolContext.Provider>
);

export const useToolContext = () => {
  const context = useContext(ToolContext);
  if (!context) throw new Error("useToolContext must be used within ToolProvider");
  return context;
};
