import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Star } from 'lucide-react';

const ItemCard = ({ item }) => {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-white/20 hover:border-green-200 transform hover:-translate-y-2 card-enhanced">
      {/* Image */}
      <div className="relative group">
        <img
          src={item.images?.[0] || 'https://via.placeholder.com/300x256/f3f4f6/9ca3af?text=No+Image'}
          alt={item.title || 'Item image'}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x256/f3f4f6/9ca3af?text=No+Image';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute top-3 right-3">
          <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-300 hover:scale-110">
            <Heart className="w-5 h-5 text-gray-600 hover:text-red-500 transition-colors" />
          </button>
        </div>
        {item.status === 'Available' && (
          <div className="absolute top-3 left-3">
            <span className="bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
              Available
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-bold text-gray-900 text-lg line-clamp-1">
            {item.title || 'Untitled Item'}
          </h3>
          <div className="flex items-center space-x-1 bg-yellow-50 px-2 py-1 rounded-lg">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="text-sm font-semibold text-yellow-700">4.8</span>
          </div>
        </div>

        <div className="flex items-center space-x-3 mb-4 text-sm">
          <span className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 px-3 py-1 rounded-full font-medium">
            {item.size || 'N/A'}
          </span>
          <span className="bg-gradient-to-r from-purple-100 to-purple-200 text-purple-700 px-3 py-1 rounded-full font-medium">
            {item.condition || 'N/A'}
          </span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4 text-green-500" />
            <span className="font-medium">{item.uploader?.location || 'Unknown location'}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-green-600 font-bold text-lg">{item.points || 0}</span>
            <span className="text-green-600 text-sm font-medium">pts</span>
          </div>
        </div>

        <div className="flex items-center space-x-3 mb-6">
          <img
            src={item.uploader?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(item.uploader?.name || 'U')}&background=10b981&color=fff`}
            alt={item.uploader?.name || 'Unknown user'}
            className="w-8 h-8 rounded-full object-cover ring-2 ring-green-100"
            onError={(e) => {
              e.target.src = 'https://ui-avatars.com/api/?name=U&background=10b981&color=fff';
            }}
          />
          <span className="text-sm font-medium text-gray-700">{item.uploader?.name || 'Unknown user'}</span>
        </div>

        <Link
          to={`/item/${item._id || item.id}`}
          className="block w-full bg-gradient-to-r from-green-500 to-green-600 text-white text-center py-3 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ItemCard; 