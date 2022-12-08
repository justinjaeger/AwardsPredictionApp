import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HEADER_HEIGHT } from '../../constants';
import theme from '../../constants/theme';
import BackButton from '../Buttons/BackButton';
import { BodyBold } from '../Text';

type iNavigationHeaderProps = {
  text: string[];
  disableBack?: boolean;
};

const NavigationHeader = (props: iNavigationHeaderProps) => {
  const { text, disableBack } = props;

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
            <BodyBold style={{ fontWeight: '600' }}>{t}</BodyBold>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NavigationHeader;
