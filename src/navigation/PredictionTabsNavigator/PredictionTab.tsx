import React from 'react';
import { TouchableHighlight, View } from 'react-native';
import { SubHeader } from '../../components/Text';
import COLORS from '../../constants/colors';

export const HIGHLIGHT_COLOR = COLORS.white;

const PredictionTab = ({
  text,
  selected,
  onPress,
}: {
  text: string;
  selected: boolean;
  onPress: () => void;
}) => {
  return (
    <TouchableHighlight
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        width: '50%',
        borderRadius: 0,
        borderBottomColor: COLORS.primaryLight,
        borderBottomWidth: 1,
        padding: 20,
      }}
      onPress={onPress}
      underlayColor={COLORS.secondary}
    >
      <View style={{ zIndex: 3 }}>
        <SubHeader
          style={{
            zIndex: 3,
            color: selected ? COLORS.white : 'rgba(255,255,255,0.6)',
            textAlign: 'center',
          }}
        >
          {text}
        </SubHeader>
      </View>
    </TouchableHighlight>
  );
};
export default PredictionTab;
