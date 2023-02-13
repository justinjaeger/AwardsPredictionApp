import React from 'react';
import { ScrollView, useWindowDimensions } from 'react-native';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import SearchInput from '../../components/Inputs/SearchInput';
import { HeaderLight } from '../../components/Text';
import UserSearchResult from '../../components/UserSearchResult';
import theme from '../../constants/theme';
import { useSearch } from '../../context/ContenderSearchContext';
import useFriendSearch from './useFriendSearch';

const SearchFriends = () => {
  const { width } = useWindowDimensions();

  const { isSearching } = useSearch();
  const { searchResults } = useFriendSearch();

  return (
    <BackgroundWrapper>
      <ScrollView>
        <SearchInput
          placeholder={'Search users'}
          style={{ width, padding: theme.windowMargin }}
        />
        <UserSearchResult users={searchResults} />
        {!isSearching && searchResults.length === 0 ? (
          <HeaderLight
            style={{
              marginTop: 40,
              alignSelf: 'flex-start',
              marginLeft: theme.windowMargin,
            }}
          >
            Following:
          </HeaderLight>
        ) : null}
      </ScrollView>
    </BackgroundWrapper>
  );
};

export default SearchFriends;
