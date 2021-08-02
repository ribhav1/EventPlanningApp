import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import { Avatar } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';

import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';

import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

export default function ProfileScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  const [newName, setNewName] = useState('');
  const [newAge, setNewAge] = useState('');
  const [newContactNumber, setNewContactNumber] = useState('');

  const [imageUri, setImageUri] = useState('#');

  const currentUser = firebase.auth().currentUser.toJSON();

  const getUserDetails = () => {
    var userDetailsRef = firebase
      .firestore()
      .collection('users')
      .doc(currentUser.email);

    userDetailsRef
      .get()
      .then((doc) => {
        setEmail(doc.data().email);
        setName(doc.data().name);
        setAge(doc.data().age);
        setContactNumber(doc.data().contactNumber);
      })
  };

  useEffect(() => {
    getUserDetails();
    fetchImage(currentUser.email);
  });

  const selectPicture = async () => {
    const { canceled, uri } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!canceled) {
      uploadImage(uri, currentUser.email);
    }
  };

  const uploadImage = async (uri, imageName) => {
    var response = await fetch(uri);
    var blob = await response.blob();
    var ref = firebase
      .storage()
      .ref()
      .child('user_profiles/' + imageName);
    return ref.put(blob).then((response) => {
      fetchImage(imageName);
    });
  };

  const fetchImage = (imageName) => {
    var storageRef = firebase
      .storage()
      .ref()
      .child('user_profiles/' + imageName);
    storageRef.getDownloadURL().then((url) => {
      setImageUri(url).catch((error) => {
        setImageUri('#');
      });
    });
  };

  const updateUserDetails = () => {
    firebase.firestore().collection('users').doc(currentUser.email).update({
      name: newName,
      age: newAge,
      contactNumber: newContactNumber,
    });

    Alert.alert('Profile Updated Successfully');
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flex: 0.4,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        <Avatar
          rounded
          source={{
            uri: imageUri,
          }}
          size="medium"
          onPress={() => selectPicture()}
          containerStyle={styles.imageContainer}
          showEditButton
        />
        <Text style={{ fontWeight: '100', fontSize: 20, paddingTop: 10 }}>
          {name}
        </Text>
      </View>
      <View
        style={{ flex: 0.6, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Edit Details</Text>
        <FormInput
          labelName={name}
          value={newName}
          onChangeText={(userName) => setNewName(userName)}
        />
        <FormInput
          labelName={age}
          value={newAge}
          onChangeText={(userAge) => setNewAge(userAge)}
        />
        <FormInput
          labelName={contactNumber}
          value={newContactNumber}
          onChangeText={(userContactNumber) =>
            setNewContactNumber(userContactNumber)
          }
        />
        <FormButton
          title="Update Profile"
          modeValue="contained"
          containerStyle={{ width: '100%' }}
          labelStyle={{ fontSize: 22 }}
          onPress={() => {
            updateUserDetails();
            getUserDetails();
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 0.75,
    width: '50%',
    height: '80%',
    marginTop: 30,
    borderRadius: 40,
  },
});
