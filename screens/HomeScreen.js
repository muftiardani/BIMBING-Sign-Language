import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      
      {/* Bagian Header */}
      <View style={styles.header}>
        <Image
          source={require('../assets/Head.png')}
          style={styles.headerImage}
          resizeMode="cover"
        />
      </View>

      {/* Tombol Translate Me */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Translate')}
      >
        <Image
          source={require('../assets/Translate.png')}
          style={styles.buttonImage}
          resizeMode="contain"
        />
      </TouchableOpacity>

      {/* Tombol Transcribe Me */}
      <TouchableOpacity
        style={[styles.button, { marginTop: 15 }]} // Jarak 15px dari tombol sebelumnya
        onPress={() => navigation.navigate('Transcribe')}
      >
        <Image
          source={require('../assets/Transcribe.png')}
          style={styles.buttonImage}
          resizeMode="contain"
        />
      </TouchableOpacity>

      {/* Tombol Help dan Settings di kiri bawah */}
      <View style={styles.bottomLeftContainer}>
        <TouchableOpacity style={styles.iconButton}>
          <Image
            source={require('../assets/help-icon.png')}
            style={styles.helpIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton}>
          <Image
            source={require('../assets/settings-icon.png')}
            style={styles.iconImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    position: 'relative',
  },

  // Header
  header: {
    width: '100%',
    height: 250,
    backgroundColor: '#6366F1',
    overflow: 'hidden',
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },

  // Tombol Translate dan Transcribe
  button: {
    marginTop: 30,
    width: 350,
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },

  // Tombol Help & Settings
  bottomLeftContainer: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    flexDirection: 'row',
    backgroundColor: '#D3F53F',
    padding: 10,
    borderRadius: 50,
    alignItems: 'center',
    gap: 30,
  },
  iconButton: {
    width: 50,
    height: 50,
    backgroundColor: '#4F46E5',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },

  helpIcon: {
  width: 50,
  height: 50,
  },

  iconImage: {
    width: 30,
    height: 30,
    tintColor: '#fff',
  },
});
