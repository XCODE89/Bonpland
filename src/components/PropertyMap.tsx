import { useState, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { MapPin } from "lucide-react";
import { PropertyMapProps } from "@/types";


const googleMap = import.meta.env.VITE_GOOGLE_API



const PropertyMap = ({ location }: PropertyMapProps) => {
  console.log(googleMap)
  console.log()
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: googleMap
  });

  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    const getCoordinates = async () => {
      if (!location?.address || !location?.city || !location?.country) return;
      const fullAddress = `${location?.address}, ${location?.city}, ${location?.country}`;
      const apiKey = googleMap;
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(fullAddress)}&key=${apiKey}`
      );
      const data = await response.json();

      if (data.status === "OK") {
        console.log(data.results[0].geometry.location)
        setCoordinates(data.results[0].geometry.location);
      } else {
        console.error("Error obteniendo coordenadas:", data.status);
      }
    };

    getCoordinates();
  }, [location]);

  return (
    <div className="space-y-4">
      <div className="rounded-lg overflow-hidden border border-slate-200 shadow-sm">
        {isLoaded && coordinates ? (
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "400px" }}
            center={coordinates}
            zoom={15}
          >
            <Marker position={coordinates} />
          </GoogleMap>
        ) : (
          <div className="bg-slate-100 h-[400px] relative flex items-center justify-center flex-col">
            <MapPin className="h-10 w-10 text-estate-primary mb-2" />
            <p className="text-center text-muted-foreground max-w-xs px-4">
              {location.address || "Ubicación no disponible"}
            </p>
            <p className="text-xs text-muted-foreground mt-4">
              Cargando mapa...
            </p>
          </div>
        )}
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-3">Ubicación</h3>
        <p className="text-muted-foreground mb-4">
          Esta propiedad se encuentra en {location.address}, una zona con excelentes comunicaciones y todos los
          servicios necesarios cercanos.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
          // TODO podria traerse esta informacion de base de datos
          {["Transporte público cercano", "Escuelas y colegios", "Centros comerciales", "Parques y zonas verdes", "Servicios sanitarios", "Restaurantes y ocio"].map((item) => (
            <div key={item} className="flex items-center text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-estate-primary mr-2"></span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyMap;
