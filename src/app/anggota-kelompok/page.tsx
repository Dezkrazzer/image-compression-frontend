import Image from 'next/image';
import Header from '@/components/Header';

const members = [
  {
    name: 'Lazuardi Akbar Imani',
    role: 'L0125105',
    photo: '/foto_member_1.jpg',
  },
  {
    name: 'Muhammad Haidar Ramzy',
    role: 'L0125109',
    photo: '/foto_member_2.jpg',
  },
  {
    name: 'Egifrid Angelo Mwoleka',
    role: 'L0125096',
    photo: '/foto_member_3.jpg',
  },
];

export default function AnggotaKelompokPage() {
  return (
    <div className="min-h-screen hero-gradient">
      <Header />

      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-accent-light text-sm font-semibold uppercase tracking-[0.2em] mb-3">Anggota Kelompok</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-3">
            Daftar <span className="bg-linear-to-r from-accent-light to-purple-400 bg-clip-text text-transparent">Tim</span>
          </h1>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {members.map((member) => (
            <article key={member.name} className="glass-card rounded-3xl p-6 sm:p-7">
              <div className="relative aspect-square w-full overflow-hidden rounded-2xl mb-4 border border-white/10 bg-dark-700">
                <Image
                  src={member.photo}
                  alt={`Foto ${member.name}`}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover object-center"
                />
              </div>
              <h2 className="text-xl font-bold tracking-tight mb-1">{member.name}</h2>
              <p className="text-accent-light text-sm font-medium mb-3">{member.role}</p>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}