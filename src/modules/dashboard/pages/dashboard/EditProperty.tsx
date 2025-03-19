import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PropertyForm from "@/modules/dashboard/components/PropertyForm";
import { Property } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { useProperty } from "@/modules/properties/hooks/useProperty";
import { useEditProperty } from "@/modules/properties/hooks/useEditProperty";

// Usamos datos de ejemplo para la demostración
// const mockProperties = [
//   {
//     _id: "1",
//     title: "Apartamento de Lujo en Zona Exclusiva",
//     description: "Hermoso apartamento con vistas increíbles",
//     price: 350000,
//     location: {
//       country: "España",
//       city: "Madrid",
//       address: "Direccion en Madrid-España"
//     },
//     bedrooms: 3,
//     bathrooms: 2,
//     area: 120,
//     images: "https://source.unsplash.com/random/300x200/?apartment",
//     featured: true,
//     propertyType: 'apartment',
//     propertyStatus: "for-sale",
//     isNew: true,
//     contractType: "rent",
//   },
//   {
//     _id: "2",
//     title: "Casa Familiar con Jardín",
//     description: "Amplia casa con jardín y piscina",
//     price: 450000,
//     location: {
//       country: "España",
//       city: "Barcelona",
//       address: "Direccion en Barcelona-España"
//     },
//     bedrooms: 4,
//     bathrooms: 3,
//     area: 200,
//     images: "https://source.unsplash.com/random/300x200/?house",
//     featured: true,
//     propertyType: 'house',
//     propertyStatus: "for-sale",
//     isNew: true,
//     contractType: "rent",
//   },
//   {
//     _id: "3",
//     title: "Local Comercial Céntrico",
//     description: "Local comercial en zona de alto tránsito",
//     price: 250000,
//     location: {
//       country: "España",
//       city: "Valencia",
//       address: "Direccion en Valencia-España"
//     },
//     bedrooms: 0,
//     bathrooms: 1,
//     area: 80,
//     images: "https://source.unsplash.com/random/300x200/?store",
//     featured: false,
//     propertyType: 'commercial',
//     propertyStatus: "for-rent",
//     isNew: true,
//     contractType: "for-rent",
//   },
// ];

const EditProperty = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data } = useProperty(id ?? "")
  console.log("data", data)
  const { mutate: editProperty, isPending } = useEditProperty()
  const { toast } = useToast();
  const [property, setProperty] = useState<Property | null>(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    if (data) {
      setProperty(data);
    } else {
      toast({
        title: "Error",
        description: "No se encontró la propiedad solicitada.",
        variant: "destructive",
      });
      navigate("/dashboard/properties");
    }
    
    setIsFetching(false);
  }, [id, navigate, toast, data]);

  const handleSubmit = (formData: Partial<Property>) => {
    console.log("importantte", data)
    if (id) editProperty({id, formData})
    navigate("/dashboard/properties");
  };

  if (isFetching) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="text-center">
        <h2 className="text-xl font-semibold">Propiedad no encontrada</h2>
        <p>La propiedad que estás buscando no existe o ha sido eliminada.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Editar Propiedad</h1>
        <p className="text-muted-foreground">
          Modifica los datos de la propiedad seleccionada.
        </p>
      </div>
      
      <PropertyForm 
        property={property} 
        onSubmit={handleSubmit} 
        isLoading={isPending} 
      />
    </div>
  );
};

export default EditProperty;