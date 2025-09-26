import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './i18n';

import Navigation from './components/Layout/Navigation';
import HomePage from './pages/HomePage';
import CropAdvisoryPage from './pages/CropAdvisoryPage';
import DiseaseDetectionPage from './pages/DiseaseDetectionPage';
import MarketplacePage from './pages/MarketplacePage';
import SupportPage from './pages/SupportPage';
import NewsPage from './pages/NewsPage';
import ForumPage from './pages/ForumPage';

import { useOfflineUserPreferences, useNetworkStatus } from './hooks/useOfflineStorage';

const App: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { data: preferences } = useOfflineUserPreferences();
  const isOnline = useNetworkStatus();

  // Set language from preferences on app start
  useEffect(() => {
    if (preferences?.language) {
      i18n.changeLanguage(preferences.language);
    }
  }, [preferences, i18n]);

  // Set appropriate font family based on language
  useEffect(() => {
    const setLanguageFont = () => {
      const body = document.body;
      const lang = i18n.language;
      
      // Reset font classes
      body.classList.remove('font-hindi', 'font-tamil', 'font-telugu', 'font-kannada', 'font-marathi', 'font-punjabi');
      
      // Add appropriate font class
      switch (lang) {
        case 'hi':
          body.classList.add('font-hindi');
          break;
        case 'ta':
          body.classList.add('font-tamil');
          break;
        case 'te':
          body.classList.add('font-telugu');
          break;
        case 'kn':
          body.classList.add('font-kannada');
          break;
        case 'mr':
          body.classList.add('font-marathi');
          break;
        case 'pa':
          body.classList.add('font-punjabi');
          break;
        default:
          // English - use default font
          break;
      }
    };

    setLanguageFont();
    
    // Listen for language changes
    i18n.on('languageChanged', setLanguageFont);
    
    return () => {
      i18n.off('languageChanged', setLanguageFont);
    };
  }, [i18n]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        
        {/* Offline indicator */}
        {!isOnline && (
          <div className="bg-yellow-100 border-b border-yellow-300 px-4 py-2">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
              <span className="text-yellow-800 text-sm font-medium">
                {t('common.offline_banner')}
              </span>
            </div>
          </div>
        )}
        
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/crop-advisory" element={<CropAdvisoryPage />} />
            <Route path="/disease-detection" element={<DiseaseDetectionPage />} />
            <Route path="/marketplace" element={<MarketplacePage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/forum" element={<ForumPage />} />
            {/* Add 404 route */}
            <Route path="*" element={<div className="p-8 text-center">{t('common.page_not_found')}</div>} />
          </Routes>
        </main>
        
        {/* PWA Install prompt would go here */}
      </div>
    </Router>
  );
};

export default App;
