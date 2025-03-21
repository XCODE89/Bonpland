import { Contact } from "@/types";

const API_BASE = import.meta.env.VITE_API_URL;

export const addNewContact = async (contact:Partial<Contact>) => {
  const response = await fetch(`${API_BASE}/contactMessage`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(contact),
  })
  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`)
  }

  return await response.json()
}

export const getContacts = async () => {
  const response = await fetch(`${API_BASE}/getContactMessage`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}. No se pudo traer la informacion`)
  }
  const data = await response.json();
  console.log("contactos", data.getcontactMessage)
  return await data.getcontactMessage
}