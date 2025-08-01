import {StyleSheet, Image, View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

// Modal
import Modal from 'react-native-modal';

// Components
import CustomText from './CustomText';

// Icons & images
import Icon from 'react-native-vector-icons/AntDesign';
import Notify from '../assets/images/notify.jpeg';
const NotificationModal = ({isVisible, toggleModal}) => {
  return (
    <Modal isVisible={isVisible}>
      <View style={styles.modalContent}>
        {/* <Text>Hello!</Text> */}

        <View style={{height: '50%'}}>
          <Image
            resizeMode="cover"
            style={styles.notificationImage}
            source={Notify}
          />
          <TouchableOpacity
            onPress={toggleModal}
            style={{position: 'absolute', right: 20, top: 10}}>
            <Icon name="close" size={30} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.modalBody}>
          <Text style={styles.boldText}>You're invited!</Text>
          <Text style={{color: 'white', fontSize: 25, textAlign: 'center'}}>
            Be onw of the first to try blinkist with a{' '}
          </Text>

          <Text style={styles.boldText}>60% OFF</Text>

          <TouchableOpacity style={styles.button} onPress={toggleModal}>
            <CustomText style={{fontSize: 18}}>
              Unlock all Blinkist content now!
            </CustomText>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default NotificationModal;

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    backgroundColor: '#021f30',
    borderRadius: 20,
    height: 200,
    maxHeight: '80%',
  },
  boldText: {color: '#bfaffa', fontWeight: 'bold', fontSize: 40},
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
