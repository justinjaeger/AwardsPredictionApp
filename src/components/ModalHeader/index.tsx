import React from 'react';
import { TouchableHighlight } from 'react-native';
import { HEADER_HEIGHT } from '../../constants';
import COLORS from '../../constants/colors';
import CustomIcon from '../CustomIcon';
import { useNavigation } from '@react-navigation/native';

const ModalHeader = () => {
  const navigation = useNavigation();
  return (
    <TouchableHighlight
      style={{
        height: HEADER_HEIGHT,
        width: '100%',
        backgroundColor: COLORS.secondaryDark,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
      }}
      onPress={() => {
        navigation.goBack();
      }}
      underlayColor={COLORS.secondaryLight}
    >
      <CustomIcon name={'minus-outline'} color={COLORS.white} size={30} />
    </TouchableHighlight>
  );
};

export default ModalHeader;
