import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MessageSquare, Heart, Reply, Plus, Search, Filter } from 'lucide-react';

const ForumPage: React.FC = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Posts', count: 48 },
    { id: 'crop_care', name: 'Crop Care', count: 15 },
    { id: 'pest_control', name: 'Pest Control', count: 12 },
    { id: 'irrigation', name: 'Irrigation', count: 8 },
    { id: 'equipment', name: 'Equipment', count: 13 }
  ];

  const mockPosts = [
    {
      id: 1,
      title: 'Best practices for tomato farming in monsoon',
      content: 'I need advice on protecting my tomato plants during the monsoon season...',
      author: 'Rajesh Kumar',
      location: 'Maharashtra',
      date: '2024-09-25',
      category: 'crop_care',
      replies: 8,
      likes: 15,
      isExpert: false,
      hasExpertReply: true
    },
    {
      id: 2,
      title: 'Organic pest control methods for cotton',
      content: 'Looking for effective organic methods to control pests in cotton crops...',
      author: 'Dr. Priya Sharma',
      location: 'Gujarat',
      date: '2024-09-24',
      category: 'pest_control',
      replies: 12,
      likes: 23,
      isExpert: true,
      hasExpertReply: false
    },
    {
      id: 3,
      title: 'Water-saving irrigation techniques',
      content: 'Can anyone share their experience with drip irrigation systems?',
      author: 'Suresh Patel',
      location: 'Punjab',
      date: '2024-09-23',
      category: 'irrigation',
      replies: 6,
      likes: 11,
      isExpert: false,
      hasExpertReply: true
    }
  ];

  const filteredPosts = selectedCategory === 'all' 
    ? mockPosts 
    : mockPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {t('forum.title')}
        </h1>
        <p className="text-lg text-gray-600">
          {t('forum.subtitle')}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:w-80">
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <button className="w-full bg-primary-600 text-white px-4 py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium flex items-center justify-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>{t('forum.post')}</span>
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">{t('forum.categories')}</h2>
            <div className="space-y-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center justify-between ${
                    selectedCategory === category.id
                      ? 'bg-primary-100 text-primary-700'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <span>{category.name}</span>
                  <span className={`text-sm px-2 py-1 rounded-full ${
                    selectedCategory === category.id
                      ? 'bg-primary-200 text-primary-800'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {category.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder={t('forum.search_placeholder')}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <button className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                <Filter className="w-4 h-4 mr-2" />
                {t('forum.filter')}
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {filteredPosts.map(post => (
              <div key={post.id} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-primary-600 font-semibold">
                        {post.author.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium text-gray-900">{post.author}</h3>
                        {post.isExpert && (
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                            {t('forum.expert')}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">{post.location} • {post.date}</p>
                    </div>
                  </div>
                  <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                    {categories.find(cat => cat.id === post.category)?.name}
                  </span>
                </div>

                <h2 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h2>
                <p className="text-gray-600 mb-4">{post.content}</p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-6">
                    <button className="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors">
                      <Heart className="w-4 h-4" />
                      <span className="text-sm">{post.likes}</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-500 hover:text-primary-500 transition-colors">
                      <MessageSquare className="w-4 h-4" />
                      <span className="text-sm">{t('forum.replies', { count: post.replies })}</span>
                    </button>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {post.hasExpertReply && (
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                        {t('forum.expert_replied')}
                      </span>
                    )}
                    <button className="inline-flex items-center px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm">
                      <Reply className="w-4 h-4 mr-1" />
                      {t('forum.reply')}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-8">
            <button className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              {t('forum.load_more')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumPage;
