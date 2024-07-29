import {StyleSheet, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {moderateScale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {TouchableOpacity} from 'react-native-gesture-handler';

const SearchComponent = ({onSearch}) => {
  const [query, setQuery] = useState('');

  const handlePress = () => {
    onSearch(query);
  };

  return (
    <View style={styles.searchContainer}>
      <Icon name="caret-right" style={styles.icon} size={24} />
      <TextInput
        style={styles.inputText}
        placeholder="Search Pokémon"
        value={query}
        onChangeText={setQuery}
      />
      <TouchableOpacity style={styles.touchableOpacity} onPress={handlePress}>
        <Icon name="search" style={styles.icon} size={24} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchComponent;

const styles = StyleSheet.create({
  searchContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: moderateScale(16),
    backgroundColor: 'white',
    padding: moderateScale(6),
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  touchableOpacity: {
    borderRadius: 60,
  },
  inputText: {
    width: '78%',
    fontSize: 16,
  },
  icon: {
    margin: moderateScale(6),
  },
});
