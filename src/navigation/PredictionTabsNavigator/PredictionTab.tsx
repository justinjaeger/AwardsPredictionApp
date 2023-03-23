import React from 'react';
import { TouchableHighlight, View } from 'react-native';
import { BodyBold } from '../../components/Text';
import COLORS from '../../constants/colors';

export const HIGHLIGHT_COLOR = COLORS.white;

const PredictionTab = (props: {
  text: string;
  selected: boolean;
  onPress: () => void;
}) => {
  const { text, selected, onPress } = props;
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
        <BodyBold
          style={{
            fontWeight: '600',
            zIndex: 3,
            color: selected ? COLORS.white : 'rgba(255,255,255,0.6)',
            textAlign: 'center',
          }}
        >
          {text}
        </BodyBold>
      </View>
    </TouchableHighlight>
  );
};
export default PredictionTab;
