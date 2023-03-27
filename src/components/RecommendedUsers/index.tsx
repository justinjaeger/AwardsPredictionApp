import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import useRecommendedUsers from '../../hooks/useRecommendedUsers';
import UserSearchResult from '../UserSearchResult';

const RecommendedUsers = ({ header }: { header?: string }) => {
  const bodyOpacity = useRef(new Animated.Value(0)).current;

  const { users: recommendedUsers, isFetching } = useRecommendedUsers();

  const showLoading = isFetching && recommendedUsers.length === 0;
  useEffect(() => {
    if (recommendedUsers.length > 0) {
      Animated.timing(bodyOpacity, {
        toValue: showLoading ? 0 : 1,
        duration: 250,
        useNativeDriver: false,
      }).start();
    }
  }, [showLoading, recommendedUsers.length]);

  return (
    <Animated.View style={{ opacity: bodyOpacity }}>
      <UserSearchResult users={recommendedUsers} header={header} />
    </Animated.View>
  );
};

export default RecommendedUsers;
