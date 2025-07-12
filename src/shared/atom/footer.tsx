import React from "react";

const Footer = () => {
  return (
    <footer className="bg-card text-card-foreground py-6 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">
              Aceh Gold & Mayam Forecast
            </h3>
            <p className="text-muted-foreground">
              Prediksi harga akurat untuk logam mulia di Aceh.
            </p>
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
        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground">
            © 2025 Rian Hidayatullah. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
