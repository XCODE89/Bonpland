import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MailOpen, MailX, Archive } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Contact } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { useContacts } from "@/modules/contacts/hooks/useContacts";

// Datos de ejemplo
const mockContacts: Contact[] = [
  {
    id: "1",
    name: "Carlos Rodríguez",
    email: "carlos@example.com",
    phone: "+34 612 345 678",
    message: "Estoy interesado en el apartamento de lujo en Madrid. Me gustaría coordinar una visita lo antes posible.",
    referenceCode: "1",
    dateCreated: "2023-06-10T15:30:45Z",
    status: "new",
  },
  {
    id: "2",
    name: "María López",
    email: "maria@example.com",
    phone: "+34 623 456 789",
    message: "Me interesa la casa familiar con jardín. ¿Hay posibilidad de negociar el precio?",
    referenceCode: "2",
    dateCreated: "2023-06-09T10:15:20Z",
    status: "contacted",
  },
  {
    id: "3",
    name: "Juan García",
    email: "juan@example.com",
    phone: "+34 634 567 890",
    message: "Quisiera obtener más información sobre el local comercial en Valencia.",
    referenceCode: "3",
    dateCreated: "2023-06-08T09:45:30Z",
    status: "closed",
  },
];

const ContactsManagement = () => {
  const {data} = useContacts()
  console.log("data de contactos", data)
  const [contacts, setContacts] = useState<Contact[]>(mockContacts);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUpdateStatus = (id: string, newStatus: Contact["status"]) => {
    setContacts(
      contacts.map((contact) =>
        contact.id === id ? { ...contact, status: newStatus } : contact
      )
    );
    
    toast({
      title: "Estado actualizado",
      description: "El estado del contacto ha sido actualizado correctamente.",
    });
  };

  const getStatusBadge = (status: Contact["status"]) => {
    switch (status) {
      case "new":
        return <Badge className="bg-blue-500">Nuevo</Badge>;
      case "contacted":
        return <Badge className="bg-amber-500">Contactado</Badge>;
      case "closed":
        return <Badge className="bg-green-500">Finalizado</Badge>;
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Contactos</h1>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar contactos..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <div className="overflow-x-auto">
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contacto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mensaje
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredContacts.map((contact) => (
                <tr key={contact.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {contact.name}
                    </div>
                    <div className="text-xs text-gray-500">{contact.email}</div>
                    <div className="text-xs text-gray-500">{contact.phone}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500 max-w-md line-clamp-2">
                      {contact.message}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(contact.dateCreated)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(contact.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex gap-2">
                      {contact.status === "new" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleUpdateStatus(contact.id, "contacted")}
                        >
                          <MailOpen className="h-4 w-4 text-amber-500" />
                        </Button>
                      )}
                      {contact.status !== "closed" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleUpdateStatus(contact.id, "closed")}
                        >
                          <Archive className="h-4 w-4 text-green-500" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        asChild
                      >
                        <a href={`mailto:${contact.email}`}>
                          <MailX className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ContactsManagement;