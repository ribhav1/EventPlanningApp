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

export default function InvitationsDetailsScren({ route, navigation }) {
  const currentUser = firebase.auth().currentUser.toJSON();

  const { item, invitationId } = route.params;

  function acceptInvite() {
    firebase.firestore().collection('invitations').doc(invitationId).update({
      status: 'accepted',
    });
    firebase
      .firestore()
      .collection('events')
      .doc(item.eventDocId)
      .update({
        attendees: firebase.firestore.FieldValue.arrayUnion(currentUser.email),
      });
  }

  function declineInvite() {
    firebase.firestore().collection('invitations').doc(invitationId).update({
      status: 'declined',
    });
    firebase
      .firestore()
      .collection('events')
      .doc(item.eventDocId)
      .update({
        declinedInvite: firebase.firestore.FieldValue.arrayUnion(
          currentUser.email
        ),
      });
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 0.05 }}>
        <Ionicons
          name="arrow-back"
          size={35}
          color="black"
          style={{ marginLeft: '2%' }}
          onPress={() => navigation.goBack()}
        />
      </View>
      <View
        style={{
          flex: 0.3,
          justifyContent: 'center',
          alignItems: 'flex-start',
          marginLeft: '15%',
        }}>
        <Text style={{ fontSize: 15 }}>Event name</Text>
        <Text style={{ fontSize: 50 }}>{item.eventName}</Text>
        <Text style={{ fontSize: 15, marginTop: '5%' }}>Location</Text>
        <Text style={{ fontSize: 25 }}>{item.location}</Text>
      </View>
      <View
        style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
        <MapView
          style={{ width: '90%', height: '90%', borderRadius: 25 }}
          initialRegion={{
            latitude: item.eventLocationCoords[0],
            longitude: item.eventLocationCoords[1],
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          provider={PROVIDER_GOOGLE}>
          <Marker
            coordinate={{
              latitude: item.eventLocationCoords[0],
              longitude: item.eventLocationCoords[1],
            }}
          />
        </MapView>
      </View>
      <View
        style={{
          flex: 0.2,
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{
            borderRadius: 15,
            backgroundColor: 'lightgray',
            width: '45%',
            height: '50%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            acceptInvite();
            navigation.navigate('My Invitations');
          }}>
          <Text style={{ fontSize: 18 }}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderRadius: 15,
            backgroundColor: 'lightgray',
            width: '45%',
            height: '50%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            declineInvite();
            navigation.navigate('My Invitations');
          }}>
          <Text style={{ fontSize: 18 }}>Decline</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
