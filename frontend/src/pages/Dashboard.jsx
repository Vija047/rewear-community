import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { itemsAPI, swapsAPI } from '../services/api';
import {
  Plus,
  Package,
  ArrowRightLeft,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [stats, setStats] = useState({
    totalItems: 0,
    activeSwaps: 0,
    completedSwaps: 0,
    views: 0
  });
  const [userItems, setUserItems] = useState([]);
  const [recentSwaps, setRecentSwaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('items');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError('');

      // Fetch user items
      const itemsResponse = await itemsAPI.getUserItems({ page: 1, limit: 10 });
      console.log('Items response:', itemsResponse);

      // Handle different response structures for items
      let items = [];
      if (itemsResponse && Array.isArray(itemsResponse.data)) {
        items = itemsResponse.data;
      } else if (itemsResponse && itemsResponse.data && Array.isArray(itemsResponse.data.items)) {
        items = itemsResponse.data.items;
      } else if (itemsResponse && itemsResponse.data && itemsResponse.data.data && Array.isArray(itemsResponse.data.data.items)) {
        items = itemsResponse.data.data.items;
      } else if (Array.isArray(itemsResponse)) {
        items = itemsResponse;
      }
      setUserItems(items);

      // Fetch user swaps
      let swaps = [];
      try {
        const swapsResponse = await swapsAPI.getUserSwaps({ page: 1, limit: 10 });
        console.log('Swaps response:', swapsResponse);

        // Handle different response structures for swaps
        if (swapsResponse && Array.isArray(swapsResponse.data)) {
          swaps = swapsResponse.data;
        } else if (swapsResponse && swapsResponse.data && Array.isArray(swapsResponse.data.swaps)) {
          swaps = swapsResponse.data.swaps;
        } else if (swapsResponse && swapsResponse.data && swapsResponse.data.data && Array.isArray(swapsResponse.data.data.swaps)) {
          swaps = swapsResponse.data.data.swaps;
        } else if (Array.isArray(swapsResponse)) {
          swaps = swapsResponse;
        }
      } catch (swapError) {
        console.log('Swaps endpoint might not be available:', swapError);
        // Continue without swaps data
      }
      setRecentSwaps(swaps);

      // Calculate stats
      const totalItems = items.length;
      const activeSwaps = swaps.filter(swap => swap.status === 'pending').length;
      const completedSwaps = swaps.filter(swap => swap.status === 'completed').length;
      const views = items.reduce((total, item) => total + (item.views || 0), 0);

      setStats({
        totalItems,
        activeSwaps,
        completedSwaps,
        views
      });

    } catch (err) {
      setError('Failed to load dashboard data');
      console.error('Dashboard error:', err);
      // Set fallback data
      setUserItems([]);
      setRecentSwaps([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteItem = async (itemId) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await itemsAPI.delete(itemId);
        setUserItems(prev => prev.filter(item => item._id !== itemId));
      } catch (err) {
        console.error('Error deleting item:', err);
        alert('Failed to delete item');
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'accepted': return 'text-green-600 bg-green-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      case 'completed': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {currentUser?.name || 'User'}!
          </h1>
          <p className="mt-2 text-gray-600">
            Manage your items and track your swaps
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-6">
            {error}
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Items</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalItems}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-yellow-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Swaps</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeSwaps}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed Swaps</p>
                <p className="text-2xl font-bold text-gray-900">{stats.completedSwaps}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <Eye className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Views</p>
                <p className="text-2xl font-bold text-gray-900">{stats.views}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/add-item"
              className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors"
            >
              <Plus className="h-6 w-6 text-green-500 mr-2" />
              <span className="text-green-600 font-medium">Add New Item</span>
            </Link>

            <Link
              to="/browse"
              className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors"
            >
              <Package className="h-6 w-6 text-green-500 mr-2" />
              <span className="text-green-600 font-medium">Browse Items</span>
            </Link>

            <button
              onClick={() => setActiveTab('swaps')}
              className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors"
            >
              <ArrowRightLeft className="h-6 w-6 text-green-500 mr-2" />
              <span className="text-green-600 font-medium">View Swaps</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('items')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'items'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
              >
                My Items ({userItems.length})
              </button>
              <button
                onClick={() => setActiveTab('swaps')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'swaps'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
              >
                Recent Swaps ({recentSwaps.length})
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'items' ? (
              <div>
                {userItems.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No items yet</h3>
                    <p className="text-gray-500 mb-4">
                      Start sharing your clothing items with the community
                    </p>
                    <Link
                      to="/add-item"
                      className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Your First Item
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {userItems.map(item => (
                      <div key={item._id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="aspect-w-16 aspect-h-9 mb-4">
                          <img
                            src={item.images?.[0] || '/placeholder.png'}
                            alt={item.title}
                            className="w-full h-48 object-cover rounded-lg"
                          />
                        </div>
                        <h3 className="font-medium text-gray-900 mb-2">{item.title}</h3>
                        <p className="text-sm text-gray-500 mb-2">{item.category} • {item.size}</p>
                        <div className="flex items-center justify-between">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${item.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                            {item.status || 'Available'}
                          </span>
                          <div className="flex space-x-2">
                            <Link
                              to={`/item/${item._id}`}
                              className="text-green-600 hover:text-green-700"
                            >
                              <Eye className="h-4 w-4" />
                            </Link>
                            <button
                              onClick={() => handleDeleteItem(item._id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div>
                {recentSwaps.length === 0 ? (
                  <div className="text-center py-12">
                    <ArrowRightLeft className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No swaps yet</h3>
                    <p className="text-gray-500 mb-4">
                      Start browsing items to initiate swaps
                    </p>
                    <Link
                      to="/browse"
                      className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                    >
                      <Package className="h-4 w-4 mr-2" />
                      Browse Items
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentSwaps.map(swap => (
                      <div key={swap._id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-gray-900">
                            Swap Request #{swap._id.slice(-6)}
                          </h3>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(swap.status)}`}>
                            {swap.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          {swap.requesterItem?.title} ↔ {swap.requestedItem?.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(swap.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
