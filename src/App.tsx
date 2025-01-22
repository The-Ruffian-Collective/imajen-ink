import { useState } from 'react';
import { ThemeToggle } from './components/ThemeToggle';
import { Header } from './components/Header';
import { PromptInput } from './components/PromptInput';
import { StylePresets } from './components/StylePresets';
import { GenerateButton } from './components/GenerateButton';
import { ImageOutput } from './components/ImageOutput';
import { Sidebar } from './components/Sidebar';
import { STYLE_PRESETS } from './constants/stylePresets';

export default function App() {
    const [basePrompt, setBasePrompt] = useState('');
    const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedImages, setGeneratedImages] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const getFullPrompt = () => {
        if (!selectedPreset) return basePrompt;
        return STYLE_PRESETS[selectedPreset as keyof typeof STYLE_PRESETS].prompt(basePrompt);
    };

    const generatePollinationsUrl = (prompt: string): string => {
        const encodedPrompt = encodeURIComponent(prompt);
        return `https://image.pollinations.ai/prompt/${encodedPrompt}`;
    };

    const handleGenerate = async () => {
        if (!basePrompt.trim()) {
            setError('Please enter a prompt to generate an image');
            return;
        }

        setError(null);
        setIsGenerating(true);
        
        try {
            const fullPrompt = getFullPrompt();
            const imageUrl = generatePollinationsUrl(fullPrompt);
            setGeneratedImages([imageUrl]);

            const img = new Image();
            img.onload = () => {
                setIsGenerating(false);
            };
            img.onerror = () => {
                throw new Error('Failed to generate image');
            };
            img.src = imageUrl;
            
        } catch (err) {
            setError('Failed to generate image. Please try again.');
            setIsGenerating(false);
        }
    };

    const handleRegenerate = () => {
        handleGenerate();
    };

    const handleDownload = () => {
        if (generatedImages.length > 0) {
            const link = document.createElement('a');
            link.href = generatedImages[0];
            link.download = 'generated-image.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (
        <div className={`min-h-screen bg-gradient-to-br ${isDarkMode ? "from-purple-900/80 via-indigo-900/80 to-pink-900/80" : "from-purple-100 via-indigo-100 to-pink-100"}`}>
            <div className="max-w-4xl mx-auto px-4 py-8">
                <ThemeToggle isDarkMode={isDarkMode} onToggle={() => setIsDarkMode(!isDarkMode)} cardBg={isDarkMode ? "bg-zinc-900/20" : "bg-white/40"} />
                <Header textColor={isDarkMode ? "text-purple-100" : "text-purple-950"} />
                <button onClick={() => setIsSidebarOpen(true)} className="mb-4">Help</button>
                <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
                <div className={`${isDarkMode ? "bg-zinc-900/20" : "bg-white/40"} backdrop-blur-lg rounded-xl p-6 mb-8 border border-zinc-800/10`}>
                    <div className="space-y-4">
                        <PromptInput basePrompt={basePrompt} onPromptChange={setBasePrompt} onClear={() => { setBasePrompt(''); setSelectedPreset(null); }} inputBg={isDarkMode ? "bg-black/10" : "bg-white/60"} textColor={isDarkMode ? "text-purple-100" : "text-purple-950"} placeholderColor={isDarkMode ? "placeholder-purple-300/50" : "placeholder-purple-900/50"} />
                        <StylePresets selectedPreset={selectedPreset} onPresetSelect={setSelectedPreset} textColor={isDarkMode ? "text-purple-100" : "text-purple-950"} />
                        {selectedPreset && (
                            <div className={`${isDarkMode ? "bg-black/10" : "bg-white/60"} rounded-lg p-3 text-sm ${isDarkMode ? "text-purple-100" : "text-purple-950"} border border-zinc-800/10`}>
                                <div className="font-medium mb-1">Final Prompt:</div>
                                <div className="opacity-70">{getFullPrompt()}</div>
                            </div>
                        )}
                        <div className="flex justify-end">
                            <GenerateButton isGenerating={isGenerating} onClick={handleGenerate} buttonGradient={isDarkMode ? "from-purple-600 to-pink-600" : "from-purple-500 to-pink-500"} />
                        </div>
                        {error && <p className="text-red-400 mt-2 text-sm">{error}</p>}
                    </div>
                </div>
                <div className={`${isDarkMode ? "bg-zinc-900/20" : "bg-white/40"} backdrop-blur-lg rounded-xl p-6 border border-zinc-800/10`}>
                    <ImageOutput 
                        generatedImage={generatedImages.length > 0 ? generatedImages[0] : null} 
                        onRegenerate={handleRegenerate} 
                        onDownload={handleDownload} 
                        prompt={getFullPrompt()} 
                        isDarkMode={isDarkMode} 
                        inputBg={isDarkMode ? "bg-black/10" : "bg-white/60"} 
                        textColor={isDarkMode ? "text-purple-100" : "text-purple-950"} 
                    />
                </div>
            </div>
        </div>
    );
}