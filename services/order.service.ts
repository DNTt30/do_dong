/**
 * Order Service — contact inquiry and order management.
 */

import { supabase } from '@/lib/supabase';
import type { Order, ContactFormData, OrderStatus } from '@/types/order.types';
import type { PaginatedResult } from '@/types/common.types';

const TABLE = 'orders';

/**
 * Submit a contact form inquiry (creates a new entry in 'contacts' table).
 */
export async function submitContactForm(data: ContactFormData): Promise<string> {
  const contactData = {
    name: data.name,
    phone: data.phone,
    email: data.email,
    note: data.message,
    status: 'new',
  };
  const { data: inserted, error } = await supabase.from('contacts').insert([contactData]).select('id').single();
  if (error) throw error;
  return inserted.id;
}

/**
 * Fetch paginated orders for admin panel.
 */
export async function getOrders(
  page = 1,
  pageSize = 20,
  status?: OrderStatus
): Promise<PaginatedResult<Order>> {
  let query = supabase.from(TABLE).select('*', { count: 'exact' });

  if (status) {
    query = query.eq('status', status);
  }

  query = query.order('createdAt', { ascending: false });

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  query = query.range(from, to);

  const { data, count, error } = await query;
  if (error) throw error;

  return {
    items: data as Order[],
    total: count ?? 0,
    page,
    hasNextPage: count ? from + pageSize < count : false,
  };
}

/**
 * Fetch a single order by ID.
 */
export async function getOrderById(id: string): Promise<Order | null> {
  const { data, error } = await supabase.from(TABLE).select('*').eq('id', id).single();
  if (error) {
    if (error.code === 'PGRST116') return null;
    throw error;
  }
  return data as Order;
}

/**
 * Update order status.
 */
export async function updateOrderStatus(id: string, status: OrderStatus): Promise<void> {
  const { error } = await supabase.from(TABLE).update({ status }).eq('id', id);
  if (error) throw error;
}

