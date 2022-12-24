import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import { SubmitButton } from '../../components/Buttons';
import TmdbMovieCache from '../../services/cache/tmdbMovie';
import TmdbPersonCache from '../../services/cache/tmdbPerson';

const Admin = () => {
  const navigation = useNavigation();

  const clearAllCache = () => {
    TmdbMovieCache.clearAll();
    TmdbPersonCache.clearAll();
  };

  return (
    <BackgroundWrapper>
      <SafeAreaView style={{ width: '100%', height: '100%' }}>
        <ScrollView
          contentContainerStyle={{
            alignItems: 'center',
            paddingBottom: 200,
          }}
        >
          <SubmitButton
            text={'Manage Studios'}
            onPress={() => navigation.navigate('ManageStudios')}
            style={{ marginTop: 30 }}
          />
          <SubmitButton
            text={'Manage Events'}
            onPress={() => navigation.navigate('ManageEvents')}
            style={{ marginTop: 30 }}
          />
          <SubmitButton
            text={'Clear Cache'}
            onPress={clearAllCache}
            style={{ marginTop: 30 }}
          />
        </ScrollView>
      </SafeAreaView>
    </BackgroundWrapper>
  );
};

export default Admin;
