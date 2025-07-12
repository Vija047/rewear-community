import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { mockItems } from '../data/mockData';
import { 
  Heart, 
  MapPin, 
  Star, 
  Share2, 
  MessageCircle, 
  Package, 
  User,
  ArrowLeft,
  Calendar
} from 'lucide-react';

const ItemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [item, setItem] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestMessage, setRequestMessage] = useState('');

  useEffect(() => {
    const foundItem = mockItems.find(item => item.id === parseInt(id));
    if (foundItem) {
      setItem(foundItem);
    } else {
      navigate('/browse');
    }
  }, [id, navigate]);

  if (!item) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const handleSwapRequest = () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    setShowRequestModal(true);
  };

  const handleRedeemPoints = () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    if (currentUser.points < item.points) {
      alert('You don\'t have enough points to redeem this item.');
      return;
    }
    // Handle point redemption logic here
    alert('Item redeemed successfully!');
  };

  const submitSwapRequest = () => {
    // Handle swap request logic here
    alert('Swap request sent successfully!');
    setShowRequestModal(false);
    setRequestMessage('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </button>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Image Gallery */}
            <div>
              <div className="relative">
                <img
                  src={item.images[selectedImage]}
                  alt={item.title}
                  className="w-full h-96 object-cover rounded-lg"
                />
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
                    <Heart className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
                    <Share2 className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
                {item.status === 'Available' && (
                  <div className="absolute top-4 left-4">
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Available
                    </span>
                  </div>
                )}
              </div>

              {/* Thumbnail Images */}
              {item.images.length > 1 && (
                <div className="flex space-x-2 mt-4">
                  {item.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                        selectedImage === index ? 'border-green-500' : 'border-gray-200'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${item.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Item Details */}
            <div>
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{item.title}</h1>
                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                    <span>4.8 (24 reviews)</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>Listed {new Date(item.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="text-2xl font-bold text-green-600 mb-4">
                  {item.points} points
                </div>
              </div>

              {/* Item Info */}
              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Category</span>
                    <p className="text-gray-900">{item.category}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Type</span>
                    <p className="text-gray-900">{item.type}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Size</span>
                    <p className="text-gray-900">{item.size}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Condition</span>
                    <p className="text-gray-900">{item.condition}</p>
                  </div>
                </div>

                <div>
                  <span className="text-sm font-medium text-gray-500">Tags</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {item.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>

              {/* Uploader Info */}
              <div className="border-t border-gray-200 pt-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Listed by</h3>
                <div className="flex items-center space-x-3">
                  <img
                    src={item.uploader.avatar}
                    alt={item.uploader.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-gray-900">{item.uploader.name}</p>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{item.uploader.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                {currentUser && currentUser.id !== item.uploader.id ? (
                  <>
                    <button
                      onClick={handleSwapRequest}
                      className="w-full bg-green-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center justify-center"
                    >
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Request Swap
                    </button>
                    <button
                      onClick={handleRedeemPoints}
                      disabled={currentUser.points < item.points}
                      className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      <Package className="w-5 h-5 mr-2" />
                      Redeem with Points ({item.points} pts)
                    </button>
                  </>
                ) : (
                  <div className="text-center py-4 text-gray-600">
                    {currentUser ? 'This is your own item' : 'Please log in to interact with this item'}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Swap Request Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Request Swap</h3>
            <textarea
              value={requestMessage}
              onChange={(e) => setRequestMessage(e.target.value)}
              placeholder="Tell the owner why you'd like to swap for this item..."
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 mb-4"
              rows="4"
            />
            <div className="flex space-x-3">
              <button
                onClick={() => setShowRequestModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={submitSwapRequest}
                className="flex-1 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Send Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemDetail; 