import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import CustomText from './CustomText';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

const BottomTabs: React.FC<BottomTabsProps> = ({
  setCurrentScreen,
  currentScreen,
}) => {
  interface BottomTabsProps {
    setCurrentScreen: React.Dispatch<React.SetStateAction<string>>;
    currentScreen: string;
  }
  return (
    <View style={styles.bottomTab}>
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => setCurrentScreen('Home')}>
        <Ionicons
          name={currentScreen === 'Home' ? 'home' : 'home-outline'}
          color={currentScreen === 'Home' ? '#2de07f' : '#fff'}
          size={30}
        />

        <CustomText
          style={{
            color: currentScreen === 'Home' ? '#2de07f' : '#fff',
          }}>
          Home
        </CustomText>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => setCurrentScreen('Search')}>
        <AntDesign
          name={currentScreen === 'Search' ? 'search1' : 'search1'}
          size={30}
          color={currentScreen === 'Search' ? '#2de07f' : '#fff'}
        />
        <CustomText
          style={{
            color: currentScreen === 'Search' ? '#2de07f' : '#fff',
          }}>
          Explore
        </CustomText>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => setCurrentScreen('Library')}>
        <FontAwesome
          // name="bookmark-o"
          name={currentScreen === 'Library' ? 'bookmark' : 'bookmark-o'}
          size={30}
          color={currentScreen === 'Library' ? '#2de07f' : '#fff'}
        />
        <CustomText
          style={{
            color: currentScreen === 'Library' ? '#2de07f' : '#fff',
          }}>
          My Library
        </CustomText>
      </TouchableOpacity>
    </View>
  );
};

export default BottomTabs;

const styles = StyleSheet.create({
  bottomTab: {
    flexDirection: 'row',
    height: 60,
    borderTopWidth: 1,
    borderTopColor: '#04324d',
    backgroundColor: '#04324d',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabButton: {
    alignItems: 'center',
  },
  tabLabel: {
    fontSize: 12,
    color: 'gray',
  },
  activeTab: {
    color: '#2de07f',
  },
});
