import React from 'react';
import { useTranslation } from 'react-i18next';
import { ExternalLink, Phone, Mail, MapPin } from 'lucide-react';

const SupportPage: React.FC = () => {
  const { t } = useTranslation();

  const schemes = [
    {
      name: 'PM-KISAN',
      description: 'Direct income support for farmers',
      benefit: '₹6,000 per year',
      eligibility: 'All landholding farmers',
      link: 'https://pmkisan.gov.in/'
    },
    {
      name: 'PMFBY',
      description: 'Crop insurance scheme',
      benefit: 'Up to ₹2 lakh coverage',
      eligibility: 'All farmers',
      link: 'https://pmfby.gov.in/'
    },
    {
      name: 'NABARD Loans',
      description: 'Agricultural credit facility',
      benefit: 'Low interest loans',
      eligibility: 'Farmers and agri-businesses',
      link: 'https://nabard.org/'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {t('support.title')}
        </h1>
        <p className="text-lg text-gray-600">
          {t('support.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">{t('support.schemes')}</h2>
          <div className="space-y-4">
            {schemes.map((scheme, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">{scheme.name}</h3>
                  <a
                    href={scheme.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
                <p className="text-gray-600 mb-3">{scheme.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">{t('support.benefit_label')}</span>
                    <span className="text-primary-600 ml-2">{scheme.benefit}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">{t('support.eligibility_label')}</span>
                    <span className="text-gray-600 ml-2">{scheme.eligibility}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{t('support.contact_support')}</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary-600" />
                <div>
                  <div className="font-medium text-gray-900">{t('support.helpline')}</div>
                  <div className="text-gray-600">1800-180-1551</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary-600" />
                <div>
                  <div className="font-medium text-gray-900">{t('support.email')}</div>
                  <div className="text-gray-600">support@agriseva.com</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-primary-600" />
                <div>
                  <div className="font-medium text-gray-900">{t('support.address')}</div>
                  <div className="text-gray-600">Agricultural Ministry, New Delhi</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-primary-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-primary-900 mb-3">{t('support.quick_apply_title')}</h3>
            <p className="text-primary-800 text-sm mb-4">
              {t('support.quick_apply_desc')}
            </p>
            <button className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors">
              {t('support.quick_apply_button')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
