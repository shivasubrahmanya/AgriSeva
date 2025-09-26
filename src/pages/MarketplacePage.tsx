import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, MapPin, Star, Plus, Filter } from 'lucide-react';

const MarketplacePage: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy');

  const mockProducts = [
    {
      id: 1,
      title: 'Fresh Tomatoes',
      price: 25,
      quantity: '100 kg',
      location: 'Maharashtra',
      seller: 'Ramesh Sharma',
      rating: 4.5,
      image: 'tomatoes.jpg'
    },
    {
      id: 2,
      title: 'Organic Rice',
      price: 45,
      quantity: '500 kg',
      location: 'Punjab',
      seller: 'Gurpreet Singh',
      rating: 4.8,
      image: 'rice.jpg'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {t('marketplace.title')}
        </h1>
        <p className="text-lg text-gray-600">
          {t('marketplace.subtitle')}
        </p>
      </div>

      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => setActiveTab('buy')}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'buy'
              ? 'bg-primary-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {t('marketplace.buy')}
        </button>
        <button
          onClick={() => setActiveTab('sell')}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'sell'
              ? 'bg-primary-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {t('marketplace.sell')}
        </button>
      </div>

      {activeTab === 'buy' && (
        <div>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={t('marketplace.search_placeholder')}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <button className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
              <Filter className="w-4 h-4 mr-2" />
              {t('marketplace.filters')}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockProducts.map(product => (
              <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">📸 {product.image}</span>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.title}</h3>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-bold text-primary-600">₹{product.price}/kg</span>
                    <span className="text-sm text-gray-500">{product.quantity}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    {product.location}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating) ? 'fill-current' : ''
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 ml-1">({product.rating})</span>
                    </div>
                    <span className="text-sm text-gray-500">{product.seller}</span>
                  </div>
                  <button className="w-full mt-4 bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors">
                    {t('marketplace.contact_seller')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'sell' && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">{t('marketplace.sell_title')}</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('marketplace.sell.product_title')}</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  placeholder={t('marketplace.sell.title_placeholder')}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('marketplace.sell.category')}</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500">
                  <option>{t('marketplace.sell.category.vegetables')}</option>
                  <option>{t('marketplace.sell.category.fruits')}</option>
                  <option>{t('marketplace.sell.category.grains')}</option>
                  <option>{t('marketplace.sell.category.equipment')}</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('marketplace.sell.price_hint')}</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  placeholder="25"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('marketplace.sell.quantity_hint')}</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  placeholder="100 kg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('marketplace.sell.location')}</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  placeholder={t('marketplace.sell.location_placeholder')}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('marketplace.sell.description')}</label>
              <textarea
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                placeholder={t('marketplace.sell.description_placeholder')}
              ></textarea>
            </div>

            <button
              type="submit"
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium"
            >
              <Plus className="w-4 h-4 mr-2" />
              {t('marketplace.sell.list_button')}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default MarketplacePage;
