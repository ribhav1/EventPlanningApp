import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { List, Divider } from 'react-native-paper';

import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

export default function MyInvitationsScreen({ navigation }) {
  const currentUser = firebase.auth().currentUser.toJSON();

  const [docId, setDocId] = useState('');
  const [invitationList, setInvitationList] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection('invitations')
      .where('inviteReceiver', '==', currentUser.email)
      .where('status', '==', 'sent')
      .onSnapshot((snapshot) => {
        var invitationList = snapshot.docs.map((doc) => {
          setDocId(doc.id);
          return doc.data();
        });
        setInvitationList(invitationList);
      });
  }, []);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={{ flexDirection: 'row' }}
        onPress={() =>
          navigation.navigate('Invitation Details', {
            item: item,
            invitationId: docId,
          })
        }>
        <View style={{ width: '60%' }}>
          <List.Item
            title={'Event Invite'}
            description={item.eventName}
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
      <FlatList
        data={invitationList}
        renderItem={renderItem}
        ListEmptyComponent={
          <View
            style={{
              padding: 20,
              alignItems: 'center',
            }}>
            <Text style={{ fontSize: 24, color: 'lightgray' }}>
              You Have No Invitations
            </Text>
          </View>
        }
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
