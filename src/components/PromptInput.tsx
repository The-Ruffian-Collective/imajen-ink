import React from 'react';
import { X } from 'lucide-react';

interface PromptInputProps {
  basePrompt: string;
  onPromptChange: (value: string) => void;
  onClear: () => void;
  inputBg: string;
  textColor: string;
  placeholderColor: string;
}

export function PromptInput({ 
  basePrompt, 
  onPromptChange, 
  onClear,
  inputBg,
  textColor,
  placeholderColor
}: PromptInputProps) {
  return (
    <div className="relative">
      <input
        type="text"
        value={basePrompt}
        onChange={(e) => onPromptChange(e.target.value)}
        placeholder="What do you want to create today? Describe it in your own words..."
        className={`w-full ${inputBg} ${textColor} ${placeholderColor} rounded-lg px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-500/30 border border-zinc-800/10`}
      />
      {basePrompt && (
        <button
          onClick={onClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-purple-500/10 transition-colors"
        >
          <X className="w-4 h-4 text-purple-500/70" />
        </button>
      )}
    </div>
  );
}