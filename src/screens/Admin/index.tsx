import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView } from 'react-native';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import { SubmitButton } from '../../components/Buttons';
import SafeAreaViewFixed from '../../components/SafeAreaViewFixed';
// import TmdbMovieCache from '../../services/cache/tmdbMovie';
// import TmdbPersonCache from '../../services/cache/tmdbPerson';

const Admin = () => {
  const navigation = useNavigation();

  const clearAllCache = () => {
    // TmdbMovieCache.clearAll();
    // TmdbPersonCache.clearAll();
  };

  return (
    <BackgroundWrapper>
      <SafeAreaViewFixed style={{ width: '100%', height: '100%' }}>
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
          <SubmitButton
            text={'Add Test User'}
            onPress={() => navigation.navigate('AddTestUser')}
            style={{ marginTop: 30 }}
          />
          <SubmitButton
            text={'Scripts'}
            onPress={() => navigation.navigate('AdminScripts')}
            style={{ marginTop: 30 }}
          />
        </ScrollView>
      </SafeAreaViewFixed>
    </BackgroundWrapper>
  );
};

export default Admin;
