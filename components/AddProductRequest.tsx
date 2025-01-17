import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';

const AddProductModal = ({ visible, onClose }) => {
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [productName, setProductName] = React.useState('');
  const [productDesc, setProductDesc] = React.useState('');

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
    <Modal animationType="slide" transparent visible={visible} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <KeyboardAvoidingView
          style={styles.modalContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView contentContainerStyle={{
            flexGrow: 1,
            paddingVertical: 20,
            }}
            keyboardShouldPersistTaps="handled"
          >
            {/* Close Button */}
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.crossText}>X</Text>
            </TouchableOpacity>

            {/* Add Space Between Close Button and Product Name Text Field */}
            <View style={{ marginBottom: 30 }} />

            {/* Product Name */}
            <LinearGradient colors={['#602A9D', '#88258A']} style={styles.gradientBackground}>
              <TextInput
                style={styles.nameTextInput}
                placeholder="Product name"
                placeholderTextColor="#fff"
                value={productName}
                onChangeText={setProductName}
              />
            </LinearGradient>

            {/* Buttons for Image Selection */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.imageButton} onPress={takePhotoFromCamera}>
                <Image
                  source={require('../assets/images/photoFromCamera.png')}
                  style={styles.imageButtonImage}
                />
                <Text style={styles.imageButtonText}>Take Product Photo</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.imageButton} onPress={pickImageFromGallery}>
                <Image
                  source={require('../assets/images/photoFromGallery.png')}
                  style={styles.imageButtonImage}
                />
                <Text style={styles.imageButtonText}>Choose from Gallery</Text>
              </TouchableOpacity>
            </View>

            {/* Display Selected Image */}
            {selectedImage && <Image source={{ uri: selectedImage }} style={styles.imagePreview} />}

            {/* Add Space Between Image Preview and Product Description */}
            <View style={{ marginBottom: 25 }} />

            {/* Optional Product Description Text Field */}
            <LinearGradient colors={['#602A9D', '#88258A']} style={styles.gradientBackground}>
              <TextInput
                style={styles.descTextInput}
                placeholder="Product description (optional)"
                placeholderTextColor="#fff"
                value={productDesc}
                onChangeText={setProductDesc}
                multiline
              />
            </LinearGradient>

            {/* Submit Button */}
            <TouchableOpacity style={styles.submitButton} onPress={onClose}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '90%',
    padding: 20,
    paddingTop: 1,
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
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'ffffff',
    zIndex: 1000,
    padding: 10,
  },
  crossText: {
    fontSize: 30,
    color: '#808080',
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#3B0C6F',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AddProductModal;
