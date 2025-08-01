import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';

const BubbleButtons = ({label, onPress}) => {
  return (
    <TouchableOpacity style={styles.bubbleButton} onPress={onPress}>
      <Text style={styles.bubbleButtonText}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  bubbleButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginLeft: 20,
  },
  bubbleButtonText: {
    fontSize: 14,
    color: '#000',
  },
});

export default BubbleButtons;
