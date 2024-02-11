import React, { useEffect, useState } from 'react';
import { FlatList, View, useWindowDimensions } from 'react-native';
import BackgroundWrapper from '../../../components/BackgroundWrapper';
import { useAuth } from '../../../context/AuthContext';
import useQueryGetUser from '../../../hooks/queries/useQueryGetUser';
import { HeaderLight } from '../../../components/Text';
import useQueryGetFollowingUsers from '../../../hooks/queries/useQueryGetFollowingUsers';
import PredictionCarousel from '../../../components/PredictionCarousel';
import theme from '../../../constants/theme';
import RecommendedUsers from '../../../components/RecommendedUsers';
import CarouselSkeleton from '../../../components/Skeletons/CarouselSkeleton';
import useDevice from '../../../util/device';
import { getUserInfo } from '../../../util/getUserInfo';
import SearchInput from '../../../components/Inputs/SearchInput';
import useUserSearch from '../../SearchUsers/useUserSearch';
import UserSearchResultItem from '../../../components/UserSearchResult/UserSearchResultItem';
import { StackActions, useNavigation } from '@react-navigation/native';
import { PredictionsNavigationProp, iUserInfo } from '../../../navigation/types';
import { getLazyLoadProps } from '../../../util/getLazyLoadProps';

const EventSelect = () => {
  const { width } = useWindowDimensions();
  const { userId: authUserId } = useAuth();
  const { isPad } = useDevice();
  const navigation = useNavigation<PredictionsNavigationProp>();

  const { data: user, refetch: refetchUser } = useQueryGetUser(authUserId);
  const {
    data: usersWithNestedData,
    isLoading: isLoadingUsers,
    refetch: refetchFollowingPredictions,
  } = useQueryGetFollowingUsers();
  const {
    searchResults,
    handleSearch,
    fetchMore,
    reset,
    isLoading: searchIsLoading,
  } = useUserSearch();
  const { usersIdsAuthUserIsFollowing } = useQueryGetFollowingUsers();

  const [searchIsFocused, setSearchIsFocused] = useState<boolean>(false);

  useEffect(() => {
    if (authUserId && user === undefined) {
      refetchUser();
    }
    if (authUserId) {
      // WARN: sometimes refetch appears to be not working, but mostly it seems ok?
      refetchFollowingPredictions();
    }
  }, [authUserId, user]);

  const [numToShow, setNumToShow] = useState<number>(3);

  const navigateToProfile = (userInfo: iUserInfo) => {
    // important to push so we can have multiple profiles in same stack
    navigation.dispatch(StackActions.push('Profile', { userInfo }));
  };

  const searchIsActive =
    searchIsFocused || searchResults !== undefined || searchIsLoading;

  return (
    <BackgroundWrapper>
      <View
        style={{
          width: '100%',
          flex: 1,
          justifyContent: 'center',
        }}
      >
        <SearchInput
          searchIsActive={searchIsActive}
          placeholder={'Search users'}
          handleSearch={handleSearch}
          onReset={() => {
            reset();
            setSearchIsFocused(false);
          }}
          onFocus={() => setSearchIsFocused(true)}
        />
        {searchIsActive ? (
          <FlatList
            data={searchResults ?? []}
            style={{ width: '100%' }}
            contentContainerStyle={{
              paddingBottom: 100,
            }}
            ListHeaderComponent={
              <View style={{ width: '100%', alignItems: 'center' }}>
                {searchResults === undefined ? (
                  <RecommendedUsers header={'Follow Users'} />
                ) : null}
              </View>
            }
            ListFooterComponent={
              searchResults === undefined ? <CarouselSkeleton renderBody /> : null
            }
            keyExtractor={(item) => item._id + 'search'}
            renderItem={({ item }) => (
              <UserSearchResultItem
                item={item}
                authUserIsFollowing={usersIdsAuthUserIsFollowing.includes(item._id)}
                onPress={navigateToProfile}
              />
            )}
            {...getLazyLoadProps(() => fetchMore(), isPad)}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <FlatList
            data={(usersWithNestedData ?? []).slice(0, numToShow)}
            style={{ width: '100%' }}
            contentContainerStyle={{
              paddingBottom: 100,
            }}
            ListHeaderComponent={
              <View style={{ width: '100%', alignItems: 'center' }}>
                {!authUserId ? (
                  // users not signed in can see recommended users
                  <RecommendedUsers header={'Follow Users'} />
                ) : (
                  <HeaderLight
                    style={{
                      alignSelf: 'flex-start',
                      marginTop: 10,
                      marginLeft: theme.windowMargin,
                      marginBottom: 10,
                    }}
                  >
                    New From Friends
                  </HeaderLight>
                )}
                {isLoadingUsers ? (
                  <View style={{ marginLeft: -10 }}>
                    {new Array(2).fill(null).map((x, i) => (
                      <CarouselSkeleton key={i} renderProfile renderBody />
                    ))}
                  </View>
                ) : null}
              </View>
            }
            ListFooterComponent={
              numToShow < (usersWithNestedData ?? []).length ? (
                <CarouselSkeleton renderBody />
              ) : null
            }
            keyExtractor={(item) => item._id + 'carousel'}
            renderItem={({ item }) => (
              <View style={{ width }}>
                <PredictionCarousel
                  predictionSets={item.recentPredictionSets || []}
                  userInfo={getUserInfo(item)}
                />
              </View>
            )}
            {...getLazyLoadProps(() => setNumToShow((n) => n + 5), isPad)}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </BackgroundWrapper>
  );
};

export default EventSelect;
