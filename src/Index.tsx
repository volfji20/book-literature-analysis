// Index.tsx
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Platform,
  Keyboard,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
// Components
// import HomeScreen from './screens/HomeScreen';
// import SearchScreen from './screens/SearchScreen';
// import LibraryScreen from './screens/LibraryScreen';
// import BottomTabs from './components/BottomTabs';

// Icons
import Icon from 'react-native-vector-icons/AntDesign';
import Notification from 'react-native-vector-icons/Ionicons';
import NotificationModal from './components/NotificationModal';

// Navigation
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Index = ({ children, currentScreen }) => {
  const navigation = useNavigation();
  // const [currentScreen, setCurrentScreen] = useState('Home');
  // const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const scrollY = useRef(new Animated.Value(0)).current;

  // const renderScreen = () => {
  //   switch (currentScreen) {
  //     case 'Home':
  //       return <HomeScreen />;
  //     case 'Search':
  //       return <SearchScreen />;
  //     case 'Library':
  //       return <LibraryScreen />;
  //     default:
  //       return <HomeScreen />;
  //   }
  // };
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 70],
    outputRange: [100, 60],
    extrapolate: 'clamp',
  });

  const fontSize = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [30, 17],
    extrapolate: 'clamp',
  });

  const textPositionBottom = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: ['10%', '30%'],
    extrapolate: 'clamp',
  });

  const shadowOpacity = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [0, 0.5],
    extrapolate: 'clamp',
  });

  const elevation = scrollY.interpolate({
    inputRange: [0, 20],
    outputRange: [0, 20],
    extrapolate: 'clamp',
  });

  const underlineOpacity = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  // useEffect(() => {
  //   const keyboardDidShowListener = Keyboard.addListener(
  //     'keyboardDidShow',
  //     () => {
  //       setKeyboardVisible(true);
  //     },
  //   );

  //   const keyboardDidHideListener = Keyboard.addListener(
  //     'keyboardDidHide',
  //     () => {
  //       setKeyboardVisible(false);
  //     },
  //   );

  //   return () => {
  //     keyboardDidHideListener.remove();
  //     keyboardDidShowListener.remove();
  //   };
  // }, []);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0} // Adjust the offset as needed
      >
        <View style={styles.container}>
          {/* <Header /> */}

          <Animated.View
            style={[
              styles.header,
              {
                height: headerHeight,
                shadowOpacity: Platform.OS === 'ios' ? shadowOpacity : undefined,
                elevation: Platform.OS === 'android' ? elevation : 0,
              },
            ]}>
            <Animated.Text
              style={[
                styles.title,
                {
                  fontSize,
                  position: 'absolute',
                  bottom: textPositionBottom,
                },
              ]}>
              {currentScreen}
            </Animated.Text>

            <Animated.View
              style={[
                {
                  opacity: underlineOpacity,
                  width: '22%',
                  position: 'absolute',
                  bottom: '2%',
                  left: 20,
                  height: 2,
                  backgroundColor: '#30df84',
                  borderRadius: 10,
                },
              ]}
            />

            {/* {currentScreen === 'Search' ? null : ( */}
            <View style={styles.iconContainer}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Settings');
                }}>
                <Icon name="setting" size={30} color="white" />
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleModal}>
                <Notification
                  name="notifications-outline"
                  size={30}
                  color="white"
                />
              </TouchableOpacity>
            </View>

            <NotificationModal
              isVisible={isModalVisible}
              toggleModal={toggleModal}
            />
            {/* )} */}
          </Animated.View>

          <Animated.ScrollView
            contentContainerStyle={styles.content}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: false },
            )}
            scrollEventThrottle={16}
            scrollIndicatorInsets={{ top: 100 }}>
            {children}
          </Animated.ScrollView>

          {/* {!isKeyboardVisible && (
            <BottomTabs
              setCurrentScreen={setCurrentScreen}
              currentScreen={currentScreen}
            />
          )} */}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#052332'
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    position: 'absolute',
    left: '5%',
    bottom: '30%',
    transform: [{ translateX: -50 }],
    color: '#fff',
  },
  screenContainer: {
    flex: 1,
    padding: 16,
  },
  content: {
    paddingTop: 100,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#052332',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  iconContainer: {
    position: 'absolute',
    top: 10,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 80,
    zIndex: 1000,
    marginTop: 10,
  },
});

export default Index;
