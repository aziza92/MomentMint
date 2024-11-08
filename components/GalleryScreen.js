import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Image, Dimensions, Text, TouchableOpacity, Modal, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { useSelector, useDispatch } from 'react-redux';
import { deleteImage } from '../redux/imageSlice';
import { Provider, Dialog, Portal, Button } from 'react-native-paper';

const { width, height } = Dimensions.get('window');
const MARGIN = 15;
const ITEM_MARGIN = 8;
const USABLE_WIDTH = width - (2 * MARGIN);
const COLUMN_WIDTH = (USABLE_WIDTH - ITEM_MARGIN) / 2;
const IMAGE_WIDTH = COLUMN_WIDTH - ITEM_MARGIN;

const GalleryScreen = () => {
  const images = useSelector((state) => state.images);
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState(null);
  const [fullScreenImage, setFullScreenImage] = useState(null);

  const showDialog = (id) => {
    setSelectedImageId(id);
    setVisible(true);
  };

  const hideDialog = () => {
    setVisible(false);
  };

  const handleDelete = () => {
    dispatch(deleteImage(selectedImageId));
    hideDialog();
  };

  const openFullScreen = (imagePath) => {
    setFullScreenImage(imagePath);
  };

  const closeFullScreen = () => {
    setFullScreenImage(null);
  };

  const renderItem = ({ item, index }) => {
    const isLastItem = index === images.length - 1;
    const isOddIndex = index % 2 === 0;
    const isSingleInColumn = isLastItem && isOddIndex;

    return (
      <TouchableOpacity
        style={[
          styles.imageContainer,
          isSingleInColumn && styles.singleImageContainer
        ]}
        onPress={() => openFullScreen(item.path)}
      >
        <Image
          source={{ uri: `file://${item.path}` }}
          style={styles.image}
        />
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => showDialog(item.id)}
        >
          <Icon name="trash" size={24} color="#8994bc" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <Provider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Photos ✨ </Text>
        <View style={styles.listWrapper}>
          <FlatList
            data={images}
            keyExtractor={(item) => item.id}
            numColumns={2}
            renderItem={renderItem}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Content>
              <Text style={{ color: '#8994bc' }}>Êtes-vous sûr de vouloir supprimer cette image ? 🤔 </Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}
                    labelStyle={{ color: '#8994bc' }}  
                style={styles.dialogButton}>
                Annuler
              </Button>
              <Button onPress={handleDelete}
                labelStyle={{ color: '#8994bc' }}  
                style={styles.dialogButton}>
                Supprimer
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <Modal visible={!!fullScreenImage} transparent={true}>
          <View style={styles.fullScreenContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={closeFullScreen}>
              <Icon name="close" size={25} color="#8994bc" />
            </TouchableOpacity>
            <Image
              source={{ uri: `file://${fullScreenImage}` }}
              style={styles.fullScreenImage}
              resizeMode="contain"
            />
          </View>
        </Modal>
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,                
    fontWeight: 'bold',          
    color: '#8994bc',            
    textAlign: 'center',         
    textTransform: 'uppercase',  
    letterSpacing: 2,            
    margin: 20,            
    fontFamily: 'serif', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.8,          
    shadowRadius: 4,
    textShadowColor: '#d591ac',   
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,         
  },
  listWrapper: {
    flex: 1,
  },
  listContainer: {
    paddingBottom: 16,
  },
  imageContainer: {
    width: COLUMN_WIDTH,
    margin: ITEM_MARGIN, 
    padding: 4,
    shadowColor: '#FF00FF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 8,
    backgroundColor: '#fff',
    borderRadius: 16,
  },
  singleImageContainer: {
    alignSelf: 'flex-start',
  },
  image: {
    width: '100%',
    height: IMAGE_WIDTH,
    borderRadius: 16,
    overflow: 'hidden',
  },
  deleteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 4,
  },
  dialogButton: {
    borderWidth: 1,
    borderColor: '#FF00FF', 
    borderRadius: 8, 
    paddingHorizontal: 8,
  },
  fullScreenContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenImage: {
    width: width,
    height: height,
  },
  closeButton: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
    backgroundColor: 'white',
    borderRadius: 20,
  },
});

export default GalleryScreen;