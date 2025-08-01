import { StyleSheet, Image, View, TouchableOpacity } from 'react-native';
import React from 'react';
import CustomText from './CustomText';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FastImage from 'react-native-fast-image';

const HorizontalCards = ({ image_path, book_name, author_name, description, free, onPress }) => {
  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={onPress}>
        <FastImage source={image_path} style={styles.bookImage} />

      </TouchableOpacity>

      <View style={styles.bookNameAndStatus}>
        <CustomText style={styles.title}>{book_name}</CustomText>
        {free ?
          <AntDesign name="unlock" color="#fff" size={20} />
          :
          <AntDesign name="lock" color="#fff" size={20} />
        }
      </View>

      <CustomText style={styles.grayText}>{author_name}</CustomText>
      <CustomText style={styles.description}>{description}</CustomText>
    </View>
  );
};

export default HorizontalCards;

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    padding: 10,
    margin: 10,
    width: 180,
  },

  title: {
    fontWeight: 'bold',
    marginVertical: 5,
  },
  writer: {
    color: 'gray',
  },
  description: {
    marginVertical: 5,
  },

  bookImage: {
    width: '100%',
    height: 200,
  },
  bookNameAndStatus: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  grayText: {
    color: '#798a90',
  },
});
