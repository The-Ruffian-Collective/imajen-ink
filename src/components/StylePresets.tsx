import React from 'react';
import { STYLE_PRESETS } from '../constants/stylePresets';

interface StylePresetsProps {
  selectedPreset: string | null;
  onPresetSelect: (preset: string | null) => void;
  textColor: string;
}

export function StylePresets({ selectedPreset, onPresetSelect, textColor }: StylePresetsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
      {Object.entries(STYLE_PRESETS).map(([key, preset]) => (
        <button
          key={key}
          onClick={() => onPresetSelect(selectedPreset === key ? null : key)}
          className={`p-3 rounded-lg text-sm transition-all ${
            selectedPreset === key
              ? 'bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/30'
              : 'hover:bg-purple-500/5 border-transparent'
          } border ${textColor} text-left`}
        >
          <div className="font-medium mb-1">{preset.name}</div>
          <div className="text-xs opacity-70 line-clamp-2">{preset.description}</div>
        </button>
      ))}
    </div>
  );
}