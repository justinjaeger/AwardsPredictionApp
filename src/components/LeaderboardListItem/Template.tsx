import React from 'react';
import { StyleProp, TouchableHighlight, View, ViewStyle } from 'react-native';
import COLORS from '../../constants/colors';
import ProfileImage from '../ProfileImage';
import { Body, HeaderLight, SubHeader } from '../Text';
import { formatDecimalAsPercentage } from '../../util/formatPercentage';
import { hexToRgb } from '../../util/hexToRgb';
import useDevice from '../../util/device';

export const LEADERBOARD_LIST_ITEM_HEIGHT = 70;
export const LEADERBOARD_PROFILE_IMAGE_SIZE = 50;

const Template = ({
  onPress,
  title,
  subtitle,
  rank,
  hideProfileImage,
  profileImage,
  percentageAccuracy,
  numCorrect,
  totalPossibleSlots,
  riskiness,
  style,
}: {
  onPress: () => void;
  rank: number;
  profileImage: string | undefined;
  hideProfileImage?: boolean;
  title: string;
  subtitle?: string;
  percentageAccuracy: number;
  numCorrect: number;
  totalPossibleSlots: number;
  riskiness: number;
  style?: StyleProp<ViewStyle>;
}) => {
  const { isPad } = useDevice();
  return (
    <TouchableHighlight
      style={[
        {
          flexDirection: 'row',
          padding: 10,
          width: '100%',
          height: LEADERBOARD_LIST_ITEM_HEIGHT * (isPad ? 1.5 : 1),
          borderBottomColor: hexToRgb(COLORS.primaryLight, 0.3),
          borderBottomWidth: 1,
        },
        style,
      ]}
      onPress={onPress}
      underlayColor={COLORS.secondaryDark}
    >
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
          flex: 1,
        }}
      >
        <View style={{ flexDirection: 'row' }}>
          <View
            style={{
              alignItems: 'flex-start',
              justifyContent: 'center',
              overflow: 'visible',
              marginRight: 10,
            }}
          >
            <SubHeader
              style={{ overflow: 'visible', textAlign: 'left' }}
              numberOfLines={1}
            >
              {rank.toString()}
            </SubHeader>
          </View>
          {!hideProfileImage ? (
            <ProfileImage
              image={profileImage}
              imageSize={LEADERBOARD_PROFILE_IMAGE_SIZE}
              onPress={onPress}
            />
          ) : null}
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-around',
              marginLeft: 10,
              height: LEADERBOARD_PROFILE_IMAGE_SIZE,
            }}
          >
            <SubHeader>{title}</SubHeader>
            {subtitle ? <Body>{subtitle}</Body> : null}
          </View>
        </View>
        <View style={{ alignItems: 'flex-end', flex: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
            <HeaderLight>{formatDecimalAsPercentage(percentageAccuracy)}</HeaderLight>
            <SubHeader>{'%'}</SubHeader>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <SubHeader
              style={{ fontWeight: '400' }}
            >{`${numCorrect}/${totalPossibleSlots}  |  `}</SubHeader>
            <SubHeader style={{ fontWeight: '400' }}>{`${riskiness.toFixed(
              0,
            )}pts`}</SubHeader>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default Template;
