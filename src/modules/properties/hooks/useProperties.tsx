import { useQuery } from "@/hooks/hooks"
import { getProperties } from "../services/property.service"
import { Property } from "@/types"

export const useProperties = () => {
    return useQuery<Property[]>({
      queryKey: ['properties'],
      queryFn: getProperties,
      staleTime: 1000 * 60 * 60, 
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    })
  }