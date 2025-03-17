import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropertyForm from "@/modules/dashboard/components/PropertyForm";
import { Property } from "@/types";
import { useAddProperty } from "@/modules/properties/hooks/useAddProperty";

const AddProperty = () => {
  const mutation = useAddProperty()
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (data: Partial<Property>) => {
    setIsLoading(true);

    mutation.mutate(data)
    setTimeout(() => {
      // Generamos un ID único para la nueva propiedad
      const newProperty = {
        ...data,
        id: `${Date.now()}`, // Usando timestamp como ID temporal
      };
      console.log(newProperty)
      
      // En una aplicación real, aquí guardaríamos en la base de datos
      // Por ahora, solo mostraremos un toast de éxito
      
      
      setIsLoading(false);
      navigate("/dashboard/properties");
    }, 1000);


  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Crear Nueva Propiedad</h1>
        <p className="text-muted-foreground">
          Completa el formulario para agregar una nueva propiedad al sistema.
        </p>
      </div>
      
      <PropertyForm onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  );
};

export default AddProperty;