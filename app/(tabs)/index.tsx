import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const App = () => {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Take Photo from Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Add Photo from Gallery</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: 120,
    height: 120,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
  },
});

export default App;
