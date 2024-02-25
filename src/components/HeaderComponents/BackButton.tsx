import { TouchableHighlight, View } from 'react-native';
import COLORS from '../../constants/colors';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import CustomIcon from '../CustomIcon';

export const BACK_BUTTON_HEIGHT = 40;

const BackButton = () => {
  const navigation = useNavigation();
  return (
    <View style={{ height: BACK_BUTTON_HEIGHT, justifyContent: 'center' }}>
      <TouchableHighlight
        onPress={() => {
          navigation.goBack();
        }}
        style={{
          width: BACK_BUTTON_HEIGHT - 10,
          backgroundColor: COLORS.primaryLight,
          borderRadius: 100,
        }}
      >
        <CustomIcon
          name="chevron-left-outline"
          size={BACK_BUTTON_HEIGHT - 10}
          color={COLORS.white}
        />
      </TouchableHighlight>
    </View>
  );
};

export default BackButton;
