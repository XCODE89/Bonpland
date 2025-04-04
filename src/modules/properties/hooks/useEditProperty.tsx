import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editProperty } from "../services/property.service";
import { toast } from "@/hooks/use-toast";
import { Property } from "@/types";

export const useEditProperty = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, formData }: { id: string; formData: Partial<Property> }) => editProperty(id, formData),
        onSuccess: () => {
            toast({
                title: "Propiedad actualizada",
                description: "La propiedad se ha actualizado exitosamente",
            });
            queryClient.invalidateQueries({ queryKey: ["properties"] });
        },
        onError: (error) => {
            toast({
                title: "Error al actualizar",
                description: `${error.message}`,
                variant: "destructive",
              });
        }
    })
}