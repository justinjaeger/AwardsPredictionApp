import React from 'react';
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import SearchInput from '../../components/Inputs/SearchInput';
import RecommendedUsers from '../../components/RecommendedUsers';
import UserSearchResult from '../../components/UserSearchResult';
import { SearchProvider, useSearch } from '../../context/ContenderSearchContext';
import useFriendSearch from './useFriendSearch';

const SearchFriends = () => {
  const { isSearching } = useSearch();
  const { searchResults } = useFriendSearch();

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
          <SearchInput placeholder={'Search users'} />
          {!isSearching && searchResults.length === 0 ? (
            <RecommendedUsers />
          ) : (
            <UserSearchResult users={searchResults} />
          )}
        </View>
      </TouchableWithoutFeedback>
    </BackgroundWrapper>
  );
};

const WithProvider = () => (
  <SearchProvider>
    <SearchFriends />
  </SearchProvider>
);

export default WithProvider;
