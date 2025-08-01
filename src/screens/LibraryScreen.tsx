import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from 'react-native';
// Async Storage
import AsyncStorage from '@react-native-async-storage/async-storage';
// Icons
import CustomText from '../components/CustomText';
import SearchBar from '../components/SearchBar';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { localImages } from '../data/Images';
import FastImage from 'react-native-fast-image';

// Navigation
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const ITEM_HEIGHT = 100;

const LibraryScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [savedBooks, setSavedBooks] = useState([]);
  const [search, setSearch] = useState('');
  const navigation = useNavigation();

  const filteredBooks = savedBooks.filter(book => {
    const lowercasedQuery = search.toLowerCase();
    return (
      book.book_name.toLowerCase().includes(lowercasedQuery) ||
      book.author_name.toLowerCase().includes(lowercasedQuery) ||
      book.description.toLowerCase().includes(lowercasedQuery)
    );
  });

  useFocusEffect(
    useCallback(() => {
      fetchSavedBooks()
    }, [])
  );

  const fetchSavedBooks = async () => {
    try {
      const savedBooksData = await AsyncStorage.getItem('savedBooks');
      const books = savedBooksData ? JSON.parse(savedBooksData) : [];
      console.log('Books Fetched from AsyncStorage:', books); // Log the books fetched from AsyncStorage
      setSavedBooks(books);
    } catch (error) {
      console.error('Error fetching saved books:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ width: '100%' }}>
      <SearchBar
        search={search}
        setSearch={setSearch}
        placeholder="Název, autor nebo téma..."
      />

      <FlatList
        data={filteredBooks}
        keyExtractor={(_, index) => index.toString()}
        ListEmptyComponent={<CustomText style={styles.noBooksText}>Nebyly nalezeny žádné knihy</CustomText>}
        initialNumToRender={5}
        maxToRenderPerBatch={3}
        windowSize={4}
        removeClippedSubviews={true}
        updateCellsBatchingPeriod={100}
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
        getItemLayout={(data, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}
        renderItem={({ item: book }) => (
          <View style={styles.container}>
            <View style={styles.profileContainer}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Description', {
                    book,
                    imagePath: localImages[book.image_path],
                  })
                }>
                {book.imagePath ? (
                  <FastImage source={book.imagePath} style={styles.image} />
                ) : null}
              </TouchableOpacity>

              <View>
                <CustomText style={styles.name}>{book.book_name}</CustomText>
                <CustomText style={styles.writer}>
                  {book.author_name}
                </CustomText>
                <CustomText style={styles.description}>
                  {book.description && book.description.length > 20
                    ? `${book.description.substring(0, 50)}...`
                    : book.description}
                </CustomText>
              </View>
            </View>

            <View style={styles.iconContainer}>
              {book.free ?
                <AntDesign name="unlock" color="#fff" size={20} />
                :
                <AntDesign name="lock" color="#fff" size={20} />
              }
            </View>
          </View>
        )}
      />
    </View>
  );
};

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
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  writer: {
    fontSize: 14,
    marginTop: 5,
  },
  description: {
    fontSize: 14,
    flexWrap: 'wrap',
    width: 180,
    marginTop: 5,
  },
  iconContainer: {
    marginLeft: 10,
  },
  noBooksText: {
    textAlign: 'center',
  },
});

export default LibraryScreen;
