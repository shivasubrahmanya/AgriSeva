from fastapi import FastAPI, HTTPException, UploadFile, File, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import numpy as np
from PIL import Image
import io
import json
import asyncio
from datetime import datetime, timedelta
import random
import requests

# Initialize FastAPI app
app = FastAPI(
    title="AgriSeva API",
    description="AI-powered agricultural platform for Indian farmers",
    version="1.0.0",
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://localhost:3000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class SoilData(BaseModel):
    ph: float
    nitrogen: float
    phosphorus: float
    potassium: float
    location: str

class WeatherData(BaseModel):
    temperature: float
    humidity: float
    rainfall: float
    season: str

class CropRecommendation(BaseModel):
    crop: str
    confidence: float
    reasons: List[str]
    fertilizer: str
    pesticide: Optional[str] = None
    practices: List[str]

class CropAdvisoryRequest(BaseModel):
    soil: SoilData
    weather: Optional[WeatherData] = None

class DiseaseDetectionResult(BaseModel):
    disease: str
    confidence: float
    severity: str
    description: str
    symptoms: List[str]
    causes: List[str]
    treatments: Dict[str, List[str]]

class MarketplaceProduct(BaseModel):
    id: Optional[int] = None
    title: str
    description: str
    price: float
    quantity: str
    category: str
    location: str
    seller_name: str
    seller_contact: str
    images: Optional[List[str]] = []
    rating: Optional[float] = 0.0
    created_at: Optional[datetime] = None

class ForumPost(BaseModel):
    id: Optional[int] = None
    title: str
    content: str
    author: str
    location: str
    category: str
    replies: Optional[int] = 0
    likes: Optional[int] = 0
    created_at: Optional[datetime] = None

class NewsArticle(BaseModel):
    id: int
    title: str
    summary: str
    content: str
    source: str
    category: str
    published_at: datetime

class MarketPrice(BaseModel):
    commodity: str
    price: float
    change: float
    market: str
    unit: str
    updated_at: datetime

# In-memory storage
marketplace_data: List[MarketplaceProduct] = []
forum_data: List[ForumPost] = []
news_data: List[NewsArticle] = []
price_data: List[MarketPrice] = []

# Mock AI models (in production, these would be loaded TensorFlow/PyTorch models)
def get_current_season() -> str:
    """Get current season based on month"""
    month = datetime.now().month
    if 3 <= month <= 5:
        return "Summer"
    elif 6 <= month <= 9:
        return "Monsoon"
    elif 10 <= month <= 2:
        return "Winter"
    else:
        return "Spring"

def mock_weather_api(location: str) -> WeatherData:
    """Mock weather API call"""
    return WeatherData(
        temperature=25 + random.uniform(-5, 10),
        humidity=60 + random.uniform(-20, 30),
        rainfall=random.uniform(0, 100),
        season=get_current_season()
    )

def generate_crop_recommendations(soil: SoilData, weather: WeatherData) -> List[CropRecommendation]:
    """Generate crop recommendations based on soil and weather data"""
    recommendations = []
    
    # Rice recommendation
    if 6.0 <= soil.ph <= 7.5 and weather.rainfall > 50:
        recommendations.append(CropRecommendation(
            crop="Rice",
            confidence=85.0 + random.uniform(-5, 10),
            reasons=[
                f"Optimal pH range (6.0-7.5), current: {soil.ph}",
                f"Sufficient rainfall ({weather.rainfall:.1f}mm)",
                f"Good nitrogen levels ({soil.nitrogen} kg/ha)"
            ],
            fertilizer="NPK 20-10-10",
            practices=[
                "Maintain water level 2-5cm in field",
                "Transplant 25-day old seedlings",
                "Apply organic matter before planting"
            ]
        ))
    
    # Wheat recommendation
    if 6.0 <= soil.ph <= 7.5 and weather.season == "Winter":
        recommendations.append(CropRecommendation(
            crop="Wheat",
            confidence=80.0 + random.uniform(-5, 10),
            reasons=[
                f"Suitable pH for wheat cultivation: {soil.ph}",
                f"Winter season is ideal for wheat",
                f"Adequate phosphorus levels ({soil.phosphorus} kg/ha)"
            ],
            fertilizer="DAP and Urea",
            practices=[
                "Sow seeds at 2-3cm depth",
                "Irrigation at crown root initiation",
                "Weed control after 30-35 days"
            ]
        ))
    
    # Tomato recommendation
    if 6.0 <= soil.ph <= 7.0 and soil.potassium > 35:
        recommendations.append(CropRecommendation(
            crop="Tomato",
            confidence=75.0 + random.uniform(-5, 10),
            reasons=[
                f"Good pH range for tomatoes: {soil.ph}",
                f"Sufficient potassium content ({soil.potassium} kg/ha)",
                f"Favorable weather conditions"
            ],
            fertilizer="NPK 19-19-19",
            pesticide="Neem oil for pest control",
            practices=[
                "Provide support structures",
                "Regular pruning and training",
                "Drip irrigation recommended"
            ]
        ))
    
    # Maize recommendation
    if soil.nitrogen > 40 and weather.temperature > 20:
        recommendations.append(CropRecommendation(
            crop="Maize",
            confidence=70.0 + random.uniform(-5, 10),
            reasons=[
                f"Good nitrogen availability ({soil.nitrogen} kg/ha)",
                f"Suitable temperature range ({weather.temperature:.1f}°C)",
                "Well-drained soil conditions"
            ],
            fertilizer="Urea and SSP",
            practices=[
                "Plant spacing: 60cm x 20cm",
                "Side dressing with nitrogen",
                "Harvest at physiological maturity"
            ]
        ))
    
    # Sort by confidence
    recommendations.sort(key=lambda x: x.confidence, reverse=True)
    return recommendations[:3]  # Return top 3 recommendations

def mock_disease_detection(image_data: bytes) -> DiseaseDetectionResult:
    """Mock disease detection using image data"""
    diseases = [
        {
            "disease": "Late Blight",
            "confidence": 85.0 + random.uniform(-10, 10),
            "severity": "High",
            "description": "A serious fungal disease that affects tomatoes and potatoes, causing dark spots on leaves.",
            "symptoms": [
                "Dark, water-soaked spots on leaves",
                "Brown lesions with fuzzy white growth",
                "Yellowing and wilting of leaves",
                "Fruit rot in severe cases"
            ],
            "causes": [
                "High humidity (>90%)",
                "Cool temperatures (15-20°C)",
                "Overhead irrigation",
                "Poor air circulation"
            ],
            "treatments": {
                "chemical": [
                    "Copper-based fungicides (Bordeaux mixture)",
                    "Metalaxyl + Mancozeb sprays",
                    "Chlorothalonil applications"
                ],
                "organic": [
                    "Neem oil spray (3-5ml per liter)",
                    "Baking soda solution (1 tsp per liter)",
                    "Milk spray (1:10 ratio with water)",
                    "Copper soap applications"
                ],
                "preventive": [
                    "Improve ventilation around plants",
                    "Avoid overhead watering",
                    "Remove infected plant debris",
                    "Rotate crops annually"
                ]
            }
        },
        {
            "disease": "Powdery Mildew",
            "confidence": 78.0 + random.uniform(-10, 10),
            "severity": "Medium",
            "description": "A common fungal disease that appears as white powdery spots on leaves and stems.",
            "symptoms": [
                "White powdery coating on leaves",
                "Yellowing of affected areas",
                "Stunted growth",
                "Leaf curling and distortion"
            ],
            "causes": [
                "High humidity with dry conditions",
                "Poor air circulation",
                "Overcrowding of plants",
                "Stress from drought or overwatering"
            ],
            "treatments": {
                "chemical": [
                    "Sulfur-based fungicides",
                    "Propiconazole sprays",
                    "Myclobutanil applications"
                ],
                "organic": [
                    "Neem oil (2-3ml per liter)",
                    "Potassium bicarbonate spray",
                    "Milk and water solution (1:9)",
                    "Garlic and onion extract"
                ],
                "preventive": [
                    "Ensure good air circulation",
                    "Avoid overhead irrigation",
                    "Plant resistant varieties",
                    "Regular monitoring and early intervention"
                ]
            }
        },
        {
            "disease": "Bacterial Leaf Spot",
            "confidence": 72.0 + random.uniform(-10, 10),
            "severity": "Low",
            "description": "A bacterial infection causing small, dark spots on leaves with yellow halos.",
            "symptoms": [
                "Small dark spots with yellow halos",
                "Leaf yellowing and dropping",
                "Reduced fruit quality",
                "Stem cankers in severe cases"
            ],
            "causes": [
                "Warm, humid conditions",
                "Water splash from irrigation",
                "Wounded plant tissue",
                "Infected seeds or transplants"
            ],
            "treatments": {
                "chemical": [
                    "Copper hydroxide sprays",
                    "Streptomycin applications",
                    "Fixed copper fungicides"
                ],
                "organic": [
                    "Copper soap spray",
                    "Hydrogen peroxide solution (3%)",
                    "Compost tea applications",
                    "Essential oil mixtures"
                ],
                "preventive": [
                    "Use certified disease-free seeds",
                    "Avoid working in wet fields",
                    "Implement crop rotation",
                    "Remove and destroy infected plants"
                ]
            }
        }
    ]
    
    # Random selection for mock
    selected_disease = random.choice(diseases)
    return DiseaseDetectionResult(**selected_disease)

# API Routes

@app.get("/")
async def root():
    return {"message": "AgriSeva API - Smart Farming Companion"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.now()}

# Crop Advisory Endpoints
@app.post("/api/crop-advisory/analyze")
async def analyze_crop_advisory(request: CropAdvisoryRequest):
    """Analyze soil data and provide crop recommendations"""
    try:
        # Get weather data if not provided
        weather = request.weather
        if not weather:
            weather = mock_weather_api(request.soil.location)
        
        # Generate recommendations
        recommendations = generate_crop_recommendations(request.soil, weather)
        
        return {
            "soil": request.soil,
            "weather": weather,
            "recommendations": recommendations,
            "timestamp": datetime.now()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/weather/{location}")
async def get_weather(location: str):
    """Get weather data for a location"""
    try:
        weather = mock_weather_api(location)
        return weather
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Disease Detection Endpoints
@app.post("/api/disease-detection/analyze")
async def analyze_plant_disease(file: UploadFile = File(...)):
    """Analyze plant leaf image for disease detection"""
    try:
        if not file.content_type.startswith("image/"):
            raise HTTPException(status_code=400, detail="File must be an image")
        
        # Read image data
        image_data = await file.read()
        
        # Mock processing delay
        await asyncio.sleep(2)
        
        # Generate mock result
        result = mock_disease_detection(image_data)
        
        return {
            "filename": file.filename,
            "result": result,
            "timestamp": datetime.now()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Marketplace Endpoints
@app.get("/api/marketplace/products")
async def get_marketplace_products(
    category: Optional[str] = None,
    location: Optional[str] = None,
    search: Optional[str] = None
):
    """Get marketplace products with filtering"""
    products = marketplace_data.copy()
    
    if category and category != "all":
        products = [p for p in products if p.category.lower() == category.lower()]
    
    if location:
        products = [p for p in products if location.lower() in p.location.lower()]
    
    if search:
        products = [p for p in products if search.lower() in p.title.lower() or search.lower() in p.description.lower()]
    
    return {"products": products, "total": len(products)}

@app.post("/api/marketplace/products")
async def create_marketplace_product(product: MarketplaceProduct):
    """Create a new marketplace product listing"""
    try:
        product.id = len(marketplace_data) + 1
        product.created_at = datetime.now()
        marketplace_data.append(product)
        
        return {"message": "Product listed successfully", "product": product}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/marketplace/products/{product_id}")
async def get_marketplace_product(product_id: int):
    """Get a specific marketplace product"""
    product = next((p for p in marketplace_data if p.id == product_id), None)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

# Forum Endpoints
@app.get("/api/forum/posts")
async def get_forum_posts(
    category: Optional[str] = None,
    search: Optional[str] = None,
    limit: int = 10,
    offset: int = 0
):
    """Get forum posts with filtering and pagination"""
    posts = forum_data.copy()
    
    if category and category != "all":
        posts = [p for p in posts if p.category == category]
    
    if search:
        posts = [p for p in posts if search.lower() in p.title.lower() or search.lower() in p.content.lower()]
    
    # Sort by creation date (newest first)
    posts.sort(key=lambda x: x.created_at or datetime.min, reverse=True)
    
    # Apply pagination
    paginated_posts = posts[offset:offset + limit]
    
    return {
        "posts": paginated_posts,
        "total": len(posts),
        "limit": limit,
        "offset": offset
    }

@app.post("/api/forum/posts")
async def create_forum_post(post: ForumPost):
    """Create a new forum post"""
    try:
        post.id = len(forum_data) + 1
        post.created_at = datetime.now()
        forum_data.append(post)
        
        return {"message": "Post created successfully", "post": post}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/forum/posts/{post_id}")
async def get_forum_post(post_id: int):
    """Get a specific forum post"""
    post = next((p for p in forum_data if p.id == post_id), None)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return post

# News and Market Prices Endpoints
@app.get("/api/news")
async def get_agriculture_news(
    category: Optional[str] = None,
    limit: int = 10,
    offset: int = 0
):
    """Get agricultural news"""
    news = news_data.copy()
    
    if category:
        news = [n for n in news if n.category.lower() == category.lower()]
    
    # Sort by publication date (newest first)
    news.sort(key=lambda x: x.published_at, reverse=True)
    
    # Apply pagination
    paginated_news = news[offset:offset + limit]
    
    return {
        "news": paginated_news,
        "total": len(news),
        "limit": limit,
        "offset": offset
    }

@app.get("/api/market-prices")
async def get_market_prices(
    commodity: Optional[str] = None,
    market: Optional[str] = None
):
    """Get current market prices"""
    prices = price_data.copy()
    
    if commodity:
        prices = [p for p in prices if commodity.lower() in p.commodity.lower()]
    
    if market:
        prices = [p for p in prices if market.lower() in p.market.lower()]
    
    # Sort by update time (newest first)
    prices.sort(key=lambda x: x.updated_at, reverse=True)
    
    return {"prices": prices, "total": len(prices)}

# Government Support Endpoints
@app.get("/api/support/schemes")
async def get_government_schemes():
    """Get available government schemes for farmers"""
    schemes = [
        {
            "name": "PM-KISAN",
            "description": "Pradhan Mantri Kisan Samman Nidhi - Direct income support for farmers",
            "benefit": "₹6,000 per year in 3 installments",
            "eligibility": "All landholding farmers",
            "application_process": "Online registration through PM-KISAN portal",
            "required_documents": [
                "Aadhaar Card",
                "Bank Account Details",
                "Land Ownership Documents"
            ],
            "link": "https://pmkisan.gov.in/",
            "status": "Active"
        },
        {
            "name": "PMFBY",
            "description": "Pradhan Mantri Fasal Bima Yojana - Crop Insurance Scheme",
            "benefit": "Insurance coverage up to ₹2 lakh per farmer",
            "eligibility": "All farmers (landowner and tenant farmers)",
            "application_process": "Through banks, CSCs, or insurance companies",
            "required_documents": [
                "Aadhaar Card",
                "Bank Account Details",
                "Land Records",
                "Sowing Certificate"
            ],
            "link": "https://pmfby.gov.in/",
            "status": "Active"
        },
        {
            "name": "NABARD Loans",
            "description": "Agricultural credit facility through NABARD",
            "benefit": "Low interest loans for agriculture and allied activities",
            "eligibility": "Farmers and agri-businesses",
            "application_process": "Through scheduled commercial banks and RRBs",
            "required_documents": [
                "Loan Application",
                "Identity and Address Proof",
                "Income Documents",
                "Collateral Documents"
            ],
            "link": "https://nabard.org/",
            "status": "Active"
        }
    ]
    
    return {"schemes": schemes, "total": len(schemes)}

@app.get("/api/support/contact")
async def get_support_contacts():
    """Get support contact information"""
    contacts = {
        "helpline": "1800-180-1551",
        "email": "support@agriseva.com",
        "address": "Ministry of Agriculture & Farmers Welfare, Krishi Bhawan, New Delhi - 110001",
        "emergency_services": {
            "crop_advisory": "1800-180-1551",
            "veterinary": "1800-425-1671",
            "weather_alerts": "1800-180-1717"
        },
        "regional_offices": [
            {
                "region": "North",
                "states": ["Punjab", "Haryana", "Himachal Pradesh", "Uttarakhand"],
                "contact": "1800-180-1551",
                "email": "north@agriseva.com"
            },
            {
                "region": "South",
                "states": ["Tamil Nadu", "Karnataka", "Andhra Pradesh", "Telangana", "Kerala"],
                "contact": "1800-180-1552",
                "email": "south@agriseva.com"
            },
            {
                "region": "West",
                "states": ["Maharashtra", "Gujarat", "Rajasthan", "Goa"],
                "contact": "1800-180-1553",
                "email": "west@agriseva.com"
            },
            {
                "region": "East",
                "states": ["West Bengal", "Bihar", "Jharkhand", "Odisha"],
                "contact": "1800-180-1554",
                "email": "east@agriseva.com"
            }
        ]
    }
    
    return contacts

# Initialize some mock data
async def initialize_mock_data():
    """Initialize the application with mock data"""
    global marketplace_data, forum_data, news_data, price_data
    
    # Mock marketplace products
    marketplace_data = [
        MarketplaceProduct(
            id=1,
            title="Fresh Tomatoes",
            description="Premium quality tomatoes, pesticide-free",
            price=25.0,
            quantity="100 kg",
            category="Vegetables",
            location="Maharashtra",
            seller_name="Ramesh Sharma",
            seller_contact="9876543210",
            rating=4.5,
            created_at=datetime.now() - timedelta(days=1)
        ),
        MarketplaceProduct(
            id=2,
            title="Organic Rice",
            description="Traditional basmati rice, organic certified",
            price=45.0,
            quantity="500 kg",
            category="Grains",
            location="Punjab",
            seller_name="Gurpreet Singh",
            seller_contact="9876543211",
            rating=4.8,
            created_at=datetime.now() - timedelta(days=2)
        )
    ]
    
    # Mock forum posts
    forum_data = [
        ForumPost(
            id=1,
            title="Best practices for tomato farming in monsoon",
            content="I need advice on protecting my tomato plants during the monsoon season. What are the best practices?",
            author="Rajesh Kumar",
            location="Maharashtra",
            category="crop_care",
            replies=8,
            likes=15,
            created_at=datetime.now() - timedelta(hours=2)
        ),
        ForumPost(
            id=2,
            title="Organic pest control methods for cotton",
            content="Looking for effective organic methods to control pests in cotton crops. Please share your experience.",
            author="Dr. Priya Sharma",
            location="Gujarat",
            category="pest_control",
            replies=12,
            likes=23,
            created_at=datetime.now() - timedelta(hours=6)
        )
    ]
    
    # Mock news data
    news_data = [
        NewsArticle(
            id=1,
            title="New Agricultural Policy Announced by Government",
            summary="The government has announced a new agricultural policy focusing on sustainable farming practices and farmer welfare.",
            content="The Ministry of Agriculture announced comprehensive reforms...",
            source="Ministry of Agriculture",
            category="Policy",
            published_at=datetime.now() - timedelta(hours=1)
        ),
        NewsArticle(
            id=2,
            title="Monsoon Forecast: Above Normal Rainfall Expected",
            summary="IMD predicts above normal rainfall for the upcoming monsoon season across most parts of India.",
            content="The India Meteorological Department has forecast...",
            source="IMD",
            category="Weather",
            published_at=datetime.now() - timedelta(hours=3)
        )
    ]
    
    # Mock price data
    price_data = [
        MarketPrice(
            commodity="Rice",
            price=2850.0,
            change=2.5,
            market="Delhi",
            unit="per quintal",
            updated_at=datetime.now()
        ),
        MarketPrice(
            commodity="Wheat",
            price=2150.0,
            change=-1.2,
            market="Punjab",
            unit="per quintal",
            updated_at=datetime.now()
        ),
        MarketPrice(
            commodity="Tomato",
            price=25.0,
            change=5.8,
            market="Maharashtra",
            unit="per kg",
            updated_at=datetime.now()
        ),
        MarketPrice(
            commodity="Onion",
            price=18.0,
            change=-3.1,
            market="Karnataka",
            unit="per kg",
            updated_at=datetime.now()
        )
    ]

@app.on_event("startup")
async def startup_event():
    """Initialize the application"""
    await initialize_mock_data()
    print("AgriSeva API started successfully!")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
