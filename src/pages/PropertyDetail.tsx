import { useParams, Link } from "react-router-dom";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, BedDouble, Bath, Maximize, MapPin, Home, Calendar, Share2, Heart } from "lucide-react";
import PropertyGallery from "@/components/PropertyGallery";
import PropertyMap from "@/components/PropertyMap";
import PropertyContactForm from "@/components/PropertyContactForm";
import { Property } from "@/types";
import { useToast } from "@/hooks/use-toast";

// TODO traer del backend
const propertyData: Record<string, Property> = {
  "1": {
    id: "1",
    title: "Apartamento de Lujo en Zona Exclusiva",
    description: "Este hermoso apartamento de lujo ofrece una combinación perfecta de elegancia y comodidad, ubicado en una de las zonas más exclusivas de la ciudad. Con acabados de alta calidad, amplios espacios y vistas impresionantes, este hogar es perfecto para quienes buscan lo mejor.\n\nEl diseño interior contemporáneo aprovecha al máximo la luz natural, creando ambientes luminosos y acogedores. La cocina totalmente equipada con electrodomésticos de alta gama es el sueño de cualquier chef, mientras que el salón principal ofrece el espacio perfecto para relajarse o entretener invitados.\n\nLos dormitorios espaciosos incluyen armarios empotrados y el dormitorio principal cuenta con un baño en suite de lujo con acabados en mármol y ducha de lluvia.",
    price: 350000,
    location: "Madrid, España",
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    imageUrl: "https://http2.mlstatic.com/D_NQ_NP_2X_635154-MLC80454745238_112024-F-ronda-santo-domingo.webp",
    featured: true,
    propertyType: "apartment",
    status: "for-sale",
  },
  "2": {
    id: "2",
    title: "Casa Familiar con Jardín",
    description: "Amplia casa con jardín y piscina, perfecta para familias que buscan espacio y comodidad. Situada en una tranquila zona residencial con excelentes conexiones y servicios cercanos. La propiedad cuenta con cuatro dormitorios espaciosos, tres baños completos, y amplias zonas comunes que incluyen un salón-comedor con chimenea y una cocina totalmente equipada.\n\nEl jardín privado ofrece un espacio ideal para disfrutar del aire libre, con una piscina bien mantenida y zona de barbacoa. La casa también dispone de garaje para dos vehículos y trastero. El diseño interior es moderno y funcional, con acabados de calidad y abundante luz natural en todas las estancias.",
    price: 450000,
    location: "Barcelona, España",
    bedrooms: 4,
    bathrooms: 3,
    area: 200,
    imageUrl: "https://source.unsplash.com/photo-1487958449943-2429e8be8625",
    featured: true,
    propertyType: "house",
    status: "for-sale",
  },
  "3": {
    id: "3",
    title: "Local Comercial Céntrico",
    description: "Local comercial estratégicamente ubicado en una de las zonas de mayor tránsito peatonal de la ciudad. Este espacio ofrece una excelente oportunidad para establecer o expandir su negocio en una ubicación privilegiada. Con 80 metros cuadrados diáfanos, el local permite múltiples configuraciones según las necesidades de su empresa.\n\nCuenta con un amplio escaparate que proporciona gran visibilidad desde la calle, ideal para atraer clientes. Las instalaciones incluyen un baño, aire acondicionado y calefacción, así como todas las conexiones necesarias para iniciar la actividad rápidamente. El local se encuentra en perfecto estado de conservación.",
    price: 250000,
    location: "Valencia, España",
    bedrooms: 0,
    bathrooms: 1,
    area: 80,
    imageUrl: "https://source.unsplash.com/photo-1497366754035-f200968a6e72",
    featured: false,
    propertyType: "commercial",
    status: "for-rent",
  },
};

// TODO traer del backend
const propertyImages: Record<string, string[]> = {
  "1": [
    "https://http2.mlstatic.com/D_NQ_NP_2X_635154-MLC80454745238_112024-F-ronda-santo-domingo.webp",
    "https://source.unsplash.com/photo-1502672260266-1c1ef2d93688",
    "https://source.unsplash.com/photo-1560448204-e02f11c3d0e2",
    "https://source.unsplash.com/photo-1560185893-a55cbc8c57e8",
    "https://source.unsplash.com/photo-1556912167-f556f1f39fdf"
  ],
  "2": [
    "https://http2.mlstatic.com/D_NQ_NP_2X_635154-MLC80454745238_112024-F-ronda-santo-domingo.webp",
    "https://source.unsplash.com/photo-1484154218962-a197022b5858",
    "https://source.unsplash.com/photo-1505691938895-1758d7feb511",
    "https://source.unsplash.com/photo-1560185007-c5ca9d2c014d",
    "https://source.unsplash.com/photo-1560448075-57d0285fc59b"
  ],
  "3": [
    "https://source.unsplash.com/photo-1497366754035-f200968a6e72",
    "https://source.unsplash.com/photo-1497366811353-6870744d04b2",
    "https://source.unsplash.com/photo-1497215842964-222b430dc094",
    "https://source.unsplash.com/photo-1497217968520-7d8d60b7bc25",
    "https://source.unsplash.com/photo-1486304873000-235643847519"
  ]
};

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const property = id ? propertyData[id] : null;
  const images = id ? propertyImages[id] : [];
  const { toast } = useToast();
  
  if (!property) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Propiedad no encontrada</h2>
            <Link to="/">
              <Button>Volver al inicio</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Enlace copiado",
      description: "El enlace ha sido copiado al portapapeles."
    });
  };

  const handleFavorite = () => {
    toast({
      title: "Añadido a favoritos",
      description: "La propiedad ha sido añadida a tus favoritos."
    });
  };

  const getStatusBadge = (status: Property["status"]) => {
    switch (status) {
      case "for-sale":
        return <Badge className="bg-blue-500">En Venta</Badge>;
      case "for-rent":
        return <Badge className="bg-amber-500">En Alquiler</Badge>;
      case "sold":
        return <Badge className="bg-green-500">Vendido</Badge>;
      default:
        return null;
    }
  };

  const getPropertyTypeIcon = (type: Property["propertyType"]) => {
    switch (type) {
      case "apartment":
        return <Home className="h-5 w-5 mr-1" />;
      case "house":
        return <Home className="h-5 w-5 mr-1" />;
      case "commercial":
        return <Home className="h-5 w-5 mr-1" />;
      default:
        return <Home className="h-5 w-5 mr-1" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <div className="mt-24 bg-slate-50 py-4 border-b border-slate-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="mb-1">
                <Link 
                  to="/" 
                  className="text-sm text-estate-primary flex items-center hover:underline"
                >
                  <ArrowLeft className="h-3.5 w-3.5 mr-1" /> Volver a propiedades
                </Link>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold leading-tight">{property.title}</h1>
              <div className="flex items-center gap-2 mt-2">
                <MapPin className="h-4 w-4 text-estate-accent" />
                <span className="text-muted-foreground">{property.location}</span>
              </div>
            </div>
            
            <div className="flex flex-col items-start md:items-end gap-2">
              <div className="flex items-center gap-2">
                {getStatusBadge(property.status)}
                <div className="text-2xl md:text-3xl font-bold text-estate-primary">
                  {formatPrice(property.price)}
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleShare}>
                  <Share2 className="h-4 w-4 mr-1" /> Compartir
                </Button>
                <Button variant="outline" size="sm" onClick={handleFavorite}>
                  <Heart className="h-4 w-4 mr-1" /> Favorito
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <PropertyGallery images={images} />
            
            <div className="mt-8">
              <Tabs defaultValue="details">
                <TabsList className="mb-4">
                  <TabsTrigger value="details">Detalles</TabsTrigger>
                  <TabsTrigger value="location">Ubicación</TabsTrigger>
                </TabsList>
                
                <TabsContent value="details" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4 flex items-center">
                        <BedDouble className="h-5 w-5 mr-2 text-estate-accent" />
                        <div>
                          <div className="font-semibold">{property.bedrooms}</div>
                          <div className="text-xs text-muted-foreground">Habitaciones</div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4 flex items-center">
                        <Bath className="h-5 w-5 mr-2 text-estate-accent" />
                        <div>
                          <div className="font-semibold">{property.bathrooms}</div>
                          <div className="text-xs text-muted-foreground">Baños</div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4 flex items-center">
                        <Maximize className="h-5 w-5 mr-2 text-estate-accent" />
                        <div>
                          <div className="font-semibold">{property.area} m²</div>
                          <div className="text-xs text-muted-foreground">Superficie</div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Descripción</h3>
                    <div className="space-y-4 text-muted-foreground">
                      {property.description.split('\n\n').map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Características</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div className="flex items-center text-muted-foreground">
                        <span className="h-1.5 w-1.5 rounded-full bg-estate-primary mr-2"></span>
                        <span>Cocina equipada</span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <span className="h-1.5 w-1.5 rounded-full bg-estate-primary mr-2"></span>
                        <span>Aire acondicionado</span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <span className="h-1.5 w-1.5 rounded-full bg-estate-primary mr-2"></span>
                        <span>Calefacción central</span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <span className="h-1.5 w-1.5 rounded-full bg-estate-primary mr-2"></span>
                        <span>Armarios empotrados</span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <span className="h-1.5 w-1.5 rounded-full bg-estate-primary mr-2"></span>
                        <span>Ascensor</span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <span className="h-1.5 w-1.5 rounded-full bg-estate-primary mr-2"></span>
                        <span>Plaza de garaje</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="location">
                  <PropertyMap location={property.location} />
                </TabsContent>
              </Tabs>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <PropertyContactForm propertyId={property.id} propertyTitle={property.title} />
            
            <Card className="mt-6">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Detalles de la propiedad</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">ID de Propiedad</span>
                    <span className="font-medium">{property.id}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tipo</span>
                    <span className="font-medium flex items-center">
                      {getPropertyTypeIcon(property.propertyType)}
                      {property.propertyType === "apartment" ? "Apartamento" : 
                       property.propertyType === "house" ? "Casa" : "Local Comercial"}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Estado</span>
                    <span>{getStatusBadge(property.status)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Publicado</span>
                    <span className="font-medium flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Hace 2 semanas
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default PropertyDetail;