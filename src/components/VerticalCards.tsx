import { StyleSheet, Image, View, TouchableOpacity } from 'react-native';
import CustomText from './CustomText';
import AntDesign from 'react-native-vector-icons/AntDesign';
import React from 'react';
import FastImage from 'react-native-fast-image';

const VerticalCart = ({
  image_path,
  book_name,
  author_name,
  description,
  free,
  onPress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={onPress}>
          <FastImage source={image_path} style={styles.verticalImage} />
        </TouchableOpacity>
        <View>
          <CustomText style={styles.verticalName}>{book_name}</CustomText>
          <CustomText style={styles.verticalWriter}>{author_name}</CustomText>
          <CustomText style={styles.verticalDescription}>
            {description}
          </CustomText>
        </View>
      </View>

      <View style={styles.iconContainer}>
        {free ?
          <AntDesign name="unlock" color="#fff" size={20} />
          :
          <AntDesign name="lock" color="#fff" size={20} />
        }
      </View>
    </View>
  );
};

export default VerticalCart;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginBottom: 10,
  },
  profileContainer: {
    flexDirection: 'row',
  },

  verticalImage: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  scrollView1: {
    width: '100%',
  },

  verticalWriter: {
    fontSize: 14,
    marginTop: 5,
  },
  verticalDescription: {
    fontSize: 14,
    flexWrap: 'wrap',
    width: 180,
    marginTop: 5,
  },
  verticalIconContainer: {
    marginLeft: 10,
  },
  verticalNoBooksText: {
    textAlign: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  iconContainer: {
    marginLeft: 10,
  },
});
