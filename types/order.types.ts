/**
 * Order-related TypeScript types.
 * Note: Website does not have a checkout flow; orders are created via contact form or phone.
 */



/** Order status */
export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

/** Single line item in an order */
export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
}

/** Full order model matching Firestore schema */
export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  customerAddress?: string;
  message?: string;
  items?: OrderItem[];
  totalAmount?: number;
  status: OrderStatus;
  source: 'contact_form' | 'phone' | 'zalo' | 'messenger';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

/** Contact form submission data */
export interface ContactFormData {
  name: string;
  phone: string;
  email?: string;
  subject?: string;
  message: string;
  productId?: string; // When contacting about a specific product
}
