import React, { useEffect, useRef } from 'react';
import { Animated, ScrollView, View } from 'react-native';
import COLORS from '../../constants/colors';
import theme from '../../constants/theme';
import { useCategory } from '../../context/CategoryContext';
import { useFollowingBar } from '../../context/FollowingBarContext';
import useFriendsPredictingEvent from '../../hooks/useFriendsPredictingEvent';
import { IconButton } from '../Buttons/IconButton';
import ProfileImage from '../ProfileImage';

const FollowingBottomScroll = ({
  userId,
  onPress,
}: {
  userId: string;
  onPress: (userId: string) => void;
}) => {
  const friendsYPos = useRef(new Animated.Value(0)).current;
  const { event } = useCategory();
  const { isHidden, setIsHidden } = useFollowingBar();
  const { data: users } = useFriendsPredictingEvent(userId, event?.id);

  const imageWidth = 50;
  const imageMargin = 5;

  useEffect(() => {
    Animated.timing(friendsYPos, {
      toValue: isHidden ? 60 : 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [isHidden]);

  if (!users || users.length === 0) return null;

  return (
    <View
      style={{
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'transparent',
        alignItems: 'center',
        flexDirection: 'row',
        height: 60,
      }}
    >
      <IconButton
        iconProps={{ name: isHidden ? 'people-outline' : 'chevron-down-outline' }}
        color={COLORS.white}
        styles={{
          backgroundColor: COLORS.secondaryDark,
          marginLeft: theme.windowMargin,
        }}
        onPress={() => setIsHidden(!isHidden)}
      />
      <ScrollView
        horizontal
        contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
      >
        <Animated.View
          style={{ transform: [{ translateY: friendsYPos }], marginLeft: 10 }}
        >
          {users.map((user) => (
            <ProfileImage
              key={user.id}
              image={user.image}
              imageSize={imageWidth}
              onPress={() => onPress(user.id)}
              style={{
                margin: imageMargin,
                borderWidth: 1,
                borderColor: COLORS.secondary,
                borderRadius: 100,
              }}
            />
          ))}
        </Animated.View>
      </ScrollView>
    </View>
  );
};

export default FollowingBottomScroll;
