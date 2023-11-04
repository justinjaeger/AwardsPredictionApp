import React from 'react';
import { View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import COLORS from '../../constants/colors';
import theme from '../../constants/theme';
import { IPAD_PROFILE_IMAGE_SCALE } from '../ProfileImage';
import useDevice from '../../util/device';
import CarouselSkeleton from './CarouselSkeleton';

const ProfileSkeleton = () => {
  const { isPad } = useDevice();

  const size = 100 * (isPad ? IPAD_PROFILE_IMAGE_SCALE : 1);

  return (
    <View
      style={{ width: '100%', alignItems: 'flex-start', justifyContent: 'flex-start' }}
    >
      <SkeletonPlaceholder
        speed={1200}
        backgroundColor={COLORS.primary}
        highlightColor={COLORS.primaryLight}
      >
        <View style={{ width: '100%', alignItems: 'flex-start' }}>
          <View
            style={{
              marginTop: 20,
              alignItems: 'center',
              flexDirection: 'row',
              marginLeft: theme.windowMargin,
            }}
          >
            <View
              style={{ width: size, height: size, borderRadius: size, marginRight: 20 }}
            />
            <View>
              <View
                style={{
                  borderRadius: theme.borderRadius,
                  width: 140,
                  height: 30,
                }}
              />
              <View
                style={{
                  borderRadius: theme.borderRadius,
                  width: 100,
                  height: 20,
                  marginTop: 20,
                }}
              />
            </View>
          </View>
          <View
            style={{
              marginTop: 20,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              width: '100%',
              marginLeft: theme.windowMargin,
            }}
          >
            <View
              style={{
                width: 130,
                height: 35,
                marginRight: 20,
                borderRadius: theme.borderRadius,
              }}
            />
            <View
              style={{
                width: 130,
                height: 35,
                borderRadius: theme.borderRadius,
              }}
            />
          </View>
        </View>
      </SkeletonPlaceholder>
      <View style={{ marginTop: 40 }} />
      <SkeletonPlaceholder
        speed={1200}
        backgroundColor={COLORS.primary}
        highlightColor={COLORS.primaryLight}
      >
        <View
          style={{
            marginTop: 20,
            alignItems: 'center',
            flexDirection: 'row',
            marginLeft: theme.windowMargin,
          }}
        >
          <View
            style={{
              borderRadius: theme.borderRadius,
              width: 140,
              height: 30,
            }}
          />
        </View>
      </SkeletonPlaceholder>
      <View style={{ marginTop: 20 }} />
      <CarouselSkeleton />
    </View>
  );
};

export default ProfileSkeleton;
