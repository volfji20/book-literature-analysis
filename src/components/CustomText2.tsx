import React from 'react';
import { useWindowDimensions } from 'react-native';
import RenderHTML from 'react-native-render-html';

const CustomText = ({ children, style }) => {
  const { width } = useWindowDimensions();

  const tagsStyles = {
    h1: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, color: '#fff' },
    h2: { fontSize: 20, fontWeight: 'bold', marginVertical: 10, color: '#fff' },
    h3: { fontSize: 20, fontWeight: 'bold', marginVertical: 10, color: '#fff' },
    p: { fontSize: 16, marginVertical: 5, color: '#fff' },
    strong: { fontWeight: 'bold', color: '#fff' },
    ul: { marginVertical: 10, color: '#fff' },
    li: { fontSize: 16, marginVertical: 2, marginLeft: 10, color: '#fff' },
  };

  return (
    <RenderHTML
      contentWidth={width}
      source={{ html: children }}
      tagsStyles={tagsStyles}
      baseStyle={style} // Apply custom styles from the parent
    />
  );
};

export default CustomText;
