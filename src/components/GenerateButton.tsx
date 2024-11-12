import React from 'react';
import { Camera, Loader2 } from 'lucide-react';

interface GenerateButtonProps {
  isGenerating: boolean;
  onClick: () => void;
  buttonGradient: string;
}

export function GenerateButton({ isGenerating, onClick, buttonGradient }: GenerateButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={isGenerating}
      className={`bg-gradient-to-r ${buttonGradient} text-white/90 px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2`}
    >
      {isGenerating ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Camera className="w-5 h-5" />
          Let's make magic!
        </>
      )}
    </button>
  );
}