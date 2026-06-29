'use client';

import Image from 'next/image';
import { motion } from 'motion/react';

const members = [
  {
    name: 'Lazuardi Akbar Imani',
    nim: 'L0125105',
    role: 'Frontend Developer',
    photo: '/foto_member_1.jpg',
    github: 'https://github.com/Dezkrazzer',
    linkedin: 'https://www.linkedin.com/in/lazuardiakbar/',
  },
  {
    name: 'Muhammad Haidar Ramzy',
    nim: 'L0125109',
    role: 'Backend Developer',
    photo: '/foto_member_2.jpg',
    github: 'https://github.com/AiChan277',
    linkedin: 'https://www.linkedin.com/in/muhammad-haidar-ramzy/',
  },
  {
    name: 'Egifrid Angelo Mwoleka',
    nim: 'L0125096',
    role: 'UI/UX Designer',
    photo: '/foto_member_3.jpg',
    github: 'https://github.com/mweyunge',
    linkedin: 'https://www.linkedin.com/in/egifrid-mwoleka-5b2a581b5/',
  },
];

// GitHub
const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.24c3-.34 6-1.53 6-6.76a5.2 5.2 0 0 0-1.5-3.8 5.3 5.3 0 0 0-.15-3.7s-1.2-.38-3.9 1.4a13.38 13.38 0 0 0-7 0C6.2 1.3 5 1.7 5 1.7a5.3 5.3 0 0 0-.15 3.7A5.2 5.2 0 0 0 3 9.24c0 5.22 3 6.42 6 6.76a4.8 4.8 0 0 0-1 3.24v4"></path>
    <path d="M9 18c-4.51 2-5-2-7-2"></path>
  </svg>
);

// LinkedIn
const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

export default function AnggotaKelompokPage() {
  return (
    <div className="min-h-dvh lg:h-screen w-full hero-gradient overflow-x-hidden overflow-y-auto lg:overflow-hidden flex flex-col">

      <main className="flex-1 flex flex-col items-center justify-start lg:justify-center px-4 sm:px-6 lg:px-8 w-full pt-28 pb-16 lg:pt-16 lg:pb-0">

        {/* Header Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 lg:mb-12"
        >
          <p className="text-white text-xs sm:text-sm font-semibold tracking-[0.2em] mb-2 sm:mb-3">
            ANGGOTA KELOMPOK
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            <span className="bg-linear-to-r from-accent-light to-purple-400 uppercase bg-clip-text text-transparent">
              Kelompok 7
            </span>
          </h1>
        </motion.div>

        {/* Grid Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 w-full max-w-5xl">
          {members.map((member, index) => (
            <motion.article
              key={member.nim}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5, type: 'spring' }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="glass-card rounded-3xl p-6 sm:p-8 flex flex-col items-center text-center relative group"
            >

              {/* Foto */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 mb-5 rounded-full p-1.5 border-2 border-dashed border-accent/50 group-hover:border-accent-light transition-colors duration-300">
                <div className="relative w-full h-full rounded-full overflow-hidden bg-dark-700">
                  <Image
                    src={member.photo}
                    alt={`Foto ${member.name}`}
                    fill
                    sizes="(max-width: 768px) 100px, 120px"
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Teks */}
              <h3 className="text-lg sm:text-xl font-bold text-dark-50 mb-1">{member.name}</h3>
              <p className="text-dark-400 font-medium text-sm sm:text-base mb-4">{member.nim}</p>

              {/* Role */}
              <div className="px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent-light text-xs font-bold tracking-wider mb-6">
                {member.role}
              </div>

              {/* Social Media */}
              <div className="flex items-center gap-4 mt-auto">
                <motion.a
                  whileHover={{ y: -4, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-dark-800 border border-white/5 flex items-center justify-center text-dark-300 hover:text-white hover:bg-dark-700 hover:border-white/10 transition-colors"
                >
                  <GithubIcon />
                </motion.a>
                <motion.a
                  whileHover={{ y: -4, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-dark-800 border border-white/5 flex items-center justify-center text-dark-300 hover:text-[#0a66c2] hover:bg-dark-700 hover:border-[#0a66c2]/30 transition-colors"
                >
                  <LinkedinIcon />
                </motion.a>
              </div>

            </motion.article>
          ))}
        </section>

      </main>
    </div>
  );
}