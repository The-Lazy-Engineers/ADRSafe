import pandas as pd
from sklearn.preprocessing import StandardScaler
import joblib
from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import tensorflow.keras.models as keras
import joblib
from sklearn.preprocessing import LabelEncoder
from tensorflow.keras.models import load_model


df = pd.read_csv('Final_Augmented_dataset_Diseases_and_Symptoms.csv')
X = df.drop('diseases', axis=1)
X = X.fillna(0)

scaler = StandardScaler()
scaler.fit(X)

joblib.dump(scaler, 'scaler.pkl')


y = df['diseases']

label_encoder = LabelEncoder()
y_encoded = label_encoder.fit_transform(y)

disease_classes = label_encoder.classes_

joblib.dump(disease_classes, 'disease_classes.pkl')

app = Flask(__name__)
CORS(app)

model = load_model('disease_prediction_nn_model.h5')
scaler = joblib.load('scaler.pkl')  # Load scaler for input normalization
disease_classes = joblib.load('disease_classes.pkl')  # Load disease names

@app.route('/predict', methods=['POST'], endpoint='predict_endpoint')
def predict_disease():
    try:
        # Get symptom data from POST request (JSON format)
        input_data = request.json['symptoms']  # Example: {"symptoms": [1, 0, 1, ...]}
        
        # Convert input data to NumPy array and reshape for prediction
        input_array = np.array(input_data).reshape(1, -1)

        # Scale input data using scaler
        input_scaled = scaler.transform(input_array)

        # Predict probabilities using the trained model
        predictions = model.predict(input_scaled)

        # Get predicted class (index of highest probability)
        predicted_class_index = np.argmax(predictions)

        # Map predicted class index to actual disease name
        predicted_disease = disease_classes[predicted_class_index]

        return jsonify({
            'predicted_disease': predicted_disease,
            'probabilities': predictions.tolist()
        })
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
