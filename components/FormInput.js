import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { TextInput } from 'react-native-paper';

const { width, height } = Dimensions.get('screen');

export default function FormInput({ labelName, propStyle, ...rest }) {
  return (
    <TextInput
      label={labelName}
      style={[styles.input, propStyle]}
      numberOfLines={1}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    marginTop: 10,
    marginBottom: 10,
    width: width / 1.5,
    height: height / 15
  }
});