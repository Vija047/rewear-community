# ReWear Frontend

A modern, responsive React.js frontend for ReWear – A Community Clothing Exchange Platform.

## Features

### 🧑‍💻 Authentication
- **Login Page**: Email and password authentication with form validation
- **Registration Page**: User registration with avatar upload placeholder
- **Protected Routes**: Automatic redirection for unauthenticated users

### 🏠 Landing Page
- **Hero Section**: Compelling call-to-action with sustainable fashion messaging
- **Statistics**: Community impact metrics (users, items, swaps, carbon saved)
- **Categories**: Grid of clothing categories with icons
- **Featured Items**: Showcase of community items
- **Testimonials**: User reviews and community feedback

### 📣 Browse & Search
- **Advanced Search**: Search by title, description, and tags
- **Filters**: Category, condition, size, and sorting options
- **Grid/List View**: Toggle between different viewing modes
- **Responsive Design**: Mobile-friendly interface

### 📄 Item Details
- **Image Gallery**: Main image with thumbnail navigation
- **Item Information**: Complete details including condition, size, category
- **Uploader Profile**: User information and location
- **Action Buttons**: Request swap or redeem with points
- **Status Indicators**: Available/Swapped/Redeemed status

### 👤 User Dashboard
- **Profile Section**: User avatar, name, email, location, points
- **My Listings**: Grid of user's uploaded items
- **Swap Requests**: Pending and completed swap requests
- **Statistics**: Points balance, items listed, member since

### 📤 Add New Item
- **Image Upload**: Multiple image upload with preview
- **Form Validation**: Required fields and error handling
- **Tag System**: Dynamic tag addition and removal
- **Category Selection**: Dropdown with predefined categories

### 🛠️ Admin Panel
- **User Management**: View, approve, block users
- **Listing Management**: Approve, reject, flag listings
- **Search & Filters**: Advanced filtering capabilities
- **Statistics Dashboard**: Platform metrics and insights

## Technology Stack

- **React 19**: Latest React with hooks and functional components
- **React Router DOM**: Client-side routing
- **Tailwind CSS 4**: Utility-first CSS framework
- **Lucide React**: Modern icon library
- **Context API**: State management for authentication
- **Vite**: Fast build tool and development server

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.jsx      # Navigation header
│   └── ItemCard.jsx    # Item display card
├── context/            # React Context providers
│   └── AuthContext.jsx # Authentication state management
├── data/               # Mock data and constants
│   └── mockData.js     # Sample data for development
├── pages/              # Page components
│   ├── Landing.jsx     # Home/Landing page
│   ├── Login.jsx       # Authentication pages
│   ├── Register.jsx
│   ├── Browse.jsx      # Item browsing
│   ├── ItemDetail.jsx  # Item details
│   ├── Dashboard.jsx   # User dashboard
│   ├── AddItem.jsx     # Add new item
│   └── AdminPanel.jsx  # Admin interface
├── App.jsx             # Main app component
└── main.jsx           # App entry point
```

## Key Features

### Responsive Design
- Mobile-first approach
- Breakpoint-based responsive layouts
- Touch-friendly interface

### Modern UI/UX
- Clean, minimalist design
- Consistent color scheme (green theme)
- Smooth animations and transitions
- Loading states and error handling

### Authentication Flow
- Context-based state management
- Protected routes
- Persistent login state
- Form validation

### Mock Data Integration
- Comprehensive sample data
- Realistic user profiles
- Varied item categories
- Testimonials and statistics

## Development Notes

### Mock Authentication
- Uses localStorage for session persistence
- Mock user data for testing
- Simulated API calls with delays

### Image Handling
- Placeholder images from Unsplash
- Image upload simulation
- Gallery navigation

### State Management
- React Context for global state
- Local state for component-specific data
- Form state management

## Future Enhancements

- **Real API Integration**: Connect to backend services
- **Image Upload**: Cloud storage integration
- **Real-time Features**: WebSocket for live updates
- **Advanced Search**: Elasticsearch integration
- **PWA Features**: Service workers and offline support
- **Internationalization**: Multi-language support

## Contributing

1. Follow the existing code structure
2. Use Tailwind CSS for styling
3. Implement responsive design
4. Add proper error handling
5. Include loading states
6. Test on mobile devices

## License

This project is part of the ReWear Community Clothing Exchange Platform.
