import React, { useRef, useEffect, useState } from 'react';
import { View, useWindowDimensions } from 'react-native';
import BackgroundWrapper from '../../../components/BackgroundWrapper';
import { useAuth } from '../../../context/AuthContext';
import useQueryGetUser from '../../../hooks/queries/useQueryGetUser';
import useQueryGetFollowingUsers from '../../../hooks/queries/useQueryGetFollowingUsers';
import PredictionCarousel, {
  getCarouselHeight,
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
import Header, { HEADER_HEIGHT } from '../../../components/HeaderComponents/Header';
import theme from '../../../constants/theme';
import { HEADER_TOP_TAB_MARGIN_BOTTOM } from '../../../components/HeaderComponents/constants';
import { hexToRgb } from '../../../util/hexToRgb';
import COLORS from '../../../constants/colors';
import SectionTopTabs, { getSectionTabHeight } from '../../../components/SectionTopTabs';
import { useSharedValue } from 'react-native-reanimated';
import { Body } from '../../../components/Text';
import useQueryGetAllEvents from '../../../hooks/queries/useQueryGetAllEvents';

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
  const tabsPosX = useSharedValue(0);

  const { width } = useWindowDimensions();
  const { userId: authUserId } = useAuth();
  const { isPad } = useDevice();
  const navigation = useNavigation<PredictionsNavigationProp>();

  const { data: allEvents } = useQueryGetAllEvents();
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

  const itemHeightCarousel = getCarouselHeight(width, isPad);

  const showRecommended = searchResults === undefined && !isFetchingRecommended;
  const showUserSearch = !authUserId || searchIsActive;

  const screenTitle = showUserSearch ? 'Find Users' : 'From Friends';

  // Prep data for "by event/category" tab
  const users = usersWithNestedData ?? [];
  const usersGroupedByEventPredicting: { [eventId: string]: WithId<User>[] } = {};
  const usersGroupedByEventAndCategoryPredicting: {
    [eventId: string]: { [category: string]: (WithId<User> & { lastUpdated: Date })[] };
  } = {};
  for (const user of users) {
    Object.entries(user.categoriesPredicting ?? {}).forEach(([eventId, categories]) => {
      if (!usersGroupedByEventPredicting[eventId]) {
        usersGroupedByEventPredicting[eventId] = [];
      }
      usersGroupedByEventPredicting[eventId].push(user);
      if (!usersGroupedByEventAndCategoryPredicting[eventId]) {
        usersGroupedByEventAndCategoryPredicting[eventId] = {};
      }
      for (const [category, { createdAt }] of Object.entries(categories)) {
        if (!usersGroupedByEventAndCategoryPredicting[eventId][category]) {
          usersGroupedByEventAndCategoryPredicting[eventId][category] = [];
        }
        usersGroupedByEventAndCategoryPredicting[eventId][category].push({
          ...user,
          lastUpdated: createdAt,
        });
      }
    });
  }

  const topOnlyContent = {
    height:
      getSearchHeight(isPad) +
      SEARCH_MARGIN_BOTTOM +
      HEADER_HEIGHT +
      HEADER_TOP_TAB_MARGIN_BOTTOM * 2,
    component: (
      <>
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
        <Header
          text={screenTitle}
          style={{
            marginLeft: theme.windowMargin,
            marginBottom: HEADER_TOP_TAB_MARGIN_BOTTOM,
          }}
        />
        <View
          style={{
            borderBottomWidth: 1,
            borderColor: hexToRgb(COLORS.primaryLight, 0.5),
          }}
        />
      </>
    ),
  };

  const [currTab, setCurrTab] = useState(0);
  const persistedContent = {
    height: getSectionTabHeight(isPad),
    component: (
      <SectionTopTabs
        tabs={[
          { title: 'Recent', onOpenTab: () => setCurrTab(0) },
          { title: 'By Event', onOpenTab: () => setCurrTab(1) },
        ]}
        initialTabIndex={currTab}
        tabsPosX={tabsPosX}
      />
    ),
  };

  return (
    <BackgroundWrapper>
      <View style={{ display: showUserSearch ? 'flex' : 'none' }}>
        <DynamicHeaderFlatListWrapper<WithId<User>>
          flashListRef={flashListRef}
          disableBack={true}
          topOnlyContent={topOnlyContent}
          titleWhenCollapsed={screenTitle}
          flatListProps={{
            data: isFetchingRecommended
              ? []
              : showRecommended
              ? recommendedUsers
              : searchResults ?? [],
            keyExtractor: (item) => item._id + 'search',
            renderItem: ({ item }) => (
              <UserSearchResultItem
                item={item}
                authUserIsFollowing={usersIdsAuthUserIsFollowing.includes(item._id)}
                onPress={navigateToProfile}
              />
            ),
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
      <View style={{ display: showUserSearch || currTab === 1 ? 'none' : 'flex' }}>
        <DynamicHeaderFlatListWrapper<WithId<User>>
          flashListRef={flashListRef}
          disableBack={true}
          topOnlyContent={topOnlyContent}
          persistedContent={persistedContent}
          titleWhenCollapsed={screenTitle}
          flatListProps={{
            // important: if loading users, this allows the header loader to render without being blocked by js
            data: isLoadingUsers ? [] : usersWithNestedData ?? [],
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
                {isLoadingUsers ? (
                  <View style={{ flexDirection: 'column' }}>
                    {new Array(3).fill(null).map((x, i) => (
                      <CarouselSkeleton
                        key={i}
                        renderProfile
                        renderBody
                        height={itemHeightCarousel}
                      />
                    ))}
                  </View>
                ) : null}
              </View>
            ),
            estimatedItemSize: itemHeightCarousel,
          }}
        />
      </View>
      <View style={{ display: showUserSearch || currTab === 0 ? 'none' : 'flex' }}>
        <DynamicHeaderFlatListWrapper<[string, WithId<User>[]]>
          flashListRef={flashListRef}
          disableBack={true}
          topOnlyContent={topOnlyContent}
          persistedContent={persistedContent}
          titleWhenCollapsed={screenTitle}
          flatListProps={{
            // important: if loading users, this allows the header loader to render without being blocked by js
            data: isLoadingUsers
              ? []
              : Object.entries(usersGroupedByEventPredicting) ?? [],
            keyExtractor: (item) => item[0] + 'carousel',
            renderItem: ({ item }) => (
              <>
                <Body>{item[0]}</Body>
                {item[1].map((user) => (
                  <Body>{user.name ?? ''}</Body>
                ))}
              </>
            ),
            // ListHeaderComponent: (
            // <View style={{ width: '100%', alignItems: 'center' }}>
            //   {isLoadingUsers ? (
            //     <View style={{ flexDirection: 'column' }}>
            //       {new Array(3).fill(null).map((x, i) => (
            //         <CarouselSkeleton
            //           key={i}
            //           renderProfile
            //           renderBody
            //           height={itemHeightCarousel}
            //         />
            //       ))}
            //     </View>
            //   ) : null}
            // </View>
            // ),
            estimatedItemSize: 30,
          }}
        />
      </View>
    </BackgroundWrapper>
  );
};

export default Social;
