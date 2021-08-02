import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

export default function CreateEventScreen({ route, navigation }) {
  const [searchLocationName, setSearchLocationName] = useState('');
  const [searchLocation, setSearchLocation] = useState({
    latitude: null,
    longitude: null,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const currentUser = firebase.auth().currentUser.toJSON();

  const { invitationSendList, eventName, ageRequirement } = route.params;

  const createEvent = () => {
    firebase
      .firestore()
      .collection('events')
      .add({
        creator: currentUser.email,
        eventName: eventName,
        ageRequirement: ageRequirement,
        attendees: [currentUser.email],
        declinedInvite: [],
        locationName: searchLocationName,
        locationCoords: [searchLocation.latitude, searchLocation.longitude],
      })
      .then((docRef) => {
        invitationSendList.map((user) => {
          firebase
            .firestore()
            .collection('invitations')
            .add({
              inviteReceiver: user.email,
              eventAgeRequirement: ageRequirement,
              eventName: eventName,
              eventDocId: docRef.id,
              location: searchLocationName,
              eventLocationCoords: [
                searchLocation.latitude,
                searchLocation.longitude,
              ],
              status: 'sent',
            });
        });
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{ flex: 0.15, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: '32' }}>Create Event</Text>
      </View>
      <View
        style={{
          flex: 0.85,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <GooglePlacesAutocomplete
          textInputProps={{
            borderRadius: 15,
            marginTop: 25,
            flex: 0.9,
            marginLeft: '8%',
          }}
          style={{
            borderRadius: 15,
            marginTop: 15,
            width: '90%',
            marginLeft: '5%',
          }}
          placeholder="Search for a location..."
          fetchDetails={true}
          GooglePlacesSearchQuery={{
            rankby: 'distance',
          }}
          onPress={(data, details = null) => {
            setSearchLocationName(data.structured_formatting.main_text);
            setSearchLocation({
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            });
          }}
          query={{
            key: 'AIzaSyBe8hHp_fBG2ZIRNNaKBUUvw6q4n7T6dic',
            language: 'en',
            components: 'country:us',
            types: 'establishment',
            radius: 30000,
            location: {
              latitude: searchLocation.latitude,
              longitude: searchLocation.longitude,
            },
          }}
          styles={{
            container: {
              flex: 0,
              position: 'relative',
              width: '100%',
              zIndex: 1,
            },
            listView: { backgroundColor: 'white' },
          }}
        />
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 8,
            backgroundColor: 'lightgrey',
            width: '65%',
            height: '12%',
            marginBottom: 25,
          }}
          onPress={() => {
            createEvent();
            navigation.navigate('My Events');
          }}>
          <Text>Create Event</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
