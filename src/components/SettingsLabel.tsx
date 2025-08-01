import { View, StyleSheet } from 'react-native';
import React from 'react';
import CustomText from './CustomText';

type SettingsLabelProps = {
  label: string;
  value: string;
};

const SettingsLabel: React.FC<SettingsLabelProps> = ({ label, value }) => {
  return (
    <View style={styles.container}>
      <CustomText>{label}</CustomText>
      <CustomText style={styles.value}>{value}</CustomText>
    </View>
  );
};

export default SettingsLabel;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#04324d',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 13,
    paddingHorizontal: 20,
    borderColor: '#365a70',
    borderBottomWidth: 1,
  },
  value: {
    fontWeight: 'bold',
    color: '#d1d5db',
  },
});

