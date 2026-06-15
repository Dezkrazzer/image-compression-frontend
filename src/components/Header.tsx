"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Wifi } from 'lucide-react';

export default function Header() {
  const [pingMs, setPingMs] = useState<number | null>(null);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    let active = true;

    const measurePing = async () => {
      const startTime = performance.now();

      try {
        await fetch('/', { method: 'HEAD', cache: 'no-store' });
        const elapsed = Math.round(performance.now() - startTime);

        if (active) {
          setPingMs(elapsed);
          setIsChecking(false);
        }
      } catch {
        if (active) {
          setPingMs(null);
          setIsChecking(false);
        }
      }
    };

    measurePing();
    const intervalId = window.setInterval(measurePing, 10000);

    return () => {
      active = false;
      window.clearInterval(intervalId);
    };
  }, []);

  const pingColor = () => {
    if (pingMs === null) return '#f87171';
    if (pingMs < 80) return '#22c55e';
    if (pingMs < 180) return '#f59e0b';
    return '#ef4444';
  };

  const pingLabel = isChecking
    ? '...'
    : pingMs === null
      ? '---'
      : `${pingMs} ms`;

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 glass-card rounded-full px-4 sm:px-6 h-14 flex items-center justify-between gap-3 sm:gap-6" style={{width: 'auto', maxWidth: '95vw'}}>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden">
          <img src="/logo-uns-biru.png" alt="Logo" className="w-10 h-10 object-contain" />
        </div>
        <span className="text-lg font-bold tracking-tight whitespace-nowrap">
          Image<span className="text-accent-light">Compressor</span>
        </span>
      </div>

      <nav className="hidden sm:flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-1 py-1 text-sm font-medium text-dark-200">
        <Link
          href="/"
          className="rounded-full px-4 py-2 transition-colors hover:bg-white/10 hover:text-dark-50"
        >
          Home
        </Link>
        <Link
          href="/anggota-kelompok"
          className="rounded-full px-4 py-2 transition-colors hover:bg-white/10 hover:text-dark-50"
        >
          Anggota Kelompok
        </Link>
      </nav>

      <div className="flex items-center gap-2 text-dark-300 text-xs sm:text-sm">
        <Wifi size={16} style={{ color: pingColor() }} className="shrink-0" />
        <span className="hidden sm:inline whitespace-nowrap">{pingLabel}</span>
      </div>
    </header>
  );
}