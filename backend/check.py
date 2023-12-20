import tensorflow as tf
from tensorflow.keras import layers, models
from tensorflow.keras.utils import to_categorical
import cv2
import numpy as np

def fu():
   model = models.load_model('digit_recognition_model.h5')
   custom_image = custom_image = cv2.imread(r'C:\Users\Md. Arslan\OneDrive\Desktop\test\backend\foto.png', cv2.IMREAD_GRAYSCALE)
   custom_image = cv2.resize(custom_image, (28, 28))
   custom_image = custom_image.astype('float32') / 255
   custom_image = custom_image.reshape((1, 28, 28, 1))
   prediction = model.predict(custom_image)
   predicted_digit = np.argmax(prediction)
   return predicted_digit
