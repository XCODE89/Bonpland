import { useQuery } from "@/hooks/hooks"
import { Contact } from "@/types"
import { getContacts } from "../services/contact.service"

export const useContacts = () => {
    return useQuery<Contact[]>({
      queryKey: ['contacts'],
      queryFn: getContacts,
      staleTime: 1000 * 60 * 60, 
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    })
  }