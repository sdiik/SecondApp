import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

const ObjectListScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Object List Screen</Text>

      <TouchableOpacity onPress={() => Alert.alert('Button Pressed!')}>
        <View style={{ marginTop: 20, padding: 10, backgroundColor: 'blue' }}>
          <Text style={{ color: 'white' }}>Logout</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ObjectListScreen;
