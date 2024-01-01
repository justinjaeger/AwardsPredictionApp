import React, { useLayoutEffect } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { getHeaderTitle } from '../../../constants';
import BackgroundWrapper from '../../../components/BackgroundWrapper';
import UserSearchResult from '../../../components/UserSearchResult';
import usePaginatedFriends from '../../../hooks/usePaginatedFriends';
import {
  PredictionsNavigationProp,
  PredictionsParamList,
} from '../../../navigation/types';

const Followers = () => {
  const navigation = useNavigation<PredictionsNavigationProp>();
  const {
    params: { userId, type },
  } = useRoute<RouteProp<PredictionsParamList, 'Followers'>>();

  const { users, fetchPage, isLoading, allUsersAreFetched } = usePaginatedFriends({
    userId,
    type,
  });

  useLayoutEffect(() => {
    // Render Header
    navigation.setOptions({
      headerTitle: getHeaderTitle(type === 'followers' ? 'Followers' : 'Following'),
    });
  }, []);

  return (
    <BackgroundWrapper>
      <UserSearchResult
        users={users}
        onEndReached={() => {
          fetchPage();
        }}
        isLoading={isLoading}
        allUsersAreFetched={allUsersAreFetched}
        noHeader
      />
    </BackgroundWrapper>
  );
};

export default Followers;
