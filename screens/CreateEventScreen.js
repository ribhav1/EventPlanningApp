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
import FormInput from '../components/FormInput';
import * as Location from 'expo-location';
import { Entypo } from '@expo/vector-icons';
import { showMessage, hideMessage } from 'react-native-flash-message';

export default function CreateEventScreen({ navigation }) {
  const [eventName, setEventName] = useState('');
  const [inviteUserEmail, setInviteUserEmail] = useState('');
  const [ageRequirement, setAgeRequirement] = useState('');

  const [location, setLocation] = useState(null);

  const [invitationSendList, setInvitationSendList] = useState([]);

  useEffect(() => {
    // getLocation();
  });

  // async function getLocation() {
  //   let { status } = await Location.requestForegroundPermissionsAsync();

  //   if (status !== 'granted') {
  //     this.setState({
  //       errorMessage: 'Permission to access location was denied',
  //     });
  //   }

  //   let location = await Location.getCurrentPositionAsync({});
  //   setLocation(location);
  // }
  // if (!location) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //       <ActivityIndicator size="large" color="black" />
  //     </View>
  //   );
  // }

  const addUserToInvitationList = () => {
    var updatedInviteList = [
      ...invitationSendList,
      {
        email: inviteUserEmail,
      },
    ];
    setInvitationSendList(updatedInviteList);
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{ flex: 0.25, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: '32' }}>Create Event</Text>
      </View>
      <View
        style={{
          flex: 0.75,
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 8,
            backgroundColor: 'lightgrey',
            width: '65%',
            height: '12%',
          }}
          onPress={() =>
            navigation.navigate('Confirm Event', {
              invitationSendList: invitationSendList,
              eventName: eventName,
              ageRequirement: ageRequirement,
            })
          }>
          <Text>Set Location</Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}></View>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{ fontSize: '24' }}>Event Name</Text>
          <FormInput
            labelName="Event Name"
            value={eventName}
            autoCapitalize="none"
            onChangeText={(eventName) => setEventName(eventName)}
          />
        </View>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{ fontSize: '24' }}>Invite User</Text>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <FormInput
              labelName="User Email"
              value={inviteUserEmail}
              autoCapitalize="none"
              onChangeText={(inviteUserEmail) =>
                setInviteUserEmail(inviteUserEmail)
              }
            />
            <TouchableOpacity>
              <Entypo
                name="plus"
                size={24}
                color="black"
                style={{ marginLeft: 10 }}
                onPress={() => {
                  addUserToInvitationList();
                  showMessage({
                    message: 'User added to invite list',
                    type: 'info',
                  });
                  setInviteUserEmail('');
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <FormInput
            propStyle={{ width: '20%', marginRight: 10 }}
            labelName="Age"
            value={ageRequirement}
            autoCapitalize="none"
            onChangeText={(ageRequirement) => setAgeRequirement(ageRequirement)}
          />
          <Text style={{ fontSize: '24' }}>Age Requirement</Text>
        </View>
      </View>
    </View>
  );
}
