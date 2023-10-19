import React from 'react';
import useRecommendedUsers from '../../hooks/useRecommendedUsers';
import UserSearchResult from '../UserSearchResult';

const RecommendedUsers = ({ header }: { header?: string }) => {
  const { users: recommendedUsers, isFetching } = useRecommendedUsers();
  const isLoading = isFetching && recommendedUsers.length === 0;

  return (
    <UserSearchResult
      users={isLoading ? [] : recommendedUsers}
      isLoading={isLoading}
      header={header}
    />
  );
};

export default RecommendedUsers;
