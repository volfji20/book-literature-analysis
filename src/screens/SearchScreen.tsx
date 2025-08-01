// screens/SearchScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import CustomText from '../components/CustomText';
import SearchBar from '../components/SearchBar';
import databaze from '../data/databaze.json'; // databaze
import VerticalCards from '../components/VerticalCards';
import HorizontalCards from '../components/HorizontalCards';
import { localImages } from '../data/Images';

const { width } = Dimensions.get('window');

// Navigation
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/types';
import PurchaseModal from '../components/PurchaseModal';

const ITEM_HEIGHT = 100;

const SearchScreen: React.FC = () => {

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBooks, setFilteredBooks] = useState(databaze.List1);
  const [categories, setCategories] = useState([]);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);

  const { hasEntitlement } = useSelector((state: RootState) => state.persistSlice)

  const navigation = useNavigation();

  const updateSearchQuery = (query: string) => {
  setSearchQuery(query);

  if (query === '') {
    setFilteredBooks(databaze.List1);
  } else {
    const filtered = databaze.List1.filter(book => {
      const authorName = String(book.author_name || '');
      const bookName = String(book.book_name || '');
      const searchQuery = String(query || '');

      return (
        authorName.toUpperCase().includes(searchQuery.toUpperCase()) ||
        bookName.toUpperCase().includes(searchQuery.toUpperCase())
      );
    });
    setFilteredBooks(filtered);
  }
};


  useEffect(() => {
    const tagsSet = new Set();
    databaze.List1.forEach(book => {
      if (book.tags) {
        JSON.parse(book.tags).forEach(tag => tagsSet.add(tag.trim()));
      }
    });
    setCategories(Array.from(tagsSet));
  }, []);

  const handleCategoryClick = category => {
    updateSearchQuery(''); // resets input + results

    const filteredList1 = databaze.List1.filter(book => {
      const tags = book.tags
        ? JSON.parse(book.tags).map(tag => tag.trim())
        : [];
      return tags.includes(category);
    });

    setFilteredBooks(filteredList1);
  };

  const handleAllClick = () => {
    setFilteredBooks(databaze.List1);
  };

  return (
    <View>
      <SearchBar
        placeholder="Vyhledávání podle autora nebo názvu knihy..."
        search={searchQuery}
        setSearch={updateSearchQuery}
      />

      <View style={{ paddingTop: 20, paddingLeft: 20 }}>
        <View style={styles.categoriesContainer}>
          <Text style={styles.subtitle}>Kategorie</Text>
          <ScrollView
            contentContainerStyle={styles.categoriesList}
            horizontal={true}>
            <TouchableOpacity
              style={styles.categoryButton}
              onPress={handleAllClick}>
              <Text style={styles.categoryText}>Vše</Text>
            </TouchableOpacity>

            {categories.map(item => (
              <TouchableOpacity
                key={item}
                style={styles.categoryButton}
                onPress={() => handleCategoryClick(item)}>
                <Text style={styles.categoryText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>

      {searchQuery ? null : (
        <View style={{ display: 'flex', paddingTop: 20, paddingLeft: 20 }}>
          <CustomText style={styles.customText}>Nejnovější</CustomText>
          <CustomText style={styles.grayText}>
            Nedávno přidané tituly{' '}
          </CustomText>
        </View>
      )}

      <FlatList
        data={filteredBooks}
        keyExtractor={(_, index) => index.toString()}
        horizontal={!searchQuery}
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
        ListEmptyComponent={
          <Text style={{ padding: 20, textAlign: 'center' }}>No books found</Text>
        }
        initialNumToRender={5}
        maxToRenderPerBatch={3}
        windowSize={4}
        removeClippedSubviews={true}
        updateCellsBatchingPeriod={100}
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
        getItemLayout={(data, index) => ({
          length: searchQuery ? ITEM_HEIGHT : 200,
          offset: searchQuery ? ITEM_HEIGHT : 200 * index,
          index,
        })}
        renderItem={({ item: book }) => (
          <View>
            {searchQuery ? (
              <VerticalCards
                image_path={localImages[book.image_path]}
                book_name={book.book_name}
                author_name={book.author_name}
                description={
                  book.description && book.description.length > 20
                    ? `${book.description.substring(0, 50)}...`
                    : book.description
                }
                free={book.free || hasEntitlement}
                // onPress={() => navigation.navigate('Description', {book})}

                // <TouchableOpacity
                // key={index}
                onPress={() => {
                  if (book.free || hasEntitlement) {
                    navigation.navigate('Description', {
                      book,
                      imagePath: localImages[book.image_path],
                    })
                  } else {
                    setShowPurchaseModal(true)
                  }
                }}
              />
            ) : (
              <HorizontalCards
                image_path={localImages[book.image_path]}
                book_name={book.book_name}
                author_name={book.author_name}
                description={
                  book.description && book.description.length > 20
                    ? `${book.description.substring(0, 50)}...`
                    : book.description
                }
                free={book.free || hasEntitlement}
                onPress={() => {
                  if (book.free || hasEntitlement) {
                    navigation.navigate('Description', {
                      book,
                      imagePath: localImages[book.image_path],
                    })
                  } else {
                    setShowPurchaseModal(true)
                  }
                }}
              />
            )}
          </View>
        )}
      />

      {!searchQuery && (
        <View>
          <View style={{ display: 'flex', paddingTop: 20, paddingLeft: 20 }}>
            <CustomText style={styles.customText}>Rozbory</CustomText>
            <CustomText style={styles.grayText}>
              Nedávno přidané tituly{' '}
            </CustomText>
          </View>

          <FlatList
            data={filteredBooks}
            keyExtractor={(_, index) => index.toString()}
            contentContainerStyle={{ paddingHorizontal: 10 }}
            // horizontal={!searchQuery}
            // showsHorizontalScrollIndicator={false}
            style={styles.scrollView}
            ListEmptyComponent={
              <Text style={{ padding: 20 }}>Nebyly nalezeny žádné knihy</Text>
            }
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
              <View>
                {/* {searchQuery ? ( */}
                <VerticalCards
                  image_path={localImages[book.image_path]}
                  book_name={book.book_name}
                  author_name={book.author_name}
                  description={
                    book.description && book.description.length > 20
                      ? `${book.description.substring(0, 50)}...`
                      : book.description
                  }
                  free={book.free || hasEntitlement}
                  onPress={() => {
                    if (book.free || hasEntitlement) {
                      navigation.navigate('Description', {
                        book,
                        imagePath: localImages[book.image_path],
                      })
                    } else {
                      setShowPurchaseModal(true)
                    }
                  }}
                />
                {/* ) : (
                  <HorizontalCards
                    image_path={localImages[book.image_path]}
                    book_name={book.book_name}
                    author_name={book.author_name}
                    description={
                      book.description && book.description.length > 20
                        ? `${book.description.substring(0, 50)}...`
                        : book.description
                    }
                    free={book.free || hasEntitlement}
                    onPress={() => {
                      if (book.free || hasEntitlement) {
                        navigation.navigate('Description', {
                          book,
                          imagePath: localImages[book.image_path],
                        })
                      } else {
                        setShowPurchaseModal(true)
                      }
                    }}
                  />
                )} */}
              </View>
            )}
          />
        </View>
      )}

      <PurchaseModal
        isVisible={showPurchaseModal}
        toggleModal={() => setShowPurchaseModal(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  customTextBookName: {
    fontSize: 18,
  },
  image: {
    width: '100%',
    height: 200,
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
  scrollView: {
    paddingVertical: 10,
  },
  customText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  grayText: {
    color: 'gray',
    marginVertical: 10,
  },
  scrollContainer: {
    marginTop: 10,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  categoriesContainer: {
    marginBottom: 20,
  },
  categoriesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: width * 6,
  },
  categoryButton: {
    backgroundColor: '#04324d',
    paddingVertical: 8,
    paddingHorizontal: 16,
    margin: 5,
    borderRadius: 5,
  },
  categoryText: {
    color: '#fff',
    fontSize: 14,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#fff',
  },
});

export default SearchScreen;
