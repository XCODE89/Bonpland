import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewProperty } from "../services/property.service";
import { toast } from "@/hooks/use-toast";

export const useAddProperty = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: addNewProperty,
        onSuccess: () => {
            toast({
                title: "Propiedad agregada",
                description: "La propiedad se ha agregado exitosamente",
            });
            queryClient.invalidateQueries({ queryKey: ["properties"] });
        },
        onError: (error) => {
            toast({
                title: "Error al agregar",
                description: `${error.message}`,
                variant: "destructive",
              });
        }
    })
}