import React from 'react';
import { ScrollView } from 'react-native';
import { Header } from '../../components/Text';

const MyPredictions = () => {
  return (
    <ScrollView contentContainerStyle={{ alignItems: 'center', marginTop: 40 }}>
      <Header>My Predictions</Header>
    </ScrollView>
  );
};

export default MyPredictions;
