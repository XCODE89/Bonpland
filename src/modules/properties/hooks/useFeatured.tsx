import { useQuery } from "@/hooks/hooks"
import { getFeaturedProperties } from "../services/property.service"
import { Property } from "@/types"

export const useFeatured = () => {
    return useQuery<Partial<Property[]>>({
      queryKey: ['featured'],
      queryFn: getFeaturedProperties,
      staleTime: 1000 * 60 * 60, 
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    })
  }