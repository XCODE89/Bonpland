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
