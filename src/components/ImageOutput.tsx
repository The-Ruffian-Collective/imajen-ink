import { RefreshCw, Download, Camera } from 'lucide-react';

interface ImageOutputProps {
  generatedImage: string | null;
  onRegenerate: () => void;
  onDownload: () => void;
  prompt: string;
  isDarkMode: boolean;
  inputBg: string;
  textColor: string;
}

export function ImageOutput({ 
  generatedImage, 
  onRegenerate, 
  onDownload, 
  prompt,
  isDarkMode,
  inputBg,
  textColor
}: ImageOutputProps) {
  if (!generatedImage) {
    return (
      <div className="h-96 flex items-center justify-center">
        <div className="text-center">
          <Camera className={`w-12 h-12 mx-auto mb-4 ${isDarkMode ? 'text-purple-300/70' : 'text-purple-700/50'}`} />
          <p className={`${isDarkMode ? 'text-purple-300/90' : 'text-purple-800/70'} font-medium`}>
            Your generated image will appear here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative group">
        <img
          src={generatedImage}
          alt="Generated artwork"
          className="w-full h-full rounded-lg object-cover"
        />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-4">
          <button
            onClick={onRegenerate}
            className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors"
          >
            <RefreshCw className="w-6 h-6" />
          </button>
          <button
            onClick={onDownload}
            className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors"
          >
            <Download className="w-6 h-6" />
          </button>
        </div>
      </div>
      <div className={`${inputBg} rounded-lg p-4 border border-zinc-800/10`}>
        <h3 className={`${textColor} font-medium mb-2`}>Prompt</h3>
        <p className={isDarkMode ? 'text-purple-200/90' : 'text-purple-900/90'}>
          {prompt}
        </p>
      </div>
    </div>
  );
}