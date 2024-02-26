import React, { useRef } from 'react';
import PredictionTabsNavigator from '../../../navigation/PredictionTabsNavigator';
import { useAuth } from '../../../context/AuthContext';
import useQueryGetUserPredictions from '../../../hooks/queries/useQueryGetUserPredictions';
import useQueryGetCommunityPredictions from '../../../hooks/queries/useQueryGetCommunityPredictions';
import BottomFABContainer from '../../../components/BottomFABContainer';
import { useRouteParams } from '../../../hooks/useRouteParams';
import BackgroundWrapper from '../../../components/BackgroundWrapper';
import { View, useWindowDimensions, FlatList, ScrollView } from 'react-native';
import useDevice from '../../../util/device';
import { AWARDS_BODY_TO_PLURAL_STRING } from '../../../constants/awardsBodies';
import { EVENT_TOP_TABS_HEIGHT } from '../../../components/HorizontalScrollingTabs';
import HeaderDropdownOverlay from '../../../components/HeaderDropdownOverlay';
import { useEventSelect } from '../../../hooks/useEventSelect';
import useQueryGetAllEvents from '../../../hooks/queries/useQueryGetAllEvents';
import { getSectionTabHeight } from '../../../components/SectionTopTabs';
import { getUserInfo } from '../../../util/getUserInfo';
import DynamicHeaderFlatListWrapper from '../../../components/DynamicHeaderWrapper/DynamicHeaderFlatListWrapper';
import DualTabsWrapper from '../../../components/DualTabsWrapper';
import { CategoryName, EventModel, PredictionSet, WithId } from '../../../models';
import { getOrderedPredictionSetCategories } from '../../../util/sortByObjectOrder';
import CategoryListItem, { iCategoryListItem } from './CategoryListItem';
import { StackActions, useNavigation } from '@react-navigation/native';
import { PredictionsNavigationProp } from '../../../navigation/types';
import useProfileUser from '../../Profile/useProfileUser';
import EventSkeleton from '../../../components/Skeletons/EventSkeleton';
import { getCategoryListItemHeight } from '../../../util/getCategoryListItemHeight';
import EventTopTabs from '../../../components/HeaderComponents/EventTopTabs';
import YearDropdown from '../../../components/HeaderComponents/YearDropdown';
import theme from '../../../constants/theme';
import Header, { HEADER_HEIGHT } from '../../../components/HeaderComponents/Header';
import BackButton, {
  BACK_BUTTON_HEIGHT,
} from '../../../components/HeaderComponents/BackButton';
import {
  HEADER_TITLE_MARGIN_TOP,
  HEADER_TOP_TAB_MARGIN_BOTTOM,
  HEADER_TOP_TAB_MARGIN_TOP,
} from '../../../components/HeaderComponents/constants';
import Subheader, {
  SUBHEADER_HEIGHT,
} from '../../../components/HeaderComponents/Subheader';
import UserProfile, {
  USER_PROFILE_HEIGHT,
} from '../../../components/HeaderComponents/UserProfile';
import { PHASE_TO_STRING_PLURAL } from '../../../constants/categories';
import { FlashList } from '@shopify/flash-list';

const getPredictionsData = (
  userPredictionSet: WithId<PredictionSet> | undefined,
  communityPredictionSet: WithId<PredictionSet> | undefined,
  event: EventModel | undefined,
): iCategoryListItem[][] => {
  if (!event) return [];
  const orderedUserPredictions = getOrderedPredictionSetCategories(
    event,
    userPredictionSet?.categories,
  );
  const orderedCommuintyPredictions = getOrderedPredictionSetCategories(
    event,
    communityPredictionSet?.categories,
  );
  const result = orderedUserPredictions.map((category, i) => {
    return [category, orderedCommuintyPredictions[i]];
  });
  return result;
};

const Event = () => {
  const scrollViewRef = useRef<ScrollView>(null);

  const { width } = useWindowDimensions();
  const { isPad } = useDevice();
  const navigation = useNavigation<PredictionsNavigationProp>();
  const { userInfo, isLeaderboard, disableBack } = useRouteParams();
  const { userId: authUserId } = useAuth();
  const userId = userInfo?.userId || authUserId || undefined;
  const { user } = useProfileUser(userId);
  const isAuthProfile = user?._id === authUserId;

  const { data: events } = useQueryGetAllEvents();
  const { event, phase, yyyymmdd, setEvent, setYear } = useEventSelect();

  const { data: userPredictionData, isLoading: isLoadingPersonal } =
    useQueryGetUserPredictions({ event, userId, yyyymmdd });
  const { data: communityPredictionData, isLoading: isLoadingCommunity } =
    useQueryGetCommunityPredictions({ event, yyyymmdd });

  const predictionTabHeight = getSectionTabHeight(isPad);

  const onSelectCategory = async (category: CategoryName, isCommunityTab?: boolean) => {
    if (!event) return;
    const params = {
      userInfo: userInfo || getUserInfo(user),
      eventId: event._id,
      category,
      phase,
      yyyymmdd,
      isLeaderboard,
    };
    if (isAuthProfile || isCommunityTab) {
      navigation.navigate('Category', params);
    } else {
      navigation.dispatch(StackActions.push('Category', params));
    }
  };

  const data = getPredictionsData(
    userPredictionData || undefined,
    communityPredictionData || undefined,
    event,
  );

  const isLoading = isLoadingPersonal || isLoadingCommunity;

  const eventName = event
    ? `${event?.year ?? ''} ${AWARDS_BODY_TO_PLURAL_STRING[event.awardsBody]}`
    : '';
  const phaseName = (phase ? PHASE_TO_STRING_PLURAL[phase] : '') + ' ';

  const topOnlyContent = isLeaderboard
    ? {
        height: HEADER_HEIGHT + SUBHEADER_HEIGHT + USER_PROFILE_HEIGHT,
        component: (
          <View style={{ marginTop: HEADER_TITLE_MARGIN_TOP }}>
            <View
              style={{
                paddingLeft: theme.windowMargin,
                paddingRight: theme.windowMargin,
              }}
            >
              <View style={{ position: 'relative', alignItems: 'center' }}>
                <View style={{ position: 'absolute', top: 0, left: 0 }}>
                  {disableBack ? null : <BackButton variation={'on-dark'} />}
                </View>
                {userInfo ? <UserProfile userInfo={userInfo} /> : null}
                <View />
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  width: '100%',
                  alignItems: 'flex-start',
                }}
              >
                <Header text={eventName} />
                <Subheader text={phaseName + 'Leaderboard'} />
              </View>
            </View>
          </View>
        ),
      }
    : {
        height:
          HEADER_HEIGHT +
          HEADER_TITLE_MARGIN_TOP +
          EVENT_TOP_TABS_HEIGHT +
          HEADER_TOP_TAB_MARGIN_BOTTOM +
          HEADER_TOP_TAB_MARGIN_TOP +
          (disableBack ? 0 : BACK_BUTTON_HEIGHT),
        component: (
          <View style={{ marginTop: HEADER_TITLE_MARGIN_TOP }}>
            <View
              style={{
                paddingLeft: theme.windowMargin,
                paddingRight: theme.windowMargin,
              }}
            >
              {disableBack ? null : <BackButton variation={'on-dark'} />}
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Header text={'Predictions'} />
                <YearDropdown
                  event={event}
                  eventOptions={events ?? []}
                  setYear={setYear}
                />
              </View>
            </View>
            <View
              style={{
                marginTop: HEADER_TOP_TAB_MARGIN_TOP,
                marginBottom: HEADER_TOP_TAB_MARGIN_BOTTOM,
              }}
            >
              {event ? (
                <EventTopTabs
                  style={{
                    paddingLeft: theme.windowMargin,
                  }}
                  selectedEvent={event}
                  setEvent={setEvent}
                />
              ) : null}
            </View>
          </View>
        ),
      };

  return (
    <BackgroundWrapper>
      <HeaderDropdownOverlay />
      <DynamicHeaderFlatListWrapper<iCategoryListItem[]>
        scrollViewRef={scrollViewRef}
        disableBack={disableBack}
        topOnlyContent={topOnlyContent}
        titleWhenCollapsed={
          eventName + (isLeaderboard ? `\n${phaseName} Leaderboard` : '')
        }
        persistedContent={{
          height: predictionTabHeight,
          component: (
            <View
              style={{
                width: '100%',
                justifyContent: 'flex-end',
              }}
            >
              <PredictionTabsNavigator />
            </View>
          ),
        }}
        flatListProps={{
          data,
          keyExtractor: (item) => item[0][0], // the category name
          estimatedItemSize: getCategoryListItemHeight({
            categoryName: CategoryName.ACTOR,
            event,
            windowWidth: width,
          }),
          renderItem: ({ item }) => {
            const category = item[0][0] as CategoryName | undefined;
            if (isLoading || !event || !category) {
              return (
                <View key={'event-skeleton' + category}>
                  <EventSkeleton event={event} category={category} />
                </View>
              );
            }
            return (
              <DualTabsWrapper
                tab1={
                  <CategoryListItem
                    event={event}
                    item={item[0]}
                    onPress={() => onSelectCategory(category, false)}
                  />
                }
                tab2={
                  <CategoryListItem
                    event={event}
                    item={item[1]}
                    onPress={() => onSelectCategory(category, true)}
                  />
                }
              />
            );
          },
        }}
      />
      <BottomFABContainer />
    </BackgroundWrapper>
  );
};

export default Event;
