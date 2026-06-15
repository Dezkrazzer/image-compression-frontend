import { useState, useRef, useCallback } from 'react';
import { UploadCloud, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
  currentFile: File | null;
}

export default function UploadZone({ onFileSelect, currentFile }: UploadZoneProps) {
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) onFileSelect(file);
  }, [onFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback(() => setIsDragOver(false), []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFileSelect(file);
  };

  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.005 }}
      whileTap={{ scale: 0.995 }}
      className={`upload-zone rounded-2xl p-8 sm:p-12 text-center cursor-pointer ${isDragOver ? 'drag-over' : ''}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={() => inputRef.current?.click()}
    >
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleChange} />
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-dark-700 flex items-center justify-center">
          <UploadCloud size={32} className="text-accent-light" />
        </div>
        <div>
          <p className="text-lg font-semibold text-dark-100">
            {currentFile ? currentFile.name : 'Drop your image here or click to browse'}
          </p>
          <p className="text-sm text-dark-400 mt-1">Supports PNG, JPG, JPEG, WEBP</p>
        </div>
        {currentFile && (
          <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 text-green-400 text-sm mt-1">
            <CheckCircle size={16} />
            <span>File loaded • {(currentFile.size / 1024).toFixed(1)} KB</span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}