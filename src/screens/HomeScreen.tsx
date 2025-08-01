import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  // Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import CustomText from '../components/CustomText';

import databaze from '../data/databaze.json';
// import image from "../assets"
// Icons
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
// Navigation
import { useNavigation } from '@react-navigation/native';
import { localImages } from '../data/Images';
import PurchaseModal from '../components/PurchaseModal';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/types';
import Purchases from 'react-native-purchases';
import { setHasEntitlement } from '../redux/slices/persist/persistSlice';
// import ImageMapper from './ImageMapper';
import FastImage from 'react-native-fast-image';

const ITEM_HEIGHT = 250;

const HomeScreen: React.FC = () => {

  const [showPurchaseModal, setShowPurchaseModal] = useState(false);

  const { hasEntitlement } = useSelector((state: RootState) => state.persistSlice)

  const validBooks = databaze.List1.filter(book => book !== null && book.free);
  const randomBook = validBooks[Math.floor(Math.random() * validBooks.length)];
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    checkEntitlement()
  }, [])

  const checkEntitlement = async () => {
    const customerInfo = await Purchases.getCustomerInfo();
    if (typeof customerInfo.entitlements.active['full_access'] !== 'undefined') {
      dispatch(setHasEntitlement(true))
    }
  };

  return (
    <View>
      <View style={{ padding: 20, paddingTop: 40 }}>
        <View style={styles.freeBlink}>
          <View style={{ display: 'flex' }}>
            <CustomText style={styles.customText}>
              Výběr redakce
            </CustomText>
            <Text style={[styles.grayText, { paddingBottom: 20 }]}>
              Vybráno našimi učiteli
            </Text>
          </View>
          {/*
          <View>
            <CustomText>Notification</CustomText>
          </View> 
          */}
        </View>

        {randomBook && (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Description', { book: randomBook, imagePath: localImages[randomBook.image_path] })
            }>
            <View style={{ width: '100%', height: 200 }}>
              {/* <Image
                resizeMode="cover"
                source={{uri: randomBook.image_path}}
                style={styles.image}
              /> */}

              <FastImage
                source={localImages[randomBook.image_path]}
                style={styles.image}
                resizeMode='contain'
              />
            </View>

            <View style={styles.bookInfo}>
              <View style={{ display: 'flex' }}>
                <CustomText style={styles.customTextBookName}>
                  {randomBook.book_name}
                </CustomText>
                <Text style={styles.grayText}>{randomBook.author_name}</Text>
                <Text style={styles.grayText}>
                  {randomBook.description && randomBook.description.length > 20
                    ? `${randomBook.description.substring(0, 50)}...`
                    : randomBook.description}
                </Text>
              </View>

              <View>
                <Feather name="share" color="#fff" size={20} />
              </View>
            </View>
          </TouchableOpacity>
        )}
      </View>

      <View style={{ display: 'flex', paddingTop: 20, paddingLeft: 20 }}>
        <CustomText style={styles.customText}>Doporučeno pro tebe</CustomText>
        <Text style={styles.grayText}>Myslíme si, že se vám budou líbit</Text>
      </View>

      <FlatList
        data={databaze.List1.filter(book => book !== null)}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
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
          <View style={styles.card}>
            <TouchableOpacity
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
            >
              <FastImage
                source={localImages[book.image_path]}
                style={styles.bookImage}
                resizeMode='contain'
              />
            </TouchableOpacity>

            <View style={styles.bookNameAndStatus}>
              <CustomText style={styles.title}>{book.book_name}</CustomText>
              {book.free || hasEntitlement ?
                <AntDesign name="unlock" color="#fff" size={20} />
                :
                <AntDesign name="lock" color="#fff" size={20} />
              }
            </View>
            <Text style={styles.grayText}>{book.author_name}</Text>

            <CustomText style={styles.description}>
              {book.description && book.description.length > 20
                ? `${book.description.substring(0, 50)}...`
                : book.description}
            </CustomText>
          </View>
        )}
      />

      <PurchaseModal
        isVisible={showPurchaseModal}
        toggleModal={() => setShowPurchaseModal(false)}
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

export default HomeScreen;
