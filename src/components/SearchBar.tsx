// components/SearchBar.tsx
import React from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface SearchBarProps {
  search: string;
  setSearch: (text: string) => void;
  placeholder?: string;
}
const SearchBar: React.FC<SearchBarProps> = ({
  search,
  setSearch,
  placeholder = 'Search',
  ...props
}) => {
  return (
    <View style={styles.inputContainer}>
      <AntDesign name="search1" size={25} color="white" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={search}
        onChangeText={text => setSearch(text)}
        placeholderTextColor="#fff"
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#04324d',
    borderColor: '#04324d',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 1.1,
    elevation: 3,
  },
  icon: {
    marginRight: 20,
    paddingLeft: 5,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
  },
});

export default SearchBar;
