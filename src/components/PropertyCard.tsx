
import React from "react";
import { Badge } from "@/components/ui/badge";
import { MapPin, BedDouble, Bath, Maximize } from "lucide-react";
import { Link } from "react-router-dom";

interface PropertyCardProps {
  id: number;
  title: string;
  location: string;
  price: string;
  image: string;
  beds: number;
  baths: number;
  sqft: number;
  featured?: boolean;
  isNew?: boolean;
  propertyType?: string;
  propertyStatus?: string;
}

const PropertyCard = ({
  id,
  title,
  location,
  price,
  image,
  beds,
  baths,
  sqft,
  featured,
  isNew,
  propertyStatus,
}: PropertyCardProps) => {
  const renderStatusBadge = () => {
    if (!propertyStatus) return null;
    
    if (propertyStatus === "for-sale") {
      return (
        <div className="estate-tag right-36 bg-blue-500/80 text-white">
          En Venta
        </div>
      );
    } else if (propertyStatus === "for-rent") {
      return (
        <div className="estate-tag right-36  bg-amber-500/80 text-white">
          En Renta
        </div>
      );
    }
    return null;
  };

  return (
    <Link to={`/property/${id}`} className="block group">
      <div className="estate-card">
        <div className="relative overflow-hidden">
          <img
            src={image}
            alt={title}
            className="estate-card-img"
            loading="lazy"
          />
          {featured && (
            <div className="estate-tag bg-estate-primary/70 text-white">
              Destacado
            </div>
          )}
          {isNew && (
            <div className="estate-tag bg-estate-accent/70 text-white">
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
            <span>{location}</span>
          </div>
          
          <div className="pt-4 border-t border-slate-100 flex justify-between">
            <div className="flex items-center text-sm">
              <BedDouble className="h-4 w-4 mr-1 text-slate-400" />
              <span>{beds} hab</span>
            </div>
            
            <div className="flex items-center text-sm">
              <Bath className="h-4 w-4 mr-1 text-slate-400" />
              <span>{baths} baños</span>
            </div>
            
            <div className="flex items-center text-sm">
              <Maximize className="h-4 w-4 mr-1 text-slate-400" />
              <span>{sqft} m²</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
