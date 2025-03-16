export interface Property {
    id: string;
    title: string;
    description: string;
    price: number;
    location: string;
    bedrooms: number;
    bathrooms: number;
    area: number;
    imageUrl: string;
    featured: boolean;
    propertyType: string;  //'apartment' | 'house' | 'commercial';
    propertyStatus: string; // 'for-sale' | 'for-rent' | 'sold';
  }
  
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