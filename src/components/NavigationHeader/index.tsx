import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../../constants/colors';
import theme from '../../constants/theme';
import BackButton from '../Buttons/BackButton';
import HeaderButton from '../HeaderButton';
import { BodyLarge } from '../Text';

export const HEADER_HEIGHT = 40;

type iNavigationHeaderProps = {
  text: string[];
  disableBack?: boolean;
};

const NavigationHeader = (props: iNavigationHeaderProps) => {
  const { text, disableBack } = props;
  const navigation = useNavigation();

  return (
    <SafeAreaView
      edges={['top']}
      style={{
        backgroundColor: 'rgba(0,0,0,0.2)',
      }}
    >
      <View
        style={{
          height: HEADER_HEIGHT + 20,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          marginLeft: theme.windowMargin,
        }}
      >
        {!disableBack ? <BackButton /> : null}
        <View style={{ marginLeft: theme.windowMargin }}>
          {text.map((t) => (
            <BodyLarge style={{ fontWeight: '600' }}>{t}</BodyLarge>
          ))}
        </View>
        {/* <View style={{ marginRight: theme.windowMargin, flexDirection: 'row' }}>
          <HeaderButton
            onPress={() => {
              navigation.navigate('Profile');
            }}
            icon={'person'}
            style={{
              backgroundColor: COLORS.primaryLight,
            }}
          />
          <HeaderButton
            onPress={() => {
              navigation.navigate('Dev');
            }}
            icon={'settings'}
            style={{
              backgroundColor: COLORS.primaryLight,
            }}
          />
        </View> */}
      </View>
    </SafeAreaView>
  );
};

export default NavigationHeader;
