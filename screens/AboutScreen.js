import React, {useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import images from '../assets';
import * as Progress from 'react-native-progress';

const AboutScreen = () => {
  const route = useRoute();
  const {pokemon} = route.params;
  const [details, setDetails] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(pokemon.url); // Ensure 'url' is correct
        const data = await response.json();
        setDetails(data);
      } catch (error) {
        console.error('Error fetching Pokémon details:', error);
      }
    };

    fetchData();
  }, [pokemon.url]);

  if (!details) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const getStatImage = statName => {
    switch (statName) {
      case 'hp':
        return images.heart;
      case 'attack':
        return images.attack;
      case 'defense':
        return images.defence;
      case 'speed':
        return images.speed;
      case 'special-attack':
        return images.special;
      case 'special-defense':
        return images.special;
      default:
        return images.heart;
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.card}>
        <Image source={{uri: pokemon.image}} style={styles.image} />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{pokemon.name}</Text>
          <View style={styles.row}>
            {details.types && details.types[0] && (
              <Text style={styles.type}>
                Pokémon Type: {details.types[0].type.name}
              </Text>
            )}
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                navigation.navigate('Moves', {moves: details.moves})
              }>
              <Text style={styles.buttonText}>Moves</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.statsContainer}>
            <Text style={styles.statsTitle}>Stats:</Text>
            {details.stats &&
              details.stats.map((stat, index) => (
                <View key={index} style={styles.statContainer}>
                  <Image
                    source={getStatImage(stat.stat.name)}
                    style={styles.icon}
                  />
                  <View style={styles.statContent}>
                    <Text style={styles.stat}>
                      {stat.stat.name}: {stat.base_stat}
                    </Text>
                    <Progress.Bar
                      progress={stat.base_stat / 200} // Assuming 200 as the max stat value
                      width={200}
                      color="#3498db"
                    />
                  </View>
                </View>
              ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginTop: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
    marginHorizontal: 8,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  infoContainer: {
    alignItems: 'flex-start',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  type: {
    fontSize: 18,
    color: 'green',
    marginBottom: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'grey',
    marginLeft: '20%',
    borderRadius: 6,
    padding: 12,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
  statsContainer: {
    marginTop: 10,
  },
  statsTitle: {
    margin: 12,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  statContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  statContent: {
    flexDirection: 'column',
  },
  stat: {
    marginBottom: 5,
    fontSize: 18,
    color: '#333',
  },
});
