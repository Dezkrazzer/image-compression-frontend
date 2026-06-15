import Header from '@/components/Header';

const members = [
  {
    name: 'Anggota 1',
    role: 'Tugas / Peran',
    detail: 'Tambahkan nama dan detail anggota di sini.',
  },
  {
    name: 'Anggota 2',
    role: 'Tugas / Peran',
    detail: 'Tambahkan nama dan detail anggota di sini.',
  },
  {
    name: 'Anggota 3',
    role: 'Tugas / Peran',
    detail: 'Tambahkan nama dan detail anggota di sini.',
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
          <p className="text-dark-400 text-base sm:text-lg max-w-2xl mx-auto">
            Halaman ini dipisahkan dari home agar informasi anggota kelompok punya ruang sendiri.
          </p>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {members.map((member) => (
            <article key={member.name} className="glass-card rounded-3xl p-6 sm:p-7">
              <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-accent to-purple-600 mb-4" />
              <h2 className="text-xl font-bold tracking-tight mb-1">{member.name}</h2>
              <p className="text-accent-light text-sm font-medium mb-3">{member.role}</p>
              <p className="text-dark-400 leading-relaxed">{member.detail}</p>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}