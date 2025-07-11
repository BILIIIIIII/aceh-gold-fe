import { ArrowRight, Check, BarChart2, MapPin, Smartphone } from "lucide-react";
import { Button } from "@/shared/shadcn-components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/shadcn-components/ui/card";
import Link from "next/link"; // Import Link dari Next.js

export default function LandingPage() {
  const features = [
    {
      icon: <BarChart2 className="w-6 h-6" />,
      title: "Prediksi Harga Harian Akurat",
      description:
        "Selalu selangkah di depan pasar dengan prediksi harga emas dan mayam harian yang tepat.",
    },
    {
      icon: <BarChart2 className="w-6 h-6" />,
      title: "Data Historis Komprehensif",
      description:
        "Analisis tren harga masa lalu untuk keputusan investasi yang lebih cerdas.",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Harga Spesifik Tiap Kota",
      description:
        "Dapatkan harga presisi untuk Banda Aceh, Lhokseumawe, dan Langsa.",
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Antarmuka Ramah Pengguna",
      description:
        "Navigasi yang mudah dan fitur-fitur aplikasi yang intuitif.",
    },
  ];

  const advantages = [
    {
      title: "Akurasi Prediksi Tingkat Tinggi",
      description:
        "Algoritma canggih kami memberikan prediksi terpercaya berdasarkan data pasar terkini.",
    },
    {
      title: "Fokus Lokal Aceh",
      description:
        "Data khusus yang disesuaikan dengan kondisi pasar dan tren harga unik di Aceh.",
    },
    {
      title: "Akses Mudah & Cepat",
      description:
        "Dapatkan informasi krusial kapan pun Anda butuhkan, dengan akses yang super cepat.",
    },
  ];

  const steps = [
    "Buka Aplikasi Aceh Gold & Mayam Forecast.",
    "Pilih kota dan jenis logam (emas/mayam) yang ingin Anda prediksi.",
    "Lihat prediksi harga dan buat keputusan investasi terbaik Anda!",
  ];

  const cityLinks = [
    { name: "Banda Aceh", href: "/banda-aceh" },
    { name: "Langsa", href: "/langsa" },
    { name: "Lhokseumawe", href: "/lhokseumawe" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary to-primary/90 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Prediksi Harga Emas & Mayam Terkini di Aceh
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Dapatkan ramalan harga harian akurat untuk emas dan mayam di Banda
            Aceh, Lhokseumawe, dan Langsa. Buat keputusan investasi cerdas
            dengan mudah!
          </p>
          <div className="flex flex-col items-center space-y-4 md:flex-row md:space-x-4 md:space-y-0 justify-center">
            <Button variant="outline" className="text-primary">
              Coba Sekarang <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <div className="flex flex-col md:flex-row space-y-2 md:space-x-2 md:space-y-0 mt-4 md:mt-0">
              {" "}
              {/* Tambahkan margin top di mobile */}
              {cityLinks.map((city) => (
                <Button
                  key={city.name}
                  variant="outline"
                  className="text-primary"
                  asChild
                >
                  <Link href={city.href}>Cek Prediksi {city.name}</Link>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section id="features" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Fitur Unggulan Kami
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="bg-primary/10 p-3 rounded-full w-fit">
                    {feature.icon}
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Kenapa Memilih Aplikasi Kami?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {advantages.map((advantage, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <Check className="text-primary mr-2" />
                  <h3 className="text-xl font-semibold">{advantage.title}</h3>
                </div>
                <p className="text-gray-600">{advantage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Bagaimana Cara Kerjanya?
          </h2>
          <div className="max-w-2xl mx-auto">
            <ol className="space-y-4">
              {steps.map((step, index) => (
                <li key={index} className="flex items-start">
                  <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-lg">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* CTA Section - Diubah untuk akses publik */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Mulai Buat Keputusan Investasi Terbaik Anda!
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Akses prediksi harga emas dan mayam akurat di Aceh, kapan saja, di
            mana saja, tanpa perlu mendaftar.
          </p>
          <Button variant="secondary" className="text-primary" asChild>
            <Link href="/dashboard">
              {" "}
              {/* Asumsi link ke halaman utama aplikasi / dashboard */}
              Akses Aplikasi Sekarang
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">
                Aceh Gold & Mayam Forecast
              </h3>
              <p>Prediksi harga akurat untuk logam mulia di Aceh.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Link Cepat</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:underline">
                    Beranda
                  </a>
                </li>
                <li>
                  <a href="#features" className="hover:underline">
                    Fitur
                  </a>
                </li>
                <li>
                  <a href="#how-it-works" className="hover:underline">
                    Cara Kerja
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Perusahaan</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:underline">
                    Tentang Kami
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Kontak
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Karir
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Hukum</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:underline">
                    Kebijakan Privasi
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Syarat & Ketentuan
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p>© 2025 Rian Hidayatullah. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
