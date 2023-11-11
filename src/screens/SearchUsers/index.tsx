import React from 'react';
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import SearchInput from '../../components/Inputs/SearchInput';
import RecommendedUsers from '../../components/RecommendedUsers';
import UserSearchResult from '../../components/UserSearchResult';
import useUserSearch from './useUserSearch';

const SearchUsers = () => {
  const { searchResults, handleSearch, fetchMore, allUsersAreFetched, reset } =
    useUserSearch();

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
          <SearchInput
            placeholder={'Search users'}
            handleSearch={handleSearch}
            onReset={() => {
              reset();
            }}
          />
          {searchResults.length === 0 ? (
            <RecommendedUsers />
          ) : (
            <UserSearchResult
              users={searchResults}
              allUsersAreFetched={allUsersAreFetched}
              onEndReached={fetchMore}
              noHeader
            />
          )}
        </View>
      </TouchableWithoutFeedback>
    </BackgroundWrapper>
  );
};

export default SearchUsers;
