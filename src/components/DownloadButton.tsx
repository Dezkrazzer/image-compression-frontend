import { Download } from 'lucide-react';
import { motion } from 'motion/react';

interface DownloadButtonProps {
  compressedUrl: string | null;
  fileName: string;
  disabled: boolean;
}

export default function DownloadButton({ compressedUrl, fileName, disabled }: DownloadButtonProps) {
  const handleDownload = () => {
    if (!compressedUrl) return;
    const a = document.createElement('a');
    a.href = compressedUrl;
    a.download = `compressed_${fileName || 'image'}`;
    a.click();
  };

  return (
    <motion.button
      onClick={handleDownload}
      disabled={disabled}
      whileHover={disabled ? undefined : { y: -2, scale: 1.01 }}
      whileTap={disabled ? undefined : { scale: 0.98, y: 1 }}
      className={`btn-glow w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-lg tracking-wide flex items-center justify-center gap-3 transition-all ${
        disabled
          ? 'bg-dark-600 text-dark-400 cursor-not-allowed'
          : 'bg-linear-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700'
      }`}
    >
      <Download size={22} />
      <span>Download Compressed</span>
    </motion.button>
  );
}