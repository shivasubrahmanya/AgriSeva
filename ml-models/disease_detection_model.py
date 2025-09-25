import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import Dataset, DataLoader
import torchvision.transforms as transforms
from torchvision.models import resnet50, ResNet50_Weights
import numpy as np
import pandas as pd
from PIL import Image
import os
import json
import matplotlib.pyplot as plt
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
import seaborn as sns
from collections import defaultdict
import random

class PlantDiseaseDataset(Dataset):
    """Custom dataset for plant disease images"""
    
    def __init__(self, image_paths, labels, transform=None, synthetic=True):
        self.image_paths = image_paths
        self.labels = labels
        self.transform = transform
        self.synthetic = synthetic
        self.classes = ['bacterial_leaf_spot', 'early_blight', 'late_blight', 'leaf_mold', 
                       'powdery_mildew', 'septoria_leaf_spot', 'spider_mites', 'target_spot',
                       'tomato_mosaic_virus', 'yellow_leaf_curl_virus', 'healthy']
    
    def __len__(self):
        return len(self.image_paths) if not self.synthetic else 5000
    
    def __getitem__(self, idx):
        if self.synthetic:
            # Generate synthetic image data for demo
            image = self.generate_synthetic_image()
            label = random.randint(0, len(self.classes) - 1)
        else:
            # Load real image
            image_path = self.image_paths[idx]
            image = Image.open(image_path).convert('RGB')
            label = self.labels[idx]
        
        if self.transform:
            image = self.transform(image)
        
        return image, label
    
    def generate_synthetic_image(self):
        """Generate a synthetic plant leaf image for demo purposes"""
        # Create a simple synthetic leaf-like image
        img_size = 224
        image = Image.new('RGB', (img_size, img_size), color=(34, 139, 34))  # Forest green base
        
        # Add some random patterns to simulate leaf texture and diseases
        pixels = np.array(image)
        
        # Add some brown spots (disease simulation)
        if random.random() > 0.3:  # 70% chance of disease spots
            num_spots = random.randint(1, 5)
            for _ in range(num_spots):
                center_x = random.randint(20, img_size - 20)
                center_y = random.randint(20, img_size - 20)
                radius = random.randint(5, 15)
                
                for i in range(max(0, center_y - radius), min(img_size, center_y + radius)):
                    for j in range(max(0, center_x - radius), min(img_size, center_x + radius)):
                        if (i - center_y)**2 + (j - center_x)**2 <= radius**2:
                            # Brown spots for disease
                            pixels[i, j] = [101, 67, 33] if random.random() > 0.5 else [139, 69, 19]
        
        # Add some yellow areas (nutrient deficiency simulation)
        if random.random() > 0.6:  # 40% chance of yellow areas
            num_yellow = random.randint(1, 3)
            for _ in range(num_yellow):
                start_x = random.randint(0, img_size - 30)
                start_y = random.randint(0, img_size - 30)
                end_x = min(img_size, start_x + random.randint(10, 30))
                end_y = min(img_size, start_y + random.randint(10, 30))
                
                pixels[start_y:end_y, start_x:end_x] = [255, 255, 0]  # Yellow
        
        # Add some random noise
        noise = np.random.normal(0, 10, pixels.shape).astype(np.int8)
        pixels = np.clip(pixels.astype(np.int16) + noise, 0, 255).astype(np.uint8)
        
        return Image.fromarray(pixels)


class PlantDiseaseClassifier(nn.Module):
    """CNN model for plant disease classification"""
    
    def __init__(self, num_classes=11, pretrained=True):
        super(PlantDiseaseClassifier, self).__init__()
        
        # Use ResNet50 as backbone
        if pretrained:
            self.backbone = resnet50(weights=ResNet50_Weights.DEFAULT)
        else:
            self.backbone = resnet50()
        
        # Replace the final classifier
        num_features = self.backbone.fc.in_features
        self.backbone.fc = nn.Sequential(
            nn.Dropout(0.5),
            nn.Linear(num_features, 512),
            nn.ReLU(),
            nn.Dropout(0.3),
            nn.Linear(512, num_classes)
        )
        
        self.num_classes = num_classes
    
    def forward(self, x):
        return self.backbone(x)


class DiseaseDetectionModel:
    """Plant Disease Detection Model Manager"""
    
    def __init__(self):
        self.model = None
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        self.classes = ['bacterial_leaf_spot', 'early_blight', 'late_blight', 'leaf_mold', 
                       'powdery_mildew', 'septoria_leaf_spot', 'spider_mites', 'target_spot',
                       'tomato_mosaic_virus', 'yellow_leaf_curl_virus', 'healthy']
        
        self.class_info = {
            'bacterial_leaf_spot': {
                'severity': 'Medium',
                'description': 'Bacterial infection causing small dark spots with yellow halos.',
                'treatments': {
                    'chemical': ['Copper hydroxide sprays', 'Streptomycin applications'],
                    'organic': ['Copper soap spray', 'Hydrogen peroxide solution'],
                    'preventive': ['Use certified seeds', 'Avoid overhead irrigation']
                }
            },
            'early_blight': {
                'severity': 'High',
                'description': 'Fungal disease causing brown spots with concentric rings.',
                'treatments': {
                    'chemical': ['Chlorothalonil', 'Mancozeb applications'],
                    'organic': ['Neem oil spray', 'Baking soda solution'],
                    'preventive': ['Crop rotation', 'Remove infected debris']
                }
            },
            'late_blight': {
                'severity': 'High',
                'description': 'Serious fungal disease affecting tomatoes and potatoes.',
                'treatments': {
                    'chemical': ['Metalaxyl + Mancozeb', 'Copper-based fungicides'],
                    'organic': ['Milk spray', 'Copper soap applications'],
                    'preventive': ['Improve ventilation', 'Avoid overhead watering']
                }
            },
            'leaf_mold': {
                'severity': 'Medium',
                'description': 'Fungal disease causing yellow spots that turn brown.',
                'treatments': {
                    'chemical': ['Fungicide sprays', 'Copper treatments'],
                    'organic': ['Neem oil', 'Improved air circulation'],
                    'preventive': ['Reduce humidity', 'Proper spacing']
                }
            },
            'powdery_mildew': {
                'severity': 'Medium',
                'description': 'White powdery coating on leaves and stems.',
                'treatments': {
                    'chemical': ['Sulfur-based fungicides', 'Propiconazole'],
                    'organic': ['Milk solution', 'Baking soda spray'],
                    'preventive': ['Good air circulation', 'Avoid crowding']
                }
            },
            'healthy': {
                'severity': 'None',
                'description': 'Plant appears healthy with no visible diseases.',
                'treatments': {
                    'chemical': [],
                    'organic': [],
                    'preventive': ['Continue good practices', 'Regular monitoring']
                }
            }
        }
        
        # Set default info for other classes
        for class_name in self.classes:
            if class_name not in self.class_info:
                self.class_info[class_name] = {
                    'severity': 'Medium',
                    'description': f'Plant disease: {class_name.replace(\"_\", \" \").title()}',
                    'treatments': {
                        'chemical': ['Consult agricultural expert'],
                        'organic': ['Neem oil spray', 'Organic treatments'],
                        'preventive': ['Good hygiene', 'Regular monitoring']
                    }
                }
    
    def get_transforms(self, train=True):
        """Get image transformations for training and validation"""
        if train:
            return transforms.Compose([
                transforms.Resize((256, 256)),
                transforms.RandomCrop(224),
                transforms.RandomHorizontalFlip(0.5),
                transforms.RandomRotation(degrees=15),
                transforms.ColorJitter(brightness=0.2, contrast=0.2, saturation=0.2, hue=0.1),
                transforms.ToTensor(),
                transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
            ])
        else:
            return transforms.Compose([
                transforms.Resize((224, 224)),
                transforms.ToTensor(),
                transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
            ])
    
    def create_synthetic_dataset(self):
        """Create synthetic dataset for training"""
        # Create synthetic data
        train_dataset = PlantDiseaseDataset(
            image_paths=[], 
            labels=[], 
            transform=self.get_transforms(train=True),
            synthetic=True
        )
        
        val_dataset = PlantDiseaseDataset(
            image_paths=[], 
            labels=[], 
            transform=self.get_transforms(train=False),
            synthetic=True
        )
        
        return train_dataset, val_dataset
    
    def train(self, epochs=50, batch_size=32, learning_rate=0.001):
        """Train the disease detection model"""
        print(\"Training Plant Disease Detection Model...\")\n        \n        # Create model\n        self.model = PlantDiseaseClassifier(num_classes=len(self.classes))\n        self.model.to(self.device)\n        \n        # Create datasets\n        train_dataset, val_dataset = self.create_synthetic_dataset()\n        \n        train_loader = DataLoader(train_dataset, batch_size=batch_size, shuffle=True)\n        val_loader = DataLoader(val_dataset, batch_size=batch_size, shuffle=False)\n        \n        # Loss and optimizer\n        criterion = nn.CrossEntropyLoss()\n        optimizer = optim.Adam(self.model.parameters(), lr=learning_rate)\n        scheduler = optim.lr_scheduler.ReduceLROnPlateau(optimizer, 'min', patience=5)\n        \n        # Training history\n        train_losses = []\n        val_losses = []\n        train_accs = []\n        val_accs = []\n        \n        best_val_acc = 0.0\n        \n        for epoch in range(epochs):\n            # Training phase\n            self.model.train()\n            running_loss = 0.0\n            correct_train = 0\n            total_train = 0\n            \n            for batch_idx, (data, target) in enumerate(train_loader):\n                data, target = data.to(self.device), target.to(self.device)\n                \n                optimizer.zero_grad()\n                output = self.model(data)\n                loss = criterion(output, target)\n                loss.backward()\n                optimizer.step()\n                \n                running_loss += loss.item()\n                _, predicted = torch.max(output.data, 1)\n                total_train += target.size(0)\n                correct_train += (predicted == target).sum().item()\n                \n                if batch_idx % 50 == 0:\n                    print(f'Epoch {epoch+1}/{epochs}, Batch {batch_idx}, Loss: {loss.item():.4f}')\n            \n            train_loss = running_loss / len(train_loader)\n            train_acc = 100 * correct_train / total_train\n            \n            # Validation phase\n            self.model.eval()\n            val_loss = 0.0\n            correct_val = 0\n            total_val = 0\n            \n            with torch.no_grad():\n                for data, target in val_loader:\n                    data, target = data.to(self.device), target.to(self.device)\n                    output = self.model(data)\n                    val_loss += criterion(output, target).item()\n                    \n                    _, predicted = torch.max(output.data, 1)\n                    total_val += target.size(0)\n                    correct_val += (predicted == target).sum().item()\n            \n            val_loss /= len(val_loader)\n            val_acc = 100 * correct_val / total_val\n            \n            # Update learning rate\n            scheduler.step(val_loss)\n            \n            # Save best model\n            if val_acc > best_val_acc:\n                best_val_acc = val_acc\n                # torch.save(self.model.state_dict(), 'best_model.pth')\n            \n            # Record history\n            train_losses.append(train_loss)\n            val_losses.append(val_loss)\n            train_accs.append(train_acc)\n            val_accs.append(val_acc)\n            \n            print(f'Epoch {epoch+1}/{epochs}:')\n            print(f'  Train Loss: {train_loss:.4f}, Train Acc: {train_acc:.2f}%')\n            print(f'  Val Loss: {val_loss:.4f}, Val Acc: {val_acc:.2f}%')\n            print(f'  Learning Rate: {optimizer.param_groups[0][\"lr\"]:.6f}')\n            print('-' * 60)\n        \n        return {\n            'train_losses': train_losses,\n            'val_losses': val_losses,\n            'train_accs': train_accs,\n            'val_accs': val_accs,\n            'best_val_acc': best_val_acc\n        }\n    \n    def predict(self, image_path_or_array, top_k=3):\n        \"\"\"Predict disease from image\"\"\"\n        if self.model is None:\n            raise ValueError(\"Model not trained. Call train() first.\")\n        \n        self.model.eval()\n        \n        # Load and preprocess image\n        if isinstance(image_path_or_array, str):\n            image = Image.open(image_path_or_array).convert('RGB')\n        elif isinstance(image_path_or_array, np.ndarray):\n            image = Image.fromarray(image_path_or_array)\n        else:\n            image = image_path_or_array\n        \n        # Apply transforms\n        transform = self.get_transforms(train=False)\n        image_tensor = transform(image).unsqueeze(0).to(self.device)\n        \n        # Make prediction\n        with torch.no_grad():\n            outputs = self.model(image_tensor)\n            probabilities = torch.nn.functional.softmax(outputs, dim=1)\n            \n        # Get top-k predictions\n        top_probs, top_indices = torch.topk(probabilities, top_k)\n        \n        results = []\n        for i in range(top_k):\n            class_idx = top_indices[0][i].item()\n            confidence = top_probs[0][i].item() * 100\n            class_name = self.classes[class_idx]\n            \n            result = {\n                'disease': class_name.replace('_', ' ').title(),\n                'confidence': confidence,\n                'severity': self.class_info[class_name]['severity'],\n                'description': self.class_info[class_name]['description'],\n                'symptoms': [f\"Symptoms of {class_name.replace('_', ' ')}\"],\n                'causes': [f\"Common causes of {class_name.replace('_', ' ')}\"],\n                'treatments': self.class_info[class_name]['treatments']\n            }\n            results.append(result)\n        \n        return results[0] if top_k == 1 else results\n    \n    def save_model(self, model_dir='saved_models'):\n        \"\"\"Save the trained model\"\"\"\n        if not os.path.exists(model_dir):\n            os.makedirs(model_dir)\n        \n        # Save PyTorch model\n        torch.save({\n            'model_state_dict': self.model.state_dict(),\n            'classes': self.classes,\n            'class_info': self.class_info\n        }, os.path.join(model_dir, 'disease_detection_pytorch.pth'))\n        \n        # Save model metadata\n        metadata = {\n            'classes': self.classes,\n            'num_classes': len(self.classes),\n            'model_type': 'pytorch_resnet50',\n            'input_size': [224, 224, 3],\n            'class_info': self.class_info\n        }\n        \n        with open(os.path.join(model_dir, 'disease_metadata.json'), 'w') as f:\n            json.dump(metadata, f, indent=2)\n        \n        print(f\"Model saved to {model_dir}\")\n    \n    def load_model(self, model_dir='saved_models'):\n        \"\"\"Load a pre-trained model\"\"\"\n        checkpoint = torch.load(os.path.join(model_dir, 'disease_detection_pytorch.pth'),\n                               map_location=self.device)\n        \n        self.model = PlantDiseaseClassifier(num_classes=len(self.classes))\n        self.model.load_state_dict(checkpoint['model_state_dict'])\n        self.model.to(self.device)\n        self.model.eval()\n        \n        self.classes = checkpoint['classes']\n        self.class_info = checkpoint['class_info']\n        \n        print(f\"Model loaded from {model_dir}\")\n    \n    def export_torchscript(self, model_dir='saved_models'):\n        \"\"\"Export model to TorchScript format\"\"\"\n        if self.model is None:\n            raise ValueError(\"Model not trained. Call train() first.\")\n        \n        self.model.eval()\n        \n        # Create example input\n        example_input = torch.randn(1, 3, 224, 224).to(self.device)\n        \n        # Trace the model\n        traced_model = torch.jit.trace(self.model, example_input)\n        \n        # Save TorchScript model\n        torchscript_path = os.path.join(model_dir, 'disease_detection.pt')\n        traced_model.save(torchscript_path)\n        \n        print(f\"TorchScript model saved to {torchscript_path}\")\n        return torchscript_path\n    \n    def export_onnx(self, model_dir='saved_models'):\n        \"\"\"Export model to ONNX format\"\"\"\n        if self.model is None:\n            raise ValueError(\"Model not trained. Call train() first.\")\n        \n        self.model.eval()\n        \n        # Create example input\n        dummy_input = torch.randn(1, 3, 224, 224).to(self.device)\n        \n        # Export to ONNX\n        onnx_path = os.path.join(model_dir, 'disease_detection.onnx')\n        torch.onnx.export(\n            self.model,\n            dummy_input,\n            onnx_path,\n            export_params=True,\n            opset_version=11,\n            do_constant_folding=True,\n            input_names=['input'],\n            output_names=['output'],\n            dynamic_axes={\n                'input': {0: 'batch_size'},\n                'output': {0: 'batch_size'}\n            }\n        )\n        \n        print(f\"ONNX model saved to {onnx_path}\")\n        return onnx_path\n    \n    def export_tflite(self, model_dir='saved_models'):\n        \"\"\"Export model to TensorFlow Lite (requires onnx-tf)\"\"\"\n        try:\n            import onnx\n            from onnx_tf.backend import prepare\n            import tensorflow as tf\n            \n            # First export to ONNX\n            onnx_path = self.export_onnx(model_dir)\n            \n            # Load ONNX model\n            onnx_model = onnx.load(onnx_path)\n            \n            # Convert to TensorFlow\n            tf_rep = prepare(onnx_model)\n            \n            # Export to SavedModel format\n            tf_model_dir = os.path.join(model_dir, 'tf_model')\n            tf_rep.export_graph(tf_model_dir)\n            \n            # Convert to TFLite\n            converter = tf.lite.TFLiteConverter.from_saved_model(tf_model_dir)\n            converter.optimizations = [tf.lite.Optimize.DEFAULT]\n            tflite_model = converter.convert()\n            \n            # Save TFLite model\n            tflite_path = os.path.join(model_dir, 'disease_detection.tflite')\n            with open(tflite_path, 'wb') as f:\n                f.write(tflite_model)\n            \n            print(f\"TensorFlow Lite model saved to {tflite_path}\")\n            return tflite_path\n            \n        except ImportError:\n            print(\"onnx-tf not available. Install with: pip install onnx-tf\")\n            return None\n\n\ndef main():\n    \"\"\"Train and export the disease detection model\"\"\"\n    print(\"Training Disease Detection Model...\")\n    \n    # Create model instance\n    model = DiseaseDetectionModel()\n    \n    # Train model (reduced epochs for demo)\n    history = model.train(epochs=20, batch_size=16)\n    \n    print(f\"\\nBest validation accuracy: {history['best_val_acc']:.2f}%\")\n    \n    # Save model in multiple formats\n    model.save_model()\n    model.export_torchscript()\n    model.export_onnx()\n    model.export_tflite()\n    \n    # Test prediction with synthetic data\n    dataset = PlantDiseaseDataset([], [], transform=None, synthetic=True)\n    test_image = dataset.generate_synthetic_image()\n    \n    result = model.predict(test_image)\n    print(\"\\nTest Prediction:\")\n    print(f\"Disease: {result['disease']}\")\n    print(f\"Confidence: {result['confidence']:.2f}%\")\n    print(f\"Severity: {result['severity']}\")\n\n\nif __name__ == \"__main__\":\n    main()"
      