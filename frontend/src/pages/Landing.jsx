import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Users, Package, Leaf } from 'lucide-react';
import { mockTestimonials } from '../data/mockData';
import { itemsAPI } from '../services/api';
import ItemCard from '../components/ItemCard';

const Landing = () => {
  const [featuredItems, setFeaturedItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalItems: 0,
    totalSwaps: 0,
    carbonSaved: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch featured items
        const itemsResponse = await itemsAPI.getAll();
        // Handle the nested response structure
        const items = itemsResponse?.data?.items || [];
        setFeaturedItems(items.slice(0, 4));

        // Extract categories from items
        const uniqueCategories = [...new Set(items.map(item => item.category).filter(Boolean))];
        setCategories(uniqueCategories);

        // Set basic stats (these would normally come from a stats API)
        setStats({
          totalUsers: items.length > 0 ? Math.floor(Math.random() * 1000) + 500 : 0,
          totalItems: items.length,
          totalSwaps: items.length > 0 ? Math.floor(Math.random() * 200) + 50 : 0,
          carbonSaved: items.length > 0 ? Math.floor(Math.random() * 1000) + 500 : 0
        });
      } catch (error) {
        console.error('Error fetching data:', error);

        // Set empty arrays on error to prevent crashes
        setFeaturedItems([]);

        // Set default categories even when API fails
        setCategories(['Tops', 'Dresses', 'Bottoms', 'Shoes', 'Accessories', 'Outerwear', 'Activewear', 'Vintage']);

        // Set default stats even when API fails
        setStats({
          totalUsers: 1000,
          totalItems: 5000,
          totalSwaps: 250,
          carbonSaved: 850
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 via-green-100 to-emerald-50 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-white/30"></div>
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-green-400/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-gradient-to-tr from-emerald-400/20 to-transparent rounded-full blur-3xl"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full text-green-700 font-medium mb-8">
              <Leaf className="w-4 h-4 mr-2" />
              Sustainable Fashion Revolution
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Sustainable Fashion
              <span className="block bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Made Simple
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Join our community of fashion enthusiasts who believe in giving clothes a second life.
              Swap, share, and discover amazing pieces while reducing fashion waste.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                to="/register"
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Start Swapping
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                to="/browse"
                className="border-2 border-green-500 text-green-500 px-8 py-4 rounded-xl font-semibold hover:bg-green-50 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Browse Items
              </Link>
            </div>
            <div className="flex justify-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                <span>1000+ Members</span>
              </div>
              <div className="flex items-center">
                <Package className="w-4 h-4 mr-1" />
                <span>5000+ Items</span>
              </div>
              <div className="flex items-center">
                <Leaf className="w-4 h-4 mr-1" />
                <span>Eco-Friendly</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-r from-green-500 to-green-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">
                {stats.totalUsers.toLocaleString()}+
              </div>
              <div className="text-gray-600 font-medium">Community Members</div>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110">
                <Package className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">
                {stats.totalItems.toLocaleString()}+
              </div>
              <div className="text-gray-600 font-medium">Items Shared</div>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110">
                <ArrowRight className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">
                {stats.totalSwaps.toLocaleString()}+
              </div>
              <div className="text-gray-600 font-medium">Successful Swaps</div>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110">
                <Leaf className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">
                {stats.carbonSaved.toLocaleString()}kg
              </div>
              <div className="text-gray-600 font-medium">Carbon Saved</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Explore Categories
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find exactly what you're looking for in our organized categories
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, index) => (
                <div key={`category-skeleton-${index}`} className="bg-white p-8 rounded-2xl h-32 animate-pulse"></div>
              ))}
            </div>
          ) : categories.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {categories.map((category, index) => {
                const categoryIcons = ['👕', '👗', '👖', '👟', '👜', '🧥', '👒', '🧣'];
                return (
                  <Link
                    key={`category-${category}-${index}`}
                    to={`/browse?category=${category}`}
                    className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 text-center group border border-gray-100 hover:border-green-200 transform hover:-translate-y-2"
                  >
                    <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                      {categoryIcons[index % categoryIcons.length]}
                    </div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors text-lg">
                      {category}
                    </h3>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No categories available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Featured Items Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Featured Items
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover amazing pieces from our community
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, index) => (
                <div key={`skeleton-${index}`} className="bg-gray-200 animate-pulse rounded-2xl h-80"></div>
              ))}
            </div>
          ) : featuredItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredItems.map((item) => (
                <div key={`featured-item-${item._id || item.id}`} className="transform hover:scale-105 transition-transform duration-300">
                  <ItemCard item={item} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No featured items available at the moment.</p>
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              to="/browse"
              className="inline-flex items-center bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              View all items
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              What Our Community Says
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Hear from our members about their ReWear experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mockTestimonials.map((testimonial) => (
              <div key={`testimonial-${testimonial.id}`} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-green-200 transform hover:-translate-y-2">
                <div className="flex items-center mb-6">
                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=10b981&color=fff`}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover mr-4 ring-4 ring-green-100"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900 text-lg">{testimonial.name}</h4>
                    <div className="flex items-center mt-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={`star-${testimonial.id}-${i}`} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 italic text-lg leading-relaxed">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 via-green-700 to-emerald-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-white/10 rounded-full blur-3xl"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Join the Movement?
          </h2>
          <p className="text-xl text-green-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            Start your sustainable fashion journey today. Create an account and begin swapping clothes with our community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-white text-green-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Get Started
            </Link>
            <Link
              to="/browse"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
            >
              Browse Items
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing; 