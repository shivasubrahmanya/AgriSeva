import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Thermometer, Droplet, Sun, CloudRain } from 'lucide-react';
import { useNetworkStatus, useOfflineQueue } from '../hooks/useOfflineStorage';
import { useSpeechSynthesis, getLanguageCode } from '../hooks/useSpeech';

interface SoilData {
  ph: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  location: string;
}

interface WeatherData {
  temperature: number;
  humidity: number;
  rainfall: number;
  season: string;
}

interface CropRecommendation {
  crop: string;
  confidence: number;
  reasons: string[];
  fertilizer: string;
  pesticide?: string;
  practices: string[];
}

const CropAdvisoryPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { speak } = useSpeechSynthesis();
  const isOnline = useNetworkStatus();
  const { addToQueue } = useOfflineQueue();

  const [soilData, setSoilData] = useState<SoilData>({
    ph: 7.0,
    nitrogen: 50,
    phosphorus: 30,
    potassium: 40,
    location: ''
  });

  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [recommendations, setRecommendations] = useState<CropRecommendation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mock weather API call
  const fetchWeatherData = async (location: string): Promise<WeatherData> => {
    // In real app, this would call actual weather API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      temperature: 25 + Math.random() * 10,
      humidity: 60 + Math.random() * 30,
      rainfall: Math.random() * 100,
      season: getCurrentSeason()
    };
  };

  const getCurrentSeason = (): string => {
    const month = new Date().getMonth() + 1;
    if (month >= 3 && month <= 5) return 'Summer';
    if (month >= 6 && month <= 9) return 'Monsoon';
    if (month >= 10 && month <= 2) return 'Winter';
    return 'Spring';
  };

  // Mock AI recommendation engine
  const getCropRecommendations = async (soil: SoilData, weather: WeatherData): Promise<CropRecommendation[]> => {
    await new Promise(resolve => setTimeout(resolve, 2000));

    const recommendations: CropRecommendation[] = [];

    // Rice recommendation
    if (soil.ph >= 6.0 && soil.ph <= 7.5 && weather.rainfall > 50) {
      recommendations.push({
        crop: 'Rice',
        confidence: 85,
        reasons: [
          'Optimal pH range (6.0-7.5)',
          'Sufficient rainfall for paddy cultivation',
          'Good nitrogen levels'
        ],
        fertilizer: 'NPK 20-10-10',
        practices: [
          'Maintain water level 2-5cm in field',
          'Transplant 25-day old seedlings',
          'Apply organic matter before planting'
        ]
      });
    }

    // Wheat recommendation
    if (soil.ph >= 6.0 && soil.ph <= 7.5 && weather.season === 'Winter') {
      recommendations.push({
        crop: 'Wheat',
        confidence: 80,
        reasons: [
          'Suitable pH for wheat cultivation',
          'Winter season is ideal',
          'Adequate phosphorus levels'
        ],
        fertilizer: 'DAP and Urea',
        practices: [
          'Sow seeds at 2-3cm depth',
          'Irrigation at crown root initiation',
          'Weed control after 30-35 days'
        ]
      });
    }

    // Tomato recommendation
    if (soil.ph >= 6.0 && soil.ph <= 7.0 && soil.potassium > 35) {
      recommendations.push({
        crop: 'Tomato',
        confidence: 75,
        reasons: [
          'Good pH range for tomatoes',
          'Sufficient potassium content',
          'Favorable weather conditions'
        ],
        fertilizer: 'NPK 19-19-19',
        pesticide: 'Neem oil for pest control',
        practices: [
          'Provide support structures',
          'Regular pruning and training',
          'Drip irrigation recommended'
        ]
      });
    }

    // Maize recommendation
    if (soil.nitrogen > 40 && weather.temperature > 20) {
      recommendations.push({
        crop: 'Maize',
        confidence: 70,
        reasons: [
          'Good nitrogen availability',
          'Suitable temperature range',
          'Well-drained soil conditions'
        ],
        fertilizer: 'Urea and SSP',
        practices: [
          'Plant spacing: 60cm x 20cm',
          'Side dressing with nitrogen',
          'Harvest at physiological maturity'
        ]
      });
    }

    return recommendations.sort((a, b) => b.confidence - a.confidence);
  };

  const handleInputChange = (field: keyof SoilData, value: string | number) => {
    setSoilData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!soilData.location.trim()) {
      setError(t('advisory.error.location_required'));
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Fetch weather data
      const weather = await fetchWeatherData(soilData.location);
      setWeatherData(weather);

      // Get crop recommendations
      const recs = await getCropRecommendations(soilData, weather);
      setRecommendations(recs);

      // If offline, add to queue for later sync
      if (!isOnline) {
        await addToQueue('crop_advisory', { soilData, weather, recommendations: recs, timestamp: Date.now() });
      }

      // Speak the first recommendation
      if (recs.length > 0) {
        speak(
          t('advisory.tts.top_rec', { crop: recs[0].crop, confidence: recs[0].confidence }),
          getLanguageCode(i18n.language)
        );
      }
    } catch (err) {
      setError(t('advisory.error.fetch_failed'));
      console.error('Advisory error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {t('crop.title')}
        </h1>
        <p className="text-lg text-gray-600">
          {t('crop.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            {t('crop.form.title')}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Location */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <MapPin className="w-4 h-4 mr-2" />
                {t('crop.location')}
              </label>
              <input
                type="text"
                value={soilData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                placeholder={t('crop.location_placeholder')}
                required
              />
            </div>

            {/* Soil pH */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('crop.soil_ph')}: {soilData.ph}
              </label>
              <input
                type="range"
                min="4.0"
                max="9.0"
                step="0.1"
                value={soilData.ph}
                onChange={(e) => handleInputChange('ph', parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>{t('crop.ph_scale.acidic')}</span>
                <span>{t('crop.ph_scale.neutral')}</span>
                <span>{t('crop.ph_scale.alkaline')}</span>
              </div>
            </div>

            {/* Nitrogen */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('crop.nitrogen')}: {soilData.nitrogen} kg/ha
              </label>
              <input
                type="range"
                min="10"
                max="200"
                step="5"
                value={soilData.nitrogen}
                onChange={(e) => handleInputChange('nitrogen', parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Phosphorus */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('crop.phosphorus')}: {soilData.phosphorus} kg/ha
              </label>
              <input
                type="range"
                min="5"
                max="100"
                step="2"
                value={soilData.phosphorus}
                onChange={(e) => handleInputChange('phosphorus', parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Potassium */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('crop.potassium')}: {soilData.potassium} kg/ha
              </label>
              <input
                type="range"
                min="10"
                max="150"
                step="5"
                value={soilData.potassium}
                onChange={(e) => handleInputChange('potassium', parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {error && (
              <div className="text-red-600 text-sm">{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-600 text-white py-3 px-4 rounded-md hover:bg-primary-700 disabled:opacity-50 font-medium"
            >
              {loading ? t('common.loading') : t('crop.get_recommendation')}
            </button>
          </form>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {/* Weather Data */}
          {weatherData && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {t('weather.title')}
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Thermometer className="w-5 h-5 text-red-500" />
                  <div>
                    <div className="text-sm text-gray-600">{t('weather.temperature')}</div>
                    <div className="font-semibold">{weatherData.temperature.toFixed(1)}°C</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Droplet className="w-5 h-5 text-blue-500" />
                  <div>
                    <div className="text-sm text-gray-600">{t('weather.humidity')}</div>
                    <div className="font-semibold">{weatherData.humidity.toFixed(0)}%</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <CloudRain className="w-5 h-5 text-gray-500" />
                  <div>
                    <div className="text-sm text-gray-600">{t('weather.rainfall')}</div>
                    <div className="font-semibold">{weatherData.rainfall.toFixed(1)}mm</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Sun className="w-5 h-5 text-yellow-500" />
                  <div>
                    <div className="text-sm text-gray-600">{t('weather.season')}</div>
                    <div className="font-semibold">{weatherData.season}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Crop Recommendations */}
          {recommendations.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {t('crop.results.title')}
              </h2>
              <div className="space-y-4">
                {recommendations.map((rec, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">{rec.crop}</h3>
                      <div className="flex items-center space-x-2">
                        <div className="text-sm text-gray-600">{t('common.confidence_label')}</div>
                        <div className="bg-primary-100 text-primary-800 px-2 py-1 rounded-full text-sm font-medium">
                          {rec.confidence}%
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <h4 className="text-sm font-medium text-gray-700 mb-1">{t('crop.why')}</h4>
                      <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                        {rec.reasons.map((reason, i) => (
                          <li key={i}>{reason}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-1">{t('crop.fertilizer')}</h4>
                        <p className="text-sm text-gray-600">{rec.fertilizer}</p>
                      </div>
                      {rec.pesticide && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-1">{t('crop.pest_control')}</h4>
                          <p className="text-sm text-gray-600">{rec.pesticide}</p>
                        </div>
                      )}
                    </div>

                    <div className="mt-3">
                      <h4 className="text-sm font-medium text-gray-700 mb-1">{t('crop.practices')}</h4>
                      <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                        {rec.practices.map((practice, i) => (
                          <li key={i}>{practice}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CropAdvisoryPage;
