import type { Product, Order } from '../Types/index.ts';

export const productsData: Product[] = [
  { 
    id: 'p1', 
    name: 'Cotton T-Shirt', 
    category: 'Clothing', 
    price: 40, 
    costPrice: 15, 
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=200',
    status: 'In Stock',
    shortDescription: 'Premium quality 100% cotton t-shirt. Breathable fabric, perfect for daily casual wear with a relaxed fit.',
    reviews: [
      { id: 'r1', userName: 'Alex Johnson', rating: 1, comment: 'Very comfortable material, fits perfectly!', date: '2026-03-18' },
      { id: 'r2', userName: 'Maria Garcia', rating: 4, comment: 'Good quality, but shipping took a bit long.', date: '2026-03-15' },
      { id: 'r2', userName: 'Maria Garcia', rating: 5, comment: 'Good quality, but shipping took a bit long.', date: '2026-03-15' },
      { id: 'r2', userName: 'Maria Garcia', rating: 5, comment: 'Good quality, but shipping took a bit long.', date: '2026-03-15' }
    ]
  },
  { 
    id: 'p2', 
    name: 'Silk Robe', 
    category: 'Lingerie', 
    price: 120, 
    costPrice: 50, 
    image: 'https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?w=200',
    status: 'Canceled',
    shortDescription: 'Luxurious pure silk robe. Features an elegant waist tie and smooth texture designed for ultimate comfort at home.',
    reviews: [
      { id: 'r3', userName: 'Sophie Chen', rating: 3, comment: 'Absolutely luxurious feel. Worth every penny.', date: '2026-03-17' }
    ]
  },
  { 
    id: 'p3', 
    name: 'Running Shoes', 
    category: 'Sportswear', 
    price: 85, 
    costPrice: 40, 
    image: 'https://images.unsplash.com/photo-1506629082925-639197d54ee7?w=200',
    status: 'In Stock',
    shortDescription: 'Lightweight and durable running shoes. Engineered with responsive cushioning to support your daily workout and long runs.',
    reviews: [
      { id: 'r4', userName: 'John Doe', rating: 4, comment: 'Great for daily runs, very lightweight.', date: '2026-03-14' },
      { id: 'r5', userName: 'Mike Ross', rating: 3, comment: 'The sole is a bit hard for long distances.', date: '2026-03-10' }
    ]
  },
  { 
    id: 'p4', 
    name: 'Leather Belt', 
    category: 'Accessories', 
    price: 30, 
    costPrice: 10, 
    image: 'https://images.unsplash.com/photo-1524380364757-39dc5e6e5c0d?w=200',
    status: 'In Stock',
    shortDescription: 'Classic genuine leather belt. Comes with a polished metal buckle, making it ideal for both formal and casual outfits.',
    reviews: [
      { id: 'r6', userName: 'David Smith', rating: 4, comment: 'Genuine leather, simple and elegant.', date: '2026-03-16' }
    ]
  },
  { 
    id: 'p5', 
    name: 'Summer Dress', 
    category: 'Clothing', 
    price: 90, 
    costPrice: 35, 
    image: 'https://images.unsplash.com/photo-1572804013307-f961ae978435?w=200',
    status: 'Canceled',
    shortDescription: 'Flowy and vibrant summer dress. Lightweight floral pattern fabric tailored for hot sunny days and beach vacations.',
    reviews: [
      { id: 'r7', userName: 'Emma Wilson', rating: 5, comment: 'Love the pattern! Perfect for beach days.', date: '2026-03-12' }
    ]
  },
  { 
    id: 'p6', 
    name: 'Yoga Mat', 
    category: 'Sportswear', 
    price: 50, 
    costPrice: 20, 
    image: 'https://images.unsplash.com/photo-1592432676556-26d5630e420a?w=200',
    status: 'In Stock',
    shortDescription: 'Non-slip eco-friendly yoga mat. Provides excellent grip and optimal cushioning thickness for floor exercises and yoga poses.',
    reviews: [
      { id: 'r8', userName: 'Sarah Connor', rating: 4, comment: 'Good grip, doesn\'t slide on the floor.', date: '2026-03-11' }
    ]
  },
  { 
    id: 'p7', 
    name: 'Gold Necklace', 
    category: 'Accessories', 
    price: 200, 
    costPrice: 120, 
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=200',
    status: 'In Stock',
    shortDescription: 'Exquisite 18k gold plated necklace. Features a minimalist chain design that adds a touch of luxury to any jewelry collection.',
    reviews: [
      { id: 'r9', userName: 'Isabella B.', rating: 4, comment: 'Stunning piece, gets many compliments.', date: '2026-03-18' }
    ]
  }
];

export const ordersData: Order[] = [
  // Completed Orders
  { id: "ORD-12-1", customerName: "Ahmed", date: "2026-03-12", day: "Mon", status: "completed", items: [{ productId: "p1", quantity: 5 }], source: "Social Media" },
  { id: "ORD-12-2", customerName: "Sami", date: "2026-03-12", day: "Mon", status: "completed", items: [{ productId: "p4", quantity: 3 }], source: "Direct" },
  { id: "ORD-13-1", customerName: "Sara", date: "2026-03-13", day: "Tue", status: "completed", items: [{ productId: "p2", quantity: 1 }, { productId: "p4", quantity: 2 }], source: "Organic Search" },
  { id: "ORD-14-1", customerName: "Ali", date: "2026-03-14", day: "Wed", status: "completed", items: [{ productId: "p3", quantity: 4 }], source: "Social Media" },
  { id: "ORD-15-1", customerName: "Mona", date: "2026-03-15", day: "Thu", status: "completed", items: [{ productId: "p7", quantity: 2 }], source: "Referral" },
  { id: "ORD-16-1", customerName: "Noor", date: "2026-03-16", day: "Fri", status: "completed", items: [{ productId: "p5", quantity: 3 }, { productId: "p1", quantity: 2 }], source: "Social Media" },
  { id: "ORD-17-1", customerName: "Huda", date: "2026-03-17", day: "Sat", status: "completed", items: [{ productId: "p1", quantity: 1 }, { productId: "p6", quantity: 5 }], source: "Organic Search" },
  { id: "ORD-18-1", customerName: "Zaid", date: "2026-03-18", day: "Sun", status: "completed", items: [{ productId: "p1", quantity: 2 }], source: "Social Media" },
  { id: "ORD-18-2", customerName: "Laila", date: "2026-03-18", day: "Sun", status: "completed", items: [{ productId: "p7", quantity: 1 }], source: "Direct" },
  { id: "ORD-18-3", customerName: "Omar", date: "2026-03-18", day: "Sun", status: "completed", items: [{ productId: "p3", quantity: 2 }], source: "Social Media" },

  // Not Completed
  { id: "ORD-18-4", customerName: "Khaled", date: "2026-03-18", day: "Wed", status: "cancelled", items: [{ productId: "p1", quantity: 1 }], source: "Direct" },
  { id: "ORD-17-5", customerName: "Faten", date: "2026-03-17", day: "Tue", status: "new", items: [{ productId: "p2", quantity: 1 }], source: "Social Media" },
  { id: "ORD-16-8", customerName: "Yassin", date: "2026-03-16", day: "Mon", status: "inprogress", items: [{ productId: "p4", quantity: 5 }], source: "Organic Search" },
  { id: "ORD-15-4", customerName: "Rayan", date: "2026-03-15", day: "Sun", status: "new", items: [{ productId: "p3", quantity: 1 }], source: "Referral" },
  { id: "ORD-15-4", customerName: "Roma", date: "2026-03-15", day: "Sun", status: "cancelled", items: [{ productId: "p3", quantity: 1 }], source: "Social Media" },
  { id: "ORD-15-4", customerName: "Lola", date: "2026-03-15", day: "Sun", status: "new", items: [{ productId: "p3", quantity: 1 }], source: "Direct" },
  { id: "ORD-15-4", customerName: "Ehssan", date: "2026-03-15", day: "Sun", status: "cancelled", items: [{ productId: "p3", quantity: 1 }], source: "Organic Search" },
  { id: "ORD-15-4", customerName: "Salim", date: "2026-03-15", day: "Sun", status: "inprogress", items: [{ productId: "p3", quantity: 1 }], source: "Social Media" },
  { id: "ORD-15-4", customerName: "Mazen", date: "2026-03-15", day: "Sun", status: "inprogress", items: [{ productId: "p3", quantity: 1 }], source: "Direct" }
];