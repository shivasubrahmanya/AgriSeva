import tensorflow as tf
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.metrics import accuracy_score, classification_report
import joblib
import os
import json

class CropRecommendationModel:
    def __init__(self):
        self.model = None
        self.scaler = StandardScaler()
        self.label_encoder = LabelEncoder()
        self.feature_columns = ['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']
        self.crops = ['rice', 'maize', 'chickpea', 'kidneybeans', 'pigeonpeas', 'mothbeans', 
                     'mungbean', 'blackgram', 'lentil', 'pomegranate', 'banana', 'mango', 
                     'grapes', 'watermelon', 'muskmelon', 'apple', 'orange', 'papaya', 
                     'coconut', 'cotton', 'jute', 'coffee']
    
    def generate_synthetic_data(self, n_samples=10000):
        """Generate synthetic crop data for training"""
        np.random.seed(42)
        
        data = []
        for crop in self.crops:
            n_crop_samples = n_samples // len(self.crops)
            
            # Define crop-specific parameter ranges based on agricultural knowledge
            if crop == 'rice':
                nitrogen = np.random.normal(80, 20, n_crop_samples)
                phosphorus = np.random.normal(60, 15, n_crop_samples)
                potassium = np.random.normal(40, 10, n_crop_samples)
                temperature = np.random.normal(25, 5, n_crop_samples)
                humidity = np.random.normal(80, 10, n_crop_samples)
                ph = np.random.normal(6.5, 0.5, n_crop_samples)
                rainfall = np.random.normal(200, 50, n_crop_samples)
            
            elif crop == 'wheat':
                nitrogen = np.random.normal(50, 15, n_crop_samples)
                phosphorus = np.random.normal(50, 12, n_crop_samples)
                potassium = np.random.normal(50, 12, n_crop_samples)
                temperature = np.random.normal(20, 4, n_crop_samples)
                humidity = np.random.normal(65, 12, n_crop_samples)
                ph = np.random.normal(6.8, 0.4, n_crop_samples)
                rainfall = np.random.normal(100, 30, n_crop_samples)
            
            elif crop == 'maize':
                nitrogen = np.random.normal(70, 18, n_crop_samples)
                phosphorus = np.random.normal(48, 12, n_crop_samples)
                potassium = np.random.normal(38, 10, n_crop_samples)
                temperature = np.random.normal(27, 4, n_crop_samples)
                humidity = np.random.normal(70, 10, n_crop_samples)
                ph = np.random.normal(6.2, 0.5, n_crop_samples)
                rainfall = np.random.normal(80, 25, n_crop_samples)
            
            elif crop == 'cotton':
                nitrogen = np.random.normal(120, 25, n_crop_samples)
                phosphorus = np.random.normal(40, 10, n_crop_samples)
                potassium = np.random.normal(205, 30, n_crop_samples)
                temperature = np.random.normal(28, 3, n_crop_samples)
                humidity = np.random.normal(75, 8, n_crop_samples)
                ph = np.random.normal(7.5, 0.3, n_crop_samples)
                rainfall = np.random.normal(120, 40, n_crop_samples)
            
            else:
                # Default ranges for other crops
                nitrogen = np.random.normal(70, 25, n_crop_samples)
                phosphorus = np.random.normal(50, 15, n_crop_samples)
                potassium = np.random.normal(50, 15, n_crop_samples)
                temperature = np.random.normal(25, 5, n_crop_samples)
                humidity = np.random.normal(70, 15, n_crop_samples)
                ph = np.random.normal(6.5, 0.8, n_crop_samples)
                rainfall = np.random.normal(120, 50, n_crop_samples)
            
            # Ensure positive values
            nitrogen = np.clip(nitrogen, 0, 300)
            phosphorus = np.clip(phosphorus, 5, 150)
            potassium = np.clip(potassium, 5, 300)
            temperature = np.clip(temperature, 8, 45)
            humidity = np.clip(humidity, 14, 100)
            ph = np.clip(ph, 3.5, 10)
            rainfall = np.clip(rainfall, 20, 300)
            
            # Create crop samples
            for i in range(n_crop_samples):
                data.append({
                    'N': nitrogen[i],
                    'P': phosphorus[i],
                    'K': potassium[i],
                    'temperature': temperature[i],
                    'humidity': humidity[i],
                    'ph': ph[i],
                    'rainfall': rainfall[i],
                    'label': crop
                })
        
        return pd.DataFrame(data)
    
    def create_model(self, input_dim, output_dim):
        """Create a neural network model for crop recommendation"""
        model = tf.keras.Sequential([
            tf.keras.layers.Dense(128, activation='relu', input_shape=(input_dim,)),
            tf.keras.layers.Dropout(0.3),
            tf.keras.layers.Dense(64, activation='relu'),
            tf.keras.layers.Dropout(0.2),
            tf.keras.layers.Dense(32, activation='relu'),
            tf.keras.layers.Dense(output_dim, activation='softmax')
        ])
        
        model.compile(
            optimizer='adam',
            loss='sparse_categorical_crossentropy',
            metrics=['accuracy']
        )
        
        return model
    
    def train(self, data=None, epochs=50, batch_size=32, validation_split=0.2):
        """Train the crop recommendation model"""
        if data is None:
            print("Generating synthetic training data...")
            data = self.generate_synthetic_data()
        
        # Prepare features and labels
        X = data[self.feature_columns]
        y = data['label']
        
        # Encode labels
        y_encoded = self.label_encoder.fit_transform(y)
        
        # Split data
        X_train, X_test, y_train, y_test = train_test_split(
            X, y_encoded, test_size=0.2, random_state=42, stratify=y_encoded
        )
        
        # Scale features
        X_train_scaled = self.scaler.fit_transform(X_train)
        X_test_scaled = self.scaler.transform(X_test)
        
        # Create and train model
        self.model = self.create_model(len(self.feature_columns), len(self.crops))
        
        # Add callbacks
        early_stopping = tf.keras.callbacks.EarlyStopping(
            monitor='val_loss', patience=10, restore_best_weights=True
        )
        
        reduce_lr = tf.keras.callbacks.ReduceLROnPlateau(
            monitor='val_loss', factor=0.2, patience=5, min_lr=0.001
        )
        
        # Train model
        history = self.model.fit(
            X_train_scaled, y_train,
            epochs=epochs,
            batch_size=batch_size,
            validation_split=validation_split,
            callbacks=[early_stopping, reduce_lr],
            verbose=1
        )
        
        # Evaluate model
        test_loss, test_accuracy = self.model.evaluate(X_test_scaled, y_test, verbose=0)
        print(f"Test Accuracy: {test_accuracy:.4f}")
        
        # Predictions for detailed evaluation
        y_pred = self.model.predict(X_test_scaled)
        y_pred_classes = np.argmax(y_pred, axis=1)
        
        print("\nClassification Report:")
        print(classification_report(y_test, y_pred_classes, 
                                  target_names=self.label_encoder.classes_))
        
        return history
    
    def predict(self, soil_data):
        """Predict crop recommendations for given soil data"""
        if self.model is None:
            raise ValueError("Model not trained. Call train() first.")
        
        # Prepare input data
        input_data = np.array([[
            soil_data['nitrogen'],
            soil_data['phosphorus'], 
            soil_data['potassium'],
            soil_data['temperature'],
            soil_data['humidity'],
            soil_data['ph'],
            soil_data['rainfall']
        ]])
        
        # Scale input data
        input_scaled = self.scaler.transform(input_data)
        
        # Make prediction
        predictions = self.model.predict(input_scaled)[0]
        
        # Get top 3 recommendations
        top_indices = np.argsort(predictions)[-3:][::-1]
        recommendations = []
        
        for i, idx in enumerate(top_indices):
            crop = self.label_encoder.inverse_transform([idx])[0]
            confidence = float(predictions[idx] * 100)
            recommendations.append({
                'crop': crop,
                'confidence': confidence,
                'rank': i + 1
            })
        
        return recommendations
    
    def save_model(self, model_dir='saved_models'):
        """Save the trained model and preprocessors"""
        if not os.path.exists(model_dir):
            os.makedirs(model_dir)
        
        # Save TensorFlow model
        self.model.save(os.path.join(model_dir, 'crop_recommendation_tf'))
        
        # Save preprocessors
        joblib.dump(self.scaler, os.path.join(model_dir, 'scaler.pkl'))
        joblib.dump(self.label_encoder, os.path.join(model_dir, 'label_encoder.pkl'))
        
        # Save model metadata
        metadata = {
            'feature_columns': self.feature_columns,
            'crops': self.crops,
            'model_type': 'tensorflow',
            'input_shape': len(self.feature_columns),
            'output_shape': len(self.crops)
        }
        
        with open(os.path.join(model_dir, 'metadata.json'), 'w') as f:
            json.dump(metadata, f, indent=2)
        
        print(f"Model saved to {model_dir}")
    
    def load_model(self, model_dir='saved_models'):
        """Load a pre-trained model"""
        # Load TensorFlow model
        self.model = tf.keras.models.load_model(os.path.join(model_dir, 'crop_recommendation_tf'))
        
        # Load preprocessors
        self.scaler = joblib.load(os.path.join(model_dir, 'scaler.pkl'))
        self.label_encoder = joblib.load(os.path.join(model_dir, 'label_encoder.pkl'))
        
        print(f"Model loaded from {model_dir}")
    
    def export_tflite(self, model_dir='saved_models', quantize=True):
        """Export model to TensorFlow Lite for mobile deployment"""
        if self.model is None:
            raise ValueError("Model not trained. Call train() first.")
        
        # Convert to TensorFlow Lite
        converter = tf.lite.TFLiteConverter.from_keras_model(self.model)
        
        if quantize:
            converter.optimizations = [tf.lite.Optimize.DEFAULT]
        
        tflite_model = converter.convert()
        
        # Save TFLite model
        tflite_path = os.path.join(model_dir, 'crop_recommendation.tflite')
        with open(tflite_path, 'wb') as f:
            f.write(tflite_model)
        
        print(f"TensorFlow Lite model saved to {tflite_path}")
        return tflite_path
    
    def export_onnx(self, model_dir='saved_models'):
        """Export model to ONNX format"""
        try:
            import tf2onnx
            import onnx
            
            # Convert to ONNX
            onnx_path = os.path.join(model_dir, 'crop_recommendation.onnx')
            
            # Get model signature
            spec = (tf.TensorSpec((None, len(self.feature_columns)), tf.float32, name="input"),)
            
            # Convert to ONNX
            model_proto, _ = tf2onnx.convert.from_keras(self.model, input_signature=spec, opset=13)
            
            # Save ONNX model
            onnx.save(model_proto, onnx_path)
            print(f"ONNX model saved to {onnx_path}")
            return onnx_path
            
        except ImportError:
            print("tf2onnx not available. Install with: pip install tf2onnx")
            return None


def main():
    """Train and save the crop recommendation model"""
    print("Training Crop Recommendation Model...")
    
    # Create model instance
    model = CropRecommendationModel()
    
    # Train model
    history = model.train(epochs=100)
    
    # Save model in multiple formats
    model.save_model()
    model.export_tflite()
    model.export_onnx()
    
    # Test prediction
    test_data = {
        'nitrogen': 80,
        'phosphorus': 60,
        'potassium': 40,
        'temperature': 25,
        'humidity': 80,
        'ph': 6.5,
        'rainfall': 200
    }
    
    recommendations = model.predict(test_data)
    print("\nTest Prediction:")
    for rec in recommendations:
        print(f"{rec['rank']}. {rec['crop']} - {rec['confidence']:.2f}% confidence")


if __name__ == "__main__":
    main()