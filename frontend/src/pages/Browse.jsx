import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, Grid, List } from 'lucide-react';
import { mockItems, mockCategories } from '../data/mockData';
import ItemCard from '../components/ItemCard';

const Browse = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [items, setItems] = useState(mockItems);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCondition, setSelectedCondition] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');

  const conditions = ['Excellent', 'Good', 'Fair'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  useEffect(() => {
    // Get category from URL params
    const category = searchParams.get('category');
    if (category) {
      setSelectedCategory(category);
    }
  }, [searchParams]);

  useEffect(() => {
    let filteredItems = [...mockItems];

    // Filter by search term
    if (searchTerm) {
      filteredItems = filteredItems.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
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
        filteredItems.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'oldest':
        filteredItems.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'points-low':
        filteredItems.sort((a, b) => a.points - b.points);
        break;
      case 'points-high':
        filteredItems.sort((a, b) => b.points - a.points);
        break;
      default:
        break;
    }

    setItems(filteredItems);
  }, [searchTerm, selectedCategory, selectedCondition, selectedSize, sortBy]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedCondition('');
    setSelectedSize('');
    setSortBy('newest');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Items</h1>
          <p className="text-gray-600">Discover amazing pieces from our community</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              >
                <option value="">All Categories</option>
                {mockCategories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="points-low">Points: Low to High</option>
                <option value="points-high">Points: High to Low</option>
              </select>
            </div>
          </div>

          {/* Additional Filters */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex flex-wrap gap-4">
              {/* Condition Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
                <select
                  value={selectedCondition}
                  onChange={(e) => setSelectedCondition(e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
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
                  className="px-4 py-1 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-gray-600">
              Showing {items.length} of {mockItems.length} items
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-green-100 text-green-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-green-100 text-green-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Items Grid */}
        {items.length > 0 ? (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {items.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search or filters to find what you're looking for.
            </p>
            <button
              onClick={clearFilters}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
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