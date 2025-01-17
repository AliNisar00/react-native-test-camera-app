import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
  Modal,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import AddProductModal from '../../components/AddProductRequest'; // Importing the new modal component

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);

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
      <AddProductModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />

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
});

export default App;
