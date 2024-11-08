// screens/GalerieCommunautaireScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function GalerieCommunautaireScreen() {
  return (
    <View style={styles.container}>
      <Text>Galerie Communautaire Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
