import React, { useLayoutEffect } from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { getHeaderTitle } from '../../../constants';
import BackgroundWrapper from '../../../components/BackgroundWrapper';
import { useTypedNavigation } from '../../../util/hooks';
import UserSearchResult from '../../../components/UserSearchResult';
import usePaginatedFriends from '../../../hooks/usePaginatedFriends';
import { PredictionsParamList } from '../../../navigation/types';

const Followers = () => {
  const navigation = useTypedNavigation<PredictionsParamList>();
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
