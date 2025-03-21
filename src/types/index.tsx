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
    images: string[];
    propertyType?: string;  //'apartment' | 'house' | 'commercial';
    contractType?: string; //'for-sale' | 'for-rent' | 'sold';
    propertyStatus?: string; // disponibilidad;
    featured?: boolean;
    isNewProperty?: boolean
    createdAt?: Date
  }

export interface Contact {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  referenceCode?: string;
  createdAt: string;
  status: string // 'new' | 'contacted' | 'closed';
}

export interface PropertyMapProps {
  location: {
    country?: string;
    city?: string;
    address?: string;
  };
}