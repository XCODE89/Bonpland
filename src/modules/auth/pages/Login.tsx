import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Building, LogIn, User, Lock, UserCheck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
// import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
        if (email && password) {
            console.log("Hola")
            //! activar cuando haya usuario
            // const response = await axios.post("/rutaDelBack", {
            //     email, 
            //     password
            // })
            localStorage.setItem("isLoggedIn", "true");
            toast({
              title: "Inicio de sesión exitoso",
              description: "Bienvenido de nuevo al panel de administración",
            });
            navigate("/dashboard");
          } 
    } catch (error) {
        toast({
            title: `Error de inicio de sesión: ${error}`,
            description: "Por favor verifique sus credenciales e intente nuevamente",
            variant: "destructive",
          });

          //! solo para pruebas
          navigate("/dashboard")
    }
      setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left section - image */}
      <div className="hidden md:flex md:w-1/2 bg-estate-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-estate-primary/90 to-estate-primary/70" />
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2075&q=80')",
            backgroundSize: "cover",
            opacity: 0.4
          }}
        ></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-white">
          <Building className="h-16 w-16 mb-6" />
          <h1 className="text-4xl font-bold mb-4 text-center">Bonpland</h1>
          <p className="text-lg text-center max-w-md">
            Accede a tu panel de administración para gestionar propiedades y clientes.
          </p>
        </div>
      </div>

      {/* Right section - login form */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 md:p-12 bg-white">
        <div className="w-full max-w-md space-y-8 animate-fade-in">
          <div className="text-center">
            <Link to="/" className="inline-flex items-center text-estate-primary mb-8">
              <Building className="mr-2 h-6 w-6" />
              <span className="text-xl font-semibold">Bonpland</span>
            </Link>
            <h2 className="text-3xl font-bold tracking-tight">Bienvenido de nuevo</h2>
            <p className="text-muted-foreground mt-2">Ingresa tus credenciales para acceder</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Correo electrónico
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="usuario@ejemplo.com"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label htmlFor="password" className="block text-sm font-medium">
                    Contraseña
                  </label>
                  <Sheet>
                    <SheetTrigger asChild>
                      <button type="button" className="text-sm text-estate-accent hover:underline">
                        ¿Olvidaste tu contraseña?
                      </button>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>Recuperar contraseña</SheetTitle>
                        <SheetDescription>
                          Ingresa tu correo electrónico y te enviaremos instrucciones para recuperar tu contraseña.
                        </SheetDescription>
                      </SheetHeader>
                      <div className="py-6">
                        <div className="space-y-4">
                          <div>
                            <label htmlFor="recovery-email" className="block text-sm font-medium mb-1">
                              Correo electrónico
                            </label>
                            <Input id="recovery-email" type="email" placeholder="usuario@ejemplo.com" />
                          </div>
                          <Button className="w-full">Enviar instrucciones</Button>
                        </div>
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>Iniciando sesión...</>
              ) : (
                <>
                  <LogIn className="mr-2 h-4 w-4" />
                  Iniciar sesión
                </>
              )}
            </Button>
          </form>

          <div className="text-center">
            <span className="text-sm text-muted-foreground">
              ¿No tienes una cuenta?{" "}
              <Sheet>
                <SheetTrigger asChild>
                  <button className="text-estate-accent hover:underline">
                    Contacta con el administrador
                  </button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Solicitar nueva cuenta</SheetTitle>
                    <SheetDescription>
                      Las cuentas son creadas por el administrador. Complete los siguientes campos para enviar una solicitud.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="py-6">
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-1">
                          Nombre completo
                        </label>
                        <Input id="name" type="text" placeholder="Juan Pérez" />
                      </div>
                      <div>
                        <label htmlFor="request-email" className="block text-sm font-medium mb-1">
                          Correo electrónico
                        </label>
                        <Input id="request-email" type="email" placeholder="usuario@ejemplo.com" />
                      </div>
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium mb-1">
                          Empresa / Rol
                        </label>
                        <Input id="company" type="text" placeholder="Agente inmobiliario" />
                      </div>
                      <Button className="w-full">
                        <UserCheck className="mr-2 h-4 w-4" />
                        Enviar solicitud
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;