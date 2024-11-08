import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';


const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>MoMint</Text>

      <TouchableOpacity
        onPress={() => navigation.navigate('Camera')}
      >
        <LinearGradient
          colors={['#FF00FF', '#00FFFF']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.button}
        >
        <Text style={styles.buttonText}>Take a Photo ✨</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};


export default HomeScreen;



const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    title: {
      fontSize: 40,                
      fontWeight: 'bold',          
      color: '#8994bc',            // Couleur vive (orange vif)
      textAlign: 'center',         
      textTransform: 'uppercase',  
      letterSpacing: 2,            
      marginBottom: 20,            
      fontFamily: 'serif', 

      shadowOffset: { width: 0, height: 2 }, 
      shadowOpacity: 0.8,          // Opacité plus élevée pour une ombre plus visible
      shadowRadius: 4,
      textShadowColor: '#d591ac',   // Lueur dorée autour du texte
      textShadowOffset: { width: 0, height: 0 },
      textShadowRadius: 10,         // Plus grand rayon pour un effet de lueur
    },
    button: {
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 25,
      elevation: 3,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
    },

  });