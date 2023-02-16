import React, { useLayoutEffect } from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { getHeaderTitle } from '../../../constants';
import BackgroundWrapper from '../../../components/BackgroundWrapper';
import { useTypedNavigation } from '../../../util/hooks';
import { ProfileParamList } from '../../../navigation/types';
import UserSearchResult from '../../../components/UserSearchResult';
import usePaginatedFriends from '../../../hooks/usePaginatedFriends';

const Followers = () => {
  const navigation = useTypedNavigation<ProfileParamList>();
  const {
    params: { userId, type },
  } = useRoute<RouteProp<ProfileParamList, 'Followers'>>();

  const { users, fetchPage, isLoading } = usePaginatedFriends({ userId, type });

  useLayoutEffect(() => {
    // Render Header
    navigation.setOptions({
      headerTitle: getHeaderTitle(type === 'followers' ? 'Followers' : 'Following'),
    });
  }, []);

  return (
    <BackgroundWrapper>
      <UserSearchResult users={users} onEndReached={fetchPage} isLoading={isLoading} />
    </BackgroundWrapper>
  );
};

export default Followers;
