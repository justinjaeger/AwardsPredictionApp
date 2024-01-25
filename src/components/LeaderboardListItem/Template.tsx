import React from 'react';
import { StyleProp, TouchableHighlight, View, ViewStyle } from 'react-native';
import COLORS from '../../constants/colors';
import ProfileImage from '../ProfileImage';
import { Body, SmallHeader, SubHeader } from '../Text';
import { formatDecimalAsPercentage } from '../../util/formatPercentage';

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
  return (
    <TouchableHighlight
      style={[
        {
          flexDirection: 'row',
          padding: 10,
          width: '100%',
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
              // width: 50,
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
            <SmallHeader>{formatDecimalAsPercentage(percentageAccuracy)}</SmallHeader>
            <SubHeader>{'%'}</SubHeader>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <SubHeader style={{ fontWeight: '400' }}>{`${riskiness.toFixed(
              0,
            )}pts  |  `}</SubHeader>
            <SubHeader
              style={{ fontWeight: '400' }}
            >{`${numCorrect}/${totalPossibleSlots}`}</SubHeader>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default Template;
