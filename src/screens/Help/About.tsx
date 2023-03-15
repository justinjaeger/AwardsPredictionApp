import React from 'react';
import { Linking, ScrollView, TouchableOpacity, View } from 'react-native';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import { Body, SubHeader } from '../../components/Text';
import Tmdb from '../../assets/tmdb.svg';
import COLORS from '../../constants/colors';
import theme from '../../constants/theme';

const PRIVACY_URL = 'https://sites.google.com/view/oscarexpert-predictawards/privacy';

const About = () => {
  return (
    <BackgroundWrapper>
      <ScrollView
        style={{ width: '100%' }}
        contentContainerStyle={{ width: '90%', alignSelf: 'center' }}
      >
        <TouchableOpacity
          onPress={() => {
            Linking.canOpenURL(PRIVACY_URL).then((supported) => {
              if (supported) {
                Linking.openURL(PRIVACY_URL);
              }
            });
          }}
          style={{
            alignSelf: 'center',
            marginTop: 40,
            padding: 10,
            flexDirection: 'row',
            width: '50%',
            justifyContent: 'space-around',
            borderWidth: 1,
            borderColor: COLORS.white,
            borderRadius: theme.borderRadius,
          }}
          activeOpacity={0.8}
        >
          <SubHeader style={{ color: 'rgba(255,255,255,0.8)' }}>Privacy</SubHeader>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
            marginTop: 40,
            marginLeft: '5%',
          }}
        >
          <Body style={{ color: 'rgba(255,255,255,0.6)' }}>
            Movie data and images powered by
          </Body>
          <Tmdb style={{ width: 80, height: 40, marginLeft: 10 }} />
        </View>
      </ScrollView>
    </BackgroundWrapper>
  );
};

export default About;
