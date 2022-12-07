import React from 'react';
import {StyleSheet, Text, TextInput} from 'react-native';

const InputOS = ({
  label,
  placeholder,
  keyboardType,
  isTextArea,
  onChangeText,
  namaState,
  value,
  placeholderColor,
}) => {
  if (isTextArea) {
    return (
      <>
        <Text style={styles.label}>{label} :</Text>
        <TextInput
          multiline={true}
          numberOfLines={4}
          placeholder={placeholder}
          placeholderTextColor={placeholderColor}
          style={styles.textInputArea}
          keyboardType={keyboardType}
          value={value}
          onChangeText={(text) => onChangeText(namaState, text)}
        />
      </>
    );
  }

  return (
    <>
      <Text style={styles.label}>{label} </Text>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={"#000"}
        style={styles.textInput}
        keyboardType={keyboardType}
        value={value}
        onChangeText={(text) => onChangeText(namaState, text)}
      />
    </>
  );
};

export default InputOS;

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    color: "#000000",
  },
  textInputArea: {
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});
