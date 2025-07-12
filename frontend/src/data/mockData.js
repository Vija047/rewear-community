// Temporary mock data - to be replaced with real API calls
export const mockCategories = [
    'Tops',
    'Bottoms',
    'Dresses',
    'Outerwear',
    'Shoes',
    'Accessories',
    'Bags',
    'Activewear',
    'Formal',
    'Casual'
];

export const mockItems = [
    {
        _id: '1',
        title: 'Vintage Levi\'s Denim Jacket',
        description: 'Classic vintage Levi\'s denim jacket in excellent condition. Perfect for layering and adds a timeless touch to any outfit.',
        category: 'Outerwear',
        condition: 'Excellent',
        size: 'M',
        points: 45,
        images: ['https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop'],
        tags: ['vintage', 'denim', 'classic', 'unisex'],
        createdAt: '2024-07-10T10:30:00Z',
        owner: {
            _id: 'user1',
            name: 'Sarah Johnson',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop'
        },
        available: true
    },
    {
        _id: '2',
        title: 'Floral Summer Dress',
        description: 'Beautiful floral midi dress perfect for summer occasions. Lightweight and comfortable with a flattering fit.',
        category: 'Dresses',
        condition: 'Good',
        size: 'S',
        points: 35,
        images: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop'],
        tags: ['floral', 'summer', 'midi', 'feminine'],
        createdAt: '2024-07-09T14:20:00Z',
        owner: {
            _id: 'user2',
            name: 'Emma Davis',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop'
        },
        available: true
    },
    {
        _id: '3',
        title: 'Nike Air Max Sneakers',
        description: 'Comfortable Nike Air Max sneakers in white. Great for everyday wear and light workouts.',
        category: 'Shoes',
        condition: 'Good',
        size: '9',
        points: 50,
        images: ['https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop'],
        tags: ['nike', 'sneakers', 'athletic', 'white'],
        createdAt: '2024-07-08T09:15:00Z',
        owner: {
            _id: 'user3',
            name: 'Mike Chen',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
        },
        available: true
    },
    {
        _id: '4',
        title: 'Cashmere Sweater',
        description: 'Luxurious cashmere sweater in soft beige. Perfect for cozy winter days and elegant occasions.',
        category: 'Tops',
        condition: 'Excellent',
        size: 'L',
        points: 65,
        images: ['https://images.unsplash.com/photo-1583743814966-8936f37f8036?w=400&h=400&fit=crop'],
        tags: ['cashmere', 'luxury', 'winter', 'cozy'],
        createdAt: '2024-07-07T16:45:00Z',
        owner: {
            _id: 'user4',
            name: 'Jessica Wilson',
            avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop'
        },
        available: true
    },
    {
        _id: '5',
        title: 'High-Waisted Black Jeans',
        description: 'Classic high-waisted black jeans that go with everything. Comfortable stretch fabric.',
        category: 'Bottoms',
        condition: 'Good',
        size: 'M',
        points: 30,
        images: ['https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=400&fit=crop'],
        tags: ['jeans', 'black', 'high-waisted', 'versatile'],
        createdAt: '2024-07-06T11:30:00Z',
        owner: {
            _id: 'user5',
            name: 'Alex Rodriguez',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'
        },
        available: true
    },
    {
        _id: '6',
        title: 'Leather Crossbody Bag',
        description: 'Genuine leather crossbody bag in cognac brown. Perfect size for daily essentials.',
        category: 'Bags',
        condition: 'Excellent',
        size: 'One Size',
        points: 40,
        images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop'],
        tags: ['leather', 'crossbody', 'brown', 'everyday'],
        createdAt: '2024-07-05T13:20:00Z',
        owner: {
            _id: 'user6',
            name: 'Maria Garcia',
            avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop'
        },
        available: true
    },
    {
        _id: '7',
        title: 'Silk Blouse',
        description: 'Elegant silk blouse in cream color. Perfect for office wear or special occasions.',
        category: 'Tops',
        condition: 'Good',
        size: 'S',
        points: 55,
        images: ['https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop'],
        tags: ['silk', 'blouse', 'elegant', 'office'],
        createdAt: '2024-07-04T08:45:00Z',
        owner: {
            _id: 'user7',
            name: 'David Kim',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop'
        },
        available: true
    },
    {
        _id: '8',
        title: 'Wool Peacoat',
        description: 'Classic navy wool peacoat. Timeless style that never goes out of fashion.',
        category: 'Outerwear',
        condition: 'Good',
        size: 'L',
        points: 70,
        images: ['https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&h=400&fit=crop'],
        tags: ['wool', 'peacoat', 'navy', 'classic'],
        createdAt: '2024-07-03T15:10:00Z',
        owner: {
            _id: 'user8',
            name: 'Lisa Thompson',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop'
        },
        available: true
    },
    {
        _id: '9',
        title: 'Yoga Leggings',
        description: 'High-performance yoga leggings with moisture-wicking fabric. Perfect for workouts.',
        category: 'Activewear',
        condition: 'Excellent',
        size: 'M',
        points: 25,
        images: ['https://images.unsplash.com/photo-1506629905499-864d15ffbc7e?w=400&h=400&fit=crop'],
        tags: ['yoga', 'leggings', 'athletic', 'black'],
        createdAt: '2024-07-02T12:00:00Z',
        owner: {
            _id: 'user9',
            name: 'Rachel Green',
            avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&h=100&fit=crop'
        },
        available: true
    },
    {
        _id: '10',
        title: 'Vintage Band T-Shirt',
        description: 'Authentic vintage band t-shirt from the 90s. Great condition with original graphics.',
        category: 'Tops',
        condition: 'Good',
        size: 'M',
        points: 35,
        images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop'],
        tags: ['vintage', 'band', 'tshirt', '90s'],
        createdAt: '2024-07-01T17:30:00Z',
        owner: {
            _id: 'user10',
            name: 'Tom Wilson',
            avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop'
        },
        available: true
    },
    {
        _id: '11',
        title: 'Maxi Skirt',
        description: 'Flowing maxi skirt in earthy tones. Perfect for bohemian style lovers.',
        category: 'Bottoms',
        condition: 'Excellent',
        size: 'S',
        points: 30,
        images: ['https://images.unsplash.com/photo-1583496661160-fb5886a13c27?w=400&h=400&fit=crop'],
        tags: ['maxi', 'skirt', 'bohemian', 'earthy'],
        createdAt: '2024-06-30T09:45:00Z',
        owner: {
            _id: 'user11',
            name: 'Sophie Martin',
            avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop'
        },
        available: true
    },
    {
        _id: '12',
        title: 'Designer Sunglasses',
        description: 'Authentic designer sunglasses with UV protection. Classic aviator style.',
        category: 'Accessories',
        condition: 'Good',
        size: 'One Size',
        points: 45,
        images: ['https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop'],
        tags: ['sunglasses', 'designer', 'aviator', 'UV'],
        createdAt: '2024-06-29T14:20:00Z',
        owner: {
            _id: 'user12',
            name: 'James Brown',
            avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&h=100&fit=crop'
        },
        available: true
    },
    {
        _id: '13',
        title: 'Formal Blazer',
        description: 'Sharp black blazer perfect for business meetings and formal events.',
        category: 'Formal',
        condition: 'Excellent',
        size: 'M',
        points: 60,
        images: ['https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=400&fit=crop'],
        tags: ['blazer', 'formal', 'business', 'black'],
        createdAt: '2024-06-28T11:15:00Z',
        owner: {
            _id: 'user13',
            name: 'Anna Lee',
            avatar: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=100&h=100&fit=crop'
        },
        available: true
    },
    {
        _id: '14',
        title: 'Ankle Boots',
        description: 'Stylish ankle boots in tan leather. Perfect for fall and winter styling.',
        category: 'Shoes',
        condition: 'Good',
        size: '8',
        points: 40,
        images: ['https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=400&fit=crop'],
        tags: ['boots', 'ankle', 'leather', 'tan'],
        createdAt: '2024-06-27T16:00:00Z',
        owner: {
            _id: 'user14',
            name: 'Chris Johnson',
            avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=100&h=100&fit=crop'
        },
        available: true
    },
    {
        _id: '15',
        title: 'Denim Shorts',
        description: 'Classic denim shorts with distressed details. Perfect for summer casual wear.',
        category: 'Bottoms',
        condition: 'Good',
        size: 'M',
        points: 20,
        images: ['https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&h=400&fit=crop'],
        tags: ['denim', 'shorts', 'summer', 'casual'],
        createdAt: '2024-06-26T13:30:00Z',
        owner: {
            _id: 'user15',
            name: 'Katie Davis',
            avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100&h=100&fit=crop'
        },
        available: true
    },
    {
        _id: '16',
        title: 'Cardigan Sweater',
        description: 'Cozy knit cardigan in soft gray. Perfect for layering in cooler weather.',
        category: 'Tops',
        condition: 'Excellent',
        size: 'L',
        points: 35,
        images: ['https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=400&fit=crop'],
        tags: ['cardigan', 'knit', 'gray', 'cozy'],
        createdAt: '2024-06-25T10:20:00Z',
        owner: {
            _id: 'user16',
            name: 'Michael Brown',
            avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&h=100&fit=crop'
        },
        available: true
    },
    {
        _id: '17',
        title: 'Evening Gown',
        description: 'Elegant black evening gown perfect for formal events and galas.',
        category: 'Formal',
        condition: 'Excellent',
        size: 'S',
        points: 85,
        images: ['https://images.unsplash.com/photo-1566479179817-c9a55a4330ba?w=400&h=400&fit=crop'],
        tags: ['evening', 'gown', 'formal', 'elegant'],
        createdAt: '2024-06-24T15:45:00Z',
        owner: {
            _id: 'user17',
            name: 'Isabella Taylor',
            avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&h=100&fit=crop'
        },
        available: true
    },
    {
        _id: '18',
        title: 'Canvas Sneakers',
        description: 'Classic white canvas sneakers. Versatile and comfortable for everyday wear.',
        category: 'Shoes',
        condition: 'Good',
        size: '7',
        points: 25,
        images: ['https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&h=400&fit=crop'],
        tags: ['canvas', 'sneakers', 'white', 'casual'],
        createdAt: '2024-06-23T12:10:00Z',
        owner: {
            _id: 'user18',
            name: 'Oliver Martinez',
            avatar: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=100&h=100&fit=crop'
        },
        available: true
    },
    {
        _id: '19',
        title: 'Workout Tank Top',
        description: 'Breathable workout tank top in bright coral. Perfect for gym sessions.',
        category: 'Activewear',
        condition: 'Good',
        size: 'S',
        points: 15,
        images: ['https://images.unsplash.com/photo-1506629905499-864d15ffbc7e?w=400&h=400&fit=crop'],
        tags: ['workout', 'tank', 'coral', 'gym'],
        createdAt: '2024-06-22T08:30:00Z',
        owner: {
            _id: 'user19',
            name: 'Grace Wilson',
            avatar: 'https://images.unsplash.com/photo-1488716820095-cbe80883c496?w=100&h=100&fit=crop'
        },
        available: true
    },
    {
        _id: '20',
        title: 'Trench Coat',
        description: 'Classic beige trench coat. Timeless piece that works for any season.',
        category: 'Outerwear',
        condition: 'Good',
        size: 'M',
        points: 75,
        images: ['https://images.unsplash.com/photo-1544966503-7cc5ac882d5a?w=400&h=400&fit=crop'],
        tags: ['trench', 'coat', 'beige', 'classic'],
        createdAt: '2024-06-21T14:55:00Z',
        owner: {
            _id: 'user20',
            name: 'Ethan Garcia',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
        },
        available: true
    },
    {
        _id: '21',
        title: 'Cocktail Dress',
        description: 'Stunning red cocktail dress perfect for parties and celebrations.',
        category: 'Dresses',
        condition: 'Excellent',
        size: 'M',
        points: 55,
        images: ['https://images.unsplash.com/photo-1566479179817-c9a55a4330ba?w=400&h=400&fit=crop'],
        tags: ['cocktail', 'dress', 'red', 'party'],
        createdAt: '2024-06-20T11:40:00Z',
        owner: {
            _id: 'user21',
            name: 'Zoe Anderson',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop'
        },
        available: true
    },
    {
        _id: '22',
        title: 'Leather Jacket',
        description: 'Edgy black leather jacket with silver hardware. Perfect for rock-chic style.',
        category: 'Outerwear',
        condition: 'Good',
        size: 'S',
        points: 80,
        images: ['https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop'],
        tags: ['leather', 'jacket', 'black', 'edgy'],
        createdAt: '2024-06-19T16:25:00Z',
        owner: {
            _id: 'user22',
            name: 'Ryan Thompson',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'
        },
        available: true
    },
    {
        _id: '23',
        title: 'Plaid Shirt',
        description: 'Cozy flannel plaid shirt in red and black. Perfect for casual outdoor activities.',
        category: 'Tops',
        condition: 'Good',
        size: 'L',
        points: 25,
        images: ['https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=400&fit=crop'],
        tags: ['plaid', 'flannel', 'casual', 'outdoor'],
        createdAt: '2024-06-18T09:15:00Z',
        owner: {
            _id: 'user23',
            name: 'Hannah White',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop'
        },
        available: true
    },
    {
        _id: '24',
        title: 'Wide-Leg Pants',
        description: 'Flowing wide-leg pants in navy blue. Comfortable and stylish for work or play.',
        category: 'Bottoms',
        condition: 'Excellent',
        size: 'M',
        points: 40,
        images: ['https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop'],
        tags: ['wide-leg', 'pants', 'navy', 'comfortable'],
        createdAt: '2024-06-17T13:50:00Z',
        owner: {
            _id: 'user24',
            name: 'Lucas Miller',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop'
        },
        available: true
    },
    {
        _id: '25',
        title: 'Statement Necklace',
        description: 'Bold statement necklace with gold and turquoise details. Perfect for special occasions.',
        category: 'Accessories',
        condition: 'Excellent',
        size: 'One Size',
        points: 30,
        images: ['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop'],
        tags: ['statement', 'necklace', 'gold', 'turquoise'],
        createdAt: '2024-06-16T10:30:00Z',
        owner: {
            _id: 'user25',
            name: 'Mia Johnson',
            avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop'
        },
        available: true
    },
    {
        _id: '26',
        title: 'Hiking Boots',
        description: 'Sturdy hiking boots perfect for outdoor adventures. Waterproof and comfortable.',
        category: 'Shoes',
        condition: 'Good',
        size: '9',
        points: 60,
        images: ['https://images.unsplash.com/photo-1544966503-7cc5ac882d5a?w=400&h=400&fit=crop'],
        tags: ['hiking', 'boots', 'outdoor', 'waterproof'],
        createdAt: '2024-06-15T15:20:00Z',
        owner: {
            _id: 'user26',
            name: 'Noah Davis',
            avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop'
        },
        available: true
    },
    {
        _id: '27',
        title: 'Kimono Robe',
        description: 'Beautiful silk kimono-style robe with floral patterns. Perfect for lounging.',
        category: 'Casual',
        condition: 'Excellent',
        size: 'One Size',
        points: 45,
        images: ['https://images.unsplash.com/photo-1583496661160-fb5886a13c27?w=400&h=400&fit=crop'],
        tags: ['kimono', 'robe', 'silk', 'floral'],
        createdAt: '2024-06-14T12:45:00Z',
        owner: {
            _id: 'user27',
            name: 'Ava Wilson',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop'
        },
        available: true
    },
    {
        _id: '28',
        title: 'Tote Bag',
        description: 'Large canvas tote bag perfect for shopping or beach days. Eco-friendly choice.',
        category: 'Bags',
        condition: 'Good',
        size: 'One Size',
        points: 20,
        images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop'],
        tags: ['tote', 'canvas', 'shopping', 'eco-friendly'],
        createdAt: '2024-06-13T08:10:00Z',
        owner: {
            _id: 'user28',
            name: 'Liam Brown',
            avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&h=100&fit=crop'
        },
        available: true
    },
    {
        _id: '29',
        title: 'Sports Bra',
        description: 'High-support sports bra in purple. Perfect for intense workouts and running.',
        category: 'Activewear',
        condition: 'Good',
        size: 'M',
        points: 20,
        images: ['https://images.unsplash.com/photo-1506629905499-864d15ffbc7e?w=400&h=400&fit=crop'],
        tags: ['sports', 'bra', 'purple', 'support'],
        createdAt: '2024-06-12T14:30:00Z',
        owner: {
            _id: 'user29',
            name: 'Emma Thompson',
            avatar: 'https://images.unsplash.com/photo-1488716820095-cbe80883c496?w=100&h=100&fit=crop'
        },
        available: true
    },
    {
        _id: '30',
        title: 'Vintage Scarf',
        description: 'Authentic vintage silk scarf with geometric patterns. Perfect accessory for any outfit.',
        category: 'Accessories',
        condition: 'Fair',
        size: 'One Size',
        points: 25,
        images: ['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop'],
        tags: ['vintage', 'scarf', 'silk', 'geometric'],
        createdAt: '2024-06-11T11:00:00Z',
        owner: {
            _id: 'user30',
            name: 'William Garcia',
            avatar: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=100&h=100&fit=crop'
        },
        available: true
    }
];

export const mockTestimonials = [
    {
        id: 1,
        name: 'Sarah Johnson',
        text: 'ReWear has transformed my wardrobe! I\'ve found amazing pieces and made great swaps.',
        rating: 5
    },
    {
        id: 2,
        name: 'Mike Chen',
        text: 'Sustainable fashion made easy. Love the community aspect of this platform.',
        rating: 5
    },
    {
        id: 3,
        name: 'Emma Davis',
        text: 'Great way to declutter and find new favorites. Highly recommend!',
        rating: 5
    }
];

export const mockStats = {
    totalItems: 30,
    totalUsers: 30,
    totalSwaps: 45,
    itemsSaved: 128
};
