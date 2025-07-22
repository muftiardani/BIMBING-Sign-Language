import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

export default function Transcribe() {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const [detectedText, setDetectedText] = useState('');

  // Jika izin belum didapat
  if (!permission) {
    return <View><Text>Loading camera permissions...</Text></View>;
  }

  // Jika izin ditolak
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

  const handleCapture = async () => {
    if (cameraRef.current) {
      let photo = await cameraRef.current.takePictureAsync({ base64: true });
      // Simulasi hasil gesture
      const simulatedResult = 'A';
      setDetectedText(simulatedResult);
    }
  };

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing="back" ref={cameraRef} />

      <TouchableOpacity style={styles.captureButton} onPress={handleCapture}>
        <Text style={styles.captureText}>Capture Gesture</Text>
      </TouchableOpacity>

      {detectedText !== '' && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultLabel}>Detected:</Text>
          <Text style={styles.resultText}>{detectedText}</Text>
        </View>
      )}
    </View>
  );
}

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
    backgroundColor: '#f3f3f3',
    padding: 12,
    borderRadius: 8,
  },
  resultLabel: { fontSize: 14, color: '#666' },
  resultText: { fontSize: 24, fontWeight: 'bold', color: '#333' },
});
