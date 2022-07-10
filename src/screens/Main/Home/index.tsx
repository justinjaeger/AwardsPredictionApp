import React from 'react';
import { Text } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';

const Home = () => {
  return (
    <SafeAreaView style={{ height: '100%' }}>
      <ScrollView contentContainerStyle={{ alignItems: 'center', marginTop: 40 }}>
        <Text category={'h1'}>I am a home screen</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
