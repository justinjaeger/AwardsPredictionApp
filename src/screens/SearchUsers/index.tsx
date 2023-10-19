import React from 'react';
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import SearchInput from '../../components/Inputs/SearchInput';
import RecommendedUsers from '../../components/RecommendedUsers';
import UserSearchResult from '../../components/UserSearchResult';
import { SearchProvider } from '../../context/SearchContext';
import useUserSearch from './useUserSearch';

const SearchUsers = () => {
  const { searchResults, handleSearch, fetchMore, allUsersAreFetched } = useUserSearch();

  return (
    <BackgroundWrapper>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View
          style={{
            width: '100%',
            height: '100%',
            alignItems: 'center',
          }}
        >
          <SearchInput placeholder={'Search users'} handleSearch={handleSearch} />
          {searchResults.length === 0 ? (
            <RecommendedUsers />
          ) : (
            <UserSearchResult
              users={searchResults}
              allUsersAreFetched={allUsersAreFetched}
              onEndReached={fetchMore}
            />
          )}
        </View>
      </TouchableWithoutFeedback>
    </BackgroundWrapper>
  );
};

const WithProvider = () => (
  <SearchProvider>
    <SearchUsers />
  </SearchProvider>
);

export default WithProvider;
