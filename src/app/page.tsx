'use client';

import { useState } from 'react';
import { Zap, Loader2, ImagePlus, RotateCcw, Image as ImageIcon } from 'lucide-react';
import Header from '@/components/Header';
import UploadZone from '@/components/UploadZone';
import QualitySlider from '@/components/QualitySlider';
import ComparisonPreview from '@/components/ComparisonPreview';
import Stats from '@/components/Stats';
import DownloadButton from '@/components/DownloadButton';

export default function Home() {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [compressedUrl, setCompressedUrl] = useState<string | null>(null);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const [quality, setQuality] = useState<number>(60);
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

  const calculatePixelDifference = (img1: HTMLImageElement, img2: HTMLImageElement) => {
    const canvas1 = document.createElement('canvas');
    const canvas2 = document.createElement('canvas');
    const ctx1 = canvas1.getContext('2d');
    const ctx2 = canvas2.getContext('2d');
    
    if (!ctx1 || !ctx2) return 0;
    
    canvas1.width = img1.width;
    canvas1.height = img1.height;
    canvas2.width = img2.width;
    canvas2.height = img2.height;
    
    ctx1.drawImage(img1, 0, 0);
    ctx2.drawImage(img2, 0, 0);
    
    const data1 = ctx1.getImageData(0, 0, canvas1.width, canvas1.height).data;
    const data2 = ctx2.getImageData(0, 0, canvas2.width, canvas2.height).data;
    
    let totalDiff = 0;
    const pixelCount = data1.length / 4;
    
    for (let i = 0; i < data1.length; i += 4) {
      const dr = Math.abs(data1[i] - data2[i]);
      const dg = Math.abs(data1[i + 1] - data2[i + 1]);
      const db = Math.abs(data1[i + 2] - data2[i + 2]);
      totalDiff += (dr + dg + db) / (255 * 3);
    }
    
    return (totalDiff / pixelCount) * 100;
  };

  const handleCompress = async () => {
    if (!originalFile || !originalUrl) return;
    setIsCompressing(true);
    
    await new Promise(r => setTimeout(r, 50));
    const startTime = performance.now();
    
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      ctx.drawImage(img, 0, 0);
      
      canvas.toBlob(
        (blob) => {
          if (!blob) return;
          const endTime = performance.now();
          const elapsed = endTime - startTime;
          
          const compressedImg = new Image();
          compressedImg.onload = () => {
            const diff = calculatePixelDifference(img, compressedImg);
            setPixelDiff(diff);
            setCompressionTime(elapsed);
            setHasResult(true);
            setIsCompressing(false);
          };
          
          if (compressedUrl) URL.revokeObjectURL(compressedUrl);
          const newUrl = URL.createObjectURL(blob);
          setCompressedUrl(newUrl);
          setCompressedSize(blob.size);
          compressedImg.src = newUrl;
        },
        'image/jpeg',
        quality / 100
      );
    };
    img.src = originalUrl;
  };

  const handleReset = () => {
    if (originalUrl) URL.revokeObjectURL(originalUrl);
    if (compressedUrl) URL.revokeObjectURL(compressedUrl);
    setOriginalFile(null);
    setOriginalUrl(null);
    setCompressedUrl(null);
    setCompressedSize(0);
    setQuality(60);
    setPixelDiff(0);
    setCompressionTime(0);
    setHasResult(false);
    setIsCompressing(false);
  };

  return (
    <div className="min-h-screen hero-gradient">
      <Header />
      
      <main id="home" className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto scroll-mt-24">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-3">
            Compress Your <span className="bg-linear-to-r from-accent-light to-purple-400 bg-clip-text text-transparent">Images</span>
          </h1>
          <p className="text-dark-400 text-base sm:text-lg max-w-xl mx-auto">
            Fast, client-side image compression with real-time preview. No uploads to servers — your images stay private.
          </p>
        </div>
        
        <div className="mb-6">
          <UploadZone onFileSelect={handleFileSelect} currentFile={originalFile} />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
          <div className="lg:col-span-2">
            <QualitySlider quality={quality} setQuality={setQuality} disabled={!originalFile} />
          </div>
          <div className="flex flex-col gap-3">
            <button
              onClick={handleCompress}
              disabled={!originalFile || isCompressing}
              className={`btn-glow w-full py-4 rounded-2xl font-bold text-lg tracking-wide flex items-center justify-center gap-3 ${
                !originalFile || isCompressing
                  ? 'bg-dark-600 text-dark-400 cursor-not-allowed'
                  : 'bg-linear-to-r from-accent to-purple-600 text-white hover:from-accent-dark hover:to-purple-700'
              }`}
            >
              {isCompressing ? (
                <><Loader2 size={22} className="spinner" /> <span>Compressing...</span></>
              ) : (
                <><Zap size={22} /> <span>Compress Image</span></>
              )}
            </button>
            {originalFile && (
              <button
                onClick={handleReset}
                className="py-3 rounded-2xl font-semibold text-dark-300 border border-dark-600 hover:border-dark-400 hover:text-dark-100 transition-all flex items-center justify-center gap-2"
              >
                <RotateCcw size={18} />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>
        
        {hasResult && compressedUrl && originalFile && (
          <div className="space-y-6">
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
                fileName={originalFile.name}
                disabled={!compressedUrl}
              />
            </div>
          </div>
        )}
        
        {!hasResult && originalFile && !isCompressing && (
          <div className="glass-card rounded-2xl p-10 text-center fade-in">
            <div className="w-14 h-14 rounded-2xl bg-dark-700 flex items-center justify-center mx-auto mb-4">
              <ImageIcon size={28} className="text-dark-400" />
            </div>
            <p className="text-dark-300 text-lg font-medium">Image loaded and ready!</p>
            <p className="text-dark-500 text-sm mt-1">Adjust compression level and click "Compress Image" to start.</p>
          </div>
        )}
        
        {!originalFile && !isCompressing && (
          <div className="glass-card rounded-2xl p-10 text-center">
            <div className="w-14 h-14 rounded-2xl bg-dark-700 flex items-center justify-center mx-auto mb-4">
              <ImagePlus size={28} className="text-dark-400" />
            </div>
            <p className="text-dark-300 text-lg font-medium">No image selected</p>
            <p className="text-dark-500 text-sm mt-1">Upload an image above to get started with compression.</p>
          </div>
        )}

      </main>
      
      <footer className="border-t border-dark-800 py-6 text-center text-dark-500 text-sm mt-8">
        <div className="max-w-6xl mx-auto px-4">
          <p>CompressX — All processing happens locally in your browser. Your images never leave your device.</p>
        </div>
      </footer>
    </div>
  );
}