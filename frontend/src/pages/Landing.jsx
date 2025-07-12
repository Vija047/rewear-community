import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Users, Package, Leaf } from 'lucide-react';
import { mockCategories, mockItems, mockTestimonials, mockStats } from '../data/mockData';
import ItemCard from '../components/ItemCard';

const Landing = () => {
  const featuredItems = mockItems.slice(0, 4);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 to-green-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Sustainable Fashion
              <span className="text-green-600 block">Made Simple</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Join our community of fashion enthusiasts who believe in giving clothes a second life. 
              Swap, share, and discover amazing pieces while reducing fashion waste.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center justify-center"
              >
                Start Swapping
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                to="/browse"
                className="border-2 border-green-500 text-green-500 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
              >
                Browse Items
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {mockStats.totalUsers.toLocaleString()}+
              </div>
              <div className="text-gray-600">Community Members</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {mockStats.totalItems.toLocaleString()}+
              </div>
              <div className="text-gray-600">Items Shared</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {mockStats.totalSwaps.toLocaleString()}+
              </div>
              <div className="text-gray-600">Successful Swaps</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {mockStats.carbonSaved.toLocaleString()}kg
              </div>
              <div className="text-gray-600">Carbon Saved</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Explore Categories
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find exactly what you're looking for in our organized categories
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {mockCategories.map((category) => (
              <Link
                key={category.id}
                to={`/browse?category=${category.name}`}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center group"
              >
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Items Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Items
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover amazing pieces from our community
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredItems.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link
              to="/browse"
              className="inline-flex items-center text-green-600 hover:text-green-700 font-semibold"
            >
              View all items
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Our Community Says
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear from our members about their ReWear experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mockTestimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.user.avatar}
                    alt={testimonial.user.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.user.name}</h4>
                    <div className="flex items-center">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Join the Movement?
          </h2>
          <p className="text-green-100 mb-8 max-w-2xl mx-auto">
            Start your sustainable fashion journey today. Create an account and begin swapping clothes with our community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Get Started
            </Link>
            <Link
              to="/browse"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
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