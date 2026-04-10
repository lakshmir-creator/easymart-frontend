import React from 'react';
import Navbar from '../components/navbar';

const Wishlist = () => {
  const wishlistItems = [
    { id: 1, name: 'Fresh Apples', price: 2.99, image: 'apple', inStock: true },
    { id: 2, name: 'Organic Bananas', price: 1.99, image: 'banana', inStock: true },
    { id: 3, name: 'Fresh Milk', price: 3.49, image: 'milk', inStock: false },
    { id: 4, name: 'Whole Wheat Bread', price: 2.49, image: 'bread', inStock: true },
    { id: 5, name: 'Fresh Eggs', price: 4.99, image: 'eggs', inStock: true },
  ];

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
          
          {wishlistItems.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Your wishlist is empty</h3>
              <p className="text-gray-600 mb-6">Save items you love for later</p>
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
              {wishlistItems.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <div className="h-48 bg-gray-200 flex items-center justify-center">
                      <span className="text-3xl">{' '}
                        {item.image === 'apple' && ' '}
                        {item.image === 'banana' && ' '}
                        {item.image === 'milk' && ' '}
                        {item.image === 'bread' && ' '}
                        {item.image === 'eggs' && ' '}
                      </span>
                    </div>
                    {!item.inStock && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
                        Out of Stock
                      </div>
                    )}
                    <button className="absolute top-2 left-2 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow">
                      <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                    </button>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                    <p className="text-2xl font-bold text-green-600 mb-4">${item.price}</p>
                    
                    <div className="space-y-2">
                      {item.inStock ? (
                        <>
                          <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition-colors">
                            Add to Cart
                          </button>
                          <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded-lg font-semibold transition-colors">
                            Remove from Wishlist
                          </button>
                        </>
                      ) : (
                        <>
                          <button className="w-full bg-gray-300 text-gray-500 py-2 rounded-lg font-semibold cursor-not-allowed" disabled>
                            Out of Stock
                          </button>
                          <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded-lg font-semibold transition-colors">
                            Remove from Wishlist
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;