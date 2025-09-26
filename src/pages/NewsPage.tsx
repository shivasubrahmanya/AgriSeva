import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TrendingUp, TrendingDown, Calendar } from 'lucide-react';

const NewsPage: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'news' | 'prices'>('news');

  const mockNews = [
    {
      id: 1,
      title: 'New Agricultural Policy Announced by Government',
      summary: 'The government has announced a new agricultural policy focusing on sustainable farming...',
      date: '2024-09-25',
      source: 'Ministry of Agriculture',
      category: 'Policy'
    },
    {
      id: 2,
      title: 'Monsoon Forecast: Above Normal Rainfall Expected',
      summary: 'IMD predicts above normal rainfall for the upcoming monsoon season...',
      date: '2024-09-24',
      source: 'IMD',
      category: 'Weather'
    }
  ];

  const mockPrices = [
    {
      commodity: 'Rice',
      price: 2850,
      change: 2.5,
      market: 'Delhi',
      unit: 'per quintal'
    },
    {
      commodity: 'Wheat',
      price: 2150,
      change: -1.2,
      market: 'Punjab',
      unit: 'per quintal'
    },
    {
      commodity: 'Tomato',
      price: 25,
      change: 5.8,
      market: 'Maharashtra',
      unit: 'per kg'
    },
    {
      commodity: 'Onion',
      price: 18,
      change: -3.1,
      market: 'Karnataka',
      unit: 'per kg'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {t('news.title')}
        </h1>
        <p className="text-lg text-gray-600">
          {t('news.subtitle')}
        </p>
      </div>

      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => setActiveTab('news')}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'news'
              ? 'bg-primary-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {t('news.latest')}
        </button>
        <button
          onClick={() => setActiveTab('prices')}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'prices'
              ? 'bg-primary-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {t('news.prices')}
        </button>
      </div>

      {activeTab === 'news' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {mockNews.map(article => (
            <div key={article.id} className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-start justify-between mb-3">
                <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-xs font-medium">
                  {article.category}
                </span>
                <div className="flex items-center text-gray-500 text-sm">
                  <Calendar className="w-4 h-4 mr-1" />
                  {new Date(article.date).toLocaleDateString()}
                </div>
              </div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">{article.title}</h2>
              <p className="text-gray-600 mb-4 line-clamp-3">{article.summary}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">{article.source}</span>
                <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  {t('news.read_more')}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'prices' && (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b">
            <h2 className="text-lg font-semibold text-gray-900">{t('news.current_prices')}</h2>
            <p className="text-sm text-gray-600 mt-1">{t('news.updated', { date: new Date().toLocaleString() })}</p>
          </div>
          <div className="divide-y divide-gray-200">
            {mockPrices.map((item, index) => (
              <div key={index} className="px-6 py-4 flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{item.commodity}</h3>
                  <p className="text-sm text-gray-500">{item.market}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-lg font-semibold text-gray-900">
                      ₹{item.price} <span className="text-sm font-normal text-gray-500">/{item.unit}</span>
                    </div>
                  </div>
                  <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${
                    item.change > 0
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {item.change > 0 ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    <span>{Math.abs(item.change)}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsPage;
