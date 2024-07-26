import React from 'react';
import {StyleSheet, View, SafeAreaView} from 'react-native';
import Navigation from './screens/Navigation';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Navigation />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
