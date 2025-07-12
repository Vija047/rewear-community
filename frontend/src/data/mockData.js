// Mock data for ReWear application

export const mockUsers = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah@example.com",
    location: "New York, NY",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    points: 1250,
    joinDate: "2024-01-15"
  },
  {
    id: 2,
    name: "Mike Chen",
    email: "mike@example.com",
    location: "Los Angeles, CA",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    points: 890,
    joinDate: "2024-02-20"
  },
  {
    id: 3,
    name: "Emma Davis",
    email: "emma@example.com",
    location: "Chicago, IL",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    points: 2100,
    joinDate: "2023-12-10"
  }
];

export const mockItems = [
  {
    id: 1,
    title: "Vintage Denim Jacket",
    description: "Classic 90s denim jacket in excellent condition. Perfect for layering in any season.",
    category: "Outerwear",
    type: "Jacket",
    size: "M",
    condition: "Excellent",
    tags: ["vintage", "denim", "casual"],
    images: [
      "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=400&h=500&fit=crop",
      "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=400&h=500&fit=crop"
    ],
    uploader: mockUsers[0],
    status: "Available",
    points: 150,
    createdAt: "2024-03-15"
  },
  {
    id: 2,
    title: "Summer Floral Dress",
    description: "Beautiful floral print dress perfect for summer events. Light and breathable fabric.",
    category: "Dresses",
    type: "Dress",
    size: "S",
    condition: "Good",
    tags: ["summer", "floral", "casual"],
    images: [
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=500&fit=crop",
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=500&fit=crop"
    ],
    uploader: mockUsers[1],
    status: "Available",
    points: 120,
    createdAt: "2024-03-10"
  },
  {
    id: 3,
    title: "Classic White T-Shirt",
    description: "Premium cotton t-shirt in perfect condition. Essential wardrobe staple.",
    category: "Tops",
    type: "T-Shirt",
    size: "L",
    condition: "Excellent",
    tags: ["basic", "cotton", "casual"],
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop"
    ],
    uploader: mockUsers[2],
    status: "Available",
    points: 80,
    createdAt: "2024-03-12"
  },
  {
    id: 4,
    title: "Leather Crossbody Bag",
    description: "Genuine leather crossbody bag with adjustable strap. Perfect for everyday use.",
    category: "Accessories",
    type: "Bag",
    size: "One Size",
    condition: "Good",
    tags: ["leather", "crossbody", "accessory"],
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=500&fit=crop",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=500&fit=crop"
    ],
    uploader: mockUsers[0],
    status: "Available",
    points: 200,
    createdAt: "2024-03-08"
  },
  {
    id: 5,
    title: "High-Waisted Jeans",
    description: "Comfortable high-waisted jeans with a modern fit. Great for casual and dressy occasions.",
    category: "Bottoms",
    type: "Jeans",
    size: "28",
    condition: "Excellent",
    tags: ["high-waisted", "denim", "casual"],
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=500&fit=crop",
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=500&fit=crop"
    ],
    uploader: mockUsers[1],
    status: "Available",
    points: 180,
    createdAt: "2024-03-05"
  },
  {
    id: 6,
    title: "Wool Sweater",
    description: "Cozy wool sweater perfect for cold weather. Soft and warm with a classic design.",
    category: "Tops",
    type: "Sweater",
    size: "M",
    condition: "Good",
    tags: ["wool", "warm", "winter"],
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop"
    ],
    uploader: mockUsers[2],
    status: "Available",
    points: 160,
    createdAt: "2024-03-01"
  }
];

export const mockCategories = [
  { id: 1, name: "Tops", icon: "👕" },
  { id: 2, name: "Bottoms", icon: "👖" },
  { id: 3, name: "Dresses", icon: "👗" },
  { id: 4, name: "Outerwear", icon: "🧥" },
  { id: 5, name: "Shoes", icon: "👟" },
  { id: 6, name: "Accessories", icon: "👜" },
  { id: 7, name: "Kids", icon: "👶" },
  { id: 8, name: "Men", icon: "👨" },
  { id: 9, name: "Women", icon: "👩" }
];

export const mockSwapRequests = [
  {
    id: 1,
    requester: mockUsers[0],
    item: mockItems[0],
    status: "Pending",
    createdAt: "2024-03-20",
    message: "I have a similar vintage jacket I'd love to swap!"
  },
  {
    id: 2,
    requester: mockUsers[1],
    item: mockItems[2],
    status: "Accepted",
    createdAt: "2024-03-18",
    message: "Perfect for my wardrobe! Can we meet this weekend?"
  }
];

export const mockTestimonials = [
  {
    id: 1,
    user: mockUsers[0],
    text: "ReWear has completely changed how I think about fashion. I've found amazing pieces and made new friends!",
    rating: 5
  },
  {
    id: 2,
    user: mockUsers[1],
    text: "The point system is brilliant. I've earned enough points to get items I never thought I could afford.",
    rating: 5
  },
  {
    id: 3,
    user: mockUsers[2],
    text: "Sustainable fashion made easy. I love knowing my clothes are going to good homes.",
    rating: 5
  }
];

export const mockStats = {
  totalUsers: 15420,
  totalItems: 8920,
  totalSwaps: 5670,
  carbonSaved: 12500 // in kg
}; 