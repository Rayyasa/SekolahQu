"use client";
import React, { useEffect } from "react";
import bg from '../../assets/bg.jpg'
export default function HomePage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-[#16ab39] text-white">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <h1 className="text-2xl font-bold">SekolahQu</h1>
          <nav className="space-x-6">
            <a href="/auth/login" className="hover:underline">
              Login
            </a>
          </nav>
        </div>
      </header>
      <section
        className="h-[500px] py-20 bg-cover bg-center bg-no-repeat relative"
        style={{ backgroundImage: `url(${bg.src})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>

        <div className="container mx-auto text-center relative z-10 justify-center py-20">
          <h2 className="text-4xl font-bold mb-4 text-white">
            Manajemen Sekolah yang Efisien
          </h2>
          <p className="text-lg text-white mb-8">
            Sederhanakan operasional sekolah dengan platform manajemen lengkap
            kami.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold text-gray-800 mb-6">
            Fitur yang tersedia
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white shadow-lg p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-4">Manajemen Siswa</h4>
              <p className="text-gray-600">
                Kelola dan pantau catatan siswa, dan nilai secara efisien.
              </p>
            </div>
            <div className="bg-white shadow-lg p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-4">Portal Guru</h4>
              <p className="text-gray-600">
                Berikan alat untuk guru mengelola kelas, tugas, dan jadwal.
              </p>
            </div>
            <div className="bg-white shadow-lg p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-4">Panel Admin</h4>
              <p className="text-gray-600">
                Kelola seluruh sistem sekolah termasuk data siswa, guru,
                keuangan, dan laporan akademik secara terpusat.
              </p>
            </div>
          </div>
        </div>
      </section>


      <section id="about" className="bg-gray-100 py-20">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold text-gray-800 mb-6">
            Tentang Kami
          </h3>
          <p className="text-lg text-gray-600">
            Kami berdedikasi untuk menyediakan solusi inovatif untuk manajemen
            sekolah. Platform kami membantu sekolah mengoptimalkan operasi dan
            fokus pada pendidikan berkualitas.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold text-gray-800 mb-6">
            Hubungi Kami
          </h3>
          <p className="text-lg text-gray-600 mb-8">
            Punya pertanyaan? Hubungi kami sekarang juga!
          </p>
          <a
            href="https://wa.me/6281292795278"
            className="bg-[#16ab39] text-white px-6 py-3 rounded-lg hover:bg-white hover:text-[#16ab39] border-2 border-[#16ab39]"
          >
            Hubungi Kami
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#16ab39] text-white py-6">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 SekolahQu. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
