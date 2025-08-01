// components/CustomText.tsx
import React from 'react';
import {Text, TextProps, StyleSheet} from 'react-native';

const CustomText: React.FC<TextProps> = ({style, children, ...props}) => {
  return (
    <Text style={[styles.text, style]} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#FFFFFF', 
  },
});

export default CustomText;
