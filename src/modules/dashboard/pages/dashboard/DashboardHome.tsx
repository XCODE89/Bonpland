import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, DollarSign, Users, Clock } from "lucide-react";

const statCards = [
  {
    title: "Total Propiedades",
    value: "42",
    icon: Building,
    description: "12 nuevas este mes",
    color: "bg-blue-500",
  },
  {
    title: "Contactos Recibidos",
    value: "87",
    icon: Users,
    description: "24 sin responder",
    color: "bg-emerald-500",
  },
  {
    title: "Ingresos Estimados",
    value: "$230,500",
    icon: DollarSign,
    description: "+18% desde el mes pasado",
    color: "bg-purple-500",
  },
  {
    title: "Tiempo Promedio de Venta",
    value: "32 días",
    icon: Clock,
    description: "4 días menos que el mes pasado",
    color: "bg-amber-500",
  },
];

const DashboardHome = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Panel Principal</h1>
        <p className="text-sm text-muted-foreground">
          Último acceso: {new Date().toLocaleDateString()}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <div className={`${card.color} p-2 rounded-md`}>
                <card.icon className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {card.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Propiedades Destacadas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Aquí se mostrarán gráficos o estadísticas de propiedades destacadas.
            </p>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Contactos Recientes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Aquí se mostrarán los últimos contactos recibidos.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardHome;