import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
  Modal,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [productName, setProductName] = useState('');
  const [productDesc, setProductDesc] = useState('');

  const pickImageFromGallery = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert('Permission to access the gallery is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const takePhotoFromCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (!permissionResult.granted) {
      alert('Permission to access the camera is required!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.mainContainer}>
      {/* Add Product Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>Add Product</Text>
      </TouchableOpacity>

      {/* Modal for Adding Product */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {/* Product Name Text Field */}
            <LinearGradient
              colors={["#C84DCB", "#5A32A0"]}
              style={styles.gradientBackground}
            >
              <TextInput
                style={styles.nameTextInput}
                placeholder="Product name"
                placeholderTextColor="#fff"
                value={productName}
                onChangeText={(text) => setProductName(text)}
              />
            </LinearGradient>

            {/* Buttons for Image Selection */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.imageButton} onPress={takePhotoFromCamera}>
                <Image
                  source={require('../../assets/images/photoFromCamera.png')} // Add your image file path here
                  style={styles.imageButtonImage}
                />
                <Text style={styles.imageButtonText}>Take Product Photo from Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.imageButton} onPress={pickImageFromGallery}>
                <Image
                  source={require('../../assets/images/photoFromGallery.png')} // Add your image file path here
                  style={styles.imageButtonImage}
                />
                <Text style={styles.imageButtonText}>Add Product Photo from Gallery</Text>
              </TouchableOpacity>
            </View>

            {/* Display Selected Image */}
            {selectedImage && (
              <Image source={{ uri: selectedImage }} style={styles.imagePreview} />
            )}

            {/* Optional Product Description Text Field */}
            <LinearGradient
              colors={["#C84DCB", "#5A32A0"]}
              style={styles.gradientBackground}
            >
              <TextInput
                style={styles.descTextInput}
                placeholder="Product description (optional)"
                placeholderTextColor="#fff"
                value={productDesc}
                onChangeText={(text) => setProductDesc(text)}
                multiline={true}
              />
            </LinearGradient>

            {/* Submit Button */}
            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>

            {/* Close Modal Button */}
            <TouchableOpacity
              style={styles.closeModalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  addButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '90%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  nameTextInput: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#fff',
    backgroundColor: 'transparent',
  },
  descTextInput: {
    width: '100%',
    height: 125,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingTop: 10,
    fontSize: 16,
    color: '#fff',
    backgroundColor: 'transparent',
  },
  gradientBackground: {
    borderRadius: 10,
    marginBottom: 20,
    padding: 2, // Optional for better border effect
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  imageButton: {
    flex: 1,
    height: 120,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#b2b1b5',
    elevation: 5, // shadow properties for Android
    // shadow properties for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  imageButtonText: {
    color: '#000',
    textAlign: 'center',
    fontSize: 11,
    paddingHorizontal: 15,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
  },
  imageButtonImage: {
    width: 50,
    height: 50,
    marginBottom: 5,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginTop: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  closeModalButton: {
    backgroundColor: '#ff3b30',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: '#3d1b7d',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
