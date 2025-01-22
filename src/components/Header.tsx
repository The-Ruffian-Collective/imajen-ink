import { Sparkles } from 'lucide-react';

interface HeaderProps {
  textColor: string;
}

export function Header({ textColor }: HeaderProps) {
  return (
    <div className="text-center mb-12 pt-4">
      <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 mb-4 flex items-center justify-center gap-2 leading-tight">
        imajen°ink.AI 
        <span className="animate-pulse">
          <Sparkles className="w-8 h-8 text-pink-500 animate-[spin_4s_linear_infinite]" />
        </span>
      </h1>
      <p className={`${textColor} text-lg font-medium`}>
        Bring your vision to life with precision and style.
      </p>
    </div>
  );
}