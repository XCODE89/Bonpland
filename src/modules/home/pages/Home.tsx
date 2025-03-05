
import React, { useEffect } from "react";
import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import PropertiesCarousel from "@/components/PropertiesCarousel";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Home = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("scroll-visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".scroll-trigger").forEach((el) => {
      observer.observe(el);
    });

    return () => {
      document.querySelectorAll(".scroll-trigger").forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <div className="min-h-screen">
      <NavBar />
      <Hero />

      <section className="estate-section" id="properties">
        <div className="text-center max-w-3xl mx-auto mb-16 scroll-trigger">
          <div className="estate-chip bg-estate-primary/10 text-estate-primary mb-4">
            <span>Titulo</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Propiedades destacadas
          </h2>
          <p className="text-muted-foreground">
            Slogan, parrafo
          </p>
        </div>

        <PropertiesCarousel />

        <div className="text-center mt-10">
          <Button className="bg-estate-primary hover:bg-estate-primary/90">
            Ver todas las propiedades <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      <section className="py-24 bg-estate-secondary/10" id="stats">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-100 scroll-trigger">
              <div className="text-4xl font-bold text-estate-primary mb-2">+500</div>
              <div className="text-sm text-muted-foreground">Propiedades disponibles</div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-100 scroll-trigger">
              <div className="text-4xl font-bold text-estate-primary mb-2">98%</div>
              <div className="text-sm text-muted-foreground">Clientes satisfechos</div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-100 scroll-trigger">
              <div className="text-4xl font-bold text-estate-primary mb-2">15+</div>
              <div className="text-sm text-muted-foreground">Años de experiencia</div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-100 scroll-trigger">
              <div className="text-4xl font-bold text-estate-primary mb-2">+1200</div>
              <div className="text-sm text-muted-foreground">Propiedades vendidas</div>
            </div>
          </div>
        </div>
      </section>
      
      <Features />
      
      <section className="py-24 relative" id="testimonials">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage: "url('https://source.unsplash.com/photo-1487958449943-2429e8be8625')",
          }}
        ></div>
        
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 scroll-trigger">
            <div className="estate-chip bg-estate-primary/10 text-estate-primary mb-4">
              <span>Testimonios</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Lo que dicen nuestros clientes
            </h2>
            <p className="text-muted-foreground">
              Descubre las experiencias de quienes han confiado en nosotros para encontrar la propiedad de sus sueños.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <blockquote className="p-8 bg-white rounded-lg shadow-sm border border-slate-100 scroll-trigger">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-estate-primary/20 flex items-center justify-center text-estate-primary mr-3">
                  M
                </div>
                <div>
                  <div className="font-medium">María González</div>
                  <div className="text-xs text-muted-foreground">Compradora de apartamento</div>
                </div>
              </div>
              <p className="text-sm italic text-muted-foreground">
                "El equipo de Bonpland hizo que todo el proceso de compra fuera sencillo y sin estrés. Encontraron exactamente lo que estaba buscando y me guiaron en cada paso."
              </p>
            </blockquote>
            
            <blockquote className="p-8 bg-white rounded-lg shadow-sm border border-slate-100 scroll-trigger">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-estate-primary/20 flex items-center justify-center text-estate-primary mr-3">
                  J
                </div>
                <div>
                  <div className="font-medium">Juan Pérez</div>
                  <div className="text-xs text-muted-foreground">Vendedor de casa</div>
                </div>
              </div>
              <p className="text-sm italic text-muted-foreground">
                "Vendí mi propiedad con Bonpland y fue increíble lo rápido que encontraron compradores. Su conocimiento del mercado y su estrategia de marketing son excepcionales."
              </p>
            </blockquote>
            
            <blockquote className="p-8 bg-white rounded-lg shadow-sm border border-slate-100 scroll-trigger">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-estate-primary/20 flex items-center justify-center text-estate-primary mr-3">
                  C
                </div>
                <div>
                  <div className="font-medium">Carlos Rodríguez</div>
                  <div className="text-xs text-muted-foreground">Inversionista</div>
                </div>
              </div>
              <p className="text-sm italic text-muted-foreground">
                "Como inversionista inmobiliario, valoro la asesoría experta que me brinda Bonpland. Han sido fundamentales para construir mi portafolio de propiedades de alto rendimiento."
              </p>
            </blockquote>
          </div>
        </div>
      </section>
      
      <section className="py-24 bg-estate-primary text-white" id="contact">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12">
          <div className="md:flex items-center justify-between">
            <div className="mb-8 md:mb-0 md:max-w-md scroll-trigger">
              <div className="estate-chip bg-white/20 text-white backdrop-blur-sm mb-4">
                <span>¿Preguntas? Contáctanos</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Estamos aquí para ayudarte
              </h2>
              <p className="text-estate-secondary/90 mb-6">
                Nuestro equipo de expertos inmobiliarios está listo para responder todas tus preguntas y ayudarte a encontrar la propiedad perfecta.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-white text-estate-primary hover:bg-white/90">
                  Llamar ahora
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white/10">
                  Enviar mensaje
                </Button>
              </div>
            </div>
            
            <div className="glass-morphism p-8 rounded-lg bg-white/10 border-white/20 md:max-w-md w-full scroll-trigger">
              <h3 className="text-xl font-semibold mb-6">Déjanos tus datos</h3>
              <form className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Nombre completo"
                    className="w-full p-3 rounded-md bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-3 rounded-md bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Teléfono"
                    className="w-full p-3 rounded-md bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Mensaje"
                    rows={4}
                    className="w-full p-3 rounded-md bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                  ></textarea>
                </div>
                <Button className="w-full bg-white text-estate-primary hover:bg-white/90">
                  Enviar mensaje
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Home;
