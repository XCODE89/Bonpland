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
import PropertyDetail from "./modules/properties/pages/PropertyDetail";
import AllProperties from "./modules/properties/pages/AllProperties";
import { About } from "./modules/about/pages/About";
import AddProperty from "./modules/dashboard/pages/dashboard/AddProperty";
import EditProperty from "./modules/dashboard/pages/dashboard/EditProperty";
import { LoadScript } from "@react-google-maps/api";

const googleMap = import.meta.env.VITE_GOOGLE_API

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient} >
    <TooltipProvider>
    <LoadScript googleMapsApiKey={googleMap} libraries={["places"]}>

      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bl-admin" element={<Login />} />
          <Route path="/properties" element={<AllProperties />} />
          <Route path="/property/:id" element={<PropertyDetail />} />
          <Route path="/about" element={<About />} />

          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<DashboardHome />} />
            <Route path="properties" element={<PropertiesManagement />} />
            <Route path="properties/add" element={<AddProperty />} />
            <Route path="properties/edit/:id" element={<EditProperty />} />
            <Route path="contacts" element={<ContactsManagement />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </LoadScript>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;