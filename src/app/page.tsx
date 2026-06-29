'use client';

import { useState } from 'react';
import { Zap, Loader2, ImagePlus, RotateCcw, Image as ImageIcon } from 'lucide-react';
import { motion } from 'motion/react';
import UploadZone from '@/components/UploadZone';
import QualitySlider from '@/components/QualitySlider';
import ComparisonPreview from '@/components/ComparisonPreview';
import Stats from '@/components/Stats';
import DownloadButton from '@/components/DownloadButton';

const backendBaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL?.trim();

const getBackendUrl = (path: string) => {
  if (!backendBaseUrl) {
    throw new Error('NEXT_PUBLIC_BACKEND_URL belum diset.');
  }

  const normalizedBaseUrl = /^https?:\/\//i.test(backendBaseUrl)
    ? backendBaseUrl
    : `http://${backendBaseUrl}`;

  return new URL(path, normalizedBaseUrl).toString();
};

export default function Home() {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [compressedUrl, setCompressedUrl] = useState<string | null>(null);
  const [compressedSize, setCompressedSize] = useState<number>(0);

  // State untuk menyimpan nilai komponen PCA (Default: 50 komponen)
  const [pcaComponents, setPcaComponents] = useState<number>(50);

  const [pixelDiff, setPixelDiff] = useState<number>(0);
  const [compressionTime, setCompressionTime] = useState<number>(0);
  const [isCompressing, setIsCompressing] = useState<boolean>(false);
  const [hasResult, setHasResult] = useState<boolean>(false);

  const handleFileSelect = (file: File) => {
    setOriginalFile(file);
    if (originalUrl) URL.revokeObjectURL(originalUrl);
    if (compressedUrl) URL.revokeObjectURL(compressedUrl);

    setOriginalUrl(URL.createObjectURL(file));
    setCompressedUrl(null);
    setHasResult(false);
    setPixelDiff(0);
    setCompressionTime(0);
    setCompressedSize(0);
  };

  const handleCompress = async () => {
    if (!originalFile) return;
    setIsCompressing(true);

    // Data untuk dikirim ke backend
    const formData = new FormData();
    formData.append('image', originalFile);
    formData.append('components', pcaComponents.toString());

    try {
      // Tembak API backend dengan URL yang sudah dinormalisasi
      const response = await fetch(getBackendUrl('/compress'), {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Kompresi gagal di server');

      const data = await response.json();

      // Tangkap respons dari backed dan perbarui ui
      setCompressedUrl(`data:image/jpeg;base64,${data.compressed_image}`);
      setCompressedSize(data.compressed_size);
      setCompressionTime(data.process_time * 1000); // konversi detik ke milidetik
      setPixelDiff(data.pixel_difference);

      setHasResult(true);
    } catch (error) {
      console.error("Error compressing image:", error);
      alert("Gagal menghubungi server backend. Pastikan NEXT_PUBLIC_BACKEND_URL sudah benar dan backend sedang berjalan.");
    } finally {
      setIsCompressing(false);
    }
  };

  const handleReset = () => {
    if (originalUrl) URL.revokeObjectURL(originalUrl);
    if (compressedUrl && compressedUrl.startsWith('blob:')) URL.revokeObjectURL(compressedUrl);
    setOriginalFile(null);
    setOriginalUrl(null);
    setCompressedUrl(null);
    setCompressedSize(0);
    setPcaComponents(50); // Reset nilai PCA
    setPixelDiff(0);
    setCompressionTime(0);
    setHasResult(false);
    setIsCompressing(false);
  };

  return (
    <div className="min-h-screen hero-gradient">
      <main id="home" className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto scroll-mt-24">

        {/* Hero Section */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-3">
            Image <span className="bg-linear-to-r from-accent-light to-purple-400 bg-clip-text text-transparent">Compressor</span>
          </h1>
          <p className="text-dark-400 text-base sm:text-lg max-w-xl mx-auto">
            Reduksi dimensi citra menggunakan Principal Component Analysis (PCA)
          </p>
        </div>

        <div className="mb-6">
          <UploadZone onFileSelect={handleFileSelect} currentFile={originalFile} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
          <motion.div className="lg:col-span-2" whileHover={{ y: -2 }} transition={{ type: 'spring', stiffness: 280, damping: 24 }}>
            <QualitySlider quality={pcaComponents} setQuality={setPcaComponents} disabled={!originalFile} />
          </motion.div>
          <div className="flex flex-col gap-3">
            {/* Animasi saat tombol di-hover / di-tap */}
            <motion.button
              onClick={handleCompress}
              disabled={!originalFile || isCompressing}
              whileHover={originalFile && !isCompressing ? { y: -2, scale: 1.01 } : undefined}
              whileTap={originalFile && !isCompressing ? { scale: 0.98, y: 1 } : undefined}
              className={`btn-glow w-full py-4 rounded-2xl font-bold text-lg tracking-wide flex items-center justify-center gap-3 ${!originalFile || isCompressing
                ? 'bg-dark-600 text-dark-400 cursor-not-allowed'
                : 'bg-linear-to-r from-accent to-purple-600 text-white hover:from-accent-dark hover:to-purple-700'
                }`}
            >
              {isCompressing ? (
                <><Loader2 size={22} className="spinner" /> <span>Processing image...</span></>
              ) : (
                <><Zap size={22} /> <span>Start Compression</span></>
              )}
            </motion.button>
            {originalFile && (
              <motion.button
                onClick={handleReset}
                whileHover={{ y: -1, scale: 1.01 }}
                whileTap={{ scale: 0.98, y: 1 }}
                className="py-3 rounded-2xl font-semibold text-dark-300 border border-dark-600 hover:border-dark-400 hover:text-dark-100 transition-all flex items-center justify-center gap-2"
              >
                <RotateCcw size={18} />
                <span>Reset</span>
              </motion.button>
            )}
          </div>
        </div>

        {/* Bagian Results */}
        {hasResult && compressedUrl && originalFile && (
          <div className="space-y-6 fade-in">
            <ComparisonPreview
              originalUrl={originalUrl!}
              compressedUrl={compressedUrl}
              originalSize={originalFile.size}
              compressedSize={compressedSize}
            />
            <Stats
              pixelDiff={pixelDiff}
              compressionTime={compressionTime}
              originalSize={originalFile.size}
              compressedSize={compressedSize}
            />
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <DownloadButton
                compressedUrl={compressedUrl}
                fileName={`PCA_${pcaComponents}_${originalFile.name}`}
                disabled={!compressedUrl}
              />
            </div>
          </div>
        )}

        {/* Empty States */}
        {!hasResult && originalFile && !isCompressing && (
          <div className="glass-card rounded-2xl p-10 text-center fade-in">
            <div className="w-14 h-14 rounded-2xl bg-dark-700 flex items-center justify-center mx-auto mb-4">
              <ImageIcon size={28} className="text-dark-400" />
            </div>
            <p className="text-dark-300 text-lg font-medium">Image Ready for PCA Calculation</p>
            <p className="text-dark-500 text-sm mt-1">Adjust the number of PCA components and click &quot;Start Compression&quot; to send to the server.</p>
          </div>
        )}

        {!originalFile && !isCompressing && (
          <div className="glass-card rounded-2xl p-10 text-center">
            <div className="w-14 h-14 rounded-2xl bg-dark-700 flex items-center justify-center mx-auto mb-4">
              <ImagePlus size={28} className="text-dark-400" />
            </div>
            <p className="text-dark-300 text-lg font-medium">No Image Uploaded</p>
            <p className="text-dark-500 text-sm mt-1">Upload an image above to start the compression simulation.</p>
          </div>
        )}

      </main>

      <footer className="border-t border-dark-800 py-6 text-center text-dark-500 text-sm mt-8">
        <div className="max-w-6xl mx-auto px-4">
          <p>© 2026 Kelompok 7 - Informatika D. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}