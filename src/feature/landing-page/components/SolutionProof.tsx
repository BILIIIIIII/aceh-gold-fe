import { CheckCircle2, Award, TestTube2 } from "lucide-react";

const SolutionProof = () => {
  const advantages = [
    {
      icon: <Award className="text-primary mr-3 h-6 w-6" />,
      title: "Akurasi Tertinggi di Pasar Aceh",
      description:
        "Model XGBoost kami terbukti secara ilmiah memiliki error rate hanya 2.61%, mengalahkan algoritma lain. Ini bukan tebakan, ini data sains.",
    },
    {
      icon: <CheckCircle2 className="text-primary mr-3 h-6 w-6" />,
      title: "Fokus 100% pada Unit Mayam & Lokal",
      description:
        "Lupakan konversi gram yang merepotkan. Dapatkan prediksi langsung dalam satuan mayam untuk Banda Aceh, Langsa, dan Lhokseumawe.",
    },
    {
      icon: <TestTube2 className="text-primary mr-3 h-6 w-6" />,
      title: "Divalidasi oleh Riset Independen",
      description:
        "Dibangun berdasarkan penelitian yang solid, memastikan Anda mendapatkan prediksi yang andal dan dapat dipertanggungjawabkan.",
    },
  ];

  return (
    <section className="my-16 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">
            Inilah Cara Anda Mengambil Kendali
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
            Kami mengubah ketidakpastian menjadi kepercayaan diri dengan
            teknologi prediksi yang dirancang khusus untuk Anda.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {advantages.map((advantage, index) => (
            <div key={index} className="bg-card p-6 rounded-lg border">
              <div className="flex items-start mb-3">
                {advantage.icon}
                <h3 className="text-xl font-semibold">{advantage.title}</h3>
              </div>
              <p className="text-muted-foreground">{advantage.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionProof;
