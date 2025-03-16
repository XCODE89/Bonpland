import { Outlet, useNavigate } from "react-router-dom";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
    const navigate = useNavigate();
    const { toast } = useToast();

    useEffect(() => {
        // For demo purposes, we'll just check localStorage
        const isAuthenticated = localStorage.getItem("token");
        
        if (!isAuthenticated) {
            toast({
            title: "Acceso denegado",
            description: "Debes iniciar sesión para acceder al panel de administración",
            variant: "destructive",
            });
            navigate("/bl-admin");
        }
        }, [navigate, toast]);
    return (
        <SidebarProvider>
        <div className="min-h-screen flex w-full bg-gray-50">
            <DashboardSidebar />
            <main className="flex-1 p-6 overflow-auto">
            <Outlet />
            </main>
        </div>
        </SidebarProvider>
    );
    };

    export default Dashboard;