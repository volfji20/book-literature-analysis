import { StyleSheet, Image, View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';

// Modal
import Modal from 'react-native-modal';

// Components
import CustomText from './CustomText';

// Icons & images
import Icon from 'react-native-vector-icons/AntDesign';
import Purchase from "../assets/images/purchase.jpg";
import Purchases from 'react-native-purchases';
import { useDispatch } from 'react-redux';
import { setHasEntitlement } from '../redux/slices/persist/persistSlice';

const PurchaseModal = ({ isVisible, toggleModal }) => {

  const [offerings, setOfferings] = useState<any>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchOfferings();
  }, []);

  const fetchOfferings = async () => {
    try {
      const offerings = await Purchases.getOfferings();
      console.log('offerings ==>>', offerings)
      if (offerings.current !== null && offerings.current.availablePackages.length !== 0) {
        setOfferings(offerings.current);
      }
    } catch (e) {
      console.log('offerings error ==>', e)
    }
  };

  const purchaseHandler = async () => {
    try {
      const { customerInfo } = await Purchases.purchasePackage(offerings.availablePackages[0]);
      if (typeof customerInfo.entitlements.active['full_access'] !== 'undefined') {
        // 🟢 User now owns the non-consumable
        dispatch(setHasEntitlement(true))
        toggleModal()
      }
    } catch (e: any) {
      if (!e.userCancelled) {
        console.error('Purchase error:', e);
      }
    }
  }

  return (
    <Modal isVisible={isVisible}>
      <View style={styles.modalContent}>
        {/* <Text>Hello!</Text> */}

        <View style={{ height: '50%' }}>
          <Image
            resizeMode="cover"
            style={styles.notificationImage}
            source={Purchase}
          />
          <TouchableOpacity
            onPress={toggleModal}
            style={{ position: 'absolute', right: 20, top: 10 }}>
            <Icon name="close" size={30} color="#021f30" />
          </TouchableOpacity>
        </View>

        <View style={styles.modalBody}>
          <Text style={styles.boldText}>Get Full Access</Text>
          <Text style={{ color: 'white', fontSize: 25, textAlign: 'center' }}>
            This book is part of our premium collection. Unlock it now to start reading
          </Text>

          <Text style={styles.boldText}>Only 149 Kč</Text>

          <TouchableOpacity style={styles.button} onPress={purchaseHandler}>
            <CustomText style={{ fontSize: 18 }}>
              Unlock all books now!
            </CustomText>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default PurchaseModal;

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    backgroundColor: '#021f30',
    borderRadius: 20,
    height: 200,
    maxHeight: '80%',
  },
  boldText: { color: '#bfaffa', fontWeight: 'bold', fontSize: 40 },
  notificationImage: {
    height: '100%',
    width: '100%',
    backfaceVisibility: 'visible',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalBody: {
    height: '50%',
    padding: 30,
    justifyContent: 'space-between',
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
  },
  button: {
    backgroundColor: '#0365f2',
    width: '100%',
    padding: 10,
    display: 'flex',
    alignItems: 'center',
    borderRadius: 20,
  },
});
