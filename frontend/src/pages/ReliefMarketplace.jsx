import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShoppingCart, FiDollarSign, FiGift, FiCheckCircle } from 'react-icons/fi';

const loadState = (key, defaultValue) => {
  try {
    const savedState = localStorage.getItem(key);
    return savedState ? JSON.parse(savedState) : defaultValue;
  } catch {
    return defaultValue;
  }
};

const saveState = (key, state) => {
  localStorage.setItem(key, JSON.stringify(state));
};

const ReliefMarketplace = () => {
  // Load initial state from localStorage or use defaults
  const [items, setItems] = useState(() => loadState('marketplaceItems', [
    {
      id: 1,
      name: "Rice (5kg)",
      category: "Food",
      quantity: 10,
      location: "Mumbai",
      donor: "Community Center",
      status: "Available",
      image: "https://via.placeholder.com/150?text=Rice",
      price: 0,
      isFree: true
    },
    {
      id: 2,
      name: "Blankets",
      category: "Clothing",
      quantity: 25,
      location: "Delhi",
      donor: "Individual",
      status: "Available",
      image: "https://via.placeholder.com/150?text=Blankets",
      price: 50,
      isFree: false
    },
    {
      id: 3,
      name: "First Aid Kits",
      category: "Medical",
      quantity: 8,
      location: "Bangalore",
      donor: "Red Cross",
      status: "Available",
      image: "https://via.placeholder.com/150?text=First+Aid",
      price: 80,
      isFree: false
    }
  ]));

  const [cart, setCart] = useState(() => loadState('marketplaceCart', []));
  const [userCoins, setUserCoins] = useState(() => loadState('userCoins', 5));
  const [showReward, setShowReward] = useState(false);
  const [rewardAmount, setRewardAmount] = useState(0);
  const [activeTab, setActiveTab] = useState("browse");
  const [newItem, setNewItem] = useState({
    name: "",
    category: "Food",
    quantity: 1,
    location: "",
    description: "",
    image: "",
    price: 0,
    isFree: true
  });
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("wallet");

  // Save state to localStorage whenever it changes
  useEffect(() => {
    saveState('marketplaceItems', items);
  }, [items]);

  useEffect(() => {
    saveState('marketplaceCart', cart);
  }, [cart]);

  useEffect(() => {
    saveState('userCoins', userCoins);
  }, [userCoins]);

  // Calculate cart total
  const cartTotal = cart.reduce((total, item) => total + item.price, 0);

  // Add to cart function
  const addToCart = (item) => {
    if (item.status !== "Available") return;
    
    const updatedCart = [...cart, { ...item, cartId: Date.now() }];
    setCart(updatedCart);
    
    const updatedItems = items.map(i => 
      i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i
    );
    setItems(updatedItems);
  };

  // Remove from cart function
  const removeFromCart = (cartId) => {
    const itemToRemove = cart.find(item => item.cartId === cartId);
    const updatedCart = cart.filter(item => item.cartId !== cartId);
    setCart(updatedCart);
    
    const updatedItems = items.map(i => 
      i.id === itemToRemove.id ? { ...i, quantity: i.quantity + 1 } : i
    );
    setItems(updatedItems);
  };

  // Handle donation submission
  const handleAddItem = (e) => {
    e.preventDefault();
    const itemToAdd = {
      ...newItem,
      id: Date.now(), // Use timestamp for unique ID
      donor: "You",
      status: "Available",
      image: newItem.image || "https://via.placeholder.com/150?text=Item"
    };
    
    const updatedItems = [...items, itemToAdd];
    setItems(updatedItems);
    
    setNewItem({
      name: "",
      category: "Food",
      quantity: 1,
      location: "",
      description: "",
      image: "",
      price: 0,
      isFree: true
    });
    
    // Reward user with coins
    const coinsEarned = 1;
    const updatedCoins = userCoins + coinsEarned;
    setUserCoins(updatedCoins);
    setRewardAmount(coinsEarned);
    setShowReward(true);
    
    setTimeout(() => {
      setShowReward(false);
    }, 3000);
  };

  // Handle checkout
  const handleCheckout = () => {
    if (paymentMethod === "wallet" && userCoins < cartTotal) {
      alert("Not enough coins in your wallet!");
      return;
    }
    
    if (paymentMethod === "wallet") {
      const updatedCoins = userCoins - cartTotal;
      setUserCoins(updatedCoins);
    }
    
    setCart([]);
    setCheckoutOpen(false);
    alert("Purchase successful! Thank you for your support.");
  };

  return (
    <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800 relative">
      {/* Reward Animation */}
      <AnimatePresence>
        {showReward && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.5 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.5 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
          >
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-6 rounded-xl shadow-lg text-center">
              <motion.div
                animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                transition={{ duration: 0.8 }}
                className="text-5xl mb-4"
              >
                <FiGift className="inline-block" />
              </motion.div>
              <h3 className="text-2xl font-bold text-white mb-2">Reward Earned!</h3>
              <p className="text-lg text-white">
                You received <span className="font-bold">{rewardAmount} Rescue Coin(s)</span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="p-2 rounded-lg mr-4 bg-red-600/20 text-red-400">
            <FiShoppingCart className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-bold text-white">Relief Marketplace</h2>
        </div>
        
        {/* Cart Button */}
        <button 
          onClick={() => setCheckoutOpen(true)}
          className="relative bg-zinc-800 hover:bg-zinc-700 rounded-full p-3 text-white"
        >
          <FiShoppingCart className="h-5 w-5" />
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {cart.length}
            </span>
          )}
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-zinc-700 mb-6">
        <button
          className={`px-4 py-2 font-medium ${activeTab === "browse" ? "text-red-400 border-b-2 border-red-500" : "text-zinc-400"}`}
          onClick={() => setActiveTab("browse")}
        >
          Browse Items
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === "donate" ? "text-red-400 border-b-2 border-red-500" : "text-zinc-400"}`}
          onClick={() => setActiveTab("donate")}
        >
          Donate Items
        </button>
      </div>

      {/* Browse Items Tab */}
      {activeTab === "browse" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.02 }}
              className="bg-zinc-800 rounded-lg overflow-hidden border border-zinc-700 flex flex-col"
            >
              <div className="h-40 bg-zinc-700 overflow-hidden relative">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover"
                />
                {item.price > 0 && (
                  <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-md text-sm font-medium">
                    ₹{item.price}
                  </div>
                )}
                {item.isFree && (
                  <div className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 rounded-md text-sm font-medium">
                    FREE
                  </div>
                )}
              </div>
              
              <div className="p-4 flex-grow">
                <h3 className="text-lg font-semibold text-white mb-2">{item.name}</h3>
                <div className="text-sm text-zinc-400 space-y-1">
                  <p><span className="font-medium">Category:</span> {item.category}</p>
                  <p><span className="font-medium">Available:</span> {item.quantity}</p>
                  <p><span className="font-medium">Location:</span> {item.location}</p>
                  <p><span className="font-medium">Donated by:</span> {item.donor}</p>
                </div>
              </div>
              
              <div className="p-4 border-t border-zinc-700">
                <button
                  onClick={() => addToCart(item)}
                  disabled={item.status !== "Available" || item.quantity <= 0}
                  className={`w-full py-2 rounded-md text-sm font-medium flex items-center justify-center ${
                    item.status === "Available" && item.quantity > 0 ? 
                    "bg-red-600 hover:bg-red-700 text-white" : 
                    "bg-zinc-700 text-zinc-500 cursor-not-allowed"
                  }`}
                >
                  {item.status === "Available" && item.quantity > 0 ? (
                    <>
                      <FiShoppingCart className="mr-2" />
                      Add to Cart
                    </>
                  ) : (
                    "Unavailable"
                  )}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Donate Items Tab */}
      {activeTab === "donate" && (
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleAddItem} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-zinc-300 text-sm mb-1">Item Name*</label>
                <input
                  type="text"
                  value={newItem.name}
                  onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-red-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-zinc-300 text-sm mb-1">Category*</label>
                <select
                  value={newItem.category}
                  onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-red-500"
                >
                  <option value="Food">Food</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Medical">Medical Supplies</option>
                  <option value="Shelter">Shelter Items</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-zinc-300 text-sm mb-1">Quantity*</label>
                <input
                  type="number"
                  min="1"
                  value={newItem.quantity}
                  onChange={(e) => setNewItem({...newItem, quantity: parseInt(e.target.value) || 1})}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-red-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-zinc-300 text-sm mb-1">Location*</label>
                <input
                  type="text"
                  value={newItem.location}
                  onChange={(e) => setNewItem({...newItem, location: e.target.value})}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-red-500"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-zinc-300 text-sm mb-1">Image URL</label>
              <input
                type="url"
                value={newItem.image}
                onChange={(e) => setNewItem({...newItem, image: e.target.value})}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-red-500"
                placeholder="https://example.com/image.jpg"
              />
            </div>
            
            <div>
              <label className="block text-zinc-300 text-sm mb-1">Description</label>
              <textarea
                value={newItem.description}
                onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-red-500"
                rows="3"
                placeholder="Additional details about the item..."
              />
            </div>
            
            <div className="border-t border-zinc-700 pt-4">
              <label className="flex items-center space-x-2 mb-2">
                <input
                  type="checkbox"
                  checked={newItem.isFree}
                  onChange={(e) => setNewItem({
                    ...newItem,
                    isFree: e.target.checked,
                    price: e.target.checked ? 0 : newItem.price
                  })}
                  className="rounded bg-zinc-800 border-zinc-700 text-red-500 focus:ring-red-500"
                />
                <span className="text-zinc-300">Offer this item for free</span>
              </label>
              
              {!newItem.isFree && (
                <div>
                  <label className="block text-zinc-300 text-sm mb-1">Price (₹)*</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiDollarSign className="text-zinc-400" />
                    </div>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={newItem.price}
                      onChange={(e) => {
                        const value = Math.min(100, Math.max(0, parseInt(e.target.value) || 0));
                        setNewItem({...newItem, price: value});
                      }}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-md pl-8 pr-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-red-500"
                      required
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 text-sm">
                      Max: ₹100
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-medium py-3 px-4 rounded-md transition duration-200 flex items-center justify-center"
              >
                <FiGift className="mr-2" />
                Donate Item & Earn 1 Rescue Coin
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Checkout Modal */}
      <AnimatePresence>
        {checkoutOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
            onClick={() => setCheckoutOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-zinc-900 rounded-xl border border-zinc-700 w-full max-w-md overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <FiShoppingCart className="mr-2" />
                  Your Cart ({cart.length} items)
                </h3>
                
                {cart.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-zinc-400">Your cart is empty</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                      {cart.map((item) => (
                        <div key={item.cartId} className="flex items-center justify-between p-3 bg-zinc-800 rounded-lg">
                          <div className="flex items-center">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-12 h-12 rounded-md object-cover mr-3"
                            />
                            <div>
                              <h4 className="text-white font-medium">{item.name}</h4>
                              <p className="text-sm text-zinc-400">
                                {item.isFree ? "FREE" : `₹${item.price}`}
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.cartId)}
                            className="text-red-500 hover:text-red-400 p-1"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                    
                    <div className="border-t border-zinc-700 mt-4 pt-4">
                      <div className="flex justify-between mb-2">
                        <span className="text-zinc-400">Subtotal:</span>
                        <span className="text-white font-medium">₹{cartTotal}</span>
                      </div>
                      
                      <div className="mb-4">
                        <label className="block text-zinc-300 text-sm mb-2">Payment Method</label>
                        <div className="flex space-x-4">
                          <button
                            type="button"
                            className={`flex-1 py-2 rounded-md border ${
                              paymentMethod === "wallet" 
                                ? "border-red-500 bg-red-500/10 text-white" 
                                : "border-zinc-700 text-zinc-400 hover:border-zinc-600"
                            }`}
                            onClick={() => setPaymentMethod("wallet")}
                          >
                            Rescue Wallet (₹{userCoins})
                          </button>
                          <button
                            type="button"
                            className={`flex-1 py-2 rounded-md border ${
                              paymentMethod === "upi" 
                                ? "border-red-500 bg-red-500/10 text-white" 
                                : "border-zinc-700 text-zinc-400 hover:border-zinc-600"
                            }`}
                            onClick={() => setPaymentMethod("upi")}
                          >
                            UPI Payment
                          </button>
                        </div>
                      </div>
                      
                      <button
                        onClick={handleCheckout}
                        disabled={paymentMethod === "wallet" && userCoins < cartTotal}
                        className={`w-full py-3 rounded-md font-medium flex items-center justify-center ${
                          paymentMethod === "wallet" && userCoins < cartTotal
                            ? "bg-zinc-700 text-zinc-500 cursor-not-allowed"
                            : "bg-red-600 hover:bg-red-700 text-white"
                        }`}
                      >
                        <FiCheckCircle className="mr-2" />
                        {paymentMethod === "wallet" 
                          ? `Pay with Wallet (₹${cartTotal})` 
                          : `Proceed to Payment (₹${cartTotal})`}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReliefMarketplace;