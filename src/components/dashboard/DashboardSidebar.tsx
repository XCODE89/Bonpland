import { NavLink, useNavigate } from "react-router-dom";
import { Home, Building, Users, Settings, LogOut, PieChart } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useToast } from "@/hooks/use-toast";

const menuItems = [
  {
    title: "Panel Principal",
    path: "/dashboard",
    icon: PieChart,
    exact: true,
  },
  {
    title: "Propiedades",
    path: "/dashboard/properties",
    icon: Building,
  },
  {
    title: "Contactos",
    path: "/dashboard/contacts",
    icon: Users,
  },
  {
    title: "Configuración",
    path: "/dashboard/settings",
    icon: Settings,
  },
];

const DashboardSidebar = () => {

    const navigate = useNavigate();
    const { toast } = useToast();

    const handleLogout = () => {
        // Clear auth state
        localStorage.removeItem("isLoggedIn");
        
        toast({
        title: "Sesión cerrada",
        description: "Has cerrado sesión correctamente",
        });
        
        navigate("/bl-admin");
    };

  return (
    <Sidebar>
      <SidebarHeader className="p-4 border-b">
        <NavLink to="/" className="flex items-center gap-2">
          <span className="font-bold text-xl">Bonpland</span>
        </NavLink>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Gestión</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.path} 
                      end={item.exact}
                      className={({ isActive }) => 
                        isActive ? "bg-sidebar-accent text-sidebar-primary font-medium" : ""
                      }
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <div className="w-full flex flex-col gap-2">
          <SidebarMenuButton asChild>
            <NavLink to="/" className="flex items-center gap-2">
              <Home className="h-5 w-5" />
              <span>Volver al sitio</span>
            </NavLink>
          </SidebarMenuButton>
          <SidebarMenuButton className="text-red-500 hover:bg-red-50" onClick={handleLogout}>
            <LogOut className="h-5 w-5" />
            <span>Cerrar sesión</span>
          </SidebarMenuButton>
        </div>
      </SidebarFooter>
      
      <div className="absolute right-[-12px] top-4">
        <SidebarTrigger />
      </div>
    </Sidebar>
  );
};

export default DashboardSidebar;