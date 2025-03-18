import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";


interface PropertyContactFormProps {
  propertyId: string;
  propertyTitle: string;
}

const PropertyContactForm = ({ propertyId, propertyTitle }: PropertyContactFormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [referenceCode, setReferenceCode] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  console.log(propertyId)

  const API_BASE = import.meta.env.VITE_API_URL; 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!name || !email || !referenceCode || !message) {
      toast({
        title: "Error",
        description: "Por favor, complete todos los campos del formulario.",
        variant: "destructive",
      });
      return;
    }
  
    setIsSubmitting(true);
  
    try {
      const response = await fetch(`${API_BASE}/contactMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          referenceCode, 
          message,
        }),
      });
      if (!response.ok) throw new Error("Error al enviar el formulario");
      toast({
        title: "Mensaje enviado",
        description: "Un agente se pondrá en contacto con usted lo antes posible.",
      });
      setName("");
      setEmail("");
      setMessage("");
      setReferenceCode("")
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema al enviar el mensaje, inténtelo de nuevo.",
        variant: "destructive",
      });
      console.error("Error al enviar el formulario:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-4">¿Interesado en esta propiedad?</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Complete el formulario a continuación y un agente inmobiliario se pondrá en contacto con usted lo antes posible.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="text"
              placeholder="Nombre completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full"
            />
          </div>
          
          <div>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
            />
          </div>
          
          <div>
            <Input
              type="tel"
              placeholder="Código de referencia del inmueble"
              value={referenceCode}
              onChange={(e) => setReferenceCode(e.target.value)}
              className="w-full"
            />
          </div>
          
          <div>
            <textarea
              placeholder="Mensaje"
              rows={4}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              defaultValue={`Hola, estoy interesado en "${propertyTitle}". Por favor, contacten conmigo lo antes posible.`}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          
          <Button type="submit" className="w-full bg-estate-primary hover:bg-estate-primary/90" disabled={isSubmitting}>
            {isSubmitting ? "Enviando..." : "Enviar mensaje"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PropertyContactForm;
