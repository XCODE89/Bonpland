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

// export const getProperties = async () => {
//   console.log("peticion")
//   const response = await fetch(`${API_BASE}/getProperties`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   }).then(response => response.json())

//   if (!response.ok) {
//     throw new Error(`Error ${response.status}: ${response.statusText}`)
//   }
//   return await response.getProperties
// } 