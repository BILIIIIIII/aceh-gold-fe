import { TrendingUp, CircleDollarSign, AlertTriangle } from "lucide-react";

const ProblemSection = () => {
  const painPoints = [
    {
      icon: <TrendingUp className="w-8 h-8 text-destructive" />,
      title: "Harga Emas Melonjak Tiba-Tiba",
      description:
        "Rencana anggaran Anda bisa berantakan hanya dalam semalam. Apa yang cukup hari ini, mungkin kurang besok.",
    },
    {
      icon: <AlertTriangle className="w-8 h-8 text-amber-500" />,
      title: "Informasi Simpang Siur",
      description:
        "Saran dari teman atau berita umum seringkali tidak spesifik untuk pasar Aceh, membuat Anda ragu dalam mengambil keputusan.",
    },
    {
      icon: <CircleDollarSign className="w-8 h-8 text-destructive" />,
      title: "Risiko Membeli di Harga Puncak",
      description:
        "Kesalahan waktu bisa berarti kerugian jutaan rupiah—uang yang seharusnya bisa digunakan untuk keperluan lain.",
    },
  ];

  return (
    <section id="the-problem" className="my-16 py-16 bg-muted">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Merencanakan Mahar Seharusnya Tidak Membuat Stres
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
          Setiap calon pengantin di Aceh tahu tantangannya: harga emas selalu
          berubah, padahal mahar adalah sebuah kepastian.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {painPoints.map((pain, index) => (
            <div key={index} className="flex flex-col items-center p-4">
              <div className="mb-4">{pain.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{pain.title}</h3>
              <p className="text-muted-foreground">{pain.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
