import React, { useEffect, useRef } from 'react';
import { Animated, Keyboard, TouchableWithoutFeedback, View } from 'react-native';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import SearchInput from '../../components/Inputs/SearchInput';
import LoadingStatue from '../../components/LoadingStatue';
import { HeaderLight, SubHeader } from '../../components/Text';
import UserSearchResult from '../../components/UserSearchResult';
import theme from '../../constants/theme';
import { SearchProvider, useSearch } from '../../context/ContenderSearchContext';
import useRecommendedUsers from '../../hooks/useRecommendedUsers';
import useFriendSearch from './useFriendSearch';

const SearchFriends = () => {
  const loadingOpacity = useRef(new Animated.Value(1)).current;
  const bodyOpacity = useRef(new Animated.Value(0)).current;

  const { isSearching } = useSearch();
  const { searchResults } = useFriendSearch();
  const { users: recommendedUsers, isFetching } = useRecommendedUsers();

  const showLoading = isFetching && recommendedUsers.length === 0;
  useEffect(() => {
    Animated.timing(loadingOpacity, {
      toValue: showLoading ? 1 : 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
    Animated.timing(bodyOpacity, {
      toValue: showLoading ? 0 : 1,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [showLoading]);

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
          <Animated.View
            style={{ position: 'absolute', opacity: loadingOpacity, top: '10%' }}
          >
            <LoadingStatue />
          </Animated.View>
          <Animated.View style={{ opacity: bodyOpacity }}>
            {!isSearching && searchResults.length === 0 ? (
              recommendedUsers.length > 0 ? (
                <>
                  <HeaderLight
                    style={{
                      marginTop: 20,
                      alignSelf: 'flex-start',
                      marginLeft: theme.windowMargin,
                      marginBottom: 10,
                    }}
                  >
                    Recommended:
                  </HeaderLight>
                  <UserSearchResult users={recommendedUsers} />
                </>
              ) : (
                <SubHeader style={{ marginTop: '5%', fontWeight: '700' }}>
                  {'Find other users to follow!'}
                </SubHeader>
              )
            ) : (
              <UserSearchResult users={searchResults} />
            )}
          </Animated.View>
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
