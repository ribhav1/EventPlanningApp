import React, { useState, useContext } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Title, IconButton } from 'react-native-paper';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import { AuthContext } from '../navigation/AuthProvider';

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  const { register } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Title style={styles.titleText}>Register to chat</Title>
      <FormInput
        labelName='Email'
        value={email}
        autoCapitalize='none'
        onChangeText={userEmail => setEmail(userEmail)}
      />
      <FormInput
        labelName='Password'
        value={password}
        secureTextEntry={true}
        onChangeText={userPassword => setPassword(userPassword)}
      />
      <FormInput
        labelName='Name'
        value={name}
        onChangeText={userName => setName(userName)}
      />
      <FormInput
        labelName='Age'
        value={age}
        onChangeText={userAge => setAge(userAge)}
      />
      <FormInput
        labelName='Contact Number'
        value={contactNumber}
        onChangeText={userContactNumber => setContactNumber(userContactNumber)}
      />
      <FormButton
        title='Signup'
        modeValue='contained'
        labelStyle={styles.loginButtonLabel}
        onPress={() => register(email, password, name, age, contactNumber)}
      />
      <IconButton
        icon='arrow-back'
        size={30}
        style={styles.navButton}
        color='#6646ee'
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleText: {
    fontSize: 24,
    marginBottom: 10
  },
  loginButtonLabel: {
    fontSize: 22
  },
  navButton: {
    marginTop: 10
  },
});