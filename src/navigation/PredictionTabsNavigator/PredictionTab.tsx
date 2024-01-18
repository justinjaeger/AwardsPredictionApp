import React from 'react';
import { TouchableHighlight, View } from 'react-native';
import { SubHeader } from '../../components/Text';
import COLORS from '../../constants/colors';
import ProfileImage from '../../components/ProfileImage';
import useDevice from '../../util/device';

export const HIGHLIGHT_COLOR = COLORS.white;

const PredictionTab = ({
  text,
  selected,
  onPress,
  image,
}: {
  text: string;
  selected: boolean;
  onPress: () => void;
  image?: string;
}) => {
  const { isPad } = useDevice();
  return (
    <TouchableHighlight
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        width: '50%',
        borderRadius: 0,
        borderBottomColor: COLORS.primaryLight,
        borderBottomWidth: 1,
        height: isPad ? 80 : 60,
      }}
      onPress={onPress}
      underlayColor={COLORS.secondary}
    >
      <View style={{ zIndex: 3, flexDirection: 'row', alignItems: 'center' }}>
        {image ? (
          <ProfileImage
            image={image}
            imageSize={isPad ? 60 : 40}
            style={{ marginRight: 10 }}
          />
        ) : null}
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
