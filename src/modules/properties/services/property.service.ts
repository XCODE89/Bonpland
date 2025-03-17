import { NewProperty } from "@/types";

const API_BASE = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("token")

export const addNewProperty = async (property: NewProperty) => {
  const response = await fetch(`${API_BASE}/newProperty`, {
    method: "POST",
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(property),
  })
  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`)
  }

  return await response.json()
}

export const getProperties = async () => {
  const response = await fetch(`${API_BASE}/getAllProperties`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`)
  }

  return await response.json()
} 
  
export const getPropertyById = async ({ queryKey }: { queryKey: string[] }) => {
  const [, id] = queryKey;
  const response = await fetch(`${API_BASE}/getPropertyById/${id}`, {
    method: "GET",
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  })
  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`)
  }

  return await response.json()
}