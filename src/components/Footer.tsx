
import React from "react";
import { Home, Phone, Mail, MapPin, Facebook, Instagram, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="bg-estate-primary text-white pt-16 pb-6">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Home className="h-5 w-5" />
              <span className="font-semibold text-lg">Bonpland</span>
            </div>
            <p className="text-estate-secondary/90 mb-6 text-sm">
              Ofrecemos las mejores propiedades inmobiliarias exclusivas con un servicio personalizado y profesional.
            </p>
            <div className="flex space-x-3">
              <Button variant="outline" size="icon" className="rounded-full border-white/20 hover:bg-white/10">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full border-white/20 hover:bg-white/10">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full border-white/20 hover:bg-white/10">
                <Twitter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Enlaces rápidos</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-estate-secondary/90 hover:text-white text-sm transition-colors">Inicio</a>
              </li>
              <li>
                <a href="#properties" className="text-estate-secondary/90 hover:text-white text-sm transition-colors">Propiedades</a>
              </li>
              <li>
                <a href="#testimonials" className="text-estate-secondary/90 hover:text-white text-sm transition-colors">Testimonios</a>
              </li>
              <li>
                <a href="#about" className="text-estate-secondary/90 hover:text-white text-sm transition-colors">Nosotros</a>
              </li>
              <li>
                <a href="#contact" className="text-estate-secondary/90 hover:text-white text-sm transition-colors">Contacto</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Contacto</h4>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-estate-secondary" />
                <span className="text-estate-secondary/90 text-sm">Av. Paseo de la Reforma 222, Ciudad de México, México</span>
              </div>
              <div className="flex items-start">
                <Phone className="h-5 w-5 mr-3 text-estate-secondary" />
                <span className="text-estate-secondary/90 text-sm">+52 55 1234 5678</span>
              </div>
              <div className="flex items-start">
                <Mail className="h-5 w-5 mr-3 text-estate-secondary" />
                <span className="text-estate-secondary/90 text-sm">info@bonpland.com</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Suscríbete</h4>
            <p className="text-estate-secondary/90 mb-4 text-sm">
              Recibe nuestras últimas propiedades y ofertas exclusivas.
            </p>
            <div className="flex space-x-2">
              <Input
                type="email"
                placeholder="Tu email"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
              <Button className="bg-white text-estate-primary hover:bg-white/90">
                Enviar
              </Button>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-white/10 text-center text-sm text-estate-secondary/70">
          <p>&copy; {new Date().getFullYear()} Bonpland. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
