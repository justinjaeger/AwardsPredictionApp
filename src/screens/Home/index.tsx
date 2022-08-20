import React from 'react';
import { ScrollView } from 'react-native';
import { Header } from '../../components/Text';

const Home = () => {
  return (
    <ScrollView contentContainerStyle={{ alignItems: 'center', marginTop: 40 }}>
      <Header>I am a home screen</Header>
    </ScrollView>
  );
};

export default Home;
