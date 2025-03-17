import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { loginUser } from "../services/auth.service";

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      toast({
        title: "Inicio de sesión exitoso",
        description: "Bienvenido de nuevo al panel de administración",
      });
      navigate("/dashboard");
    },
    onError: (error) => {
      toast({
        title: `${error.message}`,
        description: "Por favor verifique sus credenciales e intente nuevamente",
        variant: "destructive",
      });
    },
  });
};
