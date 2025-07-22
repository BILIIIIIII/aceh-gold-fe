import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/shadcn-components/ui/card";
import { BarChart2, MapPin, Smartphone } from "lucide-react";
import React from "react";

const Features = () => {
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
  return (
    <section id="features" className="my-16 bg-background text-foreground">
      <div className="max-w-[1000px] mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Fitur Unggulan Kami
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
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
  );
};

export default Features;
