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
        height: '100%',
        width: '50%',
        borderRadius: 0,
        backgroundColor: 'rgba(0,0,0,0.3)',
      }}
      onPress={onPress}
      underlayColor={COLORS.secondary}
    >
      <View style={{ zIndex: 3 }}>
        <BodyBold
          style={{
            fontWeight: '600',
            zIndex: 3,
            color: selected ? HIGHLIGHT_COLOR : COLORS.white,
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
