import { MapPin } from "lucide-react";

interface PropertyMapProps {
  location: string;
}

const PropertyMap = ({ location }: PropertyMapProps) => {
  return (
    <div className="space-y-4">
      <div className="rounded-lg overflow-hidden border border-slate-200 shadow-sm">
        {/* Placeholder for a real map integration */}
        <div className="bg-slate-100 h-[400px] relative">
          {/* This is a placeholder. In a real application, you would integrate with Google Maps, Mapbox, etc. */}
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <MapPin className="h-10 w-10 text-estate-primary mb-2" />
            <p className="text-center text-muted-foreground max-w-xs px-4">
              {location}
            </p>
            <p className="text-xs text-muted-foreground mt-4">
              Mapa interactivo no disponible en esta demostración
            </p>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-xl font-semibold mb-3">Ubicación</h3>
        <p className="text-muted-foreground mb-4">
          Esta propiedad se encuentra en {location}, una zona con excelentes comunicaciones y todos los servicios necesarios cercanos.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
          <div className="flex items-center text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-estate-primary mr-2"></span>
            <span>Transporte público cercano</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-estate-primary mr-2"></span>
            <span>Escuelas y colegios</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-estate-primary mr-2"></span>
            <span>Centros comerciales</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-estate-primary mr-2"></span>
            <span>Parques y zonas verdes</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-estate-primary mr-2"></span>
            <span>Servicios sanitarios</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-estate-primary mr-2"></span>
            <span>Restaurantes y ocio</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyMap;