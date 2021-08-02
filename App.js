import React from 'react';
import { View } from 'react-native';
import Providers from './navigation';
import db from './config';
import FlashMessage from 'react-native-flash-message';

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <Providers />
      <FlashMessage position="top" />
    </View>
  );
}
