const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Enable CORS
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true
}));

app.use(express.json());

// Test route
app.get('/api/test', (req, res) => {
    res.json({ success: true, message: 'Server is working!' });
});

// Mock items endpoint
app.get('/api/items', (req, res) => {
    const mockItems = [
        {
            _id: '1',
            title: 'Vintage Denim Jacket',
            description: 'A beautiful vintage denim jacket in excellent condition',
            category: 'Outerwear',
            size: 'M',
            condition: 'Excellent',
            images: ['https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300']
        },
        {
            _id: '2',
            title: 'Summer Floral Dress',
            description: 'Light and airy summer dress perfect for warm days',
            category: 'Dresses',
            size: 'S',
            condition: 'Good',
            images: ['https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=300']
        },
        {
            _id: '3',
            title: 'Designer Sneakers',
            description: 'Stylish designer sneakers, barely worn',
            category: 'Shoes',
            size: '9',
            condition: 'Excellent',
            images: ['https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300']
        },
        {
            _id: '4',
            title: 'Cashmere Sweater',
            description: 'Soft cashmere sweater in neutral beige',
            category: 'Tops',
            size: 'L',
            condition: 'Very Good',
            images: ['https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=300']
        }
    ];

    res.json({
        success: true,
        data: {
            items: mockItems,
            pagination: {
                page: 1,
                limit: 10,
                total: mockItems.length,
                totalPages: 1
            }
        }
    });
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Something went wrong!' });
});

app.listen(PORT, () => {
    console.log(`✅ Test server running on http://localhost:${PORT}`);
    console.log(`📊 Mock API endpoints available:`);
    console.log(`   GET /api/test`);
    console.log(`   GET /api/items`);
});
