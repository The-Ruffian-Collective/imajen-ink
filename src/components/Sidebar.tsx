// import React from 'react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50">
      <div className="absolute top-0 left-0 w-64 h-full bg-white p-4 shadow-lg">
        <button onClick={onClose} className="text-black">Close</button>
        <h2 className="text-lg font-bold mb-4">Getting Started</h2>
        <ol className="list-decimal pl-5">
          <li className="mb-2">
            <strong>Describe Your Vision:</strong> Start with a clear description of what you want to create.
          </li>
          <li className="mb-2">
            <strong>Choose Your Style:</strong> Select a style preset to enhance your image.
          </li>
          <li>
            <strong>Generate Magic:</strong> Hit generate and watch your idea come to life.
          </li>
        </ol>
      </div>
    </div>
  );
}
