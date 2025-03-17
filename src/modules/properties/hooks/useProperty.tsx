import { useQuery } from "@/hooks/hooks"
import { getPropertyById } from "../services/property.service"
import { useQueryClient } from "@tanstack/react-query"

export const useProperty = (propertyId : string) => {

    const queryClient = useQueryClient()

    return useQuery({
      queryKey: ['property', propertyId],
      queryFn: async () => {
        // Intentar obtener los datos del caché
        const cachedData = queryClient.getQueryData(['property', propertyId])
  
        // Si los datos están en caché, devolverlos
        if (cachedData) {
          return cachedData
        }

        console.log("repetimos llamado")
  
        // Si no están en caché, hacer la petición
        return getPropertyById({ queryKey: ['property', propertyId] })
      },
      staleTime: 1000 * 60 * 60, 
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    })
  }