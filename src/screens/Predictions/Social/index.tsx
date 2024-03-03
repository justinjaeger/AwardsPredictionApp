import React, { useRef, useEffect, useState } from 'react';
import { View, useWindowDimensions } from 'react-native';
import BackgroundWrapper from '../../../components/BackgroundWrapper';
import { useAuth } from '../../../context/AuthContext';
import useQueryGetUser from '../../../hooks/queries/useQueryGetUser';
import useQueryGetFollowingUsers from '../../../hooks/queries/useQueryGetFollowingUsers';
import PredictionCarousel, {
  CAROUSEL_MARGIN,
  CAROUSEL_PROFILE_IMAGE_SIZE,
  getCarouselSliderHeight,
} from '../../../components/PredictionCarousel';
import CarouselSkeleton from '../../../components/Skeletons/CarouselSkeleton';
import useDevice from '../../../util/device';
import { getUserInfo } from '../../../util/getUserInfo';
import SearchInput, { getSearchHeight } from '../../../components/Inputs/SearchInput';
import useUserSearch from '../../SearchUsers/useUserSearch';
import UserSearchResultItem, {
  USER_SEARCH_ITEM_HEIGHT,
} from '../../../components/UserSearchResult/UserSearchResultItem';
import { StackActions, useNavigation } from '@react-navigation/native';
import { PredictionsNavigationProp, iUserInfo } from '../../../navigation/types';
import DynamicHeaderFlatListWrapper from '../../../components/DynamicHeaderWrapper/DynamicHeaderFlatListWrapper';
import { FlashList } from '@shopify/flash-list';
import { User, WithId } from '../../../models';
import useRecommendedUsers from '../../../hooks/useRecommendedUsers';

const SEARCH_MARGIN_BOTTOM = 10;

/**
 * TODO: I think this needs a few tabs.
 * 1. Recent
 * 2. By Event
 * 3. Search (with recommended)
 *
 * But for next event, we can skip the middle
 */
const Social = () => {
  const flashListRef = useRef<FlashList<any>>(null);

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
    users: recommendedUsers,
    isFetching: isFetchingRecommended,
    fetchMoreResults: fetchMoreRecommended,
  } = useRecommendedUsers();
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

  const navigateToProfile = (userInfo: iUserInfo) => {
    // important to push so we can have multiple profiles in same stack
    navigation.dispatch(StackActions.push('Profile', { userInfo }));
  };

  const searchIsActive =
    searchIsFocused || searchResults !== undefined || searchIsLoading;

  const itemHeightCarousel =
    CAROUSEL_MARGIN * 4 +
    CAROUSEL_PROFILE_IMAGE_SIZE +
    getCarouselSliderHeight(width, isPad);

  const showRecommended = searchResults === undefined && !isFetchingRecommended;

  const topOnlyContent = {
    height: getSearchHeight(isPad) + SEARCH_MARGIN_BOTTOM,
    component: (
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
    ),
  };

  console.log('isLoadingUsers', isLoadingUsers);

  // if (true) {
  //   return (
  //     <BackgroundWrapper>
  //       <View style={{ backgroundColor: 'red' }}>
  //         {new Array(3).fill(null).map((x, i) => (
  //           <CarouselSkeleton key={i} renderProfile renderBody />
  //         ))}
  //       </View>
  //     </BackgroundWrapper>
  //   );
  // }

  return (
    <BackgroundWrapper>
      <View style={{ display: searchIsActive ? 'flex' : 'none' }}>
        <DynamicHeaderFlatListWrapper<WithId<User>>
          flashListRef={flashListRef}
          disableBack={true}
          topOnlyContent={topOnlyContent}
          flatListProps={{
            data: showRecommended ? recommendedUsers : searchResults ?? [],
            keyExtractor: (item) => item._id + 'search',
            renderItem: ({ item }) => (
              <UserSearchResultItem
                item={item}
                authUserIsFollowing={usersIdsAuthUserIsFollowing.includes(item._id)}
                onPress={navigateToProfile}
              />
            ),
            // ListHeaderComponent: (
            //   <View style={{ width: '100%', alignItems: 'center' }}>
            //     {searchResults === undefined ? (
            //       <RecommendedUsers header={'Follow Users'} />
            //     ) : null}
            //   </View>
            // ),
            // ListFooterComponent:
            //   searchResults === undefined ? <CarouselSkeleton renderBody /> : null,
            onEndReached: () => {
              if (showRecommended) {
                fetchMoreRecommended();
              } else {
                fetchMore();
              }
            },
            estimatedItemSize: USER_SEARCH_ITEM_HEIGHT,
          }}
        />
      </View>
      <View style={{ display: searchIsActive ? 'none' : 'flex' }}>
        <DynamicHeaderFlatListWrapper<WithId<User>>
          flashListRef={flashListRef}
          disableBack={true}
          topOnlyContent={topOnlyContent}
          flatListProps={{
            data: usersWithNestedData ?? [],
            keyExtractor: (item) => item._id + 'carousel',
            renderItem: ({ item }) => (
              <View style={{ width }}>
                <PredictionCarousel
                  predictionSets={item.recentPredictionSets || []}
                  userInfo={getUserInfo(item)}
                />
              </View>
            ),
            ListHeaderComponent: (
              <View style={{ width: '100%', alignItems: 'center' }}>
                {/* {!authUserId ? (
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
                )} */}
                {isLoadingUsers ? (
                  <View style={{ marginLeft: -10 }}>
                    {new Array(2).fill(null).map((x, i) => (
                      <CarouselSkeleton key={i} renderProfile renderBody />
                    ))}
                  </View>
                ) : null}
              </View>
            ),
            estimatedItemSize: itemHeightCarousel,
          }}
        />
      </View>
    </BackgroundWrapper>
  );
};

export default Social;
