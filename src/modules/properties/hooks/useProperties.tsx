import { useQuery } from "@/hooks/hooks"
import { getProperties } from "../services/property.service"

export const useProperties = () => {
    return useQuery({
      queryKey: ['properties'],
      queryFn: getProperties,
      staleTime: 1000 * 60 * 60, 
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    })
  }