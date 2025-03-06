
import React from "react";
import { Button } from "@/components/ui/button";
import { Search, MapPin, ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center">
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="https://cdn.prod.website-files.com/5cdec240b9e0bc719f8a252b/5cf804cf8cb69e3462ae9962_Departamentos%20El%20Escultor-transcode.webm" type="video/mp4" />
      </video>

      <div className="absolute top-0 left-0 w-full h-full bg-white/30"></div>

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-12 w-full">
        <div className="max-w-3xl stagger-animation">
          <div className="estate-chip bg-white/50 text-estate-secondary backdrop-blur-sm mb-4">
            <span>ENCUENTRA TU INMUEBLE</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-estate-dark mb-4">
            Encuentra tu inmueble
          </h1>
          
          <p className="text-lg text-estate-dark mb-8 max-w-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero sint facilis illum blanditiis modi explicabo animi consequuntur. Veritatis laborum fuga pariatur quasi, autem cupiditate harum adipisci temporibus, sapiente voluptatem non!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-estate-primary text-estate-dark hover:bg-estate-light">
              <Search className="mr-2 h-4 w-4" /> 
              Buscar propiedades
            </Button>
            
            <Button variant="outline" size="lg" className="border-estate-primary bg-transparent text-estate-primary hover:bg-estate-light">
              <MapPin className="mr-2 h-4 w-4" /> 
              Explorar ubicaciones
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-0 right-0 mx-auto text-center animate-bounce">
        <a href="#properties" className="text-white/80 inline-flex flex-col items-center">
          <span className="text-sm mb-2">Descubre más</span>
          <ArrowRight className="h-5 w-5 rotate-90" />
        </a>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-estate-light to-transparent"></div>
    </section>
  );
};

export default Hero;
