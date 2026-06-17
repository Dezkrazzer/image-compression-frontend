"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Wifi } from 'lucide-react';
import { motion } from 'motion/react';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
];

export default function Header() {
  const pathname = usePathname();
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
    <motion.header
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 glass-card rounded-full px-4 sm:px-6 h-14 flex items-center justify-between gap-3 sm:gap-6 shadow-lg"
      style={{ width: 'auto', maxWidth: '95vw' }}
    >
      {/* Logo Section */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden">
          <img src="/logo-uns-biru.png" alt="Logo" className="w-10 h-10 object-contain" />
        </div>
        <span className="text-lg font-bold tracking-tight whitespace-nowrap">
          Image<span className="text-accent-light">Compressor</span>
        </span>
      </div>

      {/* Navigation Section */}
      <nav className="hidden sm:flex relative items-center gap-1 rounded-full border border-white/10 bg-white/5 px-1 py-1 text-sm font-medium text-dark-200">
        {navItems.map((item) => {
          const isActive = pathname === item.path;

          return (
            <Link
              key={item.path}
              href={item.path}
              className={`relative rounded-full px-4 py-2 transition-colors duration-300 ${
                isActive ? 'text-white' : 'hover:text-dark-100'
              }`}
            >
              {/* Background Pill */}
              {isActive && (
                <motion.div
                  layoutId="active-nav-pill"
                  className="absolute inset-0 rounded-full bg-white/10 border border-white/5"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
              {/* Teks Navigasi */}
              <span className="relative z-10">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Ping/WiFi Section */}
      <div className="flex items-center gap-1.5 text-dark-300 text-xs sm:text-sm tabular-nums justify-end w-18">
        <Wifi size={16} style={{ color: pingColor() }} className="shrink-0" />
        <motion.span
          key={pingLabel}
          layout
          initial={{ opacity: 0, y: 2 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 40 }}
          className="hidden sm:inline whitespace-nowrap text-left"
        >
          {pingLabel}
        </motion.span>
      </div>
    </motion.header>
  );
}