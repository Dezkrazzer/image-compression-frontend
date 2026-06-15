import { Split } from 'lucide-react';
import { motion } from 'motion/react';

interface ComparisonPreviewProps {
  originalUrl: string;
  compressedUrl: string;
  originalSize: number;
  compressedSize: number;
}

export default function ComparisonPreview({ originalUrl, compressedUrl, originalSize, compressedSize }: ComparisonPreviewProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.45 }}>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-lg bg-dark-700 flex items-center justify-center">
          <Split size={16} className="text-accent-light" />
        </div>
        <span className="font-semibold text-dark-100 text-lg">Preview Comparison</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-400"></span>
              <span className="font-semibold text-dark-200 text-sm">BEFORE</span>
            </div>
            <span className="text-xs text-dark-400">{(originalSize / 1024).toFixed(1)} KB</span>
          </div>
          <div className="h-64 sm:h-80 flex items-center justify-center bg-dark-950/50 p-2">
            <img src={originalUrl} alt="Original" className="object-contain max-h-full max-w-full rounded-lg" />
          </div>
        </div>
        
        <div className="glow-border rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-accent/20 bg-dark-800/50">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-green-400"></span>
              <span className="font-semibold text-dark-200 text-sm">AFTER</span>
            </div>
            <span className="text-xs text-green-400 font-semibold">{(compressedSize / 1024).toFixed(1)} KB</span>
          </div>
          <div className="h-64 sm:h-80 flex items-center justify-center bg-dark-950/50 p-2">
            <img src={compressedUrl} alt="Compressed" className="object-contain max-h-full max-w-full rounded-lg" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}