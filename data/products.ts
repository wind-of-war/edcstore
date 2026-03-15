export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  price: number;
  category: 'Flashlight' | 'Pouch' | 'Tool' | 'Knife Accessory';
  material: string;
  inStock: number;
  lumens?: number;
  image: string;
  description: string;
  specs: Record<string, string>;
  lemonVariantId: number;
};

export const fallbackProducts: Product[] = [
  {
    id: 'p-1',
    slug: 'atlas-ti-18350-flashlight',
    name: 'Atlas Ti 18350 Flashlight',
    brand: 'Night Forge',
    price: 289,
    category: 'Flashlight',
    material: 'Titanium',
    inStock: 6,
    lumens: 1200,
    image: 'https://images.unsplash.com/photo-1612043790974-97f478f24c8a?auto=format&fit=crop&w=1600&q=80',
    description: 'Premium EDC flashlight with warm tint and precision milled titanium body.',
    specs: {
      Emitter: 'Nichia 519A 4500K',
      Battery: '1 x 18350',
      Driver: 'Buck + boost hybrid',
      Weight: '86g',
    },
    lemonVariantId: 111111,
  },
  {
    id: 'p-2',
    slug: 'ranger-micarta-pouch',
    name: 'Ranger Micarta Pouch',
    brand: 'Gridline EDC',
    price: 89,
    category: 'Pouch',
    material: 'Waxed Canvas + Micarta Zip Pull',
    inStock: 14,
    image: 'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&w=1600&q=80',
    description: 'Compact pouch for bits, AAA lights, and pry tools.',
    specs: {
      Dimensions: '15 x 9 x 3 cm',
      Lining: 'Ripstop nylon',
      Closure: 'YKK AquaGuard zipper',
      Origin: 'Handmade in small batch',
    },
    lemonVariantId: 222222,
  },
  {
    id: 'p-3',
    slug: 'deep-carry-ti-clip',
    name: 'Deep Carry Ti Clip',
    brand: 'Forge Parts',
    price: 39,
    category: 'Knife Accessory',
    material: 'Titanium',
    inStock: 21,
    image: 'https://images.unsplash.com/photo-1621784563330-caee0b138a00?auto=format&fit=crop&w=1600&q=80',
    description: 'Aftermarket deep carry clip with blasted finish and tuned retention.',
    specs: {
      Thickness: '1.2 mm',
      Hardware: '2 x T6 screws included',
      Finish: 'Stonewashed',
      Compatibility: 'Most 2-hole clip patterns',
    },
    lemonVariantId: 333333,
  },
];
