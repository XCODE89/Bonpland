import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAddContact } from "@/modules/contacts/hooks/useAddContact";
import { toast } from "@/hooks/use-toast";

interface PropertyContactFormProps {
  propertyId: string;
  propertyTitle: string;
}

const PropertyContactForm = ({ propertyId, propertyTitle }: PropertyContactFormProps) => {
  const mutation = useAddContact()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState(`Hola, estoy interesado en "${propertyTitle}". Por favor, contacten conmigo lo antes posible.`);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !phone || !message) {
      toast({
        title: "Error",
        description: "Por favor, complete todos los campos del formulario.",
        variant: "destructive",
      });
      return;
    }    
    
    const contact = {
      name,
      email,
      phone,
      message,
      referenceCode: `${propertyId}`,
      status:"new"
    }
    mutation.mutate(contact)
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
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
              placeholder="Teléfono"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full"
            />
          </div>
          
          <div>
            <textarea
              placeholder="Mensaje"
              rows={4}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          
          <Button type="submit" className="w-full bg-estate-primary hover:bg-estate-primary/90" disabled={mutation.isPending}>
            {mutation.isPending ? "Enviando..." : "Enviar mensaje"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PropertyContactForm;