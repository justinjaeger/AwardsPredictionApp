import React from 'react';
import { Text } from '@ui-kitten/components';
import { ScrollView } from 'react-native';
import { useAuth } from '../../store';
import Snackbar from '../../components/Snackbar';

const MyPredictions = () => {
  const { isLoggedIn, user } = useAuth();
  const email = user?.email || '';

  if (isLoggedIn) {
    Snackbar.success(`User is logged in ${email}`);
  } else {
    Snackbar.success('User NOT logged in');
  }

  return (
    <ScrollView contentContainerStyle={{ alignItems: 'center', marginTop: 40 }}>
      <Text category={'h1'}>My Predictions</Text>
    </ScrollView>
  );
};

export default MyPredictions;
