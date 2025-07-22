import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Image, Keyboard } from 'react-native';

const letterImages = {
  A: require('../assets/signs/A.png'),
  B: require('../assets/signs/B.png'),
  C: require('../assets/signs/C.png'),
  D: require('../assets/signs/D.png'),
  E: require('../assets/signs/E.png'),
  F: require('../assets/signs/F.png'),
  G: require('../assets/signs/G.png'),
  H: require('../assets/signs/H.png'),
  I: require('../assets/signs/I.png'),
  J: require('../assets/signs/J.png'),
  K: require('../assets/signs/K.png'),
  L: require('../assets/signs/L.png'),
  M: require('../assets/signs/M.png'),
  N: require('../assets/signs/N.png'),
  O: require('../assets/signs/O.png'),
  P: require('../assets/signs/P.png'),
  Q: require('../assets/signs/Q.png'),
  R: require('../assets/signs/R.png'),
  S: require('../assets/signs/S.png'),
  T: require('../assets/signs/T.png'),
  U: require('../assets/signs/U.png'),
  V: require('../assets/signs/V.png'),
  W: require('../assets/signs/W.png'),
  X: require('../assets/signs/X.png'),
  Y: require('../assets/signs/Y.png'),
  Z: require('../assets/signs/Z.png'),
};

export default function Translate() {
  const [input, setInput] = useState('');
  const [translatedLetters, setTranslatedLetters] = useState([]);

  const handleChange = (text) => {
    setInput(text);

    // Cek jika karakter terakhir adalah spasi
    if (text.endsWith(' ')) {
      const words = text.trim().toUpperCase(); // ambil tanpa spasi di akhir
      const letters = words.split('').filter(char => /^[A-Z]$/.test(char)); // hanya A-Z
      setTranslatedLetters(letters);
      Keyboard.dismiss(); // auto tutup keyboard
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Translate</Text>
      <Text style={styles.subheading}>Write the word you want to translate into sign language</Text>

      <TextInput
        style={styles.input}
        value={input}
        onChangeText={handleChange}
        placeholder="......"
        autoCapitalize="none"
      />

      <Text style={styles.resultTitle}>Translation Results</Text>

      <ScrollView horizontal contentContainerStyle={styles.imageRow}>
        {translatedLetters.map((char, index) => (
          <View key={index} style={styles.imageBox}>
            <Image source={letterImages[char]} style={styles.image} />
            <Text style={styles.imageLabel}>{char}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  subheading: {
    color: '#666',
    marginTop: 4,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 14,
    borderRadius: 8,
    marginBottom: 30,
    backgroundColor: '#f9f9f9',
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  imageRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageBox: {
    alignItems: 'center',
    marginRight: 14,
    padding: 10,
    backgroundColor: '#fef6e4',
    borderRadius: 10,
    elevation: 2,
  },
  image: {
    width: 60,
    height: 80,
    resizeMode: 'contain',
    marginBottom: 5,
  },
  imageLabel: {
    fontWeight: 'bold',
  },
});
