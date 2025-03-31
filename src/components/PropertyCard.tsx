import { Badge } from "@/components/ui/badge";
import { MapPin, BedDouble, Bath, Maximize } from "lucide-react";
import { Link } from "react-router-dom";
import { Property } from "@/types";

const PropertyCard = ({
  _id,
  title,
  location,
  price,
  images,
  bedrooms,
  bathrooms,
  area,
  featured,
  isNewProperty,
  contractType,
}: Partial<Property>) => {
  const renderStatusBadge = () => {
    if (!contractType) return null;
    
    if (contractType === "Venta") {
      return (
        <div className="estate-tag left-4 bg-blue-500/80 text-white">
          En Venta
        </div>
      );
    } else if (contractType === "Alquiler") {
      return (
        <div className="estate-tag left-4  bg-amber-500/80 text-white">
          En Renta
        </div>  
      );
    }
    return null;
  };

  return (
    <Link to={`/property/${_id}`} className="block group">
      <div className="estate-card">
        <div className="relative overflow-hidden">
          <img
            src={images?.[0]}
            alt={title}
            className="estate-card-img"
            loading="lazy"
          />
          {featured && (
            <div className="estate-tag left-4 bg-estate-primary/70 text-white">
              Destacado
            </div>
          )}
          {isNewProperty && (
            <div className="estate-tag right-4 bg-estate-accent/70 text-white">
              Nuevo
            </div>
          )}
          {renderStatusBadge()}
        </div>
        
        <div className="p-6">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-lg line-clamp-1">{title}</h3>
            <Badge variant="outline" className="bg-estate-secondary/10 hover:bg-estate-secondary/20">
              {price}
            </Badge>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground mb-4">
            <MapPin className="h-3.5 w-3.5 mr-1 text-estate-accent" />
            <span>{location?.city} - {location?.country}</span>
          </div>
          
          <div className="pt-4 border-t border-slate-100 flex justify-between">
            <div className="flex items-center text-sm">
              <BedDouble className="h-4 w-4 mr-1 text-slate-400" />
              <span>{bedrooms} hab</span>
            </div>
            
            <div className="flex items-center text-sm">
              <Bath className="h-4 w-4 mr-1 text-slate-400" />
              <span>{bathrooms} baños</span>
            </div>
            
            <div className="flex items-center text-sm">
              <Maximize className="h-4 w-4 mr-1 text-slate-400" />
              <span>{area} m²</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
