import React from 'react';
import { View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import COLORS from '../../constants/colors';
import theme from '../../constants/theme';
import useDevice from '../../util/device';
import { getUserSearchItemHeight } from '../UserSearchResult/UserSearchResultItem';

const UserListSkeleton = ({
  imageSize,
  numResults = 5,
}: {
  imageSize: number;
  numResults?: number;
}) => {
  const { isPad } = useDevice();
  const imgSize = isPad ? imageSize * 1.5 : imageSize;
  return (
    <View style={{ height: '100%' }}>
      <SkeletonPlaceholder
        speed={1200}
        backgroundColor={COLORS.primary}
        highlightColor={COLORS.primaryLight}
      >
        <View style={{ flexDirection: 'column' }}>
          {Array(numResults)
            .fill(null)
            .map((x, i) => (
              <View
                key={i}
                style={{
                  height: getUserSearchItemHeight(isPad),
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <View
                  style={{
                    width: imgSize,
                    height: imgSize,
                    borderRadius: imgSize,
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
                      width: 100 * (isPad ? 2 : 1),
                      height: 20,
                      borderRadius: theme.borderRadius,
                    }}
                  />
                  <View
                    style={{
                      marginTop: 6,
                      width: 60 * (isPad ? 2 : 1),
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
};

export default UserListSkeleton;
