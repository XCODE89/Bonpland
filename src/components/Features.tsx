
import React, { useEffect, useRef } from "react";
import { Home, MapPin, Shield, Clock, ThumbsUp, Heart } from "lucide-react";

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Feature = ({ icon, title, description }: FeatureProps) => {
  return (
    <div className="p-6 border border-slate-100 rounded-lg bg-white transition-all duration-300 hover:shadow-md hover:translate-y-[-5px] scroll-trigger">
      <div className="w-12 h-12 mb-4 rounded-full bg-estate-primary/10 flex items-center justify-center text-estate-primary">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};

const Features = () => {
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll('.scroll-trigger');
            elements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add('scroll-visible');
              }, index * 100);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (featuresRef.current) {
      observer.observe(featuresRef.current);
    }

    return () => {
      if (featuresRef.current) {
        observer.unobserve(featuresRef.current);
      }
    };
  }, []);

  return (
    <section className="estate-section" id="features" ref={featuresRef}>
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="estate-chip bg-estate-primary/10 text-estate-primary mb-4">
          <span>Por qué elegirnos</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Servicio inmobiliario de excelencia
        </h2>
        <p className="text-muted-foreground">
          Ofrecemos un servicio personalizado y profesional para encontrar la propiedad perfecta que se adapte a sus necesidades y estilo de vida.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Feature
          icon={<Home className="h-6 w-6" />}
          title="Propiedades Exclusivas"
          description="Ofrecemos las propiedades más exclusivas y de alta calidad en las mejores ubicaciones de la ciudad."
        />
        <Feature
          icon={<MapPin className="h-6 w-6" />}
          title="Ubicaciones Privilegiadas"
          description="Todas nuestras propiedades están situadas en zonas estratégicas con excelente plusvalía y comodidades."
        />
        <Feature
          icon={<Shield className="h-6 w-6" />}
          title="Transacciones Seguras"
          description="Garantizamos total seguridad y transparencia en cada paso del proceso de compra o renta."
        />
        <Feature
          icon={<Clock className="h-6 w-6" />}
          title="Respuesta Inmediata"
          description="Nuestro equipo está disponible para atender todas sus consultas de manera rápida y eficiente."
        />
        <Feature
          icon={<ThumbsUp className="h-6 w-6" />}
          title="Servicio Personalizado"
          description="Adaptamos nuestro servicio a sus necesidades específicas para encontrar el hogar de sus sueños."
        />
        <Feature
          icon={<Heart className="h-6 w-6" />}
          title="Cuidado al Detalle"
          description="Prestamos atención a cada detalle para garantizar una experiencia inmobiliaria excepcional."
        />
      </div>
    </section>
  );
};

export default Features;
