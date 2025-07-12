import React, { useState } from 'react';
import { mockUsers, mockItems } from '../data/mockData';
import { 
  Users, 
  Package, 
  CheckCircle, 
  XCircle, 
  Eye, 
  MoreVertical,
  Search,
  Filter
} from 'lucide-react';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const tabs = [
    { id: 'users', label: 'Manage Users', icon: Users },
    { id: 'listings', label: 'Manage Listings', icon: Package }
  ];

  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredItems = mockItems.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.uploader.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const UserRow = ({ user }) => (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 hover:bg-gray-50">
      <div className="flex items-center space-x-4">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <h3 className="font-medium text-gray-900">{user.name}</h3>
          <p className="text-sm text-gray-600">{user.email}</p>
          <p className="text-xs text-gray-500">{user.location}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-600">{user.points} pts</span>
        <div className="flex space-x-1">
          <button className="p-1 text-green-600 hover:bg-green-100 rounded">
            <CheckCircle className="w-4 h-4" />
          </button>
          <button className="p-1 text-red-600 hover:bg-red-100 rounded">
            <XCircle className="w-4 h-4" />
          </button>
          <button className="p-1 text-gray-600 hover:bg-gray-100 rounded">
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  const ItemRow = ({ item }) => (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 hover:bg-gray-50">
      <div className="flex items-center space-x-4">
        <img
          src={item.images[0]}
          alt={item.title}
          className="w-12 h-12 rounded object-cover"
        />
        <div>
          <h3 className="font-medium text-gray-900">{item.title}</h3>
          <p className="text-sm text-gray-600">by {item.uploader.name}</p>
          <p className="text-xs text-gray-500">{item.category} • {item.size}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          item.status === 'Available' 
            ? 'bg-green-100 text-green-800'
            : 'bg-gray-100 text-gray-800'
        }`}>
          {item.status}
        </span>
        <div className="flex space-x-1">
          <button className="p-1 text-green-600 hover:bg-green-100 rounded">
            <CheckCircle className="w-4 h-4" />
          </button>
          <button className="p-1 text-red-600 hover:bg-red-100 rounded">
            <XCircle className="w-4 h-4" />
          </button>
          <button className="p-1 text-gray-600 hover:bg-gray-100 rounded">
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Panel</h1>
          <p className="text-gray-600">Manage users and listings</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                      activeTab === tab.id
                        ? 'border-green-500 text-green-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder={`Search ${activeTab === 'users' ? 'users' : 'listings'}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="blocked">Blocked</option>
                </select>
              </div>
            </div>

            {/* Users Tab */}
            {activeTab === 'users' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Users ({filteredUsers.length})
                  </h2>
                  <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors">
                    Export Data
                  </button>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                    <div className="grid grid-cols-4 gap-4 text-sm font-medium text-gray-700">
                      <div>User</div>
                      <div>Email</div>
                      <div>Location</div>
                      <div>Actions</div>
                    </div>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {filteredUsers.map((user) => (
                      <UserRow key={user.id} user={user} />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Listings Tab */}
            {activeTab === 'listings' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Listings ({filteredItems.length})
                  </h2>
                  <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors">
                    Export Data
                  </button>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                    <div className="grid grid-cols-4 gap-4 text-sm font-medium text-gray-700">
                      <div>Item</div>
                      <div>Uploader</div>
                      <div>Status</div>
                      <div>Actions</div>
                    </div>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {filteredItems.map((item) => (
                      <ItemRow key={item.id} item={item} />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{mockUsers.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Listings</p>
                <p className="text-2xl font-bold text-gray-900">{mockItems.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Users</p>
                <p className="text-2xl font-bold text-gray-900">{mockUsers.length - 1}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <XCircle className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Blocked Users</p>
                <p className="text-2xl font-bold text-gray-900">1</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel; 