const API_BASE = import.meta.env.VITE_API_URL;

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

// todo: implementar tipado
  // const getPostById = async (id: number): Promise<Post> => {
  //   const response = await fetch(
  //     `https://jsonplaceholder.typicode.com/posts/${id}`,
  //   )
  //   return await response.json()
  
  
export const getPropertyById = async ({ queryKey }: { queryKey: string[] }) => {
  const [, id] = queryKey;
  const token = localStorage.getItem("token")
  console.log("ya po", id, token)
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