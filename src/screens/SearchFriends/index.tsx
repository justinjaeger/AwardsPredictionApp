import React from 'react';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import { HeaderLight } from '../../components/Text';
import theme from '../../constants/theme';

const SearchFriends = () => {
  return (
    <BackgroundWrapper>
      <></>
      <HeaderLight
        style={{ marginTop: 40, alignSelf: 'flex-start', marginLeft: theme.windowMargin }}
      >
        Recommended
      </HeaderLight>
    </BackgroundWrapper>
  );
};

export default SearchFriends;
