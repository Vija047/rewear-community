import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, Grid, List } from 'lucide-react';

import ItemCard from '../components/ItemCard';
import { itemsAPI } from '../services/api';
import { mockItems, mockCategories } from '../data/mockData';

const Browse = () => {
  const [searchParams] = useSearchParams();
  const [items, setItems] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCondition, setSelectedCondition] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');

  const conditions = ['Excellent', 'Good', 'Fair'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  // Fetch items from backend
  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const response = await itemsAPI.getAll();
        console.log('API Response:', response); // Debug log

        // Handle different response structures
        let fetchedItems = [];
        if (response && Array.isArray(response.data)) {
          fetchedItems = response.data;
        } else if (response && Array.isArray(response)) {
          fetchedItems = response;
        } else if (response && response.data && Array.isArray(response.data.items)) {
          fetchedItems = response.data.items;
        }

        // Use mock data if no items from API or API fails
        if (fetchedItems.length === 0) {
          fetchedItems = mockItems;
          console.log('Using mock data as fallback');
        }

        setAllItems(fetchedItems);
        setItems(fetchedItems);

        // Extract unique categories from items, with fallback to mock categories
        const uniqueCategories = [...new Set(fetchedItems.map(item => item.category).filter(Boolean))];
        if (uniqueCategories.length === 0) {
          setCategories(mockCategories);
        } else {
          setCategories(uniqueCategories);
        }
      } catch (err) {
        setError('');
        console.error('Error fetching items, using mock data:', err);
        // Use mock data as fallback when API fails
        setAllItems(mockItems);
        setItems(mockItems);
        setCategories(mockCategories);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  useEffect(() => {
    // Get category from URL params
    const category = searchParams.get('category');
    if (category) {
      setSelectedCategory(category);
    }
  }, [searchParams]);

  useEffect(() => {
    // Ensure allItems is an array before filtering
    if (!Array.isArray(allItems)) {
      setItems([]);
      return;
    }

    let filteredItems = [...allItems];

    // Filter by search term
    if (searchTerm) {
      filteredItems = filteredItems.filter(item =>
        (item.title && item.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.tags && Array.isArray(item.tags) && item.tags.some(tag =>
          typeof tag === 'string' && tag.toLowerCase().includes(searchTerm.toLowerCase())
        ))
      );
    }

    // Filter by category
    if (selectedCategory) {
      filteredItems = filteredItems.filter(item => item.category === selectedCategory);
    }

    // Filter by condition
    if (selectedCondition) {
      filteredItems = filteredItems.filter(item => item.condition === selectedCondition);
    }

    // Filter by size
    if (selectedSize) {
      filteredItems = filteredItems.filter(item => item.size === selectedSize);
    }

    // Sort items
    switch (sortBy) {
      case 'newest':
        filteredItems.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
        break;
      case 'oldest':
        filteredItems.sort((a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0));
        break;
      case 'points-low':
        filteredItems.sort((a, b) => (a.points || 0) - (b.points || 0));
        break;
      case 'points-high':
        filteredItems.sort((a, b) => (b.points || 0) - (a.points || 0));
        break;
      default:
        break;
    }

    setItems(filteredItems);
  }, [searchTerm, selectedCategory, selectedCondition, selectedSize, sortBy, allItems]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedCondition('');
    setSelectedSize('');
    setSortBy('newest');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading items...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2 sm:mb-4">
            Browse Items
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Discover amazing pieces from our community
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-4 sm:p-6 lg:p-8 mb-8">
          {/* Mobile/Phone View - Stacked Layout */}
          <div className="block lg:hidden space-y-4">
            {/* Search - Full width on mobile */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white text-sm"
              />
            </div>

            {/* Filters Row on Mobile */}
            <div className="grid grid-cols-2 gap-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white text-sm"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white text-sm"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="points-low">Points ↑</option>
                <option value="points-high">Points ↓</option>
              </select>
            </div>

            {/* Additional Filters on Mobile */}
            <div className="grid grid-cols-2 gap-3">
              <select
                value={selectedCondition}
                onChange={(e) => setSelectedCondition(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white text-sm"
              >
                <option value="">All Conditions</option>
                {conditions.map((condition) => (
                  <option key={condition} value={condition}>
                    {condition}
                  </option>
                ))}
              </select>

              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white text-sm"
              >
                <option value="">All Sizes</option>
                {sizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>

            {/* Clear Filters Button on Mobile */}
            <button
              onClick={clearFilters}
              className="w-full px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-300"
            >
              Clear All Filters
            </button>
          </div>

          {/* Desktop/Laptop View - Original Grid Layout */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Search */}
              <div className="lg:col-span-2">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search items..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white"
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort */}
              <div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="points-low">Points: Low to High</option>
                  <option value="points-high">Points: High to Low</option>
                </select>
              </div>
            </div>

            {/* Additional Filters */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex flex-wrap gap-6">
                {/* Condition Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Condition</label>
                  <select
                    value={selectedCondition}
                    onChange={(e) => setSelectedCondition(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white"
                  >
                    <option value="">All Conditions</option>
                    {conditions.map((condition) => (
                      <option key={condition} value={condition}>
                        {condition}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Size Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Size</label>
                  <select
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white"
                  >
                    <option value="">All Sizes</option>
                    {sizes.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Clear Filters */}
                <div className="flex items-end">
                  <button
                    onClick={clearFilters}
                    className="px-6 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-300"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 space-y-4 sm:space-y-0">
          <div>
            <p className="text-base sm:text-lg text-gray-600 font-medium">
              Showing <span className="text-green-600 font-semibold">{items.length}</span> of <span className="font-semibold">{allItems.length}</span> items
            </p>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <span className="text-sm text-gray-500 hidden sm:inline">View:</span>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 sm:p-3 rounded-xl transition-all duration-300 ${viewMode === 'grid'
                ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg'
                : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                }`}
            >
              <Grid className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 sm:p-3 rounded-xl transition-all duration-300 ${viewMode === 'list'
                ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg'
                : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                }`}
            >
              <List className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Items Grid */}
        {items.length > 0 ? (
          <div className={`grid gap-4 sm:gap-6 lg:gap-8 ${viewMode === 'grid'
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'
            : 'grid-cols-1'
            }`}>
            {items.map((item) => (
              <div key={item._id || item.id} className="transform hover:scale-105 transition-transform duration-300">
                <ItemCard item={item} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 sm:py-16 px-4">
            <div className="text-gray-400 mb-4 sm:mb-6">
              <Search className="w-16 h-16 sm:w-20 sm:h-20 mx-auto" />
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-600 mb-4 sm:mb-6 text-base sm:text-lg px-4">
              Try adjusting your search or filters to find what you're looking for.
            </p>
            <button
              onClick={clearFilters}
              className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse; 