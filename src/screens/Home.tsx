import React from 'react';
import { Text, View } from 'react-native';

import Header from '../components/Header'
import CreateNewSongButton from '../components/CreateNewSongButton';
import global from '../styles/global'

const Home = () => {

  return (
    <View style={global.container}>
      <Header />
      <Text >Home Screen</Text>
      <CreateNewSongButton />
    </View>
  );
};

export default Home;
