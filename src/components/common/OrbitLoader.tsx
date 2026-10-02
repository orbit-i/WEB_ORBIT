import React from 'react';
import { Sparkles } from 'lucide-react';

interface OrbitLoaderProps {
  label?: string;
  size?: 'sm' | 'md' | 'lg' | 'fullscreen';
}

export const OrbitLoader: React.FC<OrbitLoaderProps> = ({
  label = 'Loading ORBIT-I Universe...',
  size = 'fullscreen',
}) => {
  const isFullscreen = size === 'fullscreen';

  const loaderContent = (
    <div className="flex flex-col items-center justify-center gap-4 select-none">
      {/* Cute Animated Orbiting Rings */}
      <div className="relative w-20 h-20 flex items-center justify-center">
        {/* Outer Glow Halo */}
        <div className="absolute inset-0 rounded-full bg-blue-500/15 blur-lg animate-pulse" />

        {/* Outer Orbital Ring with cute satellite */}
        <div className="absolute inset-0 rounded-full border-2 border-dashed border-blue-500/30 animate-[spin_6s_linear_infinite]">
          <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-blue-600 shadow-[0_0_8px_#2563eb]" />
        </div>

        {/* Middle Counter-Clockwise Orbital Ring */}
        <div className="absolute inset-2.5 rounded-full border-2 border-indigo-400/40 animate-[spin_4s_linear_infinite_reverse]">
          <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
        </div>

        {/* Inner Fast Ring */}
        <div className="absolute inset-5 rounded-full border border-sky-300/50 animate-[spin_2.5s_linear_infinite]">
          <span className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_6px_#fbbf24]" />
        </div>

        {/* Cute Core Orb */}
        <div className="relative w-7 h-7 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-400 flex items-center justify-center shadow-lg shadow-blue-500/30 animate-bounce">
          <Sparkles className="h-3.5 w-3.5 text-white" />
        </div>
      </div>

      {/* Cute Status Label */}
      <div className="flex flex-col items-center gap-1">
        <span className="text-xs font-mono font-bold tracking-wider uppercase text-gray-800 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
          <span>{label}</span>
        </span>
        <span className="text-[10px] text-gray-400 font-mono">ORBIT-I Private Limited</span>
      </div>
    </div>
  );

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-50 bg-white/90 backdrop-blur-sm flex items-center justify-center">
        {loaderContent}
      </div>
    );
  }

  return <div className="py-12 flex items-center justify-center">{loaderContent}</div>;
};
