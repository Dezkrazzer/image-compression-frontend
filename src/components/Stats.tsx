import { Percent, Clock, HardDriveDownload } from 'lucide-react';
import { motion } from 'motion/react';

interface StatsProps {
  pixelDiff: number;
  compressionTime: number;
  originalSize: number;
  compressedSize: number;
}

export default function Stats({ pixelDiff, compressionTime, originalSize, compressedSize }: StatsProps) {
  const savingPercent = originalSize > 0 ? (((originalSize - compressedSize) / originalSize) * 100).toFixed(1) : 0;

  return (
    <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <motion.div variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }} className="stat-card rounded-2xl p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
            <Percent size={20} className="text-purple-400" />
          </div>
          <span className="text-dark-400 text-sm font-medium">Pixel Difference</span>
        </div>
        <p className="text-2xl font-bold text-purple-400 tabular-nums">{pixelDiff.toFixed(2)}%</p>
        <p className="text-dark-500 text-xs mt-1">visual quality change</p>
      </motion.div>

      <motion.div variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }} className="stat-card rounded-2xl p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
            <Clock size={20} className="text-blue-400" />
          </div>
          <span className="text-dark-400 text-sm font-medium">Compression Time</span>
        </div>
        <p className="text-2xl font-bold text-blue-400 tabular-nums">{compressionTime.toFixed(0)} ms</p>
        <p className="text-dark-500 text-xs mt-1">processing duration</p>
      </motion.div>

      <motion.div variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }} className="stat-card rounded-2xl p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
            <HardDriveDownload size={20} className="text-green-400" />
          </div>
          <span className="text-dark-400 text-sm font-medium">Size Saved</span>
        </div>
        <p className="text-2xl font-bold text-green-400 tabular-nums">{savingPercent}%</p>
        <p className="text-dark-500 text-xs mt-1">{((originalSize - compressedSize) / 1024).toFixed(1)} KB reduced</p>
      </motion.div>
    </motion.div>
  );
}