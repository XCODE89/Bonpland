const API_BASE = import.meta.env.VITE_API_URL;

export const loginUser = async (credentials: { email: string; password: string }) => {
    const response = await fetch(`${API_BASE}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
  
    if (!response.ok) throw new Error("Credenciales incorrectas");
  
    return response.json();
  };

// export const updateUser = async (userData) => {
//     try {
//         const response = await axios.put(`${API_BASE}/users`, userData);
//         return response
//     } catch (error) {
//         console.log("error", error)
//         return (error)
//     }
// };

// export const deleteUser = async (userId) => {
//     try {
//         const response = await axios.delete(`${API_BASE}/users/${userId}`,);
//         return response.data
//     } catch (error) {
//         console.log("error", error)
//     }
// };