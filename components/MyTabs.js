import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeScreen from './HomeScreen';
import GalerieCommunautaireScreen from './GalerieCommunautaireScreen'
import GallerieScreen from './GalleryScreen';
import CameraScreen from './CameraScreen';


const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();


function HomeStack() {
    return (
      <Stack.Navigator
      screenOptions={{
        headerShown: false, // Masquer le header pour tous les écrans dans ce Stack.Navigator
      }}>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
        <Stack.Screen name="Camera" component={CameraScreen} options={{ title: 'Camera' }} />
      </Stack.Navigator>
    );
  }

  

export default function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false, // Si vous souhaitez également masquer l'en-tête supérieur
       
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Accueil') {
            iconName = focused ? 'home' : 'home';
          } else if (route.name === 'CoGalerie') {
            iconName = focused ? 'users' : 'users';
          } else if (route.name === 'Gallerie') {
            iconName = focused ? 'image' : 'image';
          }

          // Return the icon component
          return <Icon name={iconName} size={size} color={color}  iconStyle="brand"  />;
        },
        tabBarActiveTintColor: '#FF00FF',
        tabBarInactiveTintColor: '#8994bc',
      })}
    >
      <Tab.Screen name="Accueil" component={HomeStack} />
      <Tab.Screen name="CoGalerie" component={GalerieCommunautaireScreen} />
      <Tab.Screen name="Gallerie" component={GallerieScreen} />
    </Tab.Navigator>
  );
}