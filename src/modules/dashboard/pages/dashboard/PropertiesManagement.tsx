import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Search, Edit, Trash2, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Property } from "@/types";
// import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useProperties } from "@/modules/properties/hooks/useProperties";
import { useDeleteProperty } from "@/modules/properties/hooks/useDeleteProperty";

// Datos de ejemplo
// const mockProperties: Property[] = [
//   {
//     id: "1",
//     title: "Apartamento de Lujo en Zona Exclusiva",
//     description: "Hermoso apartamento con vistas increíbles",
//     price: 350000,
//     location: "Madrid, España",
//     bedrooms: 3,
//     bathrooms: 2,
//     area: 120,
//     imageUrl: "https://source.unsplash.com/random/300x200/?apartment",
//     featured: true,
//     propertyType: "apartment",
//     propertyStatus: "for-sale",
//   },
//   {
//     id: "2",
//     title: "Casa Familiar con Jardín",
//     description: "Amplia casa con jardín y piscina",
//     price: 450000,
//     location: "Barcelona, España",
//     bedrooms: 4,
//     bathrooms: 3,
//     area: 200,
//     imageUrl: "https://source.unsplash.com/random/300x200/?house",
//     featured: true,
//     propertyType: "house",
//     propertyStatus: "for-sale",
//   },
//   {
//     id: "3",
//     title: "Local Comercial Céntrico",
//     description: "Local comercial en zona de alto tránsito",
//     price: 250000,
//     location: "Valencia, España",
//     bedrooms: 0,
//     bathrooms: 1,
//     area: 80,
//     imageUrl: "https://source.unsplash.com/random/300x200/?store",
//     featured: false,
//     propertyType: "commercial",
//     propertyStatus: "for-rent",
//   },
// ];

const PropertiesManagement = () => {
  const navigate = useNavigate();
  const {data, isPending} = useProperties()
  const { mutate: deleteProperty } = useDeleteProperty()

  const [searchTerm, setSearchTerm] = useState("");

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-semibold">Cargando propiedades...</p>
      </div>
    );
  }

  const filteredProperties = data?.filter(
    (property) =>
      property.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location?.country?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location?.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location?.address?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteProperty = (id: string) => {
    deleteProperty(id);
  };

  const handleAddProperty = () => {
    navigate("/dashboard/properties/add");
  };

  const handleEditProperty = (id: string) => {
    navigate(`/dashboard/properties/edit/${id}`);
  };

  const handleViewProperty = (id: string) => {
    navigate(`/property/${id}`);
  };

  const getStatusBadge = (status: Property["propertyStatus"]) => {
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

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Propiedades</h1>
        <Button onClick={handleAddProperty}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nueva Propiedad
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar propiedades..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <div className="overflow-x-auto">
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Propiedad
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ubicación
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Precio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProperties?.map((property) => (
                <tr key={property._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-md object-cover"
                          src={property.images[0]}
                          alt={property.title}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {property.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          {property.bedrooms} hab • {property.bathrooms} baños • {property.area} m²
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {property.location. city} - {property.location. country}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatPrice(property.price)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(property.propertyStatus)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleViewProperty(property._id)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleEditProperty(property._id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteProperty(property._id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PropertiesManagement;