
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { useToast } from "@/hooks/use-toast";
import { Property } from "@/types";
import { MapPin, DollarSign, Home, Tag, BedDouble, Bath, Maximize, ImagePlus } from "lucide-react";

interface PropertyFormProps {
  property?: Property;
  onSubmit: (data: Partial<Property>) => void;
  isLoading?: boolean;
}

const PropertyForm = ({ property, onSubmit, isLoading = false }: PropertyFormProps) => {
  const navigate = useNavigate();
  const isEditMode = !!property;

  const [activeTab, setActiveTab] = useState<string>("basic");

  const tabs = ["basic", "details", "images"];  // El orden de las pestañas
  const currentTabIndex = tabs.indexOf(activeTab);

  const handleChangeTab = (direction: "next" | "prev") => {
    const newIndex = direction === "next" ? currentTabIndex + 1 : currentTabIndex - 1;
    setActiveTab(tabs[newIndex]);
  };

  const [formData, setFormData] = useState<Partial<Property>>({
    title: "",
    description: "",
    price: 0,
    location: {
      country: "",
      city: "",
      address: "",
    },
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    images: ["https://img.freepik.com/vector-gratis/logo-propiedad-siluetas-casas_1025-20.jpg?t=st=1742234030~exp=1742237630~hmac=937a850fbac29ac5d697770a7e4a1d56e1c527b8462ac9304fbb5794e2cde0e3&w=740"],
    propertyType: "Departamento",
    contractType: "Venta",
    propertyStatus: "Disponible",
    featured: false,
    isNewProperty: false
  });

  useEffect(() => {
    if (property) {
      console.log("carga la info?", property.images[0])
      setFormData(property);
    }
  }, [property]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const target = e.target as HTMLInputElement;
      setFormData({
        ...formData,
        [name]: target.checked,
      });
    } else if (type === "number") {
      setFormData({
        ...formData,
        [name]: parseFloat(value) || 0,
      });
    } else {
      if(name === "images") {
        console.log("cambiando")
        setFormData({
          ...formData,
          images: formData.images ? [value, ...formData.images] : [value]
        })
      }else if (formData.location && name in formData.location) {
        setFormData({
          ...formData,
          location: {
            ...formData.location,
            [name]: value,
          },
        });
      } else {
        setFormData({
          ...formData,
          [name]: value,
        });
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="basic">Información Básica</TabsTrigger>
          <TabsTrigger value="details">Detalles</TabsTrigger>
          <TabsTrigger value="images">Imágenes</TabsTrigger>
        </TabsList>

        <TabsContent value="basic">
          <Card>
            <CardHeader>
              <CardTitle>Información Básica</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">
                  Título de la Propiedad
                </label>
                <div className="relative">
                  <Home className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="title"
                    name="title"
                    placeholder="Ingrese el título de la propiedad"
                    className="pl-10"
                    value={formData?.title || ""}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Descripción
                </label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Descripción detallada de la propiedad"
                  className="w-full min-h-[120px] px-3 py-2 rounded-md border border-input"
                  value={formData.description || ""}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="price" className="text-sm font-medium">
                  Precio
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    placeholder="Precio"
                    className="pl-10"
                    value={formData.price || 0}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Ubicación
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="country"
                    name="country"
                    placeholder="País"
                    className="pl-10"
                    value={formData.location?.country}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="city"
                    name="city"
                    placeholder="Ciudad"
                    className="pl-10"
                    value={formData.location?.city}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="address"
                    name="address"
                    placeholder="Direccion"
                    className="pl-10"
                    value={formData.location?.address}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="propertyStatus" className="text-sm font-medium">
                    Estado
                  </label>
                  <select
                    id="propertyStatus"
                    name="propertyStatus"
                    className="w-full h-10 px-3 rounded-md border border-input"
                    value={formData.propertyStatus || ""}
                    onChange={handleChange}
                    required
                  >
                    <option value="for-sale">En Venta</option>
                    <option value="for-rent">En Alquiler</option>
                    <option value="sold">Vendido</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="propertyType" className="text-sm font-medium">
                    Tipo de Propiedad
                  </label>
                  <div className="relative">
                    <Tag className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <select
                      id="propertyType"
                      name="propertyType"
                      className="w-full h-10 pl-10 px-3 rounded-md border border-input"
                      value={formData.propertyType || ""}
                      onChange={handleChange}
                      required
                    >
                      <option value="apartment">Apartamento</option>
                      <option value="house">Casa</option>
                      <option value="commercial">Comercial</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  className="rounded border-gray-300"
                  checked={formData.featured || false}
                  onChange={(e) => 
                    setFormData({
                      ...formData,
                      featured: e.target.checked,
                    })
                  }
                />
                <label htmlFor="featured" className="text-sm font-medium">
                  Destacar esta propiedad
                </label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle>Detalles de la Propiedad</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label htmlFor="bedrooms" className="text-sm font-medium">
                    Habitaciones
                  </label>
                  <div className="relative">
                    <BedDouble className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="bedrooms"
                      name="bedrooms"
                      type="number"
                      placeholder="Número de habitaciones"
                      className="pl-10"
                      value={formData.bedrooms || 0}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="bathrooms" className="text-sm font-medium">
                    Baños
                  </label>
                  <div className="relative">
                    <Bath className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="bathrooms"
                      name="bathrooms"
                      type="number"
                      placeholder="Número de baños"
                      className="pl-10"
                      value={formData.bathrooms || 0}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="area" className="text-sm font-medium">
                    Área (m²)
                  </label>
                  <div className="relative">
                    <Maximize className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="area"
                      name="area"
                      type="number"
                      placeholder="Área en m²"
                      className="pl-10"
                      value={formData.area || 0}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="images">
          <Card>
            <CardHeader>
              <CardTitle>Imágenes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="imageUrl" className="text-sm font-medium">
                  URL de la Imagen Principal
                </label>
                <div className="relative">
                  <ImagePlus className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="images"
                    name="images"
                    placeholder="URL de la imagen"
                    className="pl-10"
                    value={formData.images?.[0] || ""}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                <ImagePlus className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-4">
                  <p className="text-sm text-gray-500">
                    Arrastra y suelta imágenes aquí o haz clic para seleccionar archivos
                  </p>
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  PNG, JPG, GIF hasta 10MB
                </p>
                <Button type="button" variant="outline" size="sm" className="mt-4">
                  Seleccionar archivos
                </Button>
              </div>

              {formData.images && (
                <div className="mt-4">
                  <p className="mb-2 text-sm font-medium">Vista previa:</p>
                  <img 
                    src={formData.images[0]} 
                    alt="Vista previa" 
                    className="h-40 w-full object-cover rounded-md"
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <CardFooter className="flex justify-between mt-6 px-0">
          <Button 
            type="button" 
            variant="outline"
            onClick={() => navigate("/dashboard/properties")}
          >
            Cancelar
          </Button>

          <>
            {currentTabIndex !== 0 && <Button type="button" onClick={() => handleChangeTab("prev")}>
              Anterior
            </Button>}
            {currentTabIndex !== 2 && <Button type="button" onClick={() => handleChangeTab("next")}>
              Siguiente
            </Button>}
            
          </>
        
        {activeTab === "images" &&
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Guardando..." : isEditMode ? "Actualizar propiedad" : "Crear propiedad"}
            </Button>
        }
        </CardFooter>
      </Tabs>
    </form>
  );
};

export default PropertyForm;
