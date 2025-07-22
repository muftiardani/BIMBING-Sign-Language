import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Keyboard,
} from 'react-native';

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
  const [slideshowIndex, setSlideshowIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isPlaying && translatedLetters.length > 0) {
      interval = setInterval(() => {
        setSlideshowIndex((prev) =>
          prev < translatedLetters.length - 1 ? prev + 1 : 0
        );
      }, 800);
    }
    return () => clearInterval(interval);
  }, [isPlaying, translatedLetters]);

  const handleTranslate = () => {
    const text = input.trim().toUpperCase();
    const letters = text.split('').filter((char) => /^[A-Z]$/.test(char));
    setTranslatedLetters(letters);
    setSlideshowIndex(0);
    setIsPlaying(false);
    Keyboard.dismiss();
  };

  const handlePlay = () => {
    if (translatedLetters.length > 0) {
      setIsPlaying(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Translate</Text>
      <Text style={styles.subheading}>
        Write the word you want to translate into sign language
      </Text>

      <TextInput
        style={styles.input}
        value={input}
        onChangeText={setInput}
        placeholder="Type here..."
        autoCapitalize="none"
      />

      <TouchableOpacity onPress={handleTranslate} style={styles.translateButton}>
        <Text style={styles.buttonText}>Translate</Text>
      </TouchableOpacity>

      <Text style={styles.resultTitle}>Translation Results</Text>

      {translatedLetters.length > 0 && (
        <>
          {isPlaying ? (
            <View style={styles.centeredImageBox}>
              <Image
                source={letterImages[translatedLetters[slideshowIndex]]}
                style={styles.image}
              />
              <Text style={styles.imageLabel}>
                {translatedLetters[slideshowIndex]}
              </Text>
            </View>
          ) : (
            <ScrollView horizontal contentContainerStyle={styles.imageRow}>
              {translatedLetters.map((char, index) => (
                <View key={index} style={styles.imageBox}>
                  <Image source={letterImages[char]} style={styles.image} />
                  <Text style={styles.imageLabel}>{char}</Text>
                </View>
              ))}
            </ScrollView>
          )}

          <TouchableOpacity onPress={handlePlay} style={styles.playButton}>
            <Text style={styles.buttonText}>▶ Play</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  input: {
    width: 296,
    height: 57,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 16,
  },
  translateButton: {
    width: 296,
    height: 57,
    backgroundColor: '#4F48B5',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  translateText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultContainer: {
    alignItems: 'center',
    marginTop: 10,
    gap: 12,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  playButton: {
    width: 296,
    height: 57,
    backgroundColor: "#4F48B5",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});