import React from 'react';
import { useWindowDimensions } from 'react-native';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import SearchInput from '../../components/Inputs/SearchInput';
import { HeaderLight } from '../../components/Text';
import theme from '../../constants/theme';

const SearchFriends = () => {
  const { width } = useWindowDimensions();

  return (
    <BackgroundWrapper>
      <SearchInput
        placeholder={'Search Movies'}
        style={{ width, padding: theme.windowMargin }}
      />
      <HeaderLight
        style={{ marginTop: 40, alignSelf: 'flex-start', marginLeft: theme.windowMargin }}
      >
        Recommended
      </HeaderLight>
    </BackgroundWrapper>
  );
};

export default SearchFriends;
