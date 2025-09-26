import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Camera, Upload, X, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { useNetworkStatus, useOfflineQueue } from '../hooks/useOfflineStorage';
import { useSpeechSynthesis, getLanguageCode } from '../hooks/useSpeech';

interface DetectionResult {
  disease: string;
  confidence: number;
  severity: 'Low' | 'Medium' | 'High';
  description: string;
  symptoms: string[];
  causes: string[];
  treatments: {
    chemical: string[];
    organic: string[];
    preventive: string[];
  };
}

const DiseaseDetectionPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { speak } = useSpeechSynthesis();
  const isOnline = useNetworkStatus();
  const { addToQueue } = useOfflineQueue();
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Mock disease detection function
  const detectDisease = async (imageFile: File): Promise<DetectionResult> => {
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Mock detection results based on random selection
    const diseases = [
      {
        disease: 'Late Blight',
        confidence: 85,
        severity: 'High' as const,
        description: 'A serious fungal disease that affects tomatoes and potatoes, causing dark spots on leaves.',
        symptoms: [
          'Dark, water-soaked spots on leaves',
          'Brown lesions with fuzzy white growth',
          'Yellowing and wilting of leaves',
          'Fruit rot in severe cases'
        ],
        causes: [
          'High humidity (>90%)',
          'Cool temperatures (15-20°C)',
          'Overhead irrigation',
          'Poor air circulation'
        ],
        treatments: {
          chemical: [
            'Copper-based fungicides (Bordeaux mixture)',
            'Metalaxyl + Mancozeb sprays',
            'Chlorothalonil applications'
          ],
          organic: [
            'Neem oil spray (3-5ml per liter)',
            'Baking soda solution (1 tsp per liter)',
            'Milk spray (1:10 ratio with water)',
            'Copper soap applications'
          ],
          preventive: [
            'Improve ventilation around plants',
            'Avoid overhead watering',
            'Remove infected plant debris',
            'Rotate crops annually'
          ]
        }
      },
      {
        disease: 'Powdery Mildew',
        confidence: 78,
        severity: 'Medium' as const,
        description: 'A common fungal disease that appears as white powdery spots on leaves and stems.',
        symptoms: [
          'White powdery coating on leaves',
          'Yellowing of affected areas',
          'Stunted growth',
          'Leaf curling and distortion'
        ],
        causes: [
          'High humidity with dry conditions',
          'Poor air circulation',
          'Overcrowding of plants',
          'Stress from drought or overwatering'
        ],
        treatments: {
          chemical: [
            'Sulfur-based fungicides',
            'Propiconazole sprays',
            'Myclobutanil applications'
          ],
          organic: [
            'Neem oil (2-3ml per liter)',
            'Potassium bicarbonate spray',
            'Milk and water solution (1:9)',
            'Garlic and onion extract'
          ],
          preventive: [
            'Ensure good air circulation',
            'Avoid overhead irrigation',
            'Plant resistant varieties',
            'Regular monitoring and early intervention'
          ]
        }
      },
      {
        disease: 'Bacterial Leaf Spot',
        confidence: 72,
        severity: 'Low' as const,
        description: 'A bacterial infection causing small, dark spots on leaves with yellow halos.',
        symptoms: [
          'Small dark spots with yellow halos',
          'Leaf yellowing and dropping',
          'Reduced fruit quality',
          'Stem cankers in severe cases'
        ],
        causes: [
          'Warm, humid conditions',
          'Water splash from irrigation',
          'Wounded plant tissue',
          'Infected seeds or transplants'
        ],
        treatments: {
          chemical: [
            'Copper hydroxide sprays',
            'Streptomycin applications',
            'Fixed copper fungicides'
          ],
          organic: [
            'Copper soap spray',
            'Hydrogen peroxide solution (3%)',
            'Compost tea applications',
            'Essential oil mixtures'
          ],
          preventive: [
            'Use certified disease-free seeds',
            'Avoid working in wet fields',
            'Implement crop rotation',
            'Remove and destroy infected plants'
          ]
        }
      }
    ];

    // Random selection for demo
    const randomIndex = Math.floor(Math.random() * diseases.length);
    return diseases[randomIndex];
  };

  const handleImageSelect = (file: File) => {
    setSelectedImage(file);
    setResult(null);
    setError(null);

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        handleImageSelect(file);
      } else {
        setError(t('disease.error.invalid_file'));
      }
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleImageSelect(file);
    } else {
      setError(t('disease.error.invalid_drop'));
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDetect = async () => {
  if (!selectedImage) {
      setError(t('disease.error.no_image'));
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const detection = await detectDisease(selectedImage);
      setResult(detection);

      // If offline, add to queue for later sync
      if (!isOnline) {
        await addToQueue('disease_detection', {
          image: selectedImage.name,
          result: detection,
          timestamp: Date.now()
        });
      }

      // Speak the result
      speak(
        t('disease.tts.detected', { disease: detection.disease, confidence: detection.confidence, severity: detection.severity }),
        getLanguageCode(i18n.language)
      );
    } catch (err) {
      setError(t('disease.error.analysis_failed'));
      console.error('Detection error:', err);
    } finally {
      setLoading(false);
    }
  };

  const clearImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return 'text-red-600 bg-red-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'High': return <AlertTriangle className="w-4 h-4" />;
      case 'Medium': return <Info className="w-4 h-4" />;
      case 'Low': return <CheckCircle className="w-4 h-4" />;
      default: return <Info className="w-4 h-4" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {t('disease.title')}
        </h1>
        <p className="text-lg text-gray-600">
          {t('disease.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Upload Section */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {t('disease.upload_image')}
            </h2>

            {!imagePreview ? (
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-400 transition-colors cursor-pointer"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-600 mb-2">
                  {t('disease.dropzone.prompt')}
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  {t('disease.dropzone.supports')}
                </p>
                <div className="flex items-center justify-center space-x-4">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    {t('disease.dropzone.take_photo')}
                  </button>
                  <span className="text-gray-400">{t('common.or')}</span>
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    {t('disease.dropzone.choose_file')}
                  </button>
                </div>
              </div>
            ) : (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Selected leaf"
                  className="w-full h-64 object-cover rounded-lg"
                />
                <button
                  onClick={clearImage}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="absolute bottom-2 left-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
                  {selectedImage?.name}
                </div>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileInputChange}
              className="hidden"
            />

            {error && (
              <div className="mt-4 text-red-600 text-sm">{error}</div>
            )}

            <button
              onClick={handleDetect}
              disabled={!selectedImage || loading}
              className="w-full mt-6 bg-primary-600 text-white py-3 px-4 rounded-md hover:bg-primary-700 disabled:opacity-50 font-medium"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>{t('disease.analyzing')}</span>
                </div>
              ) : (
                t('disease.detect')
              )}
            </button>
          </div>

          {/* Tips Section */}
          <div className="bg-blue-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">
              📸 Photography Tips
            </h3>
            <ul className="text-blue-800 text-sm space-y-2">
              <li>• Take photos in good natural lighting</li>
              <li>• Focus on affected leaves or symptoms</li>
              <li>• Avoid blurry or dark images</li>
              <li>• Include multiple affected areas if possible</li>
              <li>• Keep the camera steady for clear shots</li>
            </ul>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {result && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  {t('disease.result')}
                </h2>
                <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(result.severity)}`}>
                  {getSeverityIcon(result.severity)}
                  <span>{t('disease.severity_label', { severity: result.severity })}</span>
                </div>
              </div>

              {/* Disease Info */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{result.disease}</h3>
                  <div className="bg-primary-100 text-primary-800 px-2 py-1 rounded-full text-sm font-medium">
                    {t('disease.confidence_label', { confidence: result.confidence })}
                  </div>
                </div>
                <p className="text-gray-600 text-sm">{result.description}</p>
              </div>

              {/* Symptoms */}
              <div className="mb-6">
                <h4 className="text-md font-semibold text-gray-900 mb-2">{t('disease.sections.symptoms')}</h4>
                <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                  {result.symptoms.map((symptom, index) => (
                    <li key={index}>{symptom}</li>
                  ))}
                </ul>
              </div>

              {/* Causes */}
              <div className="mb-6">
                <h4 className="text-md font-semibold text-gray-900 mb-2">{t('disease.sections.causes')}</h4>
                <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                  {result.causes.map((cause, index) => (
                    <li key={index}>{cause}</li>
                  ))}
                </ul>
              </div>

              {/* Treatment Options */}
              <div className="space-y-4">
                <h4 className="text-md font-semibold text-gray-900">{t('disease.sections.treatments')}</h4>
                
                {/* Chemical Treatment */}
                <div className="bg-red-50 rounded-lg p-4">
                  <h5 className="font-medium text-red-900 mb-2">🧪 {t('disease.treatments.chemical')}</h5>
                  <ul className="text-sm text-red-800 list-disc list-inside space-y-1">
                    {result.treatments.chemical.map((treatment, index) => (
                      <li key={index}>{treatment}</li>
                    ))}
                  </ul>
                </div>

                {/* Organic Treatment */}
                <div className="bg-green-50 rounded-lg p-4">
                  <h5 className="font-medium text-green-900 mb-2">🌿 {t('disease.treatments.organic')}</h5>
                  <ul className="text-sm text-green-800 list-disc list-inside space-y-1">
                    {result.treatments.organic.map((treatment, index) => (
                      <li key={index}>{treatment}</li>
                    ))}
                  </ul>
                </div>

                {/* Preventive Measures */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <h5 className="font-medium text-blue-900 mb-2">🛡️ {t('disease.treatments.prevention')}</h5>
                  <ul className="text-sm text-blue-800 list-disc list-inside space-y-1">
                    {result.treatments.preventive.map((prevention, index) => (
                      <li key={index}>{prevention}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Offline Notice */}
          {!isOnline && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                <h3 className="text-sm font-medium text-yellow-800">{t('common.offline_title')}</h3>
                <p className="text-sm text-yellow-700 mt-1">
                  {t('common.offline_sync_notice')}
                </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiseaseDetectionPage;
