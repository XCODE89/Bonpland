import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./modules/home/pages/Home";
import NotFound from "./pages/NotFound";
import Dashboard from "./modules/dashboard/pages/Dashboard";
import DashboardHome from "./modules/dashboard/pages/dashboard/DashboardHome";
import PropertiesManagement from "./modules/dashboard/pages/dashboard/PropertiesManagement";
import ContactsManagement from "./modules/dashboard/pages/dashboard/ContactsManagement";
import SettingsPage from "./modules/dashboard/pages/dashboard/SettingsPage";
import Login from "./modules/auth/pages/Login";
import PropertyDetail from "./pages/PropertyDetail";
import AllProperties from "./pages/AllProperties";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bl-admin" element={<Login />} />
          <Route path="/properties" element={<AllProperties />} />
          <Route path="/property/:id" element={<PropertyDetail />} />

          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<DashboardHome />} />
            <Route path="properties" element={<PropertiesManagement />} />
            <Route path="contacts" element={<ContactsManagement />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;