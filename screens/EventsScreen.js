import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { List } from 'react-native-paper';

import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

export default function EventsScreen({ navigation }) {
  const currentUser = firebase.auth().currentUser.toJSON();

  const [eventsList, setEventsList] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection('events')
      .where('creator', '==', currentUser.email)
      .onSnapshot((snapshot) => {
        var eventsList = snapshot.docs.map((doc) => doc.data());
        setEventsList(eventsList);
      });
  }, []);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={{ flexDirection: 'row' }}
        onPress={() => navigation.navigate('Event Details', { item: item })}>
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
      <View style={{ flex: 0.12, justifyContent: 'flex-end' }}>
        <Text style={{ fontSize: 28, marginLeft: '4%' }}>My Events</Text>
      </View>
      <FlatList
        data={eventsList}
        renderItem={renderItem}
        ListEmptyComponent={
          <View
            style={{
              padding: 20,
              alignItems: 'center',
            }}>
            <Text style={{ fontSize: 24, color: 'lightgray' }}>
              You Haven't Created Any Events
            </Text>
            <View style={{ marginVertical: '3%' }}></View>
            <Text style={{ fontSize: 24, color: 'lightgray' }}>
              Click the Plus to create an event
            </Text>
          </View>
        }
      />
      <Ionicons
        name="add-circle-outline"
        size={60}
        color="black"
        onPress={() => navigation.navigate('Create Event')}
        style={{ position: 'absoulte', left: '75%', bottom: '5%' }}
      />
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
