import React from 'react';
import { useWindowDimensions } from 'react-native';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import SearchInput from '../../components/Inputs/SearchInput';
import { BodyBold, HeaderLight } from '../../components/Text';
import UserSearchResult from '../../components/UserSearchResult';
import theme from '../../constants/theme';
import { useSearch } from '../../context/ContenderSearchContext';
import useRecommendedUsers from '../../hooks/useRecommendedUsers';
import useFriendSearch from './useFriendSearch';

const SearchFriends = () => {
  const { width } = useWindowDimensions();

  const { isSearching } = useSearch();
  const { searchResults } = useFriendSearch();
  const { users: recommendedUsers, fetchPage } = useRecommendedUsers();

  return (
    <BackgroundWrapper>
      <SearchInput
        placeholder={'Search users'}
        style={{ width, padding: theme.windowMargin }}
      />

      {!isSearching && searchResults.length === 0 ? (
        recommendedUsers.length > 0 ? (
          <>
            <HeaderLight
              style={{
                marginTop: 40,
                alignSelf: 'flex-start',
                marginLeft: theme.windowMargin,
              }}
            >
              Recommended:
            </HeaderLight>
            <UserSearchResult users={recommendedUsers} onEndReached={fetchPage} />
          </>
        ) : (
          <BodyBold style={{ marginTop: 20 }}>Search for users to follow</BodyBold>
        )
      ) : (
        <UserSearchResult users={searchResults} />
      )}
    </BackgroundWrapper>
  );
};

export default SearchFriends;
