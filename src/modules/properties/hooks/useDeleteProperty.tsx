import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProperty } from "../services/property.service";
import { toast } from "@/hooks/use-toast";

export const useDeleteProperty = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (propertyId: string) => deleteProperty(propertyId),
        onSuccess: () => {
            toast({
                title: "Propiedad eliminada",
                description: "La propiedad se ha eliminado exitosamente",
            });
            queryClient.invalidateQueries({ queryKey: ["properties"] });
        },
        onError: (error) => {
            toast({
                title: "Error al eliminar",
                description: `${error.message}`,
                variant: "destructive",
              });
        }
    })
}