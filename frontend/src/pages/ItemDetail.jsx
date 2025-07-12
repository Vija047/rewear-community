import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { itemsAPI, swapsAPI } from '../services/api';
import { 
  Heart, 
  MapPin, 
  Star, 
  Share2, 
  MessageCircle, 
  Package, 
  User,
  ArrowLeft,
  Calendar,
  Eye,
  Tag
} from 'lucide-react';

const ItemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestMessage, setRequestMessage] = useState('');
  const [userItems, setUserItems] = useState([]);
  const [selectedUserItem, setSelectedUserItem] = useState('');
  const [submittingRequest, setSubmittingRequest] = useState(false);

  useEffect(() => {
    fetchItem();
    if (currentUser) {
      fetchUserItems();
    }
  }, [id, currentUser]);

  const fetchItem = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await itemsAPI.getItem(id);
      setItem(response.data.data);
    } catch (err) {
      setError('Failed to load item details');
      console.error('Error fetching item:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserItems = async () => {
    try {
      const response = await itemsAPI.getUserItems({ status: 'available' });
      setUserItems(response.data.data.items || []);
    } catch (err) {
      console.error('Error fetching user items:', err);
    }
  };

  const handleSwapRequest = async () => {
    if (!selectedUserItem || !requestMessage.trim()) {
      alert('Please select an item and add a message');
      return;
    }

    if (requestMessage.length > 500) {
      alert('Message is too long. Please keep it under 500 characters.');
      return;
    }

    try {
      setSubmittingRequest(true);
      const response = await swapsAPI.createSwapRequest({
        requestedItem: item._id,
        requesterItem: selectedUserItem,
        message: requestMessage.trim()
      });

      if (response.data.success) {
        setShowRequestModal(false);
        setRequestMessage('');
        setSelectedUserItem('');
        
        // Show success message with better UX
        const successDiv = document.createElement('div');
        successDiv.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-all duration-300';
        successDiv.textContent = 'Swap request sent successfully!';
        document.body.appendChild(successDiv);
        
        setTimeout(() => {
          successDiv.style.opacity = '0';
          setTimeout(() => document.body.removeChild(successDiv), 300);
        }, 3000);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to send swap request. Please try again.';
      
      // Show error message with better UX
      const errorDiv = document.createElement('div');
      errorDiv.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-all duration-300';
      errorDiv.textContent = errorMessage;
      document.body.appendChild(errorDiv);
      
      setTimeout(() => {
        errorDiv.style.opacity = '0';
        setTimeout(() => document.body.removeChild(errorDiv), 300);
      }, 4000);
      
      console.error('Error sending swap request:', err);
    } finally {
      setSubmittingRequest(false);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: item.title,
      text: `Check out this ${item.category} on ReWear: ${item.description.substring(0, 100)}...`,
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Error sharing:', err);
          fallbackShare();
        }
      }
    } else {
      fallbackShare();
    }
  };

  const fallbackShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href).then(() => {
        // Show success message
        const successDiv = document.createElement('div');
        successDiv.className = 'fixed top-4 right-4 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-all duration-300';
        successDiv.textContent = 'Link copied to clipboard!';
        document.body.appendChild(successDiv);
        
        setTimeout(() => {
          successDiv.style.opacity = '0';
          setTimeout(() => document.body.removeChild(successDiv), 300);
        }, 2000);
      }).catch(() => {
        alert('Link copied to clipboard!');
      });
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = window.location.href;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading item details...</p>
        </div>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
            <Package className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Item not found</h2>
            <p className="text-gray-600 mb-6 text-sm sm:text-base">
              {error || 'The item you\'re looking for doesn\'t exist or has been removed.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => navigate('/browse')}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 font-semibold"
              >
                Browse Items
              </button>
              <button
                onClick={() => navigate(-1)}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-300 font-medium"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const isOwner = currentUser && item.owner?._id === currentUser._id;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-4 sm:mb-6 p-2 sm:p-0 -ml-2 sm:ml-0 rounded-lg hover:bg-white/50 transition-all"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span className="hidden sm:inline">Back</span>
        </button>

        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 p-4 sm:p-6">
            {/* Images */}
            <div className="order-1 lg:order-1">
              <div className="aspect-w-1 aspect-h-1 mb-3 sm:mb-4">
                <img
                  src={item.images?.[selectedImage] || '/placeholder.png'}
                  alt={item.title}
                  className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-xl shadow-lg"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x400?text=Image+Not+Found';
                  }}
                />
              </div>
              {item.images && item.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {item.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                        selectedImage === index 
                          ? 'border-green-500 shadow-lg transform scale-105' 
                          : 'border-gray-200 hover:border-green-300'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${item.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/80x80?text=No+Image';
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="order-2 lg:order-2">
              <div className="mb-4 sm:mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
                  {item.title}
                </h1>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500 mb-4">
                  <div className="flex items-center bg-gray-100 px-2 py-1 rounded-full">
                    <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                    <span className="hidden sm:inline">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                    <span className="sm:hidden">
                      {new Date(item.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  <div className="flex items-center bg-gray-100 px-2 py-1 rounded-full">
                    <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                    {item.views || 0} views
                  </div>
                  <div className="flex items-center bg-gray-100 px-2 py-1 rounded-full">
                    <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                    <span className="truncate max-w-24 sm:max-w-none">
                      {item.owner?.location || 'Location not specified'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Item Info */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="bg-green-50 p-3 sm:p-4 rounded-xl">
                  <p className="text-xs sm:text-sm font-medium text-green-700 mb-1">Category</p>
                  <p className="text-sm sm:text-base font-semibold text-green-900">{item.category}</p>
                </div>
                <div className="bg-blue-50 p-3 sm:p-4 rounded-xl">
                  <p className="text-xs sm:text-sm font-medium text-blue-700 mb-1">Type</p>
                  <p className="text-sm sm:text-base font-semibold text-blue-900">{item.type}</p>
                </div>
                <div className="bg-purple-50 p-3 sm:p-4 rounded-xl">
                  <p className="text-xs sm:text-sm font-medium text-purple-700 mb-1">Size</p>
                  <p className="text-sm sm:text-base font-semibold text-purple-900">{item.size}</p>
                </div>
                <div className="bg-orange-50 p-3 sm:p-4 rounded-xl">
                  <p className="text-xs sm:text-sm font-medium text-orange-700 mb-1">Condition</p>
                  <p className="text-sm sm:text-base font-semibold text-orange-900">{item.condition}</p>
                </div>
              </div>

              {/* Description */}
              <div className="mb-4 sm:mb-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 flex items-center">
                  <Package className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-green-600" />
                  Description
                </h3>
                <div className="bg-gray-50 p-3 sm:p-4 rounded-xl">
                  <p className="text-sm sm:text-base text-gray-700 whitespace-pre-wrap leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Tags */}
              {item.tags && item.tags.length > 0 && (
                <div className="mb-4 sm:mb-6">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 flex items-center">
                    <Tag className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-green-600" />
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 sm:px-3 py-1 bg-gradient-to-r from-green-100 to-green-200 text-green-800 text-xs sm:text-sm rounded-full font-medium shadow-sm"
                      >
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Owner Info */}
              <div className="mb-6 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mr-3">
                    <User className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900 text-sm sm:text-base">
                      {item.owner?.name || 'Anonymous'}
                    </span>
                    <div className="flex items-center text-xs sm:text-sm text-gray-500">
                      <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                      {item.owner?.location || 'Location not specified'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                {!isOwner && currentUser && (
                  <button
                    onClick={() => setShowRequestModal(true)}
                    className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 sm:py-3 px-4 sm:px-6 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 flex items-center justify-center font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                    Request Swap
                  </button>
                )}
                
                <button
                  onClick={handleShare}
                  className="bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700 py-3 sm:py-3 px-4 sm:px-6 rounded-xl hover:from-gray-300 hover:to-gray-400 transition-all duration-300 flex items-center justify-center font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  <Share2 className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  Share
                </button>

                {/* Favorite Button for Mobile */}
                <button className="sm:hidden bg-gradient-to-r from-red-100 to-red-200 text-red-600 py-3 px-4 rounded-xl hover:from-red-200 hover:to-red-300 transition-all duration-300 flex items-center justify-center font-semibold">
                  <Heart className="h-4 w-4 mr-2" />
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Swap Request Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Request Swap
                </h2>
                <button
                  onClick={() => setShowRequestModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ArrowLeft className="h-5 w-5 text-gray-500" />
                </button>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Select your item to swap
                </label>
                {userItems.length > 0 ? (
                  <select
                    value={selectedUserItem}
                    onChange={(e) => setSelectedUserItem(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white"
                  >
                    <option value="">Choose an item...</option>
                    {userItems.map(userItem => (
                      <option key={userItem._id} value={userItem._id}>
                        {userItem.title} ({userItem.category})
                      </option>
                    ))}
                  </select>
                ) : (
                  <div className="text-center py-8 bg-gray-50 rounded-xl">
                    <Package className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600 text-sm">
                      You don't have any available items to swap.
                    </p>
                    <button
                      onClick={() => navigate('/add-item')}
                      className="mt-3 text-green-600 hover:text-green-700 font-medium text-sm"
                    >
                      Add an item first
                    </button>
                  </div>
                )}
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Message to owner
                </label>
                <textarea
                  value={requestMessage}
                  onChange={(e) => setRequestMessage(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white resize-none"
                  placeholder="Tell the owner why you'd like to swap this item and what makes your offer interesting..."
                />
                <p className="text-xs text-gray-500 mt-2">
                  {requestMessage.length}/500 characters
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setShowRequestModal(false)}
                  className="flex-1 py-3 px-4 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-300 font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSwapRequest}
                  disabled={submittingRequest || !selectedUserItem || !requestMessage.trim()}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-semibold shadow-lg"
                >
                  {submittingRequest ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending...
                    </div>
                  ) : (
                    'Send Request'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemDetail;
