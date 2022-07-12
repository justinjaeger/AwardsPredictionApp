import React from 'react';
import { Text } from '@ui-kitten/components';
import { ScrollView } from 'react-native';

// TODO(jj): put log out button somewhere

const MyPredictions = () => {
  return (
    <ScrollView contentContainerStyle={{ alignItems: 'center', marginTop: 40 }}>
      <Text category={'h1'}>My Predictions</Text>
    </ScrollView>
  );
};

export default MyPredictions;
