import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation resources
const resources = {
  en: {
    translation: {
      // Navigation
      'nav.home': 'Home',
      'nav.crop_advisory': 'Crop Advisory',
      'nav.disease_detection': 'Disease Detection',
      'nav.marketplace': 'Marketplace',
      'nav.support': 'Support',
      'nav.news': 'News & Prices',
      'nav.forum': 'Community',
      'nav.language': 'Language',
      
      // Common
      'common.submit': 'Submit',
      'common.cancel': 'Cancel',
      'common.loading': 'Loading...',
      'common.error': 'Error occurred',
      'common.success': 'Success',
      'common.upload': 'Upload',
      'common.search': 'Search',
'common.filter': 'Filter',
      'common.or': 'or',
      'common.offline_banner': "You're currently offline. Some features may be limited.",
      'common.page_not_found': 'Page not found',
      'common.confidence_label': 'Confidence:',
      'common.offline_title': 'Offline Mode',
      'common.offline_sync_notice': "You're currently offline. Results will be synced when you're back online.",
      
      // Home page
      'home.title': 'Welcome to AgriSeva',
      'home.subtitle': 'Your Smart Farming Companion',
      'home.description': 'Get expert crop advisory, disease detection, and connect with the farming community',
      'home.get_started': 'Get Started',
      'home.services_title': 'Our Services',
      'home.services_desc': 'Comprehensive agricultural solutions to help farmers make informed decisions and improve productivity.',
      'home.learn_more': 'Learn more',
      'home.stats_title': 'Empowering Farmers Across India',
      'stats.farmers_served': 'Farmers Served',
      'stats.regional_languages': 'Regional Languages',
      'stats.accuracy_rate': 'Accuracy Rate',
      'stats.support_available': 'Support Available',
      'cta.title': 'Ready to Revolutionize Your Farming?',
      'cta.desc': 'Join thousands of farmers who are already using AgriSeva to improve their crop yields and make informed decisions.',
      'cta.advisory_button': 'Start Crop Advisory',
      'cta.detection_button': 'Try Disease Detection',
      
      // Feature descriptions
      'feature.crop_advisory.desc': 'Get AI-powered crop recommendations based on soil analysis and weather data',
      'feature.disease_detection.desc': 'Upload leaf images to detect diseases and get treatment suggestions',
      'feature.marketplace.desc': 'Buy and sell agricultural products in our farmer marketplace',
      'feature.support.desc': 'Access government schemes, loans, and agricultural support programs',
      'feature.news.desc': 'Stay updated with latest agricultural news and market prices',
      'feature.forum.desc': 'Connect with other farmers and agricultural experts',
      
      // Crop Advisory
      'crop.title': 'Crop Advisory',
      'crop.soil_ph': 'Soil pH',
      'crop.nitrogen': 'Nitrogen (N)',
      'crop.phosphorus': 'Phosphorus (P)',
      'crop.potassium': 'Potassium (K)',
      'crop.location': 'Location',
'crop.get_recommendation': 'Get Recommendations',
      'crop.subtitle': 'Get AI-powered crop recommendations based on your soil analysis and local weather conditions.',
      'crop.form.title': 'Soil Analysis & Location',
      'crop.location_placeholder': 'e.g., Maharashtra, India',
      'crop.ph_scale.acidic': 'Acidic (4.0)',
      'crop.ph_scale.neutral': 'Neutral (7.0)',
      'crop.ph_scale.alkaline': 'Alkaline (9.0)',
      'crop.results.title': 'Crop Recommendations',
      'crop.why': 'Why this crop?',
      'crop.fertilizer': 'Recommended Fertilizer',
      'crop.pest_control': 'Pest Control',
      'crop.practices': 'Best Practices',
      
      // Disease Detection
      'disease.title': 'AI Disease Detection',
      'disease.upload_image': 'Upload Leaf Image',
      'disease.detect': 'Detect Disease',
'disease.result': 'Detection Result',
      'disease.subtitle': 'Upload a photo of plant leaves to detect diseases and get treatment recommendations using AI.',
      'disease.dropzone.prompt': 'Drop your image here or click to browse',
      'disease.dropzone.supports': 'Supports JPG, PNG, WebP up to 10MB',
      'disease.dropzone.take_photo': 'Take Photo',
      'disease.dropzone.choose_file': 'Choose File',
      'disease.analyzing': 'Analyzing...',
      'disease.severity_label': '{{severity}} Severity',
      'disease.confidence_label': '{{confidence}}% Confidence',
      'disease.sections.symptoms': 'Symptoms',
      'disease.sections.causes': 'Common Causes',
      'disease.sections.treatments': 'Treatment Options',
      'disease.treatments.chemical': 'Chemical Treatment',
      'disease.treatments.organic': 'Organic Treatment',
      'disease.treatments.prevention': 'Prevention',
      'disease.error.invalid_file': 'Please select a valid image file',
      'disease.error.invalid_drop': 'Please drop a valid image file',
      'disease.error.no_image': 'Please select an image first',
      'disease.error.analysis_failed': 'Failed to analyze image. Please try again.',
      'disease.tts.detected': 'Disease detected: {{disease}} with {{confidence}}% confidence. Severity is {{severity}}.',
      
      // Marketplace
      'marketplace.title': 'Farmer Marketplace',
      'marketplace.sell': 'Sell Products',
      'marketplace.buy': 'Buy Products',
      'marketplace.price': 'Price',
      'marketplace.quantity': 'Quantity',
      'marketplace.subtitle': 'Connect directly with farmers and agricultural suppliers',
      'marketplace.search_placeholder': 'Search products...',
      'marketplace.filters': 'Filters',
      'marketplace.contact_seller': 'Contact Seller',
      'marketplace.sell_title': 'List Your Product',
      'marketplace.sell.product_title': 'Product Title',
      'marketplace.sell.category': 'Category',
      'marketplace.sell.category.vegetables': 'Vegetables',
      'marketplace.sell.category.fruits': 'Fruits',
      'marketplace.sell.category.grains': 'Grains',
      'marketplace.sell.category.equipment': 'Equipment',
      'marketplace.sell.price_hint': 'Price (₹/kg)',
      'marketplace.sell.quantity_hint': 'Quantity',
      'marketplace.sell.location': 'Location',
      'marketplace.sell.description': 'Description',
      'marketplace.sell.title_placeholder': 'e.g., Fresh Tomatoes',
      'marketplace.sell.location_placeholder': 'City, State',
      'marketplace.sell.description_placeholder': 'Describe your product...',
      'marketplace.sell.list_button': 'List Product',
      
      // Support
      'support.title': 'Government Support',
      'support.schemes': 'Available Schemes',
      'support.loans': 'NABARD Loans',
      'support.pmkisan': 'PM-KISAN',
      'support.pmfby': 'PMFBY Insurance',
      'support.subtitle': 'Access government schemes, loans, and support programs for farmers',
      'support.contact_support': 'Contact Support',
      'support.helpline': 'Helpline',
      'support.email': 'Email',
      'support.address': 'Address',
      'support.quick_apply_title': 'Quick Apply',
      'support.quick_apply_desc': 'Get assistance with scheme applications and documentation',
      'support.quick_apply_button': 'Schedule Consultation',
      'support.benefit_label': 'Benefit:',
      'support.eligibility_label': 'Eligibility:',
      
      // News
      'news.title': 'Agriculture News & Market Prices',
      'news.latest': 'Latest News',
      'news.prices': 'Market Prices',
      'news.subtitle': 'Stay updated with the latest agricultural news and market prices',
      'news.read_more': 'Read More',
      'news.current_prices': 'Current Market Prices',
'news.updated': 'Updated: {{date}}',
      
      // Weather
      'weather.title': 'Weather Conditions',
      'weather.temperature': 'Temperature',
      'weather.humidity': 'Humidity',
      'weather.rainfall': 'Rainfall',
      'weather.season': 'Season',
      
      // Forum
      'forum.title': 'Community Forum',
      'forum.post': 'Create Post',
      'forum.reply': 'Reply',
      'forum.expert': 'Expert Verified',
      'forum.subtitle': 'Connect with farmers, experts, and agricultural enthusiasts',
      'forum.categories': 'Categories',
      'forum.search_placeholder': 'Search discussions...',
      'forum.filter': 'Filter',
      'forum.replies': '{{count}} replies',
      'forum.expert_replied': 'Expert Replied',
'forum.load_more': 'Load More Posts',
      
      // Advisory
      'advisory.error.location_required': 'Please enter your location',
      'advisory.error.fetch_failed': 'Failed to get recommendations. Please try again.',
      'advisory.tts.top_rec': 'Top recommendation: {{crop}} with {{confidence}}% confidence',
      
      // Voice
      'voice.listening': 'Listening...',
      'voice.speak': 'Speak',
'voice.stop': 'Stop',
      // Status
      'status.online': 'Online',
      'status.offline': 'Offline',
    }
  },
  hi: {
    translation: {
      // Navigation
      'nav.home': 'होम',
      'nav.crop_advisory': 'फसल सलाहकार',
      'nav.disease_detection': 'रोग पहचान',
      'nav.marketplace': 'बाज़ार',
      'nav.support': 'सहायता',
      'nav.news': 'समाचार और मूल्य',
      'nav.forum': 'समुदाय',
      'nav.language': 'भाषा',
      
      // Common
      'common.submit': 'जमा करें',
      'common.cancel': 'रद्द करें',
      'common.loading': 'लोड हो रहा है...',
      'common.error': 'त्रुटि हुई',
      'common.success': 'सफलता',
      'common.upload': 'अपलोड',
      'common.search': 'खोजें',
'common.filter': 'फ़िल्टर',
      'common.or': 'या',
      'common.offline_banner': 'आप अभी ऑफ़लाइन हैं। कुछ सुविधाएँ सीमित हो सकती हैं।',
      'common.page_not_found': 'पृष्ठ नहीं मिला',
      'common.confidence_label': 'विश्वसनीयता:',
      'common.offline_title': 'ऑफ़लाइन मोड',
      'common.offline_sync_notice': 'आप अभी ऑफ़लाइन हैं। परिणाम ऑनलाइन होने पर सिंक कर दिए जाएंगे।',
      
      // Home page
      'home.title': 'AgriSeva में आपका स्वागत है',
      'home.subtitle': 'आपका स्मार्ट कृषि साथी',
      'home.description': 'विशेषज्ञ फसल सलाह, रोग पहचान और कृषि समुदाय से जुड़ें',
      'home.get_started': 'शुरू करें',
      'home.services_title': 'हमारी सेवाएं',
      'home.services_desc': 'किसानों को सूचित निर्णय लेने और उत्पादकता बढ़ाने में मदद के लिए व्यापक कृषि समाधान।',
      'home.learn_more': 'और जानें',
      'home.stats_title': 'भारत भर के किसानों को सशक्त बनाना',
      'stats.farmers_served': 'सेवा किए गए किसान',
      'stats.regional_languages': 'क्षेत्रीय भाषाएं',
      'stats.accuracy_rate': 'शुद्धता दर',
      'stats.support_available': 'सहायता उपलब्ध',
      'cta.title': 'क्या आप अपनी खेती में क्रांति लाने के लिए तैयार हैं?',
      'cta.desc': 'हजारों किसान पहले से ही AgriSeva का उपयोग कर रहे हैं अपनी पैदावार बढ़ाने और बेहतर निर्णय लेने के लिए।',
      'cta.advisory_button': 'फसल सलाह शुरू करें',
      'cta.detection_button': 'रोग पहचान आज़माएं',
      
      // Feature descriptions
      'feature.crop_advisory.desc': 'मिट्टी विश्लेषण और मौसम डेटा के आधार पर AI-संचालित फसल सिफारिशें प्राप्त करें',
      'feature.disease_detection.desc': 'रोगों की पहचान के लिए पत्तियों की तस्वीर अपलोड करें और उपचार सुझाव प्राप्त करें',
      'feature.marketplace.desc': 'हमारे किसान बाज़ार में कृषि उत्पाद खरीदें और बेचें',
      'feature.support.desc': 'सरकारी योजनाओं, ऋण और कृषि सहायता कार्यक्रमों तक पहुँचें',
      'feature.news.desc': 'नवीनतम कृषि समाचार और बाजार मूल्य से अपडेट रहें',
      'feature.forum.desc': 'अन्य किसानों और कृषि विशेषज्ञों से जुड़ें',
      
      // Crop Advisory
      'crop.title': 'फसल सलाहकार',
      'crop.soil_ph': 'मिट्टी का पीएच',
      'crop.nitrogen': 'नाइट्रोजन (N)',
      'crop.phosphorus': 'फास्फोरस (P)',
      'crop.potassium': 'पोटेशियम (K)',
      'crop.location': 'स्थान',
'crop.get_recommendation': 'सिफारिशें प्राप्त करें',
      'crop.subtitle': 'अपने मिट्टी विश्लेषण और स्थानीय मौसम के आधार पर AI संचालित फसल सिफारिशें प्राप्त करें।',
      'crop.form.title': 'मृदा विश्लेषण और स्थान',
      'crop.location_placeholder': 'जैसे, महाराष्ट्र, भारत',
      'crop.ph_scale.acidic': 'अम्लीय (4.0)',
      'crop.ph_scale.neutral': 'तटस्थ (7.0)',
      'crop.ph_scale.alkaline': 'क्षारीय (9.0)',
      'crop.results.title': 'फसल सिफारिशें',
      'crop.why': 'यह फसल क्यों?',
      'crop.fertilizer': 'अनुशंसित उर्वरक',
      'crop.pest_control': 'कीट नियंत्रण',
      'crop.practices': 'सर्वोत्तम अभ्यास',
      
      // Disease Detection
      'disease.title': 'AI रोग पहचान',
      'disease.upload_image': 'पत्ती की तस्वीर अपलोड करें',
      'disease.detect': 'रोग का पता लगाएं',
'disease.result': 'पहचान परिणाम',
      'disease.subtitle': 'पौधों की पत्तियों की फोटो अपलोड करें और AI की मदद से रोग पहचान और उपचार सुझाव प्राप्त करें।',
      'disease.dropzone.prompt': 'अपनी छवि यहाँ छोड़ें या ब्राउज़ करने के लिए क्लिक करें',
      'disease.dropzone.supports': 'JPG, PNG, WebP (अधिकतम 10MB) समर्थित',
      'disease.dropzone.take_photo': 'फोटो लें',
      'disease.dropzone.choose_file': 'फाइल चुनें',
      'disease.analyzing': 'विश्लेषण हो रहा है...',
      'disease.severity_label': '{{severity}} गंभीरता',
      'disease.confidence_label': '{{confidence}}% विश्वसनीयता',
      'disease.sections.symptoms': 'लक्षण',
      'disease.sections.causes': 'सामान्य कारण',
      'disease.sections.treatments': 'उपचार विकल्प',
      'disease.treatments.chemical': 'रासायनिक उपचार',
      'disease.treatments.organic': 'जैविक उपचार',
      'disease.treatments.prevention': 'रोकथाम',
      'disease.error.invalid_file': 'कृपया मान्य छवि फ़ाइल चुनें',
      'disease.error.invalid_drop': 'कृपया मान्य छवि फ़ाइल छोड़ें',
      'disease.error.no_image': 'कृपया पहले एक छवि चुनें',
      'disease.error.analysis_failed': 'छवि का विश्लेषण विफल रहा। कृपया पुनः प्रयास करें।',
      'disease.tts.detected': 'रोग पहचान: {{disease}} {{confidence}}% विश्वसनीयता के साथ। गंभीरता: {{severity}}.',
      
      // Marketplace
      'marketplace.title': 'किसान बाज़ार',
      'marketplace.sell': 'उत्पाद बेचें',
      'marketplace.buy': 'उत्पाद खरीदें',
      'marketplace.price': 'मूल्य',
      'marketplace.quantity': 'मात्रा',
      'marketplace.subtitle': 'किसानों और कृषि आपूर्तिकर्ताओं से सीधे जुड़ें',
      'marketplace.search_placeholder': 'उत्पाद खोजें...',
      'marketplace.filters': 'फ़िल्टर्स',
      'marketplace.contact_seller': 'विक्रेता से संपर्क करें',
      'marketplace.sell_title': 'अपना उत्पाद सूचीबद्ध करें',
      'marketplace.sell.product_title': 'उत्पाद शीर्षक',
      'marketplace.sell.category': 'श्रेणी',
      'marketplace.sell.category.vegetables': 'सब्जियाँ',
      'marketplace.sell.category.fruits': 'फल',
      'marketplace.sell.category.grains': 'अनाज',
      'marketplace.sell.category.equipment': 'उपकरण',
      'marketplace.sell.price_hint': 'मूल्य (₹/किलो)',
      'marketplace.sell.quantity_hint': 'मात्रा',
      'marketplace.sell.location': 'स्थान',
      'marketplace.sell.description': 'विवरण',
      'marketplace.sell.title_placeholder': 'जैसे, ताज़े टमाटर',
      'marketplace.sell.location_placeholder': 'शहर, राज्य',
      'marketplace.sell.description_placeholder': 'अपने उत्पाद का वर्णन करें...',
      'marketplace.sell.list_button': 'उत्पाद सूचीबद्ध करें',
      
      // Support
      'support.title': 'सरकारी सहायता',
      'support.schemes': 'उपलब्ध योजनाएं',
      'support.loans': 'नाबार्ड ऋण',
      'support.pmkisan': 'पीएम-किसान',
      'support.pmfby': 'पीएमएफबीवाई बीमा',
      'support.subtitle': 'किसानों के लिए सरकारी योजनाओं, ऋण और सहायता कार्यक्रमों तक पहुँचें',
      'support.contact_support': 'सहायता से संपर्क करें',
      'support.helpline': 'हेल्पलाइन',
      'support.email': 'ईमेल',
      'support.address': 'पता',
      'support.quick_apply_title': 'फौरन आवेदन',
      'support.quick_apply_desc': 'योजना आवेदन और दस्तावेज़ीकरण में सहायता प्राप्त करें',
      'support.quick_apply_button': 'परामर्श शेड्यूल करें',
      'support.benefit_label': 'लाभ:',
      'support.eligibility_label': 'पात्रता:',
      
      // News
      'news.title': 'कृषि समाचार और बाजार मूल्य',
      'news.latest': 'नवीनतम समाचार',
      'news.prices': 'बाजार मूल्य',
      'news.subtitle': 'नवीनतम कृषि समाचार और बाजार मूल्यों से अपडेट रहें',
      'news.read_more': 'और पढ़ें',
      'news.current_prices': 'वर्तमान बाजार मूल्य',
'news.updated': 'अपडेट किया गया: {{date}}',
      
      // Weather
      'weather.title': 'मौसम की स्थिति',
      'weather.temperature': 'तापमान',
      'weather.humidity': 'आर्द्रता',
      'weather.rainfall': 'वर्षा',
      'weather.season': 'ऋतु',
      
      // Forum
      'forum.title': 'सामुदायिक मंच',
      'forum.post': 'पोस्ट बनाएं',
      'forum.reply': 'उत्तर दें',
      'forum.expert': 'विशेषज्ञ सत्यापित',
      'forum.subtitle': 'किसानों, विशेषज्ञों और कृषि प्रेमियों से जुड़ें',
      'forum.categories': 'श्रेणियाँ',
      'forum.search_placeholder': 'चर्चा खोजें...',
      'forum.filter': 'फ़िल्टर',
      'forum.replies': '{{count}} उत्तर',
      'forum.expert_replied': 'विशेषज्ञ ने जवाब दिया',
'forum.load_more': 'अधिक पोस्ट लोड करें',
      
      // Advisory
      'advisory.error.location_required': 'कृपया अपना स्थान दर्ज करें',
      'advisory.error.fetch_failed': 'सिफारिशें प्राप्त नहीं हो सकीं। कृपया पुनः प्रयास करें।',
      'advisory.tts.top_rec': 'शीर्ष सिफारिश: {{crop}} {{confidence}}% विश्वसनीयता के साथ',
      
      // Voice
      'voice.listening': 'सुन रहा है...',
      'voice.speak': 'बोलें',
'voice.stop': 'रोकें',
      // Status
      'status.online': 'ऑनलाइन',
      'status.offline': 'ऑफलाइन',
    }
  },
  ta: {
    translation: {
      // Navigation
      'nav.home': 'முகப்பு',
      'nav.crop_advisory': 'பயிர் ஆலோசனை',
      'nav.disease_detection': 'நோய் கண்டறிதல்',
      'nav.marketplace': 'சந்தை',
      'nav.support': 'ஆதரவு',
      'nav.news': 'செய்திகள் & விலைகள்',
      'nav.forum': 'சமூகம்',
      'nav.language': 'மொழி',
      
      // Common
      'common.submit': 'சமர்ப்பிக்கவும்',
      'common.cancel': 'ரத்து செய்',
      'common.loading': 'ஏற்றுகிறது...',
      'common.error': 'பிழை ஏற்பட்டது',
      'common.success': 'வெற்றி',
      'common.upload': 'பதிவேற்றம்',
      'common.search': 'தேடல்',
      'common.filter': 'வடிகட்டி',
      
      // Home page
      'home.title': 'AgriSeva வில் உங்களை வரவேற்கிறோம்',
      'home.subtitle': 'உங்கள் புத்திசாலி விவசாய துணை',
      'home.description': 'நிபுணர் பயிர் ஆலோசனை, நோய் கண்டறிதல் மற்றும் விவசாய சமூகத்துடன் இணைக்கவும்',
      'home.get_started': 'தொடங்குங்கள்',
      
      // Common extras
      'common.or': 'அல்லது',
      'common.offline_banner': 'நீங்கள் தற்போது ஆஃப்லைனில் உள்ளீர்கள். சில வசதிகள் கட்டுப்படுத்தப்பட்டிருக்கலாம்.',
      'common.page_not_found': 'பக்கம் கிடைக்கவில்லை',
      'common.confidence_label': 'நம்பிக்கை:',
      'common.offline_title': 'ஆஃப்லைன் நிலை',
      'common.offline_sync_notice': 'நீங்கள் தற்போது ஆஃப்லைனில் உள்ளீர்கள். ஆன்லைனில் திரும்பும் போது முடிவுகள் ஒத்திசைக்கப்படும்.',

      // Status
      'status.online': 'ஆன்லைன்',
      'status.offline': 'ஆஃப்லைன்',

      // Crop Advisory extras
      'crop.subtitle': 'உங்கள் மண் பகுப்பாய்வு மற்றும் உள்ளூர் வானிலையை அடிப்படையாகக் கொண்டு AI சார்ந்த பயிர் பரிந்துரைகள் பெறுங்கள்.',
      'crop.form.title': 'மண் பகுப்பாய்வு & இடம்',
      'crop.location_placeholder': 'உ.தா., மகாராஷ்டிரா, இந்தியா',
      'crop.ph_scale.acidic': 'அமிலம் (4.0)',
      'crop.ph_scale.neutral': 'நடுநிலை (7.0)',
      'crop.ph_scale.alkaline': 'கார (9.0)',
      'crop.results.title': 'பயிர் பரிந்துரைகள்',
      'crop.why': 'இந்த பயிர் ஏன்?',
      'crop.fertilizer': 'பரிந்துரைக்கப்பட்ட உரம்',
      'crop.pest_control': 'பூச்சி கட்டுப்பாடு',
      'crop.practices': 'சிறந்த நடைமுறைகள்',

      // Weather
      'weather.title': 'வானிலை நிலை',
      'weather.temperature': 'வெப்பநிலை',
      'weather.humidity': 'ஈரப்பதம்',
      'weather.rainfall': 'மழைவீழ்ச்சி',
      'weather.season': 'காலம்',

      // Disease
      'disease.subtitle': 'தாவர இலைகளின் படத்தை பதிவேற்றவும்; AI உதவியுடன் நோயை கண்டறிந்து சிகிச்சை பரிந்துரைகள் பெறுங்கள்.',
      'disease.dropzone.prompt': 'உங்கள் படத்தை இங்கே இழுத்து விடுக அல்லது உலாவ அழுத்துக',
      'disease.dropzone.supports': 'JPG, PNG, WebP 10MB வரை ஆதரிக்கிறது',
      'disease.dropzone.take_photo': 'புகைப்படம் எடுக்க',
      'disease.dropzone.choose_file': 'கோப்பை தேர்ந்தெடுக்க',
      'disease.analyzing': 'பகுப்பாய்வு செய்கிறது...',
      'disease.severity_label': '{{severity}} தீவிரம்',
      'disease.confidence_label': '{{confidence}}% நம்பிக்கை',
      'disease.sections.symptoms': 'அறிகுறிகள்',
      'disease.sections.causes': 'பொதுவான காரணங்கள்',
      'disease.sections.treatments': 'சிகிச்சை விருப்பங்கள்',
      'disease.treatments.chemical': 'இரசாயன சிகிச்சை',
      'disease.treatments.organic': 'ஆர்கானிக் சிகிச்சை',
      'disease.treatments.prevention': 'தடுப்பு',
      'disease.error.invalid_file': 'சரியான படக் கோப்பைத் தேர்ந்தெடுக்கவும்',
      'disease.error.invalid_drop': 'சரியான படக் கோப்பை விடுக',
      'disease.error.no_image': 'முதலில் ஒரு படத்தைத் தேர்ந்தெடுக்கவும்',
      'disease.error.analysis_failed': 'படத்தை பகுப்பாய்வு செய்ய முடியவில்லை. தயவு செய்து மீண்டும் முயற்சிக்கவும்.',
      'disease.tts.detected': 'கண்டறியப்பட்ட நோய்: {{disease}} {{confidence}}% நம்பிக்கையுடன். தீவிரம்: {{severity}}.',

      // Marketplace
      'marketplace.subtitle': 'விவசாயிகளுடன் மற்றும் வேளாண் விநியோகஸ்தர்களுடன் நேரடியாக இணைக',
      'marketplace.search_placeholder': 'பொருட்களைத் தேடுங்கள்...',
      'marketplace.filters': 'வடிப்பான்கள்',
      'marketplace.contact_seller': 'விற்பவரை தொடர்பு கொள்',
      'marketplace.sell_title': 'உங்கள் தயாரிப்பை பட்டியலிடுங்கள்',
      'marketplace.sell.product_title': 'தயாரிப்பு தலைப்பு',
      'marketplace.sell.category': 'வகை',
      'marketplace.sell.category.vegetables': 'காய்கறிகள்',
      'marketplace.sell.category.fruits': 'பழங்கள்',
      'marketplace.sell.category.grains': 'தானியங்கள்',
      'marketplace.sell.category.equipment': 'கருவிகள்',
      'marketplace.sell.price_hint': 'விலை (₹/கி.கி.)',
      'marketplace.sell.quantity_hint': 'அளவு',
      'marketplace.sell.location': 'இடம்',
      'marketplace.sell.description': 'விளக்கம்',
      'marketplace.sell.title_placeholder': 'உ.தா., புதிய தக்காளி',
      'marketplace.sell.location_placeholder': 'நகரம், மாநிலம்',
      'marketplace.sell.description_placeholder': 'உங்கள் தயாரிப்பை விவரிக்கவும்...',
      'marketplace.sell.list_button': 'தயாரிப்பை பட்டியலிடு',

      // News
      'news.subtitle': 'சமீபத்திய வேளாண்மை செய்திகள் மற்றும் சந்தை விலைகளுடன் இணைந்திருங்கள்',
      'news.read_more': 'மேலும் படிக்க',
      'news.current_prices': 'தற்போதைய சந்தை விலைகள்',
      'news.updated': 'புதுப்பிக்கப்பட்டது: {{date}}',

      // Support
      'support.subtitle': 'அரசு திட்டங்கள், கடன்கள் மற்றும் ஆதரவுகளை அணுகவும்',
      'support.contact_support': 'ஆதரவுடன் தொடர்புகொள்ளவும்',
      'support.helpline': 'உதவி எண்',
      'support.email': 'மின்னஞ்சல்',
      'support.address': 'முகவரி',
      'support.quick_apply_title': 'விரைவு விண்ணப்பம்',
      'support.quick_apply_desc': 'திட்ட விண்ணப்பங்கள் மற்றும் ஆவணங்களுக்கு உதவி பெறுங்கள்',
      'support.quick_apply_button': 'ஆலோசனையை நிர்ணயிக்கவும்',
      'support.benefit_label': 'பலன்:',
      'support.eligibility_label': 'தகுதி:',

      // Forum
      'forum.subtitle': 'விவசாயிகள், நிபுணர்கள் மற்றும் ஆர்வலர்களுடன் இணைக',
      'forum.categories': 'வகைகள்',
      'forum.search_placeholder': 'விவாதங்களைத் தேடுங்கள்...',
      'forum.filter': 'வடிகட்டி',
      'forum.replies': '{{count}} பதில்கள்',
      'forum.expert_replied': 'நிபுணர் பதிலளித்தார்',
      'forum.load_more': 'மேலும் பதிவுகளை ஏற்று',

      // Advisory
      'advisory.error.location_required': 'தயவு செய்து உங்கள் இடத்தை உள்ளிடவும்',
      'advisory.error.fetch_failed': 'பரிந்துரைகளை பெற முடியவில்லை. மீண்டும் முயற்சிக்கவும்.',
      'advisory.tts.top_rec': 'சிறந்த பரிந்துரை: {{crop}} {{confidence}}% நம்பிக்கையுடன்'
    }
  },
  te: {
    translation: {
      // Navigation
      'nav.home': 'ముఖపుట',
      'nav.crop_advisory': 'పంట సలహా',
      'nav.disease_detection': 'వ్యాధి గుర్తింపు',
      'nav.marketplace': 'మార్కెట్‌ప్లేస్',
      'nav.support': 'మద్దతు',
      'nav.news': 'వార్తలు & ధరలు',
      'nav.forum': 'సంఘం',
      'nav.language': 'భాష',
      
      // Common extras
      'common.or': 'లేదా',
      'common.offline_banner': 'మీరు ప్రస్తుతం ఆఫ్‌లైన్‌లో ఉన్నారు. కొన్ని ఫీచర్లు పరిమితం కావచ్చు.',
      'common.page_not_found': 'పేజీ కనబడలేదు',
      'common.confidence_label': 'నమ్మకం:',
      'common.offline_title': 'ఆఫ్‌లైన్ మోడ్',
      'common.offline_sync_notice': 'మీరు ఇప్పుడు ఆఫ్‌లైన్‌లో ఉన్నారు. ఫలితాలు ఆన్‌లైన్ అయిన తర్వాత సింక్ అవుతాయి.',

      // Status
      'status.online': 'ఆన్‌లైన్',
      'status.offline': 'ఆఫ్‌లైన్',

      // Crop
      'crop.subtitle': 'మీ మట్టి విశ్లేషణ మరియు స్థానిక వాతావరణాన్ని ఆధారంగా AI పంట సిఫారసులు పొందండి.',
      'crop.form.title': 'మట్టి విశ్లేషణ & స్థానం',
      'crop.location_placeholder': 'ఉదా., మహారాష్ట్ర, ఇండియా',
      'crop.ph_scale.acidic': 'ఆమ్ల (4.0)',
      'crop.ph_scale.neutral': 'న్యూట్రల్ (7.0)',
      'crop.ph_scale.alkaline': 'క్షార (9.0)',
      'crop.results.title': 'పంట సిఫారసులు',
      'crop.why': 'ఈ పంట ఎందుకు?',
      'crop.fertilizer': 'సిఫారసు చేసిన ఎరువు',
      'crop.pest_control': 'పురుగుల నియంత్రణ',
      'crop.practices': 'ఉత్తమ పద్ధతులు',

      // Weather
      'weather.title': 'వాతావరణ పరిస్థితులు',
      'weather.temperature': 'ఉష్ణోగ్రత',
      'weather.humidity': 'ఆర్ద్రత',
      'weather.rainfall': 'వర్షపాతం',
      'weather.season': 'ఋతువు',

      // Disease
      'disease.subtitle': 'ఆకు ఫోటోను అప్లోడ్ చేసి AI సహాయంతో వ్యాధి గుర్తింపు మరియు చికిత్స సూచనలు పొందండి.',
      'disease.dropzone.prompt': 'చిత్రాన్ని ఇక్కడ పడవేయండి లేదా బ్రౌజ్ చేయడానికి క్లిక్ చేయండి',
      'disease.dropzone.supports': 'JPG, PNG, WebP 10MB వరకు సపోర్ట్',
      'disease.dropzone.take_photo': 'ఫోటో తీయండి',
      'disease.dropzone.choose_file': 'ఫైల్ ఎంచుకోండి',
      'disease.analyzing': 'విశ్లేషిస్తోంది...',
      'disease.severity_label': '{{severity}} తీవ్రత',
      'disease.confidence_label': '{{confidence}}% నమ్మకం',
      'disease.sections.symptoms': 'లక్షణాలు',
      'disease.sections.causes': 'సాధారణ కారణాలు',
      'disease.sections.treatments': 'చికిత్స ఎంపికలు',
      'disease.treatments.chemical': 'రసాయన చికిత్స',
      'disease.treatments.organic': 'సజీవ చికిత్స',
      'disease.treatments.prevention': 'నిరోధం',
      'disease.error.invalid_file': 'దయచేసి సరైన చిత్రాన్ని ఎంచుకోండి',
      'disease.error.invalid_drop': 'దయచేసి సరైన చిత్రాన్ని వదలండి',
      'disease.error.no_image': 'ముందుగా ఒక చిత్రాన్ని ఎంచుకోండి',
      'disease.error.analysis_failed': 'విశ్లేషణ విఫలమైంది. దయచేసి మళ్లీ ప్రయత్నించండి.',
      'disease.tts.detected': 'గుర్తించిన వ్యాధి: {{disease}} {{confidence}}% నమ్మకంతో. తీవ్రత: {{severity}}.',

      // Marketplace
      'marketplace.subtitle': 'రైతులు మరియు సరఫరాదారులతో నేరుగా కలుపుకోండి',
      'marketplace.search_placeholder': 'ఉత్పత్తులను వెతకండి...',
      'marketplace.filters': 'ఫిల్టర్లు',
      'marketplace.contact_seller': 'అమ్మేవారిని సంప్రదించండి',
      'marketplace.sell_title': 'మీ ఉత్పత్తిని జాబితా చేయండి',
      'marketplace.sell.product_title': 'ఉత్పత్తి శీర్షిక',
      'marketplace.sell.category': 'వర్గం',
      'marketplace.sell.category.vegetables': 'కూరగాయలు',
      'marketplace.sell.category.fruits': 'పండ్లు',
      'marketplace.sell.category.grains': 'ధాన్యాలు',
      'marketplace.sell.category.equipment': 'పరికరాలు',
      'marketplace.sell.price_hint': 'ధర (₹/కిలో)',
      'marketplace.sell.quantity_hint': 'పరిమాణం',
      'marketplace.sell.location': 'స్థానం',
      'marketplace.sell.description': 'వివరణ',
      'marketplace.sell.title_placeholder': 'ఉదా., తాజా టమోటాలు',
      'marketplace.sell.location_placeholder': 'నగరం, రాష్ట్రం',
      'marketplace.sell.description_placeholder': 'మీ ఉత్పత్తిని వివరించండి...',
      'marketplace.sell.list_button': 'ఉత్పత్తిని జాబితా చేయండి',

      // News
      'news.subtitle': 'వ్యవసాయ వార్తలు మరియు మార్కెట్ ధరలతో అప్డేట్‌గా ఉండండి',
      'news.read_more': 'ఇంకా చదవండి',
      'news.current_prices': 'ప్రస్తుత మార్కెట్ ధరలు',
      'news.updated': 'అప్డేట్: {{date}}',

      // Support
      'support.subtitle': 'ప్రభుత్వ పథకాలు, రుణాలు మరియు మద్దతును పొందండి',
      'support.contact_support': 'సపోర్ట్‌ను సంప్రదించండి',
      'support.helpline': 'హెల్ప్‌లైన్',
      'support.email': 'ఈమెయిల్',
      'support.address': 'చిరునామా',
      'support.quick_apply_title': 'త్వరిత దరఖాస్తు',
      'support.quick_apply_desc': 'పథక దరఖాస్తులు మరియు డాక్యుమెంటేషన్‌కు సహాయం పొందండి',
      'support.quick_apply_button': 'సలహా షెడ్యూల్ చేయండి',
      'support.benefit_label': 'లాభం:',
      'support.eligibility_label': 'అర్హత:',

      // Forum
      'forum.subtitle': 'రైతులు, నిపుణులు మరియు అభిరుచి గలవారితో కలుపుకోండి',
      'forum.categories': 'వర్గాలు',
      'forum.search_placeholder': 'చర్చలను వెతకండి...',
      'forum.filter': 'ఫిల్టర్',
      'forum.replies': '{{count}} ప్రత్యుత్తరాలు',
      'forum.expert_replied': 'నిపుణుల సమాధానం',
      'forum.load_more': 'ఇంకా పోస్టులను లోడ్ చేయండి',

      // Advisory
      'advisory.error.location_required': 'దయచేసి మీ స్థలాన్ని నమోదు చేయండి',
      'advisory.error.fetch_failed': 'సిఫారసులు పొందడంలో విఫలమైంది. మళ్లీ ప్రయత్నించండి.',
      'advisory.tts.top_rec': 'టాప్ సిఫారసు: {{crop}} {{confidence}}% నమ్మకంతో'
    }
  },
  kn: {
    translation: {
      // Navigation
      'nav.home': 'ಮನೆ',
      'nav.crop_advisory': 'ಬೆಳೆ ಸಲಹೆ',
      'nav.disease_detection': 'ರೋಗ ಪತ್ತೆ',
      'nav.marketplace': 'ಮಾರುಕಟ್ಟೆ',
      'nav.support': 'ಬೆಂಬಲ',
      'nav.news': 'ಸುದ್ದಿ & ಬೆಲೆಗಳು',
      'nav.forum': 'ಸಮುದಾಯ',
      'nav.language': 'ಭಾಷೆ',
      
      // Common extras
      'common.or': 'ಅಥವಾ',
      'common.offline_banner': 'ನೀವು ಪ್ರಸ್ತುತ ಆಫ್‌ಲೈನ್‌ನಲ್ಲಿದ್ದೀರಿ. ಕೆಲವು ವೈಶಿಷ್ಟ್ಯಗಳು ಸೀಮಿತವಾಗಿರಬಹುದು.',
      'common.page_not_found': 'ಪುಟ ಕಂಡುಬಂದಿಲ್ಲ',
      'common.confidence_label': 'ವಿಶ್ವಾಸ:',
      'common.offline_title': 'ಆಫ್‌ಲೈನ್ ಮೋಡ್',
      'common.offline_sync_notice': 'ನೀವು ಈಗ ಆಫ್‌ಲೈನ್. ಆನ್‌ಲೈನ್ ಆದಾಗ ಫಲಿತಾಂಶಗಳು ಸಿಂಕ್ ಆಗುತ್ತವೆ.',

      // Status
      'status.online': 'ಆನ್‍ಲೈನ್',
      'status.offline': 'ಆಫ್‍ಲೈನ್',

      // Crop
      'crop.subtitle': 'ನಿಮ್ಮ ಮಣ್ಣು ವಿಶ್ಲೇಷಣೆ ಮತ್ತು ಸ್ಥಳೀಯ ಹವಾಮಾನ ಆಧಾರಿತ AI ಬೆಳೆ ಶಿಫಾರಸುಗಳು.',
      'crop.form.title': 'ಮಣ್ಣು ವಿಶ್ಲೇಷಣೆ & ಸ್ಥಳ',
      'crop.location_placeholder': 'ಉದಾ., ಮಹಾರಾಷ್ಟ್ರ, ಭಾರತ',
      'crop.ph_scale.acidic': 'ಆಮ್ಲ (4.0)',
      'crop.ph_scale.neutral': 'ನ್ಯೂಟ್ರಲ್ (7.0)',
      'crop.ph_scale.alkaline': 'ಕ್ಷಾರ (9.0)',
      'crop.results.title': 'ಬೆಳೆ ಶಿಫಾರಸುಗಳು',
      'crop.why': 'ಈ ಬೆಳೆ ಯಾಕೆ?',
      'crop.fertilizer': 'ಶಿಫಾರಸು ಮಾಡಲಾದ ರಸಗೊಬ್ಬರ',
      'crop.pest_control': 'ಹುಳು ನಿಯಂತ್ರಣ',
      'crop.practices': 'ಉತ್ತಮ ಅಭ್ಯಾಸಗಳು',

      // Weather
      'weather.title': 'ಹವಾಮಾನ ಪರಿಸ್ಥಿತಿಗಳು',
      'weather.temperature': 'ತಾಪಮಾನ',
      'weather.humidity': 'ಆರ್ದ್ರತೆ',
      'weather.rainfall': 'ವರ್ಷಾಪಾತ',
      'weather.season': 'ಋತು',

      // Disease
      'disease.subtitle': 'ಎಲೆ ಚಿತ್ರದನ್ನ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ; AI ಮೂಲಕ ರೋಗ ಪತ್ತೆ ಮತ್ತು ಚಿಕಿತ್ಸೆ ಸಲಹೆಗಳು ಪಡೆಯಿರಿ.',
      'disease.dropzone.prompt': 'ನಿಮ್ಮ ಚಿತ್ರವನ್ನು ಇಲ್ಲಿ ಬಿಡಿ ಅಥವಾ ಬ್ರೌಸ್ ಮಾಡಲು ಕ್ಲಿಕ್ ಮಾಡಿ',
      'disease.dropzone.supports': 'JPG, PNG, WebP 10MB ವರೆಗೆ',
      'disease.dropzone.take_photo': 'ಫೋಟೋ ತೆಗೆಯಿರಿ',
      'disease.dropzone.choose_file': 'ಕಡತವನ್ನು ಆಯ್ಕೆಮಾಡಿ',
      'disease.analyzing': 'ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...',
      'disease.severity_label': '{{severity}} ತೀವ್ರತೆ',
      'disease.confidence_label': '{{confidence}}% ವಿಶ್ವಾಸ',
      'disease.sections.symptoms': 'ಲಕ್ಷಣಗಳು',
      'disease.sections.causes': 'ಸಾಮಾನ್ಯ ಕಾರಣಗಳು',
      'disease.sections.treatments': 'ಚಿಕಿತ್ಸಾ ಆಯ್ಕೆಗಳು',
      'disease.treatments.chemical': 'ರಾಸಾಯನಿಕ ಚಿಕಿತ್ಸೆ',
      'disease.treatments.organic': 'ಸಾವಯವ ಚಿಕಿತ್ಸೆ',
      'disease.treatments.prevention': 'ತಡೆಗಟ್ಟುವಿಕೆ',
      'disease.error.invalid_file': 'ದಯವಿಟ್ಟು ಸರಿಯಾದ ಚಿತ್ರದನ್ನ ಆಯ್ಕೆಮಾಡಿ',
      'disease.error.invalid_drop': 'ದಯವಿಟ್ಟು ಸರಿಯಾದ ಚಿತ್ರವನ್ನು ಬಿಡಿ',
      'disease.error.no_image': 'ಮೊದಲು ಒಂದು ಚಿತ್ರವನ್ನು ಆಯ್ಕೆಮಾಡಿ',
      'disease.error.analysis_failed': 'ವಿಶ್ಲೇಷಣೆ ವಿಫಲವಾಗಿದೆ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.',
      'disease.tts.detected': 'ಪತ್ತೆಯಾದ ರೋಗ: {{disease}} {{confidence}}% ವಿಶ್ವಾಸದೊಂದಿಗೆ. ತೀವ್ರತೆ: {{severity}}.',

      // Marketplace
      'marketplace.subtitle': 'ರೈತರು ಮತ್ತು ಪೂರೈಕೆದಾರರ ಜೊತೆ ನೇರವಾಗಿ ಸಂಪರ್ಕಿಸಿ',
      'marketplace.search_placeholder': 'ಉತ್ಪನ್ನಗಳನ್ನು ಹುಡುಕಿ...',
      'marketplace.filters': 'ಫಿಲ್ಟರ್‌ಗಳು',
      'marketplace.contact_seller': 'ಮಾರಾಟಗಾರರನ್ನು ಸಂಪರ್ಕಿಸಿ',
      'marketplace.sell_title': 'ನಿಮ್ಮ ಉತ್ಪನ್ನವನ್ನು ಪಟ್ಟಿ ಮಾಡಿ',
      'marketplace.sell.product_title': 'ಉತ್ಪನ್ನ ಶೀರ್ಷಿಕೆ',
      'marketplace.sell.category': 'ವರ್ಗ',
      'marketplace.sell.category.vegetables': 'ತರಕಾರಿಗಳು',
      'marketplace.sell.category.fruits': 'ಹಣ್ಣುಗಳು',
      'marketplace.sell.category.grains': 'ಧಾನ್ಯಗಳು',
      'marketplace.sell.category.equipment': 'ಉಪಕರಣಗಳು',
      'marketplace.sell.price_hint': 'ಬೆಲೆ (₹/ಕೆಜಿ)',
      'marketplace.sell.quantity_hint': 'ಪ್ರಮಾಣ',
      'marketplace.sell.location': 'ಸ್ಥಳ',
      'marketplace.sell.description': 'ವಿವರಣೆ',
      'marketplace.sell.title_placeholder': 'ಉದಾ., ತಾಜಾ ಟೊಮೇಟೊ',
      'marketplace.sell.location_placeholder': 'ನಗರ, ರಾಜ್ಯ',
      'marketplace.sell.description_placeholder': 'ನಿಮ್ಮ ಉತ್ಪನ್ನವನ್ನು ವಿವರಿಸಿ...',
      'marketplace.sell.list_button': 'ಉತ್ಪನ್ನವನ್ನು ಪಟ್ಟಿ ಮಾಡಿ',

      // News
      'news.subtitle': 'ಕೃಷಿ ಸುದ್ದಿ ಮತ್ತು ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳೊಂದಿಗೆ ಅಪ್ಡೇಟ್ ಆಗಿರಿ',
      'news.read_more': 'ಮತ್ತಷ್ಟು ಓದಿ',
      'news.current_prices': 'ಪ್ರಸ್ತುತ ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು',
      'news.updated': 'ಅಪ್ಡೇಟ್: {{date}}',

      // Support
      'support.subtitle': 'ಸರಕಾರದ ಯೋಜನೆಗಳು, ಸಾಲಗಳು ಮತ್ತು ಬೆಂಬಲವನ್ನು ಪಡೆಯಿರಿ',
      'support.contact_support': 'ಸಹಾಯವನ್ನು ಸಂಪರ್ಕಿಸಿ',
      'support.helpline': 'ಹೆಲ್ಪ್‌ಲೈನ್',
      'support.email': 'ಇಮೇಲ್',
      'support.address': 'ವಿಳಾಸ',
      'support.quick_apply_title': 'ತ್ವರಿತ ಅರ್ಜಿ',
      'support.quick_apply_desc': 'ಯೋಜನೆ ಅರ್ಜಿಗಳು ಮತ್ತು ದಾಖಲೆಗಳಿಗೆ ಸಹಾಯ ಪಡೆಯಿರಿ',
      'support.quick_apply_button': 'ಸಲಹೆಯನ್ನು ನಿಯೋಜಿಸಿ',
      'support.benefit_label': 'ಪ್ರಯೋಜನ:',
      'support.eligibility_label': 'ಅರ್ಹತೆ:',

      // Forum
      'forum.subtitle': 'ರೈತರು, ಪರಿಣಿತರೊಂದಿಗೆ ಮತ್ತು ಆಸಕ್ತರೊಂದಿಗೆ ಸಂಪರ್ಕಿಸಿ',
      'forum.categories': 'ವರ್ಗಗಳು',
      'forum.search_placeholder': 'ಚರ್ಚೆಗಳನ್ನು ಹುಡುಕಿ...',
      'forum.filter': 'ಫಿಲ್ಟರ್',
      'forum.replies': '{{count}} ಪ್ರತಿಕ್ರಿಯೆಗಳು',
      'forum.expert_replied': 'ಪರಿಣಿತರಿಂದ ಉತ್ತರ',
      'forum.load_more': 'ಇನ್ನಷ್ಟು ಪೋಸ್ಟ್‌ಗಳನ್ನು ಲೋಡ್ ಮಾಡಿ',

      // Advisory
      'advisory.error.location_required': 'ದಯವಿಟ್ಟು ನಿಮ್ಮ ಸ್ಥಳವನ್ನು ನಮೂದಿಸಿ',
      'advisory.error.fetch_failed': 'ಶಿಫಾರಸುಗಳನ್ನು ಪಡೆಯಲು ವಿಫಲವಾಗಿದೆ. ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.',
      'advisory.tts.top_rec': 'ಟಾಪ್ ಶಿಫಾರಸು: {{crop}} {{confidence}}% ವಿಶ್ವಾಸದೊಂದಿಗೆ'
    }
  },
  mr: {
    translation: {
      // Navigation
      'nav.home': 'मुख्यपृष्ठ',
      'nav.crop_advisory': 'पीक सल्लागार',
      'nav.disease_detection': 'रोग ओळख',
      'nav.marketplace': 'बाजारपेठ',
      'nav.support': 'समर्थन',
      'nav.news': 'बातम्या आणि किमती',
      'nav.forum': 'समुदाय',
      'nav.language': 'भाषा',
      
      // Common extras
      'common.or': 'किंवा',
      'common.offline_banner': 'आपण सध्या ऑफलाइन आहात. काही सुविधा मर्यादित असू शकतात.',
      'common.page_not_found': 'पृष्ठ सापडले नाही',
      'common.confidence_label': 'विश्वास:',
      'common.offline_title': 'ऑफलाइन मोड',
      'common.offline_sync_notice': 'आपण ऑफलाइन आहात. निकाल ऑनलाइन झाल्यावर समक्रमित केले जातील.',

      // Status
      'status.online': 'ऑनलाइन',
      'status.offline': 'ऑफलाइन',

      // Crop
      'crop.subtitle': 'आपल्या मातीच्या विश्लेषण आणि स्थानिक हवामानावर आधारित AI पिक शिफारसी मिळवा.',
      'crop.form.title': 'मृदा विश्लेषण आणि स्थान',
      'crop.location_placeholder': 'उदा., महाराष्ट्र, भारत',
      'crop.ph_scale.acidic': 'आम्ल (4.0)',
      'crop.ph_scale.neutral': 'तटस्थ (7.0)',
      'crop.ph_scale.alkaline': 'क्षारीय (9.0)',
      'crop.results.title': 'पिक शिफारसी',
      'crop.why': 'हे पीक का?',
      'crop.fertilizer': 'शिफारसीय खते',
      'crop.pest_control': 'किड नियंत्रण',
      'crop.practices': 'सर्वोत्तम पद्धती',

      // Weather
      'weather.title': 'हवामान स्थिती',
      'weather.temperature': 'तापमान',
      'weather.humidity': 'आर्द्रता',
      'weather.rainfall': 'पर्जन्य',
      'weather.season': 'ऋतू',

      // Disease
      'disease.subtitle': 'वनस्पतींच्या पानांचा फोटो अपलोड करा आणि AI च्या मदतीने रोग ओळख आणि उपचार सुचना मिळवा.',
      'disease.dropzone.prompt': 'आपला फोटो येथे सोडा किंवा ब्राउझ करण्यासाठी क्लिक करा',
      'disease.dropzone.supports': 'JPG, PNG, WebP 10MB पर्यंत',
      'disease.dropzone.take_photo': 'फोटो काढा',
      'disease.dropzone.choose_file': 'फाइल निवडा',
      'disease.analyzing': 'विश्लेषण चालू आहे...',
      'disease.severity_label': '{{severity}} तीव्रता',
      'disease.confidence_label': '{{confidence}}% विश्वास',
      'disease.sections.symptoms': 'लक्षणे',
      'disease.sections.causes': 'सामान्य कारणे',
      'disease.sections.treatments': 'उपचार पर्याय',
      'disease.treatments.chemical': 'रासायनिक उपचार',
      'disease.treatments.organic': 'सेंद्रिय उपचार',
      'disease.treatments.prevention': 'प्रतिबंध',
      'disease.error.invalid_file': 'कृपया वैध फोटो निवडा',
      'disease.error.invalid_drop': 'कृपया वैध फोटो सोडा',
      'disease.error.no_image': 'कृपया प्रथम फोटो निवडा',
      'disease.error.analysis_failed': 'विश्लेषण अयशस्वी. कृपया पुन्हा प्रयत्न करा.',
      'disease.tts.detected': 'ओळखलेला रोग: {{disease}} {{confidence}}% विश्वासाने. तीव्रता: {{severity}}.',

      // Marketplace
      'marketplace.subtitle': 'शेतकरी आणि पुरवठादारांशी थेट कनेक्ट व्हा',
      'marketplace.search_placeholder': 'उत्पादने शोधा...',
      'marketplace.filters': 'फिल्टर्स',
      'marketplace.contact_seller': 'विक्रेत्याशी संपर्क करा',
      'marketplace.sell_title': 'आपला उत्पाद सूचीबद्ध करा',
      'marketplace.sell.product_title': 'उत्पादन शीर्षक',
      'marketplace.sell.category': 'वर्ग',
      'marketplace.sell.category.vegetables': 'भाज्या',
      'marketplace.sell.category.fruits': 'फळे',
      'marketplace.sell.category.grains': 'धान्ये',
      'marketplace.sell.category.equipment': 'साधने',
      'marketplace.sell.price_hint': 'किंमत (₹/किलो)',
      'marketplace.sell.quantity_hint': 'प्रमाण',
      'marketplace.sell.location': 'स्थान',
      'marketplace.sell.description': 'वर्णन',
      'marketplace.sell.title_placeholder': 'उदा., ताजी टोमॅटो',
      'marketplace.sell.location_placeholder': 'शहर, राज्य',
      'marketplace.sell.description_placeholder': 'आपल्या उत्पादनाचे वर्णन करा...',
      'marketplace.sell.list_button': 'उत्पादन सूचीबद्ध करा',

      // News
      'news.subtitle': 'ताज्या कृषी बातम्या आणि बाजार भावांसह अद्ययावत रहा',
      'news.read_more': 'अधिक वाचा',
      'news.current_prices': 'सध्याचे बाजार भाव',
      'news.updated': 'अद्ययावत: {{date}}',

      // Support
      'support.subtitle': 'सरकारी योजना, कर्जे आणि समर्थन मिळवा',
      'support.contact_support': 'समर्थनाशी संपर्क करा',
      'support.helpline': 'हेल्पलाइन',
      'support.email': 'ईमेल',
      'support.address': 'पत्ता',
      'support.quick_apply_title': 'झटपट अर्ज',
      'support.quick_apply_desc': 'योजना अर्ज आणि दस्तऐवजांसाठी मदत घ्या',
      'support.quick_apply_button': 'सलाह वेळ ठरवा',
      'support.benefit_label': 'फायदा:',
      'support.eligibility_label': 'पात्रता:',

      // Forum
      'forum.subtitle': 'शेतकरी, तज्ञ आणि उत्साही लोकांशी कनेक्ट व्हा',
      'forum.categories': 'वर्ग',
      'forum.search_placeholder': 'चर्चा शोधा...',
      'forum.filter': 'फिल्टर',
      'forum.replies': '{{count}} प्रत्युत्तरे',
      'forum.expert_replied': 'तज्ञांनी उत्तर दिले',
      'forum.load_more': 'अधिक पोस्ट लोड करा',

      // Advisory
      'advisory.error.location_required': 'कृपया आपले स्थान प्रविष्ट करा',
      'advisory.error.fetch_failed': 'शिफारसी मिळवण्यात अयशस्वी. पुन्हा प्रयत्न करा.',
      'advisory.tts.top_rec': 'शीर्ष शिफारस: {{crop}} {{confidence}}% विश्वासाने'
    }
  },
  pa: {
    translation: {
      // Navigation
      'nav.home': 'ਘਰ',
      'nav.crop_advisory': 'ਫਸਲ ਸਲਾਹ',
      'nav.disease_detection': 'ਬੀਮਾਰੀ ਪਛਾਣ',
      'nav.marketplace': 'ਬਾਜ਼ਾਰ',
      'nav.support': 'ਸਹਾਇਤਾ',
      'nav.news': 'ਖਬਰਾਂ ਅਤੇ ਕੀਮਤਾਂ',
      'nav.forum': 'ਕਮਿਉਨਿਟੀ',
      'nav.language': 'ਭਾਸ਼ਾ',
      
      // Common extras
      'common.or': 'ਜਾਂ',
      'common.offline_banner': 'ਤੁਸੀਂ ਇਸ ਵੇਲੇ ਆਫਲਾਈਨ ਹੋ। ਕੁਝ ਫੀਚਰ ਸੀਮਿਤ ਹੋ ਸਕਦੇ ਹਨ।',
      'common.page_not_found': 'ਪੰਨਾ ਨਹੀਂ ਮਿਲਿਆ',
      'common.confidence_label': 'ਭਰੋਸਾ:',
      'common.offline_title': 'ਆਫਲਾਈਨ ਮੋਡ',
      'common.offline_sync_notice': 'ਤੁਸੀਂ ਹੁਣ ਆਫਲਾਈਨ ਹੋ। ਨਤੀਜੇ ਆਨਲਾਈਨ ਹੋਣ ’ਤੇ ਸਿੰਕ ਹੋ ਜਾਣਗੇ।',

      // Status
      'status.online': 'ਆਨਲਾਈਨ',
      'status.offline': 'ਆਫਲਾਈਨ',

      // Crop
      'crop.subtitle': 'ਤੁਹਾਡੇ ਮਿੱਟੀ ਵਿਸ਼ਲੇਸ਼ਣ ਅਤੇ ਸਥਾਨਕ ਮੌਸਮ ਦੇ ਆਧਾਰ ’ਤੇ AI ਫ਼ਸਲ ਸਿਫ਼ਾਰਸ਼ਾਂ ਪ੍ਰਾਪਤ ਕਰੋ।',
      'crop.form.title': 'ਮਿੱਟੀ ਵਿਸ਼ਲੇਸ਼ਣ ਅਤੇ ਸਥਾਨ',
      'crop.location_placeholder': 'ਜਿਵੇਂ, ਮਹਾਰਾਸ਼ਟਰ, ਭਾਰਤ',
      'crop.ph_scale.acidic': 'ਅਮਲੀ (4.0)',
      'crop.ph_scale.neutral': 'ਨਿਰਪੱਖ (7.0)',
      'crop.ph_scale.alkaline': 'ਖਾਰਾ (9.0)',
      'crop.results.title': 'ਫ਼ਸਲ ਸਿਫ਼ਾਰਸ਼ਾਂ',
      'crop.why': 'ਇਹ ਫ਼ਸਲ ਕਿਉਂ?',
      'crop.fertilizer': 'ਸਿਫ਼ਾਰਸ਼ੀ ਖਾਦ',
      'crop.pest_control': 'ਕੀਟ ਨਿਯੰਤਰਣ',
      'crop.practices': 'ਸਭ ਤੋਂ ਵਧੀਆ ਅਭਿਆਸ',

      // Weather
      'weather.title': 'ਮੌਸਮ ਹਾਲਾਤ',
      'weather.temperature': 'ਤਾਪਮਾਨ',
      'weather.humidity': 'ਆਰਦ੍ਰਤਾ',
      'weather.rainfall': 'ਵਰਖਾ',
      'weather.season': 'ਮੌਸਮ',

      // Disease
      'disease.subtitle': 'ਪੌਧੇ ਦੇ ਪੱਤਿਆਂ ਦੀ ਤਸਵੀਰ ਅੱਪਲੋਡ ਕਰੋ ਅਤੇ AI ਦੀ ਮਦਦ ਨਾਲ ਬੀਮਾਰੀ ਦੀ ਪਛਾਣ ਅਤੇ ਇਲਾਜ਼ ਸਿਫ਼ਾਰਸ਼ਾਂ ਪ੍ਰਾਪਤ ਕਰੋ।',
      'disease.dropzone.prompt': 'ਆਪਣੀ ਤਸਵੀਰ ਇੱਥੇ ਛੱਡੋ ਜਾਂ ਬ੍ਰਾਊਜ਼ ਕਰਨ ਲਈ ਕਲਿੱਕ ਕਰੋ',
      'disease.dropzone.supports': 'JPG, PNG, WebP 10MB ਤੱਕ',
      'disease.dropzone.take_photo': 'ਫੋਟੋ ਖਿੱਚੋ',
      'disease.dropzone.choose_file': 'ਫਾਇਲ ਚੁਣੋ',
      'disease.analyzing': 'ਵਿਸ਼ਲੇਸ਼ਣ ਜਾਰੀ ਹੈ...',
      'disease.severity_label': '{{severity}} ਗੰਭੀਰਤਾ',
      'disease.confidence_label': '{{confidence}}% ਭਰੋਸਾ',
      'disease.sections.symptoms': 'ਲੱਛਣ',
      'disease.sections.causes': 'ਆਮ ਕਾਰਣ',
      'disease.sections.treatments': 'ਇਲਾਜ਼ ਵਿਕਲਪ',
      'disease.treatments.chemical': 'ਰਸਾਇਣਕ ਇਲਾਜ਼',
      'disease.treatments.organic': 'ਆਰਗੈਨਿਕ ਇਲਾਜ਼',
      'disease.treatments.prevention': 'ਰੋਕਥਾਮ',
      'disease.error.invalid_file': 'ਕਿਰਪਾ ਕਰਕੇ ਵੈਧ ਤਸਵੀਰ ਚੁਣੋ',
      'disease.error.invalid_drop': 'ਕਿਰਪਾ ਕਰਕੇ ਵੈਧ ਤਸਵੀਰ ਛੱਡੋ',
      'disease.error.no_image': 'ਪਹਿਲਾਂ ਇੱਕ ਤਸਵੀਰ ਚੁਣੋ',
      'disease.error.analysis_failed': 'ਵਿਸ਼ਲੇਸ਼ਣ ਅਸਫਲ ਰਿਹਾ। ਮੁੜ ਕੋਸ਼ਿਸ਼ ਕਰੋ।',
      'disease.tts.detected': 'ਪਤਾ ਲੱਗੀ ਬਿਮਾਰੀ: {{disease}} {{confidence}}% ਭਰੋਸੇ ਨਾਲ। ਗੰਭੀਰਤਾ: {{severity}}.',

      // Marketplace
      'marketplace.subtitle': 'ਕਿਸਾਨਾਂ ਅਤੇ ਸਪਲਾਇਰਾਂ ਨਾਲ ਸਿੱਧਾ ਜੁੜੋ',
      'marketplace.search_placeholder': 'ਉਤਪਾਦ ਖੋਜੋ...',
      'marketplace.filters': 'ਫਿਲਟਰ',
      'marketplace.contact_seller': 'ਵਿਕਰੇਤਾ ਨਾਲ ਸੰਪਰਕ ਕਰੋ',
      'marketplace.sell_title': 'ਆਪਣਾ ਉਤਪਾਦ ਸੂਚੀਬੱਧ ਕਰੋ',
      'marketplace.sell.product_title': 'ਉਤਪਾਦ ਸਿਰਲੇਖ',
      'marketplace.sell.category': 'ਸ਼੍ਰੇਣੀ',
      'marketplace.sell.category.vegetables': 'ਸਬਜ਼ੀਆਂ',
      'marketplace.sell.category.fruits': 'ਫਲ',
      'marketplace.sell.category.grains': 'ਅਨਾਜ',
      'marketplace.sell.category.equipment': 'ਸਾਜੋ-ਸਮਾਨ',
      'marketplace.sell.price_hint': 'ਕੀਮਤ (₹/ਕਿਲੋ)',
      'marketplace.sell.quantity_hint': 'ਮਾਤਰਾ',
      'marketplace.sell.location': 'ਸਥਾਨ',
      'marketplace.sell.description': 'ਵਰਣਨ',
      'marketplace.sell.title_placeholder': 'ਜਿਵੇਂ, ਤਾਜ਼ੇ ਟਮਾਟਰ',
      'marketplace.sell.location_placeholder': 'ਸ਼ਹਿਰ, ਰਾਜ',
      'marketplace.sell.description_placeholder': 'ਆਪਣੇ ਉਤਪਾਦ ਦਾ ਵਰਣਨ ਕਰੋ...',
      'marketplace.sell.list_button': 'ਉਤਪਾਦ ਸੂਚੀਬੱਧ ਕਰੋ',

      // News
      'news.subtitle': 'ਕ੍ਰਿਸ਼ੀ ਖਬਰਾਂ ਅਤੇ ਬਾਜ਼ਾਰ ਕੀਮਤਾਂ ਨਾਲ ਅਪਡੇਟ ਰਹੋ',
      'news.read_more': 'ਹੋਰ ਪੜ੍ਹੋ',
      'news.current_prices': 'ਮੌਜੂਦਾ ਬਾਜ਼ਾਰ ਕੀਮਤਾਂ',
      'news.updated': 'ਅਪਡੇਟ ਕੀਤਾ: {{date}}',

      // Support
      'support.subtitle': 'ਸਰਕਾਰੀ ਯੋਜਨਾਵਾਂ, ਕਰਜ਼ੇ ਅਤੇ ਮਦਦ ਹਾਸਲ ਕਰੋ',
      'support.contact_support': 'ਸਹਾਇਤਾ ਨਾਲ ਸੰਪਰਕ ਕਰੋ',
      'support.helpline': 'ਹੈਲਪਲਾਈਨ',
      'support.email': 'ਈਮੇਲ',
      'support.address': 'ਪਤਾ',
      'support.quick_apply_title': 'ਤੁਰੰਤ ਅਰਜ਼ੀ',
      'support.quick_apply_desc': 'ਯੋਜਨਾ ਅਰਜ਼ੀਆਂ ਅਤੇ ਦਸਤਾਵੇਜ਼ਾਂ ਲਈ ਮਦਦ ਪ੍ਰਾਪਤ ਕਰੋ',
      'support.quick_apply_button': 'ਸਲਾਹ ਮਸ਼ਵਰਾ ਸ਼ਡਿਊਲ ਕਰੋ',
      'support.benefit_label': 'ਲਾਭ:',
      'support.eligibility_label': 'ਯੋਗਤਾ:',

      // Forum
      'forum.subtitle': 'ਕਿਸਾਨਾਂ, ਵਿਸ਼ੇਸ਼ਜਿਆਂ ਅਤੇ ਰੁਚੀ ਰੱਖਣ ਵਾਲਿਆਂ ਨਾਲ ਜੁੜੋ',
      'forum.categories': 'ਸ਼੍ਰੇਣੀਆਂ',
      'forum.search_placeholder': 'ਚਰਚਾਵਾਂ ਖੋਜੋ...',
      'forum.filter': 'ਫਿਲਟਰ',
      'forum.replies': '{{count}} ਜਵਾਬ',
      'forum.expert_replied': 'ਵਿਸ਼ੇਸ਼ਜ ਨੇ ਜਵਾਬ ਦਿੱਤਾ',
      'forum.load_more': 'ਹੋਰ ਪੋਸਟਾਂ ਲੋਡ ਕਰੋ',

      // Advisory
      'advisory.error.location_required': 'ਕਿਰਪਾ ਕਰਕੇ ਆਪਣਾ ਸਥਾਨ ਦਰਜ ਕਰੋ',
      'advisory.error.fetch_failed': 'ਸਿਫਾਰਸ਼ਾਂ ਪ੍ਰਾਪਤ ਕਰਨ ਵਿੱਚ ਅਸਫਲ। ਮੁੜ ਕੋਸ਼ਿਸ਼ ਕਰੋ.',
      'advisory.tts.top_rec': 'ਸਭ ਤੋਂ ਵਧੀਆ ਸਿਫਾਰਸ਼: {{crop}} {{confidence}}% ਭਰੋਸੇ ਨਾਲ'
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;