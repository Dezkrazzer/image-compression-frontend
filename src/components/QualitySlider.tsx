import { SlidersHorizontal } from 'lucide-react';
import { motion } from 'motion/react';

interface QualitySliderProps {
  quality: number;
  setQuality: (val: number) => void;
  disabled: boolean;
}

export default function QualitySlider({ quality, setQuality, disabled }: QualitySliderProps) {
  const progress = ((100 - quality) / 80) * 100;

  return (
    <motion.div whileHover={{ y: -2 }} transition={{ type: 'spring', stiffness: 300, damping: 26 }} className={`glass-card rounded-2xl p-6 ${disabled ? 'opacity-40 pointer-events-none' : ''}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-dark-700 flex items-center justify-center">
            <SlidersHorizontal size={16} className="text-accent-light" />
          </div>
          <span className="font-semibold text-dark-100">Compression Level</span>
        </div>
        <motion.div key={quality} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.18 }} className="px-4 py-1.5 rounded-xl bg-accent/20 text-accent-light font-bold text-lg tabular-nums">
          {100 - quality}%
        </motion.div>
      </div>
      <div className="space-y-3">
        <input
          type="range" min="20" max="100" step="1"
          value={quality}
          onChange={(e) => setQuality(Number(e.target.value))}
          className="slider-track w-full"
          style={{ '--progress': `${progress}%` } as React.CSSProperties}
          disabled={disabled}
        />
        <div className="flex justify-between text-xs text-dark-400">
          <span>Max Compression (80%)</span>
          <span>Min Compression (0%)</span>
        </div>
      </div>
    </motion.div>
  );
}