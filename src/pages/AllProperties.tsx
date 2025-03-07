import { useState } from "react";
import { BedDouble, Bath, Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PropertyCard from "@/components/PropertyCard";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

// Datos de ejemplo (en un proyecto real, esto vendría de una API)
const allProperties = [
  {
    id: 1,
    title: "Ático de lujo con vistas panorámicas",
    location: "Polanco, Ciudad de México",
    price: "$3,500,000",
    image: "https://http2.mlstatic.com/D_NQ_NP_2X_635154-MLC80454745238_112024-F-ronda-santo-domingo.webp",
    beds: 3,
    baths: 2,
    sqft: 150,
    featured: true,
    propertyType: "apartment",
    status: "for-sale",
  },
  {
    id: 2,
    title: "Apartamento moderno en zona exclusiva",
    location: "Condesa, Ciudad de México",
    price: "$2,200,000",
    image: "https://http2.mlstatic.com/D_NQ_NP_2X_635154-MLC80454745238_112024-F-ronda-santo-domingo.webp",
    beds: 2,
    baths: 2,
    sqft: 120,
    isNew: true,
    propertyType: "apartment",
    status: "for-sale",
  },
  {
    id: 3,
    title: "Penthouse con terraza privada",
    location: "Santa Fe, Ciudad de México",
    price: "$4,100,000",
    image: "https://http2.mlstatic.com/D_NQ_NP_2X_635154-MLC80454745238_112024-F-ronda-santo-domingo.webp",
    beds: 4,
    baths: 3,
    sqft: 220,
    featured: true,
    propertyType: "penthouse",
    status: "for-sale",
  },
  {
    id: 4,
    title: "Apartamento con diseño contemporáneo",
    location: "Roma Norte, Ciudad de México",
    price: "$1,900,000",
    image: "https://http2.mlstatic.com/D_NQ_NP_2X_635154-MLC80454745238_112024-F-ronda-santo-domingo.webp",
    beds: 2,
    baths: 1,
    sqft: 95,
    isNew: true,
    propertyType: "apartment",
    status: "for-rent",
  },
  {
    id: 5,
    title: "Dúplex con amenidades exclusivas",
    location: "Lomas de Chapultepec, CDMX",
    price: "$5,200,000",
    image: "https://http2.mlstatic.com/D_NQ_NP_2X_635154-MLC80454745238_112024-F-ronda-santo-domingo.webp",
    beds: 4,
    baths: 3,
    sqft: 280,
    featured: true,
    propertyType: "duplex",
    status: "for-sale",
  },
  {
    id: 6,
    title: "Casa familiar con jardín amplio",
    location: "Coyoacán, Ciudad de México",
    price: "$3,800,000",
    image: "https://http2.mlstatic.com/D_NQ_NP_2X_635154-MLC80454745238_112024-F-ronda-santo-domingo.webp",
    beds: 4,
    baths: 3,
    sqft: 250,
    propertyType: "house",
    status: "for-sale",
  },
  {
    id: 7,
    title: "Loft industrial renovado",
    location: "Del Valle, Ciudad de México",
    price: "$1,750,000",
    image: "https://http2.mlstatic.com/D_NQ_NP_2X_635154-MLC80454745238_112024-F-ronda-santo-domingo.webp",
    beds: 1,
    baths: 1,
    sqft: 85,
    isNew: true,
    propertyType: "loft",
    status: "for-rent",
  },
  {
    id: 8,
    title: "Residencia con alberca privada",
    location: "Jardines del Pedregal, CDMX",
    price: "$7,500,000",
    image: "https://http2.mlstatic.com/D_NQ_NP_2X_635154-MLC80454745238_112024-F-ronda-santo-domingo.webp",
    beds: 5,
    baths: 4,
    sqft: 450,
    featured: true,
    propertyType: "house",
    status: "for-sale",
  },
  {
    id: 9,
    title: "Departamento cerca del centro histórico",
    location: "Centro, Ciudad de México",
    price: "$1,200,000",
    image: "https://http2.mlstatic.com/D_NQ_NP_2X_635154-MLC80454745238_112024-F-ronda-santo-domingo.webp",
    beds: 2,
    baths: 1,
    sqft: 90,
    propertyType: "apartment",
    status: "for-rent",
  },
];

const AllProperties = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [propertyType, setPropertyType] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [minBeds, setMinBeds] = useState<number | null>(null);
  const [minBaths, setMinBaths] = useState<number | null>(null);

  // Filtrar propiedades basado en los criterios seleccionados
  const filteredProperties = allProperties.filter((property) => {
    // Filtro por término de búsqueda
    if (
      searchTerm &&
      !property.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !property.location.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }

    // Filtro por tipo de propiedad
    if (propertyType && property.propertyType !== propertyType) {
      return false;
    }

    // Filtro por estado (venta/renta)
    if (status && property.status !== status) {
      return false;
    }

    // Filtro por número mínimo de habitaciones
    if (minBeds !== null && property.beds < minBeds) {
      return false;
    }

    // Filtro por número mínimo de baños
    if (minBaths !== null && property.baths < minBaths) {
      return false;
    }

    return true;
  });

  // Función para obtener clases CSS para los botones de filtro
  const getFilterBadgeClass = (isActive: boolean) =>
    isActive
      ? "bg-estate-primary text-white hover:bg-estate-primary/90"
      : "bg-muted/60 text-muted-foreground hover:bg-muted";

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      <div className="py-12 bg-estate-secondary/5">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto mb-10">
            <h1 className="text-3xl font-bold mb-4">Todas las propiedades</h1>
            <p className="text-muted-foreground">
              Explora nuestra colección completa de propiedades inmobiliarias de alta calidad
            </p>
          </div>

          {/* Barra de búsqueda */}
          <Card className="shadow-md mb-10">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Buscar por ubicación o nombre..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div>
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full flex justify-between"
                    onClick={() => {
                      setPropertyType(null);
                      setStatus(null);
                      setMinBeds(null);
                      setMinBaths(null);
                      setSearchTerm("");
                    }}
                  >
                    <span>Limpiar filtros</span>
                    <SlidersHorizontal className="h-4 w-4 ml-2" />
                  </Button>
                </div>
                
                <div>
                  <Button
                    variant="default"
                    size="lg"
                    className="w-full bg-estate-primary hover:bg-estate-primary/90"
                  >
                    Buscar propiedades
                  </Button>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-3">Tipo de propiedad</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      className={`cursor-pointer ${getFilterBadgeClass(propertyType === "apartment")}`}
                      onClick={() => setPropertyType(propertyType === "apartment" ? null : "apartment")}
                    >
                      Apartamento
                    </Badge>
                    <Badge
                      className={`cursor-pointer ${getFilterBadgeClass(propertyType === "house")}`}
                      onClick={() => setPropertyType(propertyType === "house" ? null : "house")}
                    >
                      Casa
                    </Badge>
                    <Badge
                      className={`cursor-pointer ${getFilterBadgeClass(propertyType === "penthouse")}`}
                      onClick={() => setPropertyType(propertyType === "penthouse" ? null : "penthouse")}
                    >
                      Penthouse
                    </Badge>
                    <Badge
                      className={`cursor-pointer ${getFilterBadgeClass(propertyType === "duplex")}`}
                      onClick={() => setPropertyType(propertyType === "duplex" ? null : "duplex")}
                    >
                      Dúplex
                    </Badge>
                    <Badge
                      className={`cursor-pointer ${getFilterBadgeClass(propertyType === "loft")}`}
                      onClick={() => setPropertyType(propertyType === "loft" ? null : "loft")}
                    >
                      Loft
                    </Badge>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-3">Estado</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      className={`cursor-pointer ${getFilterBadgeClass(status === "for-sale")}`}
                      onClick={() => setStatus(status === "for-sale" ? null : "for-sale")}
                    >
                      En venta
                    </Badge>
                    <Badge
                      className={`cursor-pointer ${getFilterBadgeClass(status === "for-rent")}`}
                      onClick={() => setStatus(status === "for-rent" ? null : "for-rent")}
                    >
                      En renta
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium mb-3">Habitaciones</h3>
                    <div className="flex flex-wrap gap-2">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <Badge
                          key={`bed-${num}`}
                          className={`cursor-pointer ${getFilterBadgeClass(minBeds === num)}`}
                          onClick={() => setMinBeds(minBeds === num ? null : num)}
                        >
                          {num}+ <BedDouble className="ml-1 h-3 w-3" />
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-3">Baños</h3>
                    <div className="flex flex-wrap gap-2">
                      {[1, 2, 3, 4].map((num) => (
                        <Badge
                          key={`bath-${num}`}
                          className={`cursor-pointer ${getFilterBadgeClass(minBaths === num)}`}
                          onClick={() => setMinBaths(minBaths === num ? null : num)}
                        >
                          {num}+ <Bath className="ml-1 h-3 w-3" />
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Resultados */}
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-xl font-semibold">
              {filteredProperties.length} propiedades encontradas
            </h2>
          </div>

          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} {...property} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No se encontraron propiedades</h3>
              <p className="text-muted-foreground">
                Intenta cambiar los filtros de búsqueda para ver más resultados.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default AllProperties;