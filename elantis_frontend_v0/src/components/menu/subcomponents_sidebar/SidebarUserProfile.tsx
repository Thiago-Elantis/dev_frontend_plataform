
import React from 'react';
import { UserProfileProps } from './types';

const UserProfile: React.FC<UserProfileProps> = ({ isOpen }) => {
  return (
    <div className="mt-auto pt-4 border-t border-slate-700/50">
      <div className="flex items-center p-2 rounded-lg hover:bg-slate-700/50 transition-colors cursor-pointer">
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
          U
        </div>
        {isOpen && (
          <div className="ml-3">
            <p className="text-sm font-medium text-white">Usuário</p>
            <p className="text-xs text-gray-400">Admin</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;