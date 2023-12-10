import React, { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';
import { useFollowingBar } from '../../context/FollowingBarContext';
import { BOTTOM_TAB_HEIGHT } from '../../constants';
import { IconButton } from '../Buttons/IconButton';
import COLORS from '../../constants/colors';
import FollowingBottomScroll from '../FollowingBottomScroll';
import useDevice from '../../util/device';
import { IPAD_PROFILE_IMAGE_SCALE } from '../ProfileImage';
import { useAuth } from '../../context/AuthContext';
import { StackActions, useNavigation } from '@react-navigation/native';
import { PredictionsNavigationProp } from '../../navigation/types';
import { useRouteParams } from '../../hooks/useRouteParams';

const BottomFABContainer = ({ children }: { children?: React.ReactNode }) => {
  const { isPad } = useDevice();
  const HEIGHT_TO_MOVE_UP = 60 * (isPad ? IPAD_PROFILE_IMAGE_SCALE : 1);
  const animatedBottomButtons = useRef(new Animated.Value(HEIGHT_TO_MOVE_UP)).current;
  const navigation = useNavigation<PredictionsNavigationProp>();
  const { isHidden, setIsHidden, hideAbsolutely } = useFollowingBar();
  const { userId: authUserId } = useAuth();
  const { eventId, category, userId } = useRouteParams();
  const isAuthUser = userId === authUserId;

  useEffect(() => {
    Animated.timing(animatedBottomButtons, {
      toValue: isHidden ? HEIGHT_TO_MOVE_UP : 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [isHidden]);

  const bottom = BOTTOM_TAB_HEIGHT + (HEIGHT_TO_MOVE_UP - 40);

  return (
    <Animated.View
      style={{
        transform: [{ translateY: animatedBottomButtons }],
        zIndex: 10,
      }}
    >
      {isAuthUser && !hideAbsolutely ? (
        <View
          style={{
            position: 'absolute',
            left: 0,
            bottom,
          }}
        >
          <IconButton
            iconProps={{
              name: isHidden ? 'chevron-down-outline' : 'people-outline',
            }}
            color={COLORS.white}
            styles={{
              backgroundColor: COLORS.secondaryDark,
              marginLeft: 10,
              padding: 3,
              height: 45,
            }}
            onPress={() => setIsHidden((prev) => !prev)}
          />
        </View>
      ) : null}
      <View
        style={{
          position: 'absolute',
          right: 0,
          bottom,
          flexDirection: 'row',
        }}
      >
        {children}
      </View>
      {isAuthUser ? (
        <View
          style={{
            position: 'absolute',
            bottom: -5,
            left: 0,
          }}
        >
          <FollowingBottomScroll
            onPress={(uId, userImage) => {
              const params = {
                userId: uId,
                userImage,
                eventId,
                category,
              };
              if (category) {
                navigation.dispatch(StackActions.push('CategoryFromProfile', params));
              } else {
                navigation.dispatch(StackActions.push('EventFromProfile', params));
              }
            }}
          />
        </View>
      ) : null}
    </Animated.View>
  );
};

export default BottomFABContainer;
