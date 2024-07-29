import React, {useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import SearchComponent from './components/SearchComponent';

const Home = () => {
  const [pokemon, setPokemon] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);

  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon');
        const data = await response.json();

        const detailedPokemonPromises = data.results.map(async poke => {
          const res = await fetch(poke.url);
          const details = await res.json();
          const firstMove = details.moves[0].move.name;

          return {
            name: poke.name,
            image: details.sprites.front_default,
            move: firstMove,
            url: poke.url,
          };
        });

        const detailedPokemon = await Promise.all(detailedPokemonPromises);
        setPokemon(detailedPokemon);
        setFilteredPokemon(detailedPokemon);
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonData();
  }, []);
  const handleSearch = query => {
    if (query.trim() === '') {
      setFilteredPokemon(pokemon);
    } else {
      const filteredData = pokemon.filter(poke =>
        poke.name.toLowerCase().includes(query.toLowerCase()),
      );
      setFilteredPokemon(filteredData);
    }
  };
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (pokemon.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No Pokémon data available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SearchComponent onSearch={handleSearch} />
      <FlatList
        data={filteredPokemon}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('AboutScreen', {pokemon: item})}
            style={styles.card}>
            <Image source={{uri: item.image}} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.move}>{item.move}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.name}
        numColumns={2}
      />
    </View>
  );
};

export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    margin: 8,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    flex: 1,
    aspectRatio: 1,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  move: {
    fontSize: 14,
    color: 'green',
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatListContent: {
    paddingBottom: 20,
  },
});
