import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { addNewContact } from "../services/contact.service";

export const useAddContact = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: addNewContact,
        onSuccess: () => {
            toast({
                title: "Mensaje enviado",
                description: "Un agente se pondrá en contacto con usted lo antes posible.",
            });
            // TODO: cambiar por el query de contactos
            queryClient.invalidateQueries({ queryKey: ["properties"] });
        },
        onError: (error) => {
            toast({
                title: "Error al enviar la solicitud",
                description: `${error.message}`,
                variant: "destructive",
              });
        }
    })
}