import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Star } from 'lucide-react';

const ItemCard = ({ item }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Image */}
      <div className="relative">
        <img
          src={item.images[0]}
          alt={item.title}
          className="w-full h-64 object-cover"
        />
        <div className="absolute top-2 right-2">
          <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
            <Heart className="w-4 h-4 text-gray-600" />
          </button>
        </div>
        {item.status === 'Available' && (
          <div className="absolute top-2 left-2">
            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
              Available
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-900 text-lg line-clamp-1">
            {item.title}
          </h3>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600">4.8</span>
          </div>
        </div>

        <div className="flex items-center space-x-4 mb-3 text-sm text-gray-600">
          <span className="bg-gray-100 px-2 py-1 rounded">
            {item.size}
          </span>
          <span className="bg-gray-100 px-2 py-1 rounded">
            {item.condition}
          </span>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-1 text-sm text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{item.uploader.location}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-green-600 font-semibold">{item.points} pts</span>
          </div>
        </div>

        <div className="flex items-center space-x-2 mb-4">
          <img
            src={item.uploader.avatar}
            alt={item.uploader.name}
            className="w-6 h-6 rounded-full object-cover"
          />
          <span className="text-sm text-gray-600">{item.uploader.name}</span>
        </div>

        <Link
          to={`/item/${item.id}`}
          className="block w-full bg-green-500 text-white text-center py-2 rounded-md hover:bg-green-600 transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ItemCard; 