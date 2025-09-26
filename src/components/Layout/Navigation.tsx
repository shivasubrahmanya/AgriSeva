import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Globe, Volume2, VolumeX, Mic, MicOff } from 'lucide-react';
import { useSpeechSynthesis, useSpeechRecognition, getLanguageCode } from '../../hooks/useSpeech';
import { useOfflineUserPreferences, useNetworkStatus } from '../../hooks/useOfflineStorage';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const { speak, stop, speaking } = useSpeechSynthesis();
  const { listening, startListening, stopListening } = useSpeechRecognition();
  const { data: preferences, setItem: setPreferences } = useOfflineUserPreferences();
  const isOnline = useNetworkStatus();

  const languages = [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
    { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
    { code: 'te', name: 'Telugu', native: 'తెలుగు' },
    { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
    { code: 'mr', name: 'Marathi', native: 'मराठी' },
    { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
  ];

  const navItems = [
    { key: 'home', path: '/', icon: '🏠' },
    { key: 'crop_advisory', path: '/crop-advisory', icon: '🌱' },
    { key: 'disease_detection', path: '/disease-detection', icon: '🔬' },
    { key: 'marketplace', path: '/marketplace', icon: '🛒' },
    { key: 'support', path: '/support', icon: '🏛️' },
    { key: 'news', path: '/news', icon: '📰' },
    { key: 'forum', path: '/forum', icon: '👥' },
  ];

  const handleLanguageChange = async (langCode: string) => {
    await i18n.changeLanguage(langCode);
    if (preferences) {
      await setPreferences({ ...preferences, language: langCode });
    }
    setShowLanguageDropdown(false);
  };

  const toggleVoice = async () => {
    if (speaking) {
      stop();
    } else if (listening) {
      stopListening();
    } else {
      startListening(getLanguageCode(i18n.language));
    }
    
    if (preferences) {
      await setPreferences({ ...preferences, voiceEnabled: !preferences.voiceEnabled });
    }
  };

  const speakText = (text: string) => {
    if (preferences?.voiceEnabled) {
      speak(text, getLanguageCode(i18n.language));
    }
  };

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-lg border-b border-primary-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex items-center space-x-2 text-primary-600 font-bold text-xl"
              onClick={() => speakText(t('nav.home'))}
            >
              <span className="text-2xl">🌾</span>
              <span>AgriSeva</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.key}
                to={item.path}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActiveRoute(item.path)
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
                }`}
                onClick={() => speakText(t(`nav.${item.key}`))}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{t(`nav.${item.key}`)}</span>
              </Link>
            ))}
          </div>

          {/* Desktop Controls */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Network Status */}
            <div className={`w-3 h-3 rounded-full ${
              isOnline ? 'bg-green-500' : 'bg-red-500'
            }`} title={isOnline ? t('status.online') : t('status.offline')} />

            {/* Voice Control */}
            <button
              onClick={toggleVoice}
              className={`p-2 rounded-md transition-colors ${
                listening
                  ? 'bg-red-100 text-red-600 hover:bg-red-200'
                  : speaking
                  ? 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              title={listening ? t('voice.listening') : t('voice.speak')}
            >
              {listening ? (
                <MicOff className="w-5 h-5" />
              ) : speaking ? (
                <VolumeX className="w-5 h-5" />
              ) : preferences?.voiceEnabled ? (
                <Mic className="w-5 h-5" />
              ) : (
                <Volume2 className="w-5 h-5" />
              )}
            </button>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                className="flex items-center space-x-1 px-3 py-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {languages.find(lang => lang.code === i18n.language)?.native}
                </span>
              </button>

              {showLanguageDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => handleLanguageChange(language.code)}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${
                        i18n.language === language.code
                          ? 'bg-primary-50 text-primary-600 font-medium'
                          : 'text-gray-700'
                      }`}
                    >
                      <div>
                        <div className="font-medium">{language.native}</div>
                        <div className="text-xs text-gray-500">{language.name}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.key}
                to={item.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActiveRoute(item.path)
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
                }`}
                onClick={() => {
                  setIsOpen(false);
                  speakText(t(`nav.${item.key}`));
                }}
              >
                <span className="text-xl">{item.icon}</span>
                <span>{t(`nav.${item.key}`)}</span>
              </Link>
            ))}
          </div>

          {/* Mobile Controls */}
          <div className="px-4 py-3 border-t border-gray-200">
            <div className="flex items-center justify-between">
              {/* Network Status */}
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${
                  isOnline ? 'bg-green-500' : 'bg-red-500'
                }`} />
                <span className="text-sm text-gray-600">
                  {isOnline ? t('status.online') : t('status.offline')}
                </span>
              </div>

              {/* Voice Control */}
              <button
                onClick={toggleVoice}
                className={`p-2 rounded-md transition-colors ${
                  listening
                    ? 'bg-red-100 text-red-600'
                    : speaking
                    ? 'bg-blue-100 text-blue-600'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {listening ? (
                  <MicOff className="w-5 h-5" />
                ) : speaking ? (
                  <VolumeX className="w-5 h-5" />
                ) : (
                  <Mic className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Language Selector */}
            <div className="mt-3">
              <div className="text-sm font-medium text-gray-700 mb-2">
                {t('nav.language')}
              </div>
              <div className="grid grid-cols-2 gap-2">
                {languages.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => handleLanguageChange(language.code)}
                    className={`text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      i18n.language === language.code
                        ? 'bg-primary-100 text-primary-600 font-medium'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="font-medium">{language.native}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
      