
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';

const GradientIcon = ({ name, size, colors }) => {
  return (
    <View style={styles.iconContainer}>
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
      >
        <Icon name={name} size={size} color="white" />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
   

  },
  gradient: {

    height: '100%',
    width: '100%',
  
  
  },
});

export default GradientIcon;
