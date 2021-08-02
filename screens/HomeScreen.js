import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import { List } from 'react-native-paper';

import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

export default function HomeScreen({ navigation }) {
  const currentUser = firebase.auth().currentUser.toJSON();

  const [attendingEvents, setAttendingEvents] = useState('');

  useEffect(() => {
    firebase
      .firestore()
      .collection('events')
      .where('attendees', 'array-contains', currentUser.email)
      .onSnapshot((snapshot) => {
        var attendingEvents = snapshot.docs.map((doc) => doc.data());
        setAttendingEvents(attendingEvents);
      });
  }, []);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={{ flexDirection: 'row' }}
        onPress={() => navigation.navigate('Attending Event Details', { item: item })}>
        <View style={{ width: '60%' }}>
          <List.Item
            title={item.eventName}
            description={item.locationName}
            titleNumberOfLines={1}
            titleStyle={styles.listTitle}
            descriptionStyle={styles.listDescription}
            descriptionNumberOfLines={1}
          />
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: 'lightgray' }}>Click to view</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{ flex: 0.12, justifyContent: 'flex-end' }}>
        <Text style={{ fontSize: 28, marginLeft: '4%' }}>Events I'm Attending</Text>
      </View>

      <FlatList data={attendingEvents} renderItem={renderItem} ListEmptyComponent={
          <View
            style={{
              padding: 20,
              alignItems: 'center',
            }}>
            <Text style={{ fontSize: 24, color: 'lightgray' }}>
              You Are Attending No Events
            </Text>
          </View>
        } />
    </View>
  );
}

const styles = StyleSheet.create({
  listTitle: {
    fontSize: 26,
  },
  listDescription: {
    fontSize: 20,
  },
});
