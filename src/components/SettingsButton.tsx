import { StyleSheet, TouchableOpacity, View } from 'react-native';
import CustomText from './CustomText';
import AntDesign from 'react-native-vector-icons/AntDesign';
import React from 'react';

type SettingsButtonProps = {
  name?: string;
  title: string;
  textColor?: string;
  onPress?: () => void; // ← ADD this line
};

const SettingsButton: React.FC<SettingsButtonProps> = ({ name, title, textColor, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}> {/* ← Hook it up */}
      <CustomText
        style={[
          styles.text,
          textColor ? { color: textColor, fontWeight: 'bold' } : {},
        ]}>
        {title}
      </CustomText>
      {name && <AntDesign name={name} color="#365a70" size={15} />}
    </TouchableOpacity>
  );
};

export default SettingsButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#04324d',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 13,
    paddingHorizontal: 20,
    borderColor: '#365a70',
    borderBottomWidth: 1,
  },
  text: {
    color: '#fff',
  },
});

