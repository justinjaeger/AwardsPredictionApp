import React from 'react';
import { Text } from '@ui-kitten/components';
import { ScrollView } from 'react-native';

const Home = () => {
  return (
    <ScrollView contentContainerStyle={{ alignItems: 'center', marginTop: 40 }}>
      <Text category={'h1'}>I am a home screen</Text>
    </ScrollView>
  );
};

export default Home;
