import React from 'react';
import { View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import COLORS from '../../constants/colors';
import theme from '../../constants/theme';

const UserListSkeleton = ({ imageSize }: { imageSize: number }) => (
  <View style={{ height: '100%' }}>
    <SkeletonPlaceholder
      speed={1200}
      backgroundColor={COLORS.primary}
      highlightColor={COLORS.primaryLight}
    >
      <View style={{ flexDirection: 'column' }}>
        {['', '', ''].map((x, i) => (
          <View
            key={i}
            style={{
              marginLeft: 10,
              marginTop: 10,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                width: imageSize,
                height: imageSize,
                borderRadius: imageSize,
              }}
            />
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                marginLeft: 10,
              }}
            >
              <View
                style={{
                  width: 50,
                  height: 20,
                  borderRadius: theme.borderRadius,
                }}
              />
              <View
                style={{
                  marginTop: 6,
                  width: 100,
                  height: 20,
                  borderRadius: theme.borderRadius,
                }}
              />
            </View>
          </View>
        ))}
      </View>
    </SkeletonPlaceholder>
  </View>
);

export default UserListSkeleton;
