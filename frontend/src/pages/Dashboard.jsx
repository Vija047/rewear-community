import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { mockItems, mockSwapRequests } from '../data/mockData';
import ItemCard from '../components/ItemCard';
import { 
  User, 
  MapPin, 
  Calendar, 
  Edit, 
  Package, 
  MessageCircle,
  TrendingUp,
  Award
} from 'lucide-react';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('listings');

  // Filter items by current user
  const userItems = mockItems.filter(item => item.uploader.id === currentUser?.id);
  const userSwapRequests = mockSwapRequests.filter(request => 
    request.requester.id === currentUser?.id || request.item.uploader.id === currentUser?.id
  );

  const tabs = [
    { id: 'listings', label: 'My Listings', count: userItems.length },
    { id: 'swaps', label: 'Swap Requests', count: userSwapRequests.length },
    { id: 'completed', label: 'Completed Swaps', count: 0 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-start space-x-6">
            <div className="relative">
              <img
                src={currentUser?.avatar}
                alt={currentUser?.name}
                className="w-24 h-24 rounded-full object-cover"
              />
              <button className="absolute -bottom-1 -right-1 bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-colors">
                <Edit className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{currentUser?.name}</h1>
                  <div className="flex items-center text-gray-600 mt-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{currentUser?.location}</span>
                  </div>
                </div>
                <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors">
                  Edit Profile
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Points Balance</p>
                      <p className="text-2xl font-bold text-green-600">{currentUser?.points}</p>
                    </div>
                    <Award className="w-8 h-8 text-green-500" />
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Items Listed</p>
                      <p className="text-2xl font-bold text-gray-900">{userItems.length}</p>
                    </div>
                    <Package className="w-8 h-8 text-blue-500" />
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Member Since</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {new Date(currentUser?.joinDate).toLocaleDateString('en-US', { 
                          month: 'short', 
                          year: 'numeric' 
                        })}
                      </p>
                    </div>
                    <Calendar className="w-8 h-8 text-purple-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                  <span className="ml-2 bg-gray-100 text-gray-900 py-0.5 px-2 rounded-full text-xs">
                    {tab.count}
                  </span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'listings' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">My Listings</h2>
                  <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors">
                    Add New Item
                  </button>
                </div>
                
                {userItems.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {userItems.map((item) => (
                      <ItemCard key={item.id} item={item} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No items listed yet</h3>
                    <p className="text-gray-600 mb-4">
                      Start sharing your clothes with the community
                    </p>
                    <button className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-colors">
                      List Your First Item
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'swaps' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Swap Requests</h2>
                
                {userSwapRequests.length > 0 ? (
                  <div className="space-y-4">
                    {userSwapRequests.map((request) => (
                      <div key={request.id} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <img
                              src={request.requester.avatar}
                              alt={request.requester.name}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <div>
                              <p className="font-medium text-gray-900">{request.requester.name}</p>
                              <p className="text-sm text-gray-600">{request.item.title}</p>
                            </div>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            request.status === 'Pending' 
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {request.status}
                          </span>
                        </div>
                        
                        <p className="text-gray-600 mb-3">{request.message}</p>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">
                            {new Date(request.createdAt).toLocaleDateString()}
                          </span>
                          {request.status === 'Pending' && (
                            <div className="flex space-x-2">
                              <button className="px-3 py-1 bg-green-500 text-white rounded-md text-sm hover:bg-green-600">
                                Accept
                              </button>
                              <button className="px-3 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-600">
                                Decline
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No swap requests</h3>
                    <p className="text-gray-600">
                      You don't have any pending swap requests at the moment
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'completed' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Completed Swaps</h2>
                <div className="text-center py-12">
                  <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No completed swaps yet</h3>
                  <p className="text-gray-600">
                    Your completed swaps will appear here
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 