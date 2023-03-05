import React from 'react';
import { ScrollView, View } from 'react-native';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import { Body } from '../../components/Text';
import Tmdb from '../../assets/tmdb.svg';

const About = () => {
  return (
    <BackgroundWrapper>
      <ScrollView
        style={{ width: '100%' }}
        contentContainerStyle={{ width: '90%', alignSelf: 'center' }}
      >
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
