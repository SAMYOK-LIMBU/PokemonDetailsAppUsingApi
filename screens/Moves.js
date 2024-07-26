import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {useRoute} from '@react-navigation/native';

const Moves = () => {
  const route = useRoute();
  const {moves} = route.params;
  const [detailedMoves, setDetailedMoves] = useState([]);

  useEffect(() => {
    const fetchMoveDetails = async () => {
      try {
        const detailedMovesPromises = moves.map(async move => {
          const moveData = {
            name: move.move.name,
            details: move.version_group_details.map(detail => ({
              learnMethod: detail.move_learn_method.name,
              versionGroup: detail.version_group.name,
            })),
          };
          return moveData;
        });

        const detailedMovesData = await Promise.all(detailedMovesPromises);
        setDetailedMoves(detailedMovesData);
      } catch (error) {
        console.error('Error fetching move details:', error);
      }
    };

    fetchMoveDetails();
  }, [moves]);

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Moves:</Text>
      <FlatList
        data={detailedMoves}
        keyExtractor={item => item.name}
        renderItem={({item}) => (
          <View style={styles.moveContainer}>
            <Text style={styles.moveName}>{item.name}</Text>
            {item.details.map((detail, index) => (
              <View key={index} style={styles.detailContainer}>
                <Text style={styles.learnMethod}>
                  Learn Method: {detail.learnMethod}
                </Text>
                <Text style={styles.versionGroup}>
                  Version Group: {detail.versionGroup}
                </Text>
              </View>
            ))}
          </View>
        )}
      />
    </View>
  );
};

export default Moves;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  moveContainer: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  moveName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  detailContainer: {
    marginTop: 5,
    paddingHorizontal: 10,
  },
  learnMethod: {
    fontSize: 16,
    color: 'grey',
  },
  versionGroup: {
    fontSize: 16,
    color: 'grey',
  },
});
