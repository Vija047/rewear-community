# ReWear Backend API

A comprehensive backend API for the ReWear Community Clothing Exchange platform, built with Node.js, Express, and MongoDB.

## 🚀 Features

### User Management
- User registration and authentication with JWT
- Email verification and password reset
- Profile management with preferences
- Role-based access control (User/Admin)

### Item Management
- Create, read, update, and delete clothing items
- Image upload with Cloudinary integration
- Advanced search and filtering
- Item approval system for admins
- Points-based redemption system

### Swap System
- Create swap requests between users
- Accept/reject swap requests
- Points-based item redemption
- Meeting coordination
- Swap completion tracking

### Admin Features
- Item moderation and approval
- User management
- Statistics and analytics
- Content moderation

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Multer + Cloudinary
- **Email**: Nodemailer
- **Validation**: Express-validator
- **Security**: Helmet, CORS, Rate limiting

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud)
- Cloudinary account (for image uploads)
- Email service (Gmail, SendGrid, etc.)

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp config.env.example .env
   ```
   
   Edit `.env` file with your configuration:
   ```env
   # Server Configuration
   PORT=3000
   NODE_ENV=development
   
   # Database Configuration
   MONGODB_URI=mongodb://localhost:27017/rewear
   
   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRES_IN=7d
   
   # Cloudinary Configuration
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   
   # Email Configuration
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   
   # Frontend URL (for CORS)
   FRONTEND_URL=http://localhost:3000
   ```

4. **Start the server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "Password123",
  "firstName": "John",
  "lastName": "Doe",
  "username": "johndoe"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "Password123"
}
```

#### Get Profile
```http
GET /api/auth/profile
Authorization: Bearer <token>
```

### Items Endpoints

#### Get All Items
```http
GET /api/items?page=1&limit=12&category=men&size=M&condition=good
```

#### Create Item
```http
POST /api/items
Authorization: Bearer <token>
Content-Type: multipart/form-data

{
  "title": "Blue Denim Jacket",
  "description": "Classic blue denim jacket in excellent condition",
  "category": "men",
  "type": "jackets",
  "size": "L",
  "condition": "good",
  "color": "blue",
  "brand": "Levi's",
  "price": 0,
  "pointsValue": 50,
  "images": [file1, file2, ...]
}
```

#### Get Item by ID
```http
GET /api/items/:id
```

#### Update Item
```http
PUT /api/items/:id
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

#### Delete Item
```http
DELETE /api/items/:id
Authorization: Bearer <token>
```

### Swap Endpoints

#### Create Swap Request
```http
POST /api/swaps
Authorization: Bearer <token>
Content-Type: application/json

{
  "requestedItemId": "item_id",
  "offeredItemId": "item_id",
  "message": "Would you like to swap?",
  "isPointsRedemption": false,
  "pointsOffered": 0,
  "meetingLocation": "Central Park",
  "meetingDate": "2024-01-15",
  "meetingTime": "2:00 PM"
}
```

#### Get User's Swap Requests
```http
GET /api/swaps?status=pending&page=1&limit=10
Authorization: Bearer <token>
```

#### Respond to Swap Request
```http
PUT /api/swaps/:id/respond
Authorization: Bearer <token>
Content-Type: application/json

{
  "action": "accept",
  "responseMessage": "Sounds good!"
}
```

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Bcrypt for password security
- **Input Validation**: Comprehensive validation using express-validator
- **Rate Limiting**: Protection against abuse
- **CORS**: Cross-origin resource sharing configuration
- **Helmet**: Security headers
- **File Upload Security**: File type and size validation

## 📊 Database Schema

### User Model
- Basic info (name, email, username)
- Authentication fields
- Profile preferences
- Points system
- Role-based access

### Item Model
- Item details (title, description, category, etc.)
- Image management
- Availability status
- Approval system
- Points value

### SwapRequest Model
- Request details
- Status tracking
- Meeting coordination
- Points redemption

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## 📈 Performance Features

- **Database Indexing**: Optimized queries with proper indexes
- **Image Optimization**: Automatic image compression and optimization
- **Caching**: Response caching for frequently accessed data
- **Pagination**: Efficient data loading
- **Error Handling**: Comprehensive error management

## 🚀 Deployment

### Environment Variables
Ensure all required environment variables are set in production:

```env
NODE_ENV=production
MONGODB_URI=your-production-mongodb-uri
JWT_SECRET=your-production-jwt-secret
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
EMAIL_HOST=your-email-host
EMAIL_PORT=587
EMAIL_USER=your-email-user
EMAIL_PASS=your-email-password
FRONTEND_URL=https://your-frontend-domain.com
```

### Production Checklist
- [ ] Set NODE_ENV to production
- [ ] Use strong JWT secret
- [ ] Configure production MongoDB
- [ ] Set up Cloudinary account
- [ ] Configure email service
- [ ] Set up SSL/TLS
- [ ] Configure proper CORS origins
- [ ] Set up monitoring and logging

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔄 Version History

- **v1.0.0**: Initial release with core features
  - User authentication
  - Item management
  - Swap system
  - Admin panel
  - Image upload
  - Email notifications 