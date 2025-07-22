import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

// Ganti dengan URL Ngrok yang Anda dapatkan dari Colab
const NGROK_URL = "https://cefd049acd26.ngrok-free.app"; 

export default function Transcribe() {
  const [permission, requestPermission] = useCameraPermissions();
  const [detectedText, setDetectedText] = useState('Ready to capture.');
  const [isLoading, setIsLoading] = useState(false);
  const cameraRef = useRef(null);

  const handleCapture = async () => {
    if (cameraRef.current) {
      setIsLoading(true);
      setDetectedText('Capturing & Sending...');
      
      try {
        const photo = await cameraRef.current.takePictureAsync({ quality: 0.5, base64: true });

        // Kirim gambar ke backend Colab
        const response = await fetch(`${NGROK_URL}/predict`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            image: photo.base64, // Kirim gambar dalam format base64
          }),
        });

        const result = await response.json();

        if (result.prediction) {
          setDetectedText(`Detected: ${result.prediction}`);
        } else {
          setDetectedText('Error: ' + (result.error || 'Unknown error'));
        }

      } catch (error) {
        console.error("Error sending image: ", error);
        setDetectedText('Failed to connect to server.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (!permission) {
    return <View><Text>Loading camera permissions...</Text></View>;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <TouchableOpacity onPress={requestPermission} style={styles.captureButton}>
          <Text style={styles.captureText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing="back" ref={cameraRef} />

      <TouchableOpacity 
        style={styles.captureButton} 
        onPress={handleCapture} 
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.captureText}>Capture Gesture</Text>
        )}
      </TouchableOpacity>

      {detectedText !== '' && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>{detectedText}</Text>
        </View>
      )}
    </View>
  );
}

// ... (styles tetap sama)
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  camera: { flex: 1 },
  captureButton: {
    position: 'absolute',
    bottom: 100,
    alignSelf: 'center',
    backgroundColor: '#6366F1',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  captureText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  resultContainer: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 12,
    borderRadius: 8,
  },
  resultText: { fontSize: 24, fontWeight: 'bold', color: '#333' },
});