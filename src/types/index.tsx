type Location = {
  country: string;
  city: string;
  address: string;
};

export interface Property {
    _id: string;
    title: string;
    description?: string;
    price: number;
    location: Location;
    bedrooms: number;
    bathrooms: number;
    area: number;
    images: string;
    propertyType?: string;  //'apartment' | 'house' | 'commercial';
    contractType?: string; //'for-sale' | 'for-rent' | 'sold';
    propertyStatus?: string; // disponibilidad;
    featured?: boolean;
    isNew?: boolean
    createdAt?: Date
  }

export type NewProperty = Omit<Property, "_id" | "createdAt">;

  export interface Contact {
    id: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    propertyId?: string;
    dateCreated: string;
    status: 'new' | 'contacted' | 'closed';
  }