import React, { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";

const CD = () => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterReturnable, setFilterReturnable] = useState("all");
  const [categories, setCategories] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [stats, setStats] = useState({
    totalItems: 0,
    returnableItems: 0,
    nonReturnableItems: 0,
    totalValue: { birr: 0, cent: 0 }
  });
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const [showItemModal, setShowItemModal] = useState(false);
  const navigate = useNavigate();

  // Socket connection for real-time updates
  useEffect(() => {
    const socket = io("http://localhost:5000");
    socket.on("newItemAdded", (newItem) => {
      setItems((prevItems) => [...prevItems, { ...newItem, units: [] }]);
    });
    return () => socket.disconnect();
  }, []);

  // Fetch all items
  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/items/items");
      setItems(response.data || []);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || err.message);
      setLoading(false);
    }
  };

  // Calculate statistics
  useEffect(() => {
    if (items.length > 0) {
      const returnableItems = items.filter(item => item.IsReturnable).length;
      const nonReturnableItems = items.length - returnableItems;
      
      let totalBirr = 0;
      let totalCent = 0;
      
      items.forEach(item => {
        const itemTotal = calculateTotalPrice(item);
        totalBirr += itemTotal.birr;
        totalCent += itemTotal.cent;
      });
      
      const extraBirr = Math.floor(totalCent / 100);
      totalBirr += extraBirr;
      totalCent = totalCent % 100;
      
      setStats({
        totalItems: items.length,
        returnableItems,
        nonReturnableItems,
        totalValue: { birr: totalBirr, cent: totalCent }
      });
    }
  }, [items]);

  // Extract unique categories
  useEffect(() => {
    const uniqueCategories = [...new Set(items.map(item => item.Category || "Uncategorized"))];
    setCategories(uniqueCategories);

    const initialExpandedState = {};
    uniqueCategories.forEach(category => {
      initialExpandedState[category] = true;
    });
    setExpandedCategories(initialExpandedState);
  }, [items]);

  const fetchItemById = async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/items/items/${id}`);
      setSelectedItem(response.data || null);
      setShowItemModal(true);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || err.message);
      setLoading(false);
    }
  };

  const deleteItem = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/items/items/${id}`);
      setItems((prev) => prev.filter((item) => item.ItemID !== id));
      setSelectedItem(null);
      setShowItemModal(false);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || err.message);
    }
  };

  const calculateTotalPrice = (item) => {
    if (!item) return { birr: 0, cent: 0 };
    const totalCent = item.UnitPriceCent * item.TotalQty;
    const extraBirr = Math.floor(totalCent / 100);
    const remainingCent = totalCent % 100;
    const totalBirr = item.UnitPriceBirr * item.TotalQty + extraBirr;
    return { birr: totalBirr, cent: remainingCent };
  };

  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const toggleExpandAll = () => {
    const allExpanded = Object.values(expandedCategories).every(val => val);
    const newState = {};
    categories.forEach(category => {
      newState[category] = !allExpanded;
    });
    setExpandedCategories(newState);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const totalPrice = calculateTotalPrice(selectedItem);

  const filteredItems = items.filter((item) => {
    const matchesSearch = 
      item.ItemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.Model && item.Model.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = filterCategory === "all" || item.Category === filterCategory;
    
    const matchesReturnable = filterReturnable === "all" || 
      (filterReturnable === "returnable" && item.IsReturnable) ||
      (filterReturnable === "non-returnable" && !item.IsReturnable);
    
    return matchesSearch && matchesCategory && matchesReturnable;
  });

  const groupedItems = filteredItems.reduce((groups, item) => {
    const category = item.Category || "Uncategorized";
    if (!groups[category]) groups[category] = [];
    groups[category].push(item);
    return groups;
  }, {});

  // Create category counts
  const categoryCounts = categories.map(cat => ({
    name: cat,
    count: items.filter(item => (item.Category || "Uncategorized") === cat).length
  }));

  // Format currency
  const formatCurrency = (birr, cent) => {
    return `${birr.toLocaleString()} Birr ${cent} Cent`;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Inventory Dashboard</h1>
            <p className="text-gray-600 mt-1">Manage your inventory items efficiently</p>
          </div>
          <div className="flex items-center mt-4 md:mt-0 space-x-3">
            <button
              onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md flex items-center transition-all"
            >
              {viewMode === "grid" ? (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
                  </svg>
                  List View
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                  </svg>
                  Grid View
                </>
              )}
            </button>
            <button
              onClick={() => navigate("/Clerk/add-item")}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md flex items-center shadow-md transition-all"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              Add New Item
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search Items</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <input
                  type="text"
                  id="search"
                  placeholder="Search by name or model..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                id="category"
                className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="returnable" className="block text-sm font-medium text-gray-700 mb-1">Returnable</label>
              <select
                id="returnable"
                className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={filterReturnable}
                onChange={(e) => setFilterReturnable(e.target.value)}
              >
                <option value="all">All Items</option>
                <option value="returnable">Returnable</option>
                <option value="non-returnable">Non-Returnable</option>
              </select>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-green-500 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-100 p-3 rounded-full">
                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Items</p>
                <p className="text-2xl font-bold text-gray-800">{stats.totalItems}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-blue-500 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full">
                <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Returnable</p>
                <p className="text-2xl font-bold text-gray-800">{stats.returnableItems}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-orange-500 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-orange-100 p-3 rounded-full">
                <svg className="h-6 w-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Non-Returnable</p>
                <p className="text-2xl font-bold text-gray-800">{stats.nonReturnableItems}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-purple-500 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-purple-100 p-3 rounded-full">
                <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Value</p>
                <p className="text-xl font-bold text-gray-800">{formatCurrency(stats.totalValue.birr, stats.totalValue.cent)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-white p-5 rounded-lg shadow-sm mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Category Distribution</h2>
            <button 
              onClick={toggleExpandAll}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              {Object.values(expandedCategories).every(val => val) ? 'Collapse All' : 'Expand All'}
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {categoryCounts.map(cat => (
              <div key={cat.name} className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-gray-700">{cat.name}</h3>
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                    {cat.count}
                  </span>
                </div>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full" 
                    style={{ width: `${(cat.count / stats.totalItems) * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {((cat.count / stats.totalItems) * 100).toFixed(1)}% of inventory
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Items List/Grid */}
        <div className="bg-white p-5 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Inventory Items {filteredItems.length > 0 && `(${filteredItems.length})`}
            </h2>
            {filteredItems.length > 0 && (
              <p className="text-sm text-gray-600">
                Showing {filteredItems.length} of {items.length} items
              </p>
            )}
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 p-4 rounded-md mb-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Error loading items</h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>{error}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-10">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No items found</h3>
              <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
              <div className="mt-6">
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setFilterCategory("all");
                    setFilterReturnable("all");
                  }}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          ) : viewMode === "grid" ? (
            // Grid View
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredItems.map((item) => (
                <div 
                  key={item.ItemID} 
                  className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => fetchItemById(item.ItemID)}
                >
                  <div className={`p-4 ${item.IsReturnable ? 'bg-blue-50' : 'bg-orange-50'} border-b border-gray-200`}>
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-semibold text-gray-800 truncate">{item.ItemName}</h3>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.IsReturnable ? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800'}`}>
                        {item.IsReturnable ? 'Returnable' : 'Non-Returnable'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{item.Model || 'No model specified'}</p>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Category:</span>
                      <span className="text-sm font-medium text-gray-800">{item.Category || 'Uncategorized'}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Quantity:</span>
                      <span className="text-sm font-medium text-gray-800">{item.TotalQty}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Total Value:</span>
                      <span className="text-sm font-medium text-gray-800">
                        {formatCurrency(
                          item.UnitPriceBirr * item.TotalQty,
                          item.UnitPriceCent * item.TotalQty
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        fetchItemById(item.ItemID);
                      }}
                      className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // List View
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Item</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Category</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Type</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Quantity</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Unit Price</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Total Value</th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {filteredItems.map((item) => (
                    <tr 
                      key={item.ItemID} 
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => fetchItemById(item.ItemID)}
                    >
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="font-medium text-blue-800">{item.ItemName.charAt(0)}</span>
                          </div>
                          <div className="ml-4">
                            <div className="font-medium text-gray-900">{item.ItemName}</div>
                            <div className="text-gray-500">{item.Model || 'No model'}</div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.Category || 'Uncategorized'}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.IsReturnable ? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800'}`}>
                          {item.IsReturnable ? 'Returnable' : 'Non-Returnable'}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.TotalQty}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {formatCurrency(item.UnitPriceBirr, item.UnitPriceCent)}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {formatCurrency(
                          item.UnitPriceBirr * item.TotalQty,
                          item.UnitPriceCent * item.TotalQty
                        )}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            fetchItemById(item.ItemID);
                          }}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          View<span className="sr-only">, {item.ItemName}</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Item Detail Modal */}
      {showItemModal && selectedItem && (
        <div className="fixed inset-0 overflow-y-auto bg-gray-500 bg-opacity-75 transition-opacity z-50">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      {selectedItem.ItemName}
                    </h3>
                    <div className="mt-2">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500"><strong>Model:</strong> {selectedItem.Model || 'Not specified'}</p>
                          <p className="text-sm text-gray-500"><strong>Category:</strong> {selectedItem.Category || 'Uncategorized'}</p>
                          <p className="text-sm text-gray-500"><strong>Type:</strong> 
                            <span className={`ml-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${selectedItem.IsReturnable ? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800'}`}>
                              {selectedItem.IsReturnable ? 'Returnable' : 'Non-Returnable'}
                            </span>
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500"><strong>Quantity:</strong> {selectedItem.TotalQty}</p>
                          <p className="text-sm text-gray-500"><strong>Unit Price:</strong> {formatCurrency(selectedItem.UnitPriceBirr, selectedItem.UnitPriceCent)}</p>
                          <p className="text-sm text-gray-500"><strong>Total Value:</strong> {formatCurrency(totalPrice.birr, totalPrice.cent)}</p>
                        </div>
                      </div>
                      
                      {selectedItem.Description && (
                        <div className="mt-4">
                          <p className="text-sm font-medium text-gray-700">Description</p>
                          <p className="text-sm text-gray-500 mt-1">{selectedItem.Description}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => deleteItem(selectedItem.ItemID)}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => navigate(`/Clerk/edit-item/${selectedItem.ItemID}`)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setShowItemModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CD;