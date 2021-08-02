import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import MapView, {
  Callout,
  Circle,
  Marker,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';

import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

export default function EventDetailsScreen({ route, navigation }) {
  const currentUser = firebase.auth().currentUser.toJSON();

  const { item } = route.params;

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 0.05 }}></View>
      <View
        style={{
          flex: 0.4,
          justifyContent: 'center',
          alignItems: 'flex-start',
          marginLeft: '15%',
        }}>
        <Text style={{ fontSize: 15, borderBottomWidth: 1 }}>Event name</Text>
        <Text style={{ fontSize: 35 }}>{item.eventName}</Text>
        <Text style={{ fontSize: 15, borderBottomWidth: 1, marginTop: '5%' }}>Location</Text>
        <Text style={{ fontSize: 25}}>{item.locationName}</Text>
        <Text style={{ fontSize: 15, borderBottomWidth: 1, marginTop: '5%' }}>Creator</Text>
        <Text style={{ fontSize: 25}}>Me, {item.creator}</Text>
        <Text style={{ fontSize: 15, borderBottomWidth: 1, marginTop: '5%' }}>Age Requirement</Text>
        <Text style={{ fontSize: 25}}>{item.ageRequirement}</Text>
      </View>
      <View
        style={{ flex: 0.55, justifyContent: 'center', alignItems: 'center' }}>
        <MapView
          style={{ width: '90%', height: '90%', borderRadius: 25 }}
          initialRegion={{
            latitude: item.locationCoords[0],
            longitude: item.locationCoords[1],
            latitudeDelta: 0.03,
            longitudeDelta: 0.03,
          }}
          provider={PROVIDER_GOOGLE}>
          <Marker
            coordinate={{
              latitude: item.locationCoords[0],
              longitude: item.locationCoords[1],
            }}
          />
        </MapView>
      </View>
    </View>
  );
}
