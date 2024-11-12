import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  isDarkMode: boolean;
  onToggle: () => void;
  cardBg: string;
}

export function ThemeToggle({ isDarkMode, onToggle, cardBg }: ThemeToggleProps) {
  return (
    <div className="absolute top-4 right-4">
      <button
        onClick={onToggle}
        className={`p-2 rounded-full ${cardBg} backdrop-blur-sm transition-colors opacity-60 hover:opacity-100`}
      >
        {isDarkMode ? (
          <Sun className="w-4 h-4 text-amber-200" />
        ) : (
          <Moon className="w-4 h-4 text-purple-700" />
        )}
      </button>
    </div>
  );
}