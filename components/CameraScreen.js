import React, { useState, useRef, useEffect, useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, FlatList, Dimensions, Image, Alert  } from 'react-native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import { ColorMatrix } from 'react-native-color-matrix-image-filters';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { useDispatch } from 'react-redux';
import { addImage } from '../redux/imageSlice';
import uuid from 'react-native-uuid';

const { height, width } = Dimensions.get('window');

const ArtisticFilter = [
  1.5, -0.5, -0.5, 0, 0,
  -0.5, 1.5, -0.5, 0, 0,
  -0.5, -0.5, 1.5, 0, 0,
  0, 0, 0, 1, 0
];

const filters = {
  ['No Filter']: [
    1, 0, 0, 0, 0,
    0, 1, 0, 0, 0,
    0, 0, 1, 0, 0,
    0, 0, 0, 1, 0,
  ],
  Juno: [
    1, 0, 0, 0, 0, 
    -0.4, 1.3, -0.4, 0.2, -0.1, 
    0, 0, 1, 0, 0, 
    0, 0, 0, 1, 0,
  ],
  Sepia: [
    0.393, 0.769, 0.189, 0, 0,
    0.349, 0.686, 0.168, 0, 0,
    0.272, 0.534, 0.131, 0, 0,
    0, 0, 0, 1, 0,
  ],
  Vintage: [
    0.393, 0.769, 0.189, 0, 0,
    0.349, 0.686, 0.168, 0, 0,
    0.272, 0.534, 0.131, 0, 0,
    0, 0, 0, 1, 0,
  ],
  Achro: [
    0.299, 0.587, 0.114, 0, 0,
    0.299, 0.587, 0.114, 0, 0,
    0.299, 0.587, 0.114, 0, 0,
    0, 0, 0, 1, 0,
  ],

  Artistic: ArtisticFilter,

};

const FilteredImage = ({ source, filter }) => {
  const matrix = filters[filter] || filters['No Filter'];

  return (
    <ColorMatrix
      matrix={matrix}
      style={styles.image}
    >
      <Image
        source={{ uri: `file://${source}` }}
        style={styles.image}
      />
    </ColorMatrix>
  );
};

const FilterThumbnail = ({ source, filter, onPress, isSelected  }) => {
  const matrix = filters[filter] || filters['No Filter'];

  return (
    <TouchableOpacity style={styles.cover}  onPress={onPress}>
      <ColorMatrix
        matrix={matrix}
        style={styles.thumbnail}
      >
        <Image
          source={{ uri: `file://${source}` }}
          style={[styles.thumbnail, 
            isSelected && styles.selectedBorder ]}
         
        />
      </ColorMatrix>
      <Text style={styles.filterName}>{filter}</Text>
    </TouchableOpacity>
  );
};

export default function CameraScreen({ navigation }) {
  const [cameraPosition, setCameraPosition] = useState('back');
  const [showCamera, setShowCamera] = useState(true);
  const [imageSource, setImageSource] = useState('');
  const [currentFilter, setCurrentFilter] = useState('No Filter');
  const [showAlert, setShowAlert] = useState(false); // État pour gérer l'alerte
  const devices = useCameraDevice(cameraPosition);
  const camera = useRef(null);
  const dispatch = useDispatch();


  useEffect(() => {
    async function getPermission() {
      const newCameraPermission = await Camera.requestCameraPermission();

    }
    getPermission();
  }, []);

  const capturePhoto = async () => {
    if (camera.current !== null) {
      const photo = await camera.current.takePhoto({});
      setImageSource(photo.path);
      setShowCamera(false);
      console.log(photo.path);
    }
  };

  const handleFilterPress = useCallback(
    (filter) => () => {
      console.log(`Filter selected: ${filter}`);
      setCurrentFilter(filter);
    },
    []
  );

  const saveImage = () => {
    const id = uuid.v4(); // Génère un ID unique
    dispatch(addImage({ id, path: imageSource, filter: currentFilter }));

    setShowAlert(true); // Affiche l'alerte
    setTimeout(() => setShowAlert(false), 2000); // Cache l'alerte après 2 secondes

    //setImageSource('');
  };


  if (devices == null) {
    return <Text>Camera not available</Text>;
  }
  return (
    <View style={styles.container}>
      {showCamera ? (
        <>
          <Camera
            ref={camera}
            style={StyleSheet.absoluteFill}
            device={devices}
            isActive={showCamera}
            photo={true}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.camButton} onPress={capturePhoto} />
          </View>
        </>
      ) : (
        <>
          {imageSource !== '' && (
            <>
              <FilteredImage source={imageSource} filter={currentFilter} />
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={Object.keys(filters)}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <FilterThumbnail
                    source={imageSource}
                    filter={item}
                    onPress={handleFilterPress(item)}
                    isSelected={item === currentFilter}
                  />
                )}
                style={styles.list}
              />
            </>
          )}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setShowCamera(true)}
            >
              <Text style={styles.textButton}>Reprendre</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={saveImage}
            >
              <Text style={styles.textButton}>Enregistrer</Text>
            </TouchableOpacity>
          </View>
              {/* Alerte temporaire */}
              {showAlert && (
          <View style={styles.alertOverlay}>
          <View style={styles.alertContainer}>
            <View style={styles.alertIcon}>
              <Icon name="check" size={24} color="white" />
            </View>
            <Text style={styles.alertText}>Photo enregistrée avec succès !</Text>
          </View>
        </View>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    height: height - 300,
    width: width - 32,
    borderRadius: 12,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cover: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,

  },
  thumbnail: {
    height: 80,
    width: 80,
    borderRadius: 12,
  },
  filterName: {
    color: '#8994bc' ,
    fontSize: 12,
    marginTop: 5,
    textAlign: 'center',  
  },
  selectedBorder: {
    borderWidth: 3,
    borderColor: '#FF00FF',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    padding: 20,
  },
  camButton: {
    height: 80,
    width: 80,
    borderRadius: 40,
    backgroundColor: '#B2BEB5',
    borderWidth: 4,
    borderColor: 'white',
  },
  button: {
    borderWidth: 1,
    borderColor: '#8994bc', 
    borderRadius: 8, 
    padding: 5,
    //paddingHorizontal: 8,
  },
  textButton: {
    color: '#8994bc',
    fontSize: 16,
    
  },
  canvas: {
    height: height - 300,
    marginHorizontal: 16,
    width: width - 32,
    borderRadius: 12,
  },
  list: {
    margin: 16,
  },
  filterButton: {
    width: '33%',
    textAlign: 'center',
    marginBottom: 12,
    fontWeight: '600',
    fontSize: 18,
  },
  selectedItem: {
    color: '#ea4c89',
    borderWidth: 1,
    borderColor: '#ea4c89',
    borderRadius: 12,
  },
  alertOverlay: {
    ...StyleSheet.absoluteFillObject, // Remplit tout l'écran
    justifyContent: 'center', // Centre verticalement
    alignItems: 'center', // Centre horizontalement
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Fond semi-transparent
    zIndex: 1000, // Assure que l'alerte est au-dessus des autres éléments
  },
  alertContainer: {
    position: 'absolute',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  alertText: {
    color: '#8994bc',
    fontSize: 16,
    marginTop: 10,
  },
  alertIcon: {
    backgroundColor:"#c4cce4",
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 17.5, 
  },
});
