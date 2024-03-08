import React from 'react';
import { Alert, Linking, TouchableOpacity } from 'react-native';
import { BodyBold } from '../Text';
import COLORS from '../../constants/colors';

const CantFindContenderLink = () => {
  return (
    <TouchableOpacity
      onPress={() => {
        Alert.alert(
          // eslint-disable-next-line prettier/prettier
              'Can\'t find what you\'re looking for?',
          // eslint-disable-next-line prettier/prettier
              'If you\'re sure it\'s not a spelling mistake, tap the link below and search your movie or person.\n\nCopy the id, which is the 6 digits located in the url.\n\nGo back here and paste id in the search bar.',
          [
            {
              text: 'themoviedb.com',
              onPress: () => {
                Linking.openURL('https://www.themoviedb.org/');
              },
            },
            { text: 'Close', onPress: () => {} },
          ],
        );
      }}
    >
      <BodyBold
        style={{
          color: COLORS.gray,
          alignSelf: 'center',
          textAlign: 'center',
          marginTop: 20,
        }}
      >
        Can't find what you're looking for?
      </BodyBold>
    </TouchableOpacity>
  );
};

export default CantFindContenderLink;
