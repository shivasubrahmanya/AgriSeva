import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Leaf, Search, ShoppingBag, HelpCircle, Newspaper, Users } from 'lucide-react';
import { useSpeechSynthesis, getLanguageCode } from '../hooks/useSpeech';

const HomePage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { speak } = useSpeechSynthesis();

  const features = [
    {
      key: 'crop_advisory',
      icon: Leaf,
      path: '/crop-advisory',
      color: 'bg-green-100 text-green-600',
      descriptionKey: 'feature.crop_advisory.desc'
    },
    {
      key: 'disease_detection',
      icon: Search,
      path: '/disease-detection',
      color: 'bg-blue-100 text-blue-600',
      descriptionKey: 'feature.disease_detection.desc'
    },
    {
      key: 'marketplace',
      icon: ShoppingBag,
      path: '/marketplace',
      color: 'bg-purple-100 text-purple-600',
      descriptionKey: 'feature.marketplace.desc'
    },
    {
      key: 'support',
      icon: HelpCircle,
      path: '/support',
      color: 'bg-yellow-100 text-yellow-600',
      descriptionKey: 'feature.support.desc'
    },
    {
      key: 'news',
      icon: Newspaper,
      path: '/news',
      color: 'bg-red-100 text-red-600',
      descriptionKey: 'feature.news.desc'
    },
    {
      key: 'forum',
      icon: Users,
      path: '/forum',
      color: 'bg-indigo-100 text-indigo-600',
      descriptionKey: 'feature.forum.desc'
    },
  ];

  const handleFeatureClick = (text: string) => {
    speak(text, getLanguageCode(i18n.language));
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="block">{t('home.title')}</span>
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-primary-100">
              {t('home.subtitle')}
            </p>
            <p className="text-lg mb-8 text-primary-200 max-w-3xl mx-auto">
              {t('home.description')}
            </p>
            <Link
              to="/crop-advisory"
              className="inline-flex items-center space-x-2 bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 transition-colors text-lg"
              onClick={() => handleFeatureClick(t('home.get_started'))}
            >
              <span>{t('home.get_started')}</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('home.services_title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('home.services_desc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => {
              const IconComponent = feature.icon;
              return (
                <Link
                  key={feature.key}
                  to={feature.path}
                  className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300 hover:border-primary-200"
                  onClick={() => handleFeatureClick(t(`nav.${feature.key}`))}
                >
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 ${feature.color}`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {t(`nav.${feature.key}`)}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {t(feature.descriptionKey)}
                  </p>
                  <div className="mt-4 flex items-center text-primary-600 group-hover:text-primary-700">
                    <span className="text-sm font-medium">{t('home.learn_more')}</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('home.stats_title')}
            </h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                10K+
              </div>
              <div className="text-gray-600">{t('stats.farmers_served')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                7
              </div>
              <div className="text-gray-600">{t('stats.regional_languages')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                95%
              </div>
              <div className="text-gray-600">{t('stats.accuracy_rate')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                24/7
              </div>
              <div className="text-gray-600">{t('stats.support_available')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('cta.title')}
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            {t('cta.desc')}
          </p>
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            <Link
              to="/crop-advisory"
              className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              {t('cta.advisory_button')}
            </Link>
            <Link
              to="/disease-detection"
              className="inline-block bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors"
            >
              {t('cta.detection_button')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
