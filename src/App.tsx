import React, { useState } from 'react';
import { ThemeToggle } from './components/ThemeToggle';
import { Header } from './components/Header';
import { PromptInput } from './components/PromptInput';
import { StylePresets } from './components/StylePresets';
import { GenerateButton } from './components/GenerateButton';
import { ImageOutput } from './components/ImageOutput';
import { STYLE_PRESETS } from './constants/stylePresets';

export default function App() {
  const [basePrompt, setBasePrompt] = useState('');
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const bgGradient = isDarkMode 
    ? "from-purple-900/80 via-indigo-900/80 to-pink-900/80" 
    : "from-purple-100 via-indigo-100 to-pink-100";

  const cardBg = isDarkMode 
    ? "bg-zinc-900/20" 
    : "bg-white/40";

  const textColor = isDarkMode 
    ? "text-purple-100" 
    : "text-purple-950";

  const buttonGradient = isDarkMode 
    ? "from-purple-600 to-pink-600" 
    : "from-purple-500 to-pink-500";

  const inputBg = isDarkMode 
    ? "bg-black/10" 
    : "bg-white/60";

  const placeholderColor = isDarkMode
    ? "placeholder-purple-300/50"
    : "placeholder-purple-900/50";

  const clearPrompt = () => {
    setBasePrompt('');
    setSelectedPreset(null);
  };

  const getFullPrompt = () => {
    if (!selectedPreset) return basePrompt;
    return STYLE_PRESETS[selectedPreset as keyof typeof STYLE_PRESETS].prompt(basePrompt);
  };

  const handleGenerate = async () => {
    if (!basePrompt.trim()) {
      setError('Please enter a prompt to generate an image');
      return;
    }

    setError(null);
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setGeneratedImage('/api/placeholder/800/600');
    setIsGenerating(false);
  };

  const handleDownload = () => {
    console.log('Downloading image...');
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${bgGradient}`}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <ThemeToggle 
          isDarkMode={isDarkMode} 
          onToggle={() => setIsDarkMode(!isDarkMode)} 
          cardBg={cardBg}
        />

        <Header textColor={textColor} />

        <div className={`${cardBg} backdrop-blur-lg rounded-xl p-6 mb-8 border border-zinc-800/10`}>
          <div className="space-y-4">
            <PromptInput
              basePrompt={basePrompt}
              onPromptChange={setBasePrompt}
              onClear={clearPrompt}
              inputBg={inputBg}
              textColor={textColor}
              placeholderColor={placeholderColor}
            />
            
            <StylePresets
              selectedPreset={selectedPreset}
              onPresetSelect={setSelectedPreset}
              textColor={textColor}
            />

            {selectedPreset && (
              <div className={`${inputBg} rounded-lg p-3 text-sm ${textColor} border border-zinc-800/10`}>
                <div className="font-medium mb-1">Final Prompt:</div>
                <div className="opacity-70">{getFullPrompt()}</div>
              </div>
            )}

            <div className="flex justify-end">
              <GenerateButton
                isGenerating={isGenerating}
                onClick={handleGenerate}
                buttonGradient={buttonGradient}
              />
            </div>
          </div>
          {error && (
            <p className="text-red-400 mt-2 text-sm">{error}</p>
          )}
        </div>

        <div className={`${cardBg} backdrop-blur-lg rounded-xl p-6 border border-zinc-800/10`}>
          <ImageOutput
            generatedImage={generatedImage}
            onRegenerate={handleGenerate}
            onDownload={handleDownload}
            prompt={getFullPrompt()}
            isDarkMode={isDarkMode}
            inputBg={inputBg}
            textColor={textColor}
          />
        </div>
      </div>
    </div>
  );
}