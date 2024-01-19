import React from 'react';
import { TouchableHighlight, View } from 'react-native';
import { SubHeader } from '../../components/Text';
import COLORS from '../../constants/colors';
import ProfileImage from '../../components/ProfileImage';
import useDevice from '../../util/device';
import { useNavigation } from '@react-navigation/native';
import { PredictionsNavigationProp, iUserInfo } from '../types';
import { useAuth } from '../../context/AuthContext';

export const HIGHLIGHT_COLOR = COLORS.white;

const PredictionTab = ({
  text,
  selected,
  onPress,
  userInfo,
}: {
  text: string;
  selected: boolean;
  onPress: () => void;
  userInfo?: iUserInfo;
}) => {
  const { isPad } = useDevice();
  const { userId: authUserId } = useAuth();
  const isAuthUser = userInfo?.userId === authUserId;
  const navigation = useNavigation<PredictionsNavigationProp>();

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
        {!isAuthUser && userInfo?.userImage ? (
          <ProfileImage
            image={userInfo.userImage}
            imageSize={isPad ? 60 : 40}
            style={{ marginRight: 10 }}
            onPress={() => {
              navigation.navigate('Profile', { userInfo });
            }}
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
