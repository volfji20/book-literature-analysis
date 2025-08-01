import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import BubbleButtons from '../components/BubbleButtons';
import CustomText from '../components/CustomText';
import HorizontalCards from '../components/HorizontalCards';
// Icons
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomText2 from '../components/CustomText2';
import { localImages } from '../data/Images';
// import image from "../assets/images"
// Async Storage
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';

function DescriptionScreen({ route, navigation }) {
  const [selectedTab, setSelectedTab] = useState('About');
  const [isSaved, setIsSaved] = useState(false);
  const [savedBooks, setSavedBooks] = useState([]);
  const [savedBooksInLibrary, setSavedBooksInLibrary] = useState([]);

  const [isVisible, setIsVisible] = useState(false);
  const slideAnim = useRef(
    new Animated.Value(Dimensions.get('window').height),
  ).current; // Start off-screen
  const insets = useSafeAreaInsets();

  const { book, imagePath } = route.params;
  const scrollViewRef = useRef(null);
  const scrollY = useRef(new Animated.Value(0)).current;

  const containerHeight = scrollY.interpolate({
    inputRange: [0, 400],
    outputRange: [400, 80],
    extrapolate: 'clamp',
  });
  const translateY = scrollY.interpolate({
    inputRange: [0, 500],
    outputRange: [0, -1],
    extrapolate: 'clamp',
  });

  const imageOpacity = scrollY.interpolate({
    inputRange: [0, 200, 300],
    outputRange: [1, 0.0, 0],
    extrapolate: 'clamp',
  });

  const imageScale = scrollY.interpolate({
    inputRange: [0, 200, 340],
    outputRange: [1, 0.9, 0.8],
    extrapolate: 'clamp',
  });

  const toggleSaveBook = async book => {
    try {
      console.log('Saving Book:');
      console.log('Book Name:', book.book_name);
      console.log('Image Path (key):', book.image_path); // Log the image key

      // Map the image path to the local image using the key from localImages
      const imagePath = localImages[book.image_path];

      console.log('Mapped Image Path:', imagePath); // Log the resolved image path

      if (!imagePath) {
        console.log('Error: No image found for this book');
      }

      // Create a new book object with the image path
      const bookWithImage = { ...book, imagePath };

      const savedBooks =
        JSON.parse(await AsyncStorage.getItem('savedBooks')) || [];
      const bookIndex = savedBooks.findIndex(
        savedBook => savedBook.book_name === book.book_name,
      );

      if (bookIndex > -1) {
        savedBooks.splice(bookIndex, 1); // Remove the book if it's already saved
        setIsSaved(false);
      } else {
        savedBooks.push(bookWithImage); // Add the book with image path
        setIsSaved(true);
      }

      await AsyncStorage.setItem('savedBooks', JSON.stringify(savedBooks));
    } catch (error) {
      console.error('Error toggling book save:', error);
    }
  };

  // Fetching saved books from AsyncStorage
  useEffect(() => {
    const fetchSavedBooks = async () => {
      try {
        const savedBooksData = await AsyncStorage.getItem('savedBooks');
        const books = savedBooksData ? JSON.parse(savedBooksData) : [];
        setSavedBooksInLibrary(books);
        console.log('_______(***********________', books);
      } catch (error) {
        console.error('Error retrieving saved books:', error);
      }
    };

    fetchSavedBooks();
  }, []);

  // useEffect(() => {
  //   console.log('Books in LibraryScreen:', savedBooksInLibrary);
  // }, [savedBooksInLibrary]);

  useEffect(() => {
    const checkIfSaved = async () => {
      try {
        const savedBooks =
          JSON.parse(await AsyncStorage.getItem('savedBooks')) || [];
        const bookExists = savedBooks.some(
          savedBook => savedBook.book_name === book.book_name,
        );
        setIsSaved(bookExists);
      } catch (error) {
        console.error('Error checking if book is saved:', error);
      }
    };

    checkIfSaved();
  }, [book]);

  const toggleScreen = () => {
    if (isVisible) {
      Animated.timing(slideAnim, {
        toValue: Dimensions.get('window').height,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setIsVisible(false));
    } else {
      // Slide up to show
      setIsVisible(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const scrollX = useRef(new Animated.Value(0)).current;

  const headerHeight = scrollX.interpolate({
    inputRange: [0, 150],
    outputRange: [50, 0],
    extrapolate: 'clamp',
  });

  const headerFontSize = scrollX.interpolate({
    inputRange: [0, 150],
    outputRange: [24, 16],
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView style={styles.container}>
      {!isVisible ? (
        <>
          <TouchableOpacity
            onPress={() => navigation.pop()}
            style={[styles.backButton, { top: insets.top + 20 }]}>
            <AntDesign name="left" color="#fff" size={20} />
          </TouchableOpacity>

          <Animated.View
            style={[
              styles.imageContainer,
              {
                height: containerHeight,
                backgroundColor: '#04324d',
                overflow: 'hidden',
                transform: [{ translateY }],
              },
            ]}>
            <Animated.Image
              source={imagePath}
              style={[
                styles.image,
                {
                  opacity: imageOpacity,
                  transform: [{ scale: imageScale }],
                },
              ]}
            />
          </Animated.View>
          <View style={styles.buttonContainer}>
            <View style={styles.saveShareButton}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => toggleSaveBook(book)}>
                <FontAwesome
                  name={isSaved ? 'bookmark' : 'bookmark-o'}
                  color="#052332"
                  size={20}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Entypo name="share" color="#052332" size={20} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.button} onPress={toggleScreen}>
              <AntDesign name="playcircleo" color="#052332" size={20} />
            </TouchableOpacity>
          </View>

          <Animated.ScrollView
            ref={scrollViewRef}
            contentContainerStyle={styles.contentContainer}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: false },
            )}
            scrollEventThrottle={16}>
            <View style={styles.content}>
              <Text style={styles.title}>{book.book_name}</Text>
              <Text style={styles.author}>{book.author_name}</Text>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.bubbleContainer}>
                <BubbleButtons
                  label="Personal"
                  onPress={() => console.log('Personal pressed')}
                />
                <BubbleButtons
                  label="Communication"
                  onPress={() => console.log('Communication pressed')}
                />
                <BubbleButtons
                  label="Career"
                  onPress={() => console.log('Career pressed')}
                />

                <BubbleButtons
                  label="Career"
                  onPress={() => console.log('Career pressed')}
                />
              </ScrollView>

              <View style={styles.tabContainer}>
                <TouchableOpacity
                  onPress={() => setSelectedTab('About')}
                  style={[
                    styles.tabButton,
                    selectedTab === 'About' && styles.activeTab,
                  ]}>
                  <CustomText style={styles.tabText}>O díle</CustomText>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setSelectedTab('Quick')}
                  style={[
                    styles.tabButton,
                    selectedTab === 'Quick' && styles.activeTab,
                  ]}>
                  <CustomText style={styles.tabText}>Autor</CustomText>
                </TouchableOpacity>
              </View>
              {selectedTab === 'About' ? (
                <>
                  <View style={{ padding: 20 }}>
                    <CustomText style={styles.description}>
                      {book.description}
                      {book.description}
                      {book.description}
                      {book.description}
                      {book.description}
                      {book.description}
                    </CustomText>
                  </View>

                  <View
                    style={{ display: 'flex', paddingTop: 20, paddingLeft: 20 }}>
                    <CustomText style={styles.customText}>
                      Uložené rozbory:
                    </CustomText>
                  </View>

                  <ScrollView horizontal contentContainerStyle={{}}>
                    {savedBooksInLibrary.length > 0 ? (
                      savedBooksInLibrary.map((book, index) => (
                        <View style={styles.card} key={index}>
                          <TouchableOpacity
                            onPress={() =>
                              navigation.navigate('Description', {
                                book,
                                imagePath: localImages[book.image_path], // Assuming image_path is available here too
                              })
                            }>
                            <FastImage
                              source={localImages[book.image_path]}
                              style={styles.bookImage}
                              resizeMode='contain'
                            />
                          </TouchableOpacity>

                          <View style={styles.bookNameAndStatus}>
                            <CustomText style={styles.titleAnotherBook}>
                              {book.book_name}
                            </CustomText>
                            <AntDesign name="lock" color="#fff" size={20} />
                          </View>

                          <CustomText style={styles.grayText}>
                            {book.author_name}
                          </CustomText>
                          <CustomText style={styles.libraryDescription}>
                            {book.description && book.description.length > 20
                              ? `${book.description.substring(0, 50)}...`
                              : book.description}
                          </CustomText>
                        </View>
                      ))
                    ) : (
                    <View style={{ flex: 1, width: Dimensions.get('window').width, alignItems: 'center', justifyContent: 'center', paddingVertical: 20 }}>
                      <Text style={{ 
                        color: '#fff', 
                        textAlign: 'center',
                      }}>
                        Žádné knihy nejsou uloženy v knihovně
                      </Text>
                    </View>
                    )}
                  </ScrollView>
                </>
              ) : (
                <CustomText style={styles.author}>
                  {book.author_name}
                </CustomText>
              )}
            </View>
          </Animated.ScrollView>
        </>
      ) : (
        <View>
          <Animated.View style={[styles.header, { height: headerHeight }]}>
            <TouchableOpacity
              onPress={() => setIsVisible(!isVisible)}
              style={styles.backButtonDocument}>
              <AntDesign name="down" color="#fff" size={20} />
            </TouchableOpacity>

            <Animated.Text
              style={[styles.headerText, { fontSize: headerFontSize }]}>
              {book.book_name}
            </Animated.Text>
          </Animated.View>

          <ScrollView
            contentContainerStyle={styles.scrollViewContent}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollX } } }],
              { useNativeDriver: false },
            )}
            scrollEventThrottle={16}>
            {/* <CustomText style={styles.description}>{book.content}</CustomText> */}

            <CustomText2 style={styles.description}>{book.content}</CustomText2>
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bubbleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#052332',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  backButtonDocument: {
    // position: 'absolute',
    // top: 20,
    // left: 20,
    // zIndex: 1,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '50%',
    height: '70%',
    resizeMode: 'cover',
  },
  contentContainer: {
    zIndex: -1000,
  },
  content: {
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    paddingHorizontal: 20,
  },


  titleAnotherBook: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    // paddingHorizontal: 20,
  },

  author: {
    fontSize: 18,
    color: '#ccc',
    paddingHorizontal: 20,
  },
  description: {
    fontSize: 16,
    marginTop: 10,
    padding: 20,
  },

  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -20,
  },
  saveShareButton: {
    display: 'flex',
    flexDirection: 'row',
  },

  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 50,
    width: 50,
    borderRadius: 25,
    elevation: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#fff',
  },
  tabText: {
    fontSize: 16,
  },
  customText: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  grayText: {
    color: '#798a90',
  },

  card: {
    borderRadius: 10,
    padding: 10,
    margin: 10,
    width: 180,
  },

  writer: {
    color: 'gray',
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
  header: {
    backgroundColor: '#04324d',
    alignItems: 'center',
    zIndex: 1,
    flexDirection: 'row',
    paddingLeft: 10,
  },
  headerText: {
    color: '#fff',
    marginLeft: 50,
    fontSize: 19,
  },
});

export default DescriptionScreen;
