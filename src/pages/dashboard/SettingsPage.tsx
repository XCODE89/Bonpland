import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const SettingsPage = () => {
  const { toast } = useToast();

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Configuración guardada",
      description: "Los cambios han sido guardados correctamente.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Configuración</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Perfil del Administrador</CardTitle>
            <CardDescription>
              Modifica la información de tu perfil de administrador.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSaveSettings}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Nombre
                </label>
                <Input id="name" defaultValue="Admin" />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Correo Electrónico
                </label>
                <Input id="email" type="email" defaultValue="admin@example.com" />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Nueva Contraseña
                </label>
                <Input id="password" type="password" />
              </div>
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium">
                  Confirmar Contraseña
                </label>
                <Input id="confirmPassword" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit">Guardar Cambios</Button>
            </CardFooter>
          </form>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Configuración del Sitio</CardTitle>
            <CardDescription>
              Configura los parámetros generales del sitio web.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSaveSettings}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="siteName" className="text-sm font-medium">
                  Nombre del Sitio
                </label>
                <Input id="siteName" defaultValue="Mi Inmobiliaria" />
              </div>
              <div className="space-y-2">
                <label htmlFor="contactEmail" className="text-sm font-medium">
                  Email de Contacto
                </label>
                <Input id="contactEmail" type="email" defaultValue="info@inmobiliaria.com" />
              </div>
              <div className="space-y-2">
                <label htmlFor="contactPhone" className="text-sm font-medium">
                  Teléfono de Contacto
                </label>
                <Input id="contactPhone" defaultValue="+34 912 345 678" />
              </div>
              <div className="space-y-2">
                <label htmlFor="address" className="text-sm font-medium">
                  Dirección
                </label>
                <Input id="address" defaultValue="Calle Principal 123, Madrid" />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit">Guardar Cambios</Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default SettingsPage;