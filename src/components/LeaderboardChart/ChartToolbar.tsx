import { TouchableHighlight, View } from 'react-native';
import CustomIcon from '../CustomIcon';
import COLORS from '../../constants/colors';
import React from 'react';

const RESIZE_BUTTON_SIZE = 30;
const RESIZE_BUTTON_STYLE = {
  width: RESIZE_BUTTON_SIZE,
  height: RESIZE_BUTTON_SIZE,
  borderRadius: RESIZE_BUTTON_SIZE,
  margin: 10,
};

export const SM = 10;
const MD = 20;
const LG = 30;

const ChartToolbar = ({
  minBarWidth,
  setMinBarWidth,
}: {
  minBarWidth: number;
  setMinBarWidth: (w: number) => void;
}) => {
  const toggleBarWidth = (mode: 'inc' | 'dec') => {
    if (mode === 'inc') {
      if (minBarWidth === SM) {
        setMinBarWidth(MD);
      } else if (minBarWidth === MD) {
        setMinBarWidth(LG);
      }
    } else if (mode === 'dec') {
      if (minBarWidth === LG) {
        setMinBarWidth(MD);
      } else if (minBarWidth === MD) {
        setMinBarWidth(SM);
      }
    }
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        alignSelf: 'center',
        width: '90%',
        justifyContent: 'space-between',
        marginTop: 5,
      }}
    >
      <TouchableHighlight
        onPress={() => toggleBarWidth('dec')}
        style={RESIZE_BUTTON_STYLE}
        underlayColor={COLORS.secondary}
      >
        <CustomIcon
          color={COLORS.gray}
          size={RESIZE_BUTTON_SIZE}
          name={'minus-outline'}
        />
      </TouchableHighlight>
      <TouchableHighlight
        onPress={() => toggleBarWidth('inc')}
        style={RESIZE_BUTTON_STYLE}
        underlayColor={COLORS.secondary}
      >
        <CustomIcon color={COLORS.gray} size={RESIZE_BUTTON_SIZE} name={'plus-outline'} />
      </TouchableHighlight>
    </View>
  );
};

export default ChartToolbar;
