import React from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { ChevronLeftIcon } from 'lucide-react';
import { LockButtonProps } from './types';


const LockButton: React.FC<LockButtonProps> = ({ 
  isLockedOpen, 
  toggleSidebarLock 
}) => {
  return (
    <button
      onClick={toggleSidebarLock}
      aria-label={isLockedOpen ? "Manter sidebar aberta" : "Liberar sidebar"}
      title={isLockedOpen ? "Manter sidebar aberta" : "Liberar sidebar"}
      className={clsx(
        "absolute bottom-4 right-3 w-8 h-8 flex items-center justify-center rounded-full border transition-colors",
        "backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
        isLockedOpen
          ? "bg-blue-500/20 border-blue-400"
          : "bg-slate-700/50 border-slate-600 hover:bg-slate-600"
      )}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isLockedOpen ? 0 : 180 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <ChevronLeftIcon
          className={clsx(
            "w-4 h-4 transition-colors",
            isLockedOpen ? "text-blue-400" : "text-gray-400"
          )}
        />
      </motion.div>
    </button>
  );
};

export default LockButton;