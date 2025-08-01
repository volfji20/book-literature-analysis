import {View, StyleSheet, Image} from 'react-native';
import splash from '../assets/icons/reAding-3.png';
import React from 'react';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.splashIcon} source={splash} />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#052230',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashIcon: {height: '80%', width: '80%'},
});
