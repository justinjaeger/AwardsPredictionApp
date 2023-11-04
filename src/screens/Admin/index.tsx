// import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView } from 'react-native';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import { SubmitButton } from '../../components/Buttons';
import SafeAreaViewFixed from '../../components/SafeAreaViewFixed';
// import { AdminNavigationProp } from '../../navigation/types';

const Admin = () => {
  //   const navigation = useNavigation<AdminNavigationProp>();

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
            text={'Clear Cache'}
            onPress={clearAllCache}
            style={{ marginTop: 30 }}
          />
        </ScrollView>
      </SafeAreaViewFixed>
    </BackgroundWrapper>
  );
};

export default Admin;
