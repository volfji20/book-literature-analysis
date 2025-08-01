import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

const BookImage = ({ uri, index }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <View style={styles.imageContainer}>
      {isLoading && (
        <ActivityIndicator
          size="large"
          color="#fff"
          style={styles.loader}
        />
      )}
      <Image
        style={[styles.bookImage, isLoading ? { display: 'none' } : null]}
        source={{ uri }}
        onLoadStart={() => {
          console.log(`Image ${index} loading started: ${uri}`);
          setIsLoading(true);
        }}
        onLoad={() => {
          console.log(`Image ${index} loaded successfully: ${uri}`);
          setIsLoading(false);
        }}
        onError={(error) => {
          console.log(`Image ${index} failed to load: ${uri}`, error.nativeEvent);
          setIsLoading(false);
        }}
      />
    </View>
  );
};




const styles = StyleSheet.create({
  homeContent: {
    backgroundColor: '#04324d',
    marginTop: 20,
    padding: 20,
    borderRadius: 6,
  },
  customText: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  customTextBookName: {
    fontSize: 18,
  },
  grayText: {
    color: '#798a90',
  },
  image: {
    width: '100%',
    height: '100%',
  },

  bookInfo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: 5,
  },
  freeBlink: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },

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

  scrollView: {
    paddingVertical: 10,
  },

  bookImage: {
    width: 170,
    height: 250,
  },
  bookNameAndStatus: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});



export default BookImage;
