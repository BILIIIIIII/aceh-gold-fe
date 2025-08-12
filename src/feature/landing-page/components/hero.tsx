const Hero = () => {
  return (
    <section className="mt-12 mb-20">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
          Hemat Jutaan Rupiah Saat Beli Emas Mahar <br />
          di Aceh.
        </h1>

        <p className="text-xl mb-8 max-w-3xl mx-auto text-muted-foreground">
          Gunakan prediksi harga emas (mayam) yang divalidasi secara ilmiah
          untuk merencanakan pembelian Anda. Hindari harga puncak dan buat
          keputusan cerdas tanpa cemas.
        </p>

        <a
          href="#forecast"
          className="bg-primary text-primary-foreground font-bold py-3 px-8 rounded-lg text-lg hover:bg-primary/90 transition-colors"
        >
          Lihat Prediksi 30 Hari ke Depan
        </a>
      </div>
    </section>
  );
};

export default Hero;
