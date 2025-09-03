import { Facebook, Twitter, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#225A7F] text-white ">
      <div className="custom-container px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">MuhirisDoctor</h3>
            <p className="text-blue-100 text-sm leading-relaxed">
              The ultimate destination for all of your medical needs
            </p>
            <div className="flex space-x-3">
              <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
                <Facebook className="w-4 h-4" />
              </div>
              <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
                <Twitter className="w-4 h-4" />
              </div>
              <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
                <Instagram className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Explore Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Explore</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-blue-100 hover:text-white transition-colors text-sm"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-blue-100 hover:text-white transition-colors text-sm"
                >
                  Surgery
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-blue-100 hover:text-white transition-colors text-sm"
                >
                  OPD
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-blue-100 hover:text-white transition-colors text-sm"
                >
                  Speciality
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-blue-100 hover:text-white transition-colors text-sm"
                >
                  Consultation
                </a>
              </li>
            </ul>
          </div>

          {/* About Us Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">About Us</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-blue-100 hover:text-white transition-colors text-sm"
                >
                  Who we are
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-blue-100 hover:text-white transition-colors text-sm"
                >
                  Our Vision
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-blue-100 hover:text-white transition-colors text-sm"
                >
                  Our Team
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-blue-100 hover:text-white transition-colors text-sm"
                >
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-blue-100 hover:text-white transition-colors text-sm"
                >
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Contact</h3>
            <div className="space-y-3">
              <p className="text-blue-100 text-sm">+92304123456</p>
              <p className="text-blue-100 text-sm">favorite@doctor.com</p>
              <p className="text-blue-100 text-sm leading-relaxed">
                Glassplace, Near
                <br />
                Cool Avenue, Boson
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="bg-[#1E3C58]">
        <div className="container mx-auto px-6 py-4">
          <p className="text-center text-blue-100 text-sm">
            Copyright 2024 Favorite Doctor, All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
