import { Property } from "@/types";

const API_BASE = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("token")

export const addNewProperty = async (property: Partial<Property>) => {
  const response = await fetch(`${API_BASE}/newProperty`, {
    method: "POST",
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(property),
  })
  console.log("agregando", response)
  if (!response.ok) {
    throw new Error(`Error ${response.status}: No se agregó la propiedad`)
  }

  return await response.json()
}

export const getProperties = async () => {
  const response = await fetch(`${API_BASE}/getProperties`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`)
  }
  const data = await response.json();
  return await data.getProperties
} 
  
export const getPropertyById = async ({ queryKey }: { queryKey: string[] }) => {
  const [, id] = queryKey;
  const response = await fetch(`${API_BASE}/getPropertyById/${id}`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
    }
  })
  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`)
  }

  const data = await response.json();
  return await data.property
}

export const getFeaturedProperties = async () => {
  const response = await fetch(`${API_BASE}/getDestacados`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`)
  }
  
  const data = await response.json();
  console.group("servicio", data)
  return data
} 

export const editProperty = async (id: string, formdata: Partial<Property>) => {
  const response = await fetch(`${API_BASE}/updateProperty/${id}`, {
    method: "PUT",
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formdata)
  })

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`)
  }

  return await response.json()
}

export const deleteProperty = async (id: string) => {
  const response = await fetch(`${API_BASE}/deleteProperty/${id}`, {
    method: "DELETE",
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`)
  }
  const data = await response.json();
  return data
}
