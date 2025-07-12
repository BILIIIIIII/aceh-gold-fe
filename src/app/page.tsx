import { Check, BarChart2, MapPin, Smartphone } from "lucide-react";
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
    // Body / main container: Menggunakan warna latar belakang dan teks utama dari tema
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Hero Section: Menggunakan warna primary (gelap di light, terang di dark) */}
      {/* Jika ingin hero tetap gelap di kedua mode, kamu perlu definisikan kelas terpisah */}
      {/* atau sesuaikan primary/primary-foreground di CSS variables. */}
      {/* Berdasarkan screenshot, asumsi hero memang ingin gelap. */}
      {/* Aku akan menggunakan `bg-foreground` untuk latar belakang gelap ini (warna teks di light mode) */}
      {/* atau custom warna jika ada definisi `--hero-bg` di CSS variables kamu. */}
      {/* Untuk saat ini, aku pakai `bg-primary` dan `text-primary-foreground` yang seharusnya kontras */}
      {/* sesuai definisi di CSS. Jika `primary` kamu gelap, `primary-foreground` akan terang. */}
      {/* Jika `primary` kamu terang (di dark mode), `primary-foreground` akan gelap. */}
      {/* Sesuai screenshot kamu, `primary` kamu gelap di light mode dan terang di dark mode. */}
      {/* Jadi, hero section akan berubah warna. */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Prediksi Harga Emas & Mayam Terkini di Aceh
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Dapatkan ramalan harga harian akurat untuk emas dan mayam di Banda
            Aceh, Lhokseseumawe, dan Langsa. Buat keputusan investasi cerdas
            dengan mudah!
          </p>
          <div className="flex flex-col items-center space-y-4 md:flex-row md:space-x-4 md:space-y-0 justify-center">
            <div className="flex flex-col md:flex-row space-y-2 md:space-x-2 md:space-y-0 mt-4 md:mt-0">
              {cityLinks.map((city) => (
                <Button key={city.name} variant="secondary" asChild>
                  <Link href={city.href}>Cek Prediksi {city.name}</Link>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section id="features" className="py-16 bg-background text-foreground">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Fitur Unggulan Kami
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow bg-card text-card-foreground border-border"
              >
                <CardHeader>
                  <div className="bg-primary/10 p-3 rounded-full w-fit text-primary">
                    {" "}
                    {/* Warna icon disesuaikan */}
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

      {/* Why Choose Us Section */}
      <section className="py-16 bg-muted text-foreground">
        {" "}
        {/* Menggunakan `muted` untuk section abu-abu */}
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Kenapa Memilih Aplikasi Kami?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {advantages.map((advantage, index) => (
              <div
                key={index}
                className="bg-card p-6 rounded-lg shadow-sm text-card-foreground border-border"
              >
                <div className="flex items-center mb-4">
                  <Check className="text-primary mr-2" />{" "}
                  {/* Icon warna primary */}
                  <h3 className="text-xl font-semibold">{advantage.title}</h3>
                </div>
                <p className="text-muted-foreground">{advantage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="py-16 bg-background text-foreground"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Bagaimana Cara Kerjanya?
          </h2>
          <div className="max-w-2xl mx-auto">
            <ol className="space-y-4">
              {steps.map((step, index) => (
                <li key={index} className="flex items-start">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-lg">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* CTA Section (Bottom) */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Mulai Buat Keputusan Investasi Terbaik Anda!
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Akses prediksi harga emas dan mayam akurat di Aceh, kapan saja, di
            mana saja, tanpa perlu mendaftar.
          </p>
          <Button variant="secondary" asChild>
            <Link href="/dashboard">Akses Aplikasi Sekarang</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
