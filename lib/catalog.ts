import { fallbackProducts, type Product } from '@/data/products';
import { supabase } from '@/lib/supabase';

export type ProductFilter = {
  q?: string;
  category?: string;
  material?: string;
  minPrice?: number;
  maxPrice?: number;
  inStockOnly?: boolean;
};

export const applyFilters = (products: Product[], filter: ProductFilter) =>
  products.filter((p) => {
    if (filter.q && !`${p.name} ${p.brand}`.toLowerCase().includes(filter.q.toLowerCase())) {
      return false;
    }
    if (filter.category && filter.category !== 'All' && p.category !== filter.category) {
      return false;
    }
    if (filter.material && filter.material !== 'All' && !p.material.toLowerCase().includes(filter.material.toLowerCase())) {
      return false;
    }
    if (typeof filter.minPrice === 'number' && p.price < filter.minPrice) {
      return false;
    }
    if (typeof filter.maxPrice === 'number' && p.price > filter.maxPrice) {
      return false;
    }
    if (filter.inStockOnly && p.inStock <= 0) {
      return false;
    }
    return true;
  });

export async function getProducts() {
  if (!supabase) return fallbackProducts;

  const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
  if (error || !data?.length) {
    return fallbackProducts;
  }

  return data as Product[];
}

export async function getProductBySlug(slug: string) {
  const products = await getProducts();
  return products.find((product) => product.slug === slug) || null;
}
