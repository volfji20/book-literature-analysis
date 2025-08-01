// screens/Header.tsx
import React from 'react';
import {View,  StyleSheet, TouchableOpacity} from 'react-native';
import CustomText from './CustomText';

const Header = () => {
  return (
    <View style={styles.header}>
      <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.iconButton}>
          <CustomText>Notification</CustomText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
        <CustomText>Settings</CustomText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 60,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    elevation: 3,
    color: '#fff',
  },

  Text: {
    color: '#fff',
  },

  iconContainer: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 16,
  },
});

export default Header;
