import type { Product, Order } from '../Types/index.ts';


export const productsData: Product[] = [
  { id: 'p1', name: 'Cotton T-Shirt', category: 'Clothing', price: 40, costPrice: 15, image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=200' },
  { id: 'p2', name: 'Silk Robe', category: 'Lingerie', price: 120, costPrice: 50, image: 'https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?w=200' },
  { id: 'p3', name: 'Running Shoes', category: 'Sportswear', price: 85, costPrice: 40, image: 'https://images.unsplash.com/photo-1506629082925-639197d54ee7?w=200' },
  { id: 'p4', name: 'Leather Belt', category: 'Accessories', price: 30, costPrice: 10, image: 'https://images.unsplash.com/photo-1524380364757-39dc5e6e5c0d?w=200' },
  { id: 'p5', name: 'Summer Dress', category: 'Clothing', price: 90, costPrice: 35, image: 'https://images.unsplash.com/photo-1572804013307-f961ae978435?w=200' },
  { id: 'p6', name: 'Yoga Mat', category: 'Sportswear', price: 50, costPrice: 20, image: 'https://images.unsplash.com/photo-1592432676556-26d5630e420a?w=200' },
  { id: 'p7', name: 'Gold Necklace', category: 'Accessories', price: 200, costPrice: 120, image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=200' },
];

// Week Orders
export const ordersData: Order[] = [
  // 12
  { id: "ORD-12-1", customerName: "Ahmed", date: "2026-03-12", items: [{ productId: "p1", quantity: 5 }] },
  { id: "ORD-12-2", customerName: "Sami", date: "2026-03-12", items: [{ productId: "p4", quantity: 3 }] },
  
  // 13
  { id: "ORD-13-1", customerName: "Sara", date: "2026-03-13", items: [{ productId: "p2", quantity: 1 }, { productId: "p4", quantity: 2 }] },
  
  // 14
  { id: "ORD-14-1", customerName: "Ali", date: "2026-03-14", items: [{ productId: "p3", quantity: 4 }] },

  // 15
  { id: "ORD-15-1", customerName: "Mona", date: "2026-03-15", items: [{ productId: "p7", quantity: 2 }] },

  // 16
  { id: "ORD-16-1", customerName: "Noor", date: "2026-03-16", items: [{ productId: "p5", quantity: 3 }, { productId: "p1", quantity: 2 }] },

  // 17 Yesterday
  { id: "ORD-17-1", customerName: "Huda", date: "2026-03-17", items: [{ productId: "p1", quantity: 1 }, { productId: "p6", quantity: 5 }] },

  // 18 Today
  { id: "ORD-18-1", customerName: "Zaid", date: "2026-03-18", items: [{ productId: "p1", quantity: 2 }] }, // 80$
  { id: "ORD-18-2", customerName: "Laila", date: "2026-03-18", items: [{ productId: "p7", quantity: 1 }] }, // 200$
  { id: "ORD-18-3", customerName: "Omar", date: "2026-03-18", items: [{ productId: "p3", quantity: 2 }] }, // 170$
];