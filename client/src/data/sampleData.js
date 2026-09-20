export const defaultProducts = [
  {
    id: "PROD-001",
    name: "Pure Kanjivaram Silk Saree",
    category: "Sarees",
    price: 18500,
    availableQty: 14,
    size: "Free Size (6.3m)",
    color: "Turquoise & Gold Zari",
    status: "In Stock",
    image: "/kanjivaram-saree.png",
    description: "Handwoven pure mulberry silk saree with zari border and matching blouse.",
    sku: "SAR-KAN-001"
  },
  {
    id: "PROD-002",
    name: "Egyptian Cotton Formal Shirt",
    category: "Shirts",
    price: 3200,
    availableQty: 45,
    size: "L (42)",
    color: "Sky Blue Striped",
    status: "In Stock",
    image: "/egyptian-shirt.png",
    description: "100% Giza Egyptian cotton shirt with wrinkle-resistant finish.",
    sku: "SHR-EGY-042"
  },
  {
    id: "PROD-003",
    name: "Handcrafted Anarkali Kurti Set",
    category: "Kurtis",
    price: 5400,
    availableQty: 8,
    size: "M (38)",
    color: "Crimson Red & Gold Zari",
    status: "Low Stock",
    image: "/anarkali-kurti.jpg",
    description: "Floor length flared chanderi silk kurti with hand embroidered neck, dupatta and pants.",
    sku: "KUR-ANA-038"
  },
  {
    id: "PROD-004",
    name: "Custom Tailored Formal Trousers",
    category: "Pants",
    price: 2800,
    availableQty: 30,
    size: "34 Waist",
    color: "Beige Khaki",
    status: "In Stock",
    image: "/formal-trousers.jpg",
    description: "High-waisted double-pleated Gurkha formal trouser with side adjusters.",
    sku: "PNT-FOR-034"
  },
  {
    id: "PROD-005",
    name: "Floral Summer Georgette Dress",
    category: "Dresses",
    price: 4200,
    availableQty: 18,
    size: "S (36)",
    color: "Pastel Pink & Sky Floral",
    status: "In Stock",
    image: "/floral-dress.jpg",
    description: "Breezy tiered georgette maxi dress with puff sleeves and watercolor floral print.",
    sku: "DRS-FLO-036"
  },
  {
    id: "PROD-006",
    name: "Royal Velvet Sherwani",
    category: "Formal Wear",
    price: 24500,
    availableQty: 4,
    size: "XL (44)",
    color: "Teal Blue Brocade",
    status: "Low Stock",
    image: "/velvet-sherwani.png",
    description: "Intricately embroidered teal velvet sherwani coat with silk inner jacket and trousers.",
    sku: "FRM-SHR-044"
  },
  {
    id: "PROD-007",
    name: "Little Princess Lehenga Set",
    category: "Kids Wear",
    price: 4999,
    availableQty: 12,
    size: "Age 4-8 Yrs",
    color: "Pastel Pink & Gold Embroidery",
    status: "In Stock",
    image: "/princess-lehenga.png",
    description: "Pastel pink embellished lehenga choli set for girls featuring delicate gold embroidery, sequin floral motifs, sheer embroidered dupatta, and decorative tassel latkans.",
    sku: "KID-LEH-006"
  },
  {
    id: "PROD-008",
    name: "Linen Casual Button Down",
    category: "Casual Wear",
    price: 2600,
    availableQty: 25,
    size: "L (42)",
    color: "Sage Green",
    status: "In Stock",
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&auto=format&fit=crop&q=80",
    description: "Pure French flax linen casual shirt with spread collar.",
    sku: "CSL-LIN-042"
  }
];

export const defaultStock = [
  {
    id: "STK-101",
    fabricName: "Banarasi Raw Silk Roll",
    category: "Fabrics",
    size: "120 Meters Roll",
    color: "Crimson Red",
    quantity: 85,
    unit: "Meters",
    reorderLevel: 25,
    status: "In Stock",
    supplier: "Varanasi Weavers Co.",
    unitCost: 450,
    retailPrice: 750
  },
  {
    id: "STK-102",
    fabricName: "Organic Chanderi Cotton",
    category: "Fabrics",
    size: "200 Meters Roll",
    color: "Ivory Off-White",
    quantity: 18,
    unit: "Meters",
    reorderLevel: 30,
    status: "Low Stock",
    supplier: "MP Textile Hub",
    unitCost: 220,
    retailPrice: 390
  },
  {
    id: "STK-103",
    fabricName: "Italian Poly-Wool Suit Fabric",
    category: "Suiting",
    size: "60 Meters Roll",
    color: "Midnight Navy",
    quantity: 0,
    unit: "Meters",
    reorderLevel: 15,
    status: "Out of Stock",
    supplier: "Milano Fabrics Export",
    unitCost: 1200,
    retailPrice: 2100
  },
  {
    id: "STK-104",
    fabricName: "Printed Rayon Kurti Fabric",
    category: "Fabrics",
    size: "150 Meters Roll",
    color: "Teal Blue Floral",
    quantity: 110,
    unit: "Meters",
    reorderLevel: 40,
    status: "In Stock",
    supplier: "Jaipur Block Prints",
    unitCost: 140,
    retailPrice: 260
  },
  {
    id: "STK-105",
    fabricName: "Gold Zari Thread Spools",
    category: "Accessories",
    size: "Standard Spool",
    color: "Metallic Gold",
    quantity: 12,
    unit: "Pcs",
    reorderLevel: 20,
    status: "Low Stock",
    supplier: "Zari Craft India",
    unitCost: 80,
    retailPrice: 150
  },
  {
    id: "STK-106",
    fabricName: "Heavy Satin Lining Cloth",
    category: "Lining",
    size: "300 Meters Roll",
    color: "Cream Beige",
    quantity: 240,
    unit: "Meters",
    reorderLevel: 50,
    status: "In Stock",
    supplier: "Surat Mills Co.",
    unitCost: 60,
    retailPrice: 110
  }
];

export const defaultCustomers = [
  {
    id: "CUST-501",
    name: "Ananya Sharma",
    phone: "+91 98765 43210",
    email: "ananya.sharma@example.com",
    city: "Mumbai",
    status: "VIP",
    totalOrders: 14,
    totalSpent: 68500,
    avatar: "AS",
    measurements: {
      bust: "36.5",
      chest: "35",
      waist: "30",
      hip: "39",
      shoulder: "14.5",
      armhole: "16.5",
      sleeveLength: "18",
      shirtLength: "44",
      neckFront: "7.0",
      neckBack: "8.5",
      pantWaist: "31",
      pantLength: "39",
      inseam: "29",
      notes: "Requires padded blouse lining. Prefers 2-inch inner margin for future alteration."
    }
  },
  {
    id: "CUST-502",
    name: "Vikramaditya Verma",
    phone: "+91 98112 88776",
    email: "vikram.verma@example.com",
    city: "Delhi",
    status: "Regular",
    totalOrders: 6,
    totalSpent: 34200,
    avatar: "VV",
    measurements: {
      chest: "42",
      waist: "35",
      hip: "41",
      shoulder: "18.5",
      sleeveLength: "25.5",
      shirtLength: "30.5",
      neckFront: "16.5",
      pantWaist: "35.5",
      pantLength: "41.5",
      inseam: "31.5",
      thigh: "25",
      ankleOpening: "15.5",
      notes: "Slim fit cut with extra shoulder pad reinforcement. Prefer double stitch along inseam."
    }
  },
  {
    id: "CUST-503",
    name: "Priya Rajan",
    phone: "+91 97441 22334",
    email: "priya.rajan@example.com",
    city: "Bengaluru",
    status: "VIP",
    totalOrders: 19,
    totalSpent: 112000,
    avatar: "PR",
    measurements: {
      bust: "38",
      chest: "36",
      waist: "32",
      hip: "41",
      shoulder: "15",
      armhole: "17",
      sleeveLength: "21",
      shirtLength: "48",
      neckFront: "7.5",
      neckBack: "9.0",
      notes: "Specializes in Silk Blouses and Designer Sarees. Always use gold piping finish."
    }
  },
  {
    id: "CUST-504",
    name: "Rohan Kapoor",
    phone: "+91 99001 55443",
    email: "rohan.kapoor@example.com",
    city: "Chandigarh",
    status: "New",
    totalOrders: 2,
    totalSpent: 12500,
    avatar: "RK",
    measurements: {
      chest: "40",
      waist: "33",
      hip: "39",
      shoulder: "17.5",
      sleeveLength: "24",
      pantWaist: "33",
      pantLength: "40",
      notes: "Wants lightweight linen tailoring for casual summer wear."
    }
  }
];

export const defaultTailors = [
  { id: "TL-01", name: "Master Ramesh Kumar", specialty: "Suits & Sherwanis", phone: "+91 98200 11111", activeJobs: 3 },
  { id: "TL-02", name: "Sunita Devi", specialty: "Blouses & Lehengas", phone: "+91 98200 22222", activeJobs: 4 },
  { id: "TL-03", name: "Akhtar Hussain", specialty: "Kurtis & Indo-Western", phone: "+91 98200 33333", activeJobs: 2 },
  { id: "TL-04", name: "Kiran Patel", specialty: "Trousers & Shirts", phone: "+91 98200 44444", activeJobs: 1 }
];

export const defaultStitchingOrders = [
  {
    id: "STITCH-1001",
    customerName: "Ananya Sharma",
    customerId: "CUST-501",
    clothingType: "Designer Silk Blouse with Dori",
    assignedTailor: "Sunita Devi",
    tailorId: "TL-02",
    orderDate: "2026-09-12",
    expectedDelivery: "2026-09-20",
    status: "PENDING",
    priority: "Normal",
    estimatedCost: 1800,
    fabricProvidedBy: "Shop Store (Banarasi Raw Silk)",
    requirements: "Deep neck back with tassel dori, heavy zardosi work border on elbow sleeves."
  },
  {
    id: "STITCH-1002",
    customerName: "Vikramaditya Verma",
    customerId: "CUST-502",
    clothingType: "3-Piece Tuxedo Suit",
    assignedTailor: "Master Ramesh Kumar",
    tailorId: "TL-01",
    orderDate: "2026-09-10",
    expectedDelivery: "2026-09-19",
    status: "IN PROGRESS",
    priority: "Express (Rush)",
    estimatedCost: 6500,
    fabricProvidedBy: "Customer Fabric",
    requirements: "Satin lapel, double vent back, personalized monogram inside jacket lining."
  },
  {
    id: "STITCH-1003",
    customerName: "Priya Rajan",
    customerId: "CUST-503",
    clothingType: "Chanderi Silk Anarkali Suit",
    assignedTailor: "Akhtar Hussain",
    tailorId: "TL-03",
    orderDate: "2026-09-08",
    expectedDelivery: "2026-09-18",
    status: "QUALITY CHECK",
    priority: "Normal",
    estimatedCost: 3200,
    fabricProvidedBy: "Shop Store",
    requirements: "24-kali flared gown with gota patti lining and chiffon dupatta."
  },
  {
    id: "STITCH-1004",
    customerName: "Rohan Kapoor",
    customerId: "CUST-504",
    clothingType: "French Linen Casual Shirt",
    assignedTailor: "Kiran Patel",
    tailorId: "TL-04",
    orderDate: "2026-09-05",
    expectedDelivery: "2026-09-14",
    status: "COMPLETED",
    priority: "Normal",
    estimatedCost: 1200,
    fabricProvidedBy: "Shop Store",
    requirements: "Soft collar, wooden buttons, chest pocket with pen slot."
  }
];

export const defaultOrders = [
  {
    id: "ORD-8801",
    customerName: "Ananya Sharma",
    customerId: "CUST-501",
    orderDate: "2026-09-14",
    deliveryDate: "2026-09-20",
    totalAmount: 20300,
    paymentStatus: "Paid",
    orderStatus: "Processing",
    paymentMethod: "UPI (GooglePay)",
    items: [
      { name: "Pure Kanjivaram Silk Saree", qty: 1, price: 18500 },
      { name: "Stitching: Designer Silk Blouse", qty: 1, price: 1800 }
    ]
  },
  {
    id: "ORD-8802",
    customerName: "Vikramaditya Verma",
    customerId: "CUST-502",
    orderDate: "2026-09-11",
    deliveryDate: "2026-09-19",
    totalAmount: 9700,
    paymentStatus: "Partially Paid",
    orderStatus: "Processing",
    paymentMethod: "Card (HDFC Visa)",
    items: [
      { name: "Egyptian Cotton Formal Shirt", qty: 1, price: 3200 },
      { name: "Stitching: 3-Piece Tuxedo Suit", qty: 1, price: 6500 }
    ]
  },
  {
    id: "ORD-8803",
    customerName: "Priya Rajan",
    customerId: "CUST-503",
    orderDate: "2026-09-08",
    deliveryDate: "2026-09-18",
    totalAmount: 8600,
    paymentStatus: "Paid",
    orderStatus: "Ready",
    paymentMethod: "NetBanking",
    items: [
      { name: "Handcrafted Anarkali Kurti Set", qty: 1, price: 5400 },
      { name: "Stitching: Chanderi Anarkali Suit", qty: 1, price: 3200 }
    ]
  },
  {
    id: "ORD-8804",
    customerName: "Rohan Kapoor",
    customerId: "CUST-504",
    orderDate: "2026-09-05",
    deliveryDate: "2026-09-14",
    totalAmount: 3800,
    paymentStatus: "Paid",
    orderStatus: "Delivered",
    paymentMethod: "Cash",
    items: [
      { name: "Linen Casual Button Down", qty: 1, price: 2600 },
      { name: "Stitching: Custom Alteration", qty: 1, price: 1200 }
    ]
  }
];

export const defaultStats = {
  kpis: {
    totalProducts: 8,
    totalStockUnits: 465,
    lowStockItems: 3,
    pendingStitching: 3,
    completedStitching: 1,
    pendingOrders: 2,
    completedOrders: 2,
    totalRevenue: 42400
  },
  categoryChartData: [
    { name: 'Fabrics', value: 395 },
    { name: 'Lining', value: 240 },
    { name: 'Suiting', value: 60 },
    { name: 'Accessories', value: 12 }
  ],
  stitchingChartData: [
    { name: 'Pending', count: 1 },
    { name: 'In Production', count: 1 },
    { name: 'Quality Check', count: 1 },
    { name: 'Completed', count: 1 }
  ]
};
