import { Check } from "lucide-react";
import React from "react";
import { advantages } from "../lib/constants";

const Benefit = () => {
  return (
    <section className="my-16 py-12 bg-muted text-foreground">
      {" "}
      {/* Menggunakan `muted` untuk section abu-abu */}
      <div className="max-w-[1000px] mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Kenapa Memilih Aplikasi Kami?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
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
  );
};

export default Benefit;
