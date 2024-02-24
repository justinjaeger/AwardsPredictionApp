import React, { useRef } from 'react';
import PredictionTabsNavigator from '../../../navigation/PredictionTabsNavigator';
import { useAuth } from '../../../context/AuthContext';
import useQueryGetUserPredictions from '../../../hooks/queries/useQueryGetUserPredictions';
import useQueryGetCommunityPredictions from '../../../hooks/queries/useQueryGetCommunityPredictions';
import BottomFABContainer from '../../../components/BottomFABContainer';
import { useRouteParams } from '../../../hooks/useRouteParams';
import BackgroundWrapper from '../../../components/BackgroundWrapper';
import { ScrollView, View, useWindowDimensions } from 'react-native';
import useDevice from '../../../util/device';
import { AWARDS_BODY_TO_PLURAL_STRING } from '../../../constants/awardsBodies';
import { EVENT_TOP_TABS_HEIGHT } from '../../../components/HorizontalScrollingTabs';
import HeaderDropdownOverlay from '../../../components/HeaderDropdownOverlay';
import HeaderWithYearDropdown, {
  BACK_BUTTON_HEIGHT,
  HEADER_TITLE_HEIGHT,
  HEADER_TITLE_MARGIN_TOP,
  HEADER_TOP_TAB_MARGIN_BOTTOM,
  HEADER_TOP_TAB_MARGIN_TOP,
} from '../../../components/HeaderWithYearDropdown';
import { useEventSelect } from '../../../hooks/useEventSelect';
import useQueryGetAllEvents from '../../../hooks/queries/useQueryGetAllEvents';
import { getSectionTabHeight } from '../../../components/SectionTopTabs';
import { getUserInfo } from '../../../util/getUserInfo';
import DynamicHeaderFlatListWrapper from '../../../components/DynamicHeaderWrapper/DynamicHeaderFlatListWrapper';
import EventListHeaderComponent from './EventListHeaderComponent';
import DualTabsWrapper from '../../../components/DualTabsWrapper';
import { CategoryName, EventModel, PredictionSet, WithId } from '../../../models';
import { getOrderedPredictionSetCategories } from '../../../util/sortByObjectOrder';
import CategoryListItem, { iCategoryListItem } from './CategoryListItem';
import { StackActions, useNavigation } from '@react-navigation/native';
import { PredictionsNavigationProp } from '../../../navigation/types';
import useProfileUser from '../../Profile/useProfileUser';
import { useIsTrueAfterJavaScriptUpdates } from '../../../hooks/useIsTrueAfterJavaScriptUpdates';
import EventSkeleton from '../../../components/Skeletons/EventSkeleton';
import { getCategoryListItemHeight } from '../../../util/getCategoryListItemHeight';
import EventTopTabs from '../../../components/EventTopTabs';

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
  const verticalScrollRef = useRef<ScrollView>(null);

  const { width } = useWindowDimensions();
  const { isPad } = useDevice();
  const navigation = useNavigation<PredictionsNavigationProp>();
  const { userInfo, isLeaderboard, disableBack } = useRouteParams();
  const { userId: authUserId } = useAuth();
  const userId = userInfo?.userId || authUserId || undefined;
  const { user } = useProfileUser(userId);
  const isAuthProfile = user?._id === authUserId;

  const { data: events } = useQueryGetAllEvents();
  const { event, year, phase, yyyymmdd, setEvent, setYear } = useEventSelect();

  const { data: userPredictionData, isLoading: isLoadingPersonal } =
    useQueryGetUserPredictions({ event, userId, yyyymmdd });
  const { data: communityPredictionData, isLoading: isLoadingCommunity } =
    useQueryGetCommunityPredictions({ event, yyyymmdd });

  const predictionTabHeight = getSectionTabHeight(isPad);

  const trueAfterJavaScriptRuns = useIsTrueAfterJavaScriptUpdates([
    event?._id,
    year,
    yyyymmdd,
    userId,
  ]);

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

  return (
    <BackgroundWrapper>
      <HeaderDropdownOverlay />
      <DynamicHeaderFlatListWrapper<iCategoryListItem[]>
        scrollViewRef={verticalScrollRef}
        disableBack={disableBack}
        topOnlyContent={{
          height:
            HEADER_TITLE_HEIGHT +
            HEADER_TITLE_MARGIN_TOP +
            EVENT_TOP_TABS_HEIGHT +
            HEADER_TOP_TAB_MARGIN_BOTTOM +
            HEADER_TOP_TAB_MARGIN_TOP +
            (disableBack ? 0 : BACK_BUTTON_HEIGHT),
          component: (
            <View
              style={{
                marginTop: HEADER_TOP_TAB_MARGIN_TOP,
                marginBottom: HEADER_TOP_TAB_MARGIN_BOTTOM,
              }}
            >
              <HeaderWithYearDropdown
                title={'Predictions'}
                event={event}
                eventOptions={events ?? []}
                setYear={setYear}
                disableBack={disableBack}
              />
              {event ? (
                <EventTopTabs
                  style={{
                    marginTop: HEADER_TOP_TAB_MARGIN_TOP,
                    marginBottom: HEADER_TOP_TAB_MARGIN_BOTTOM,
                  }}
                  selectedEvent={event}
                  setEvent={setEvent}
                />
              ) : null}
            </View>
          ),
        }}
        titleWhenCollapsed={
          event
            ? `${AWARDS_BODY_TO_PLURAL_STRING[event.awardsBody]} ${event?.year ?? ''}`
            : ''
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
              <PredictionTabsNavigator
                onChangeTab={(tab) => {
                  // if showing the "sign in to make predictions" scroll to top so it's in view
                  if (!userId && tab === 'personal') {
                    verticalScrollRef.current?.scrollTo({ y: 0 });
                  }
                }}
              />
            </View>
          ),
        }}
        flatListProps={{
          initialNumToRender: 3,
          data,
          keyExtractor: (item) => item[0][0], // the category name
          renderItem: ({ item, index }) => {
            const category = item[0][0] as CategoryName | undefined;
            const numPredicting = item[0][1]?.length;
            if (
              isLoading ||
              !event ||
              !category ||
              (!trueAfterJavaScriptRuns && numPredicting > 0 && index > 2)
            ) {
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
          getItemLayout: (data, index) => {
            const heightAtEachIndex = (data ?? []).map((item) => {
              const [category] = item[0];
              return getCategoryListItemHeight({
                categoryName: category,
                event,
                windowWidth: width,
              });
            });
            return {
              length: heightAtEachIndex[index],
              offset: heightAtEachIndex.slice(0, index).reduce((a, b) => a + b, 0),
              index,
            };
          },
          ListHeaderComponent: (
            <DualTabsWrapper
              tab1={
                <EventListHeaderComponent
                  tab={'personal'}
                  predictionData={userPredictionData || undefined}
                  isLoading={isLoadingPersonal}
                  event={event}
                  yyyymmdd={yyyymmdd}
                />
              }
              tab2={
                <EventListHeaderComponent
                  tab={'community'}
                  predictionData={communityPredictionData || undefined}
                  isLoading={isLoadingCommunity}
                  event={event}
                  yyyymmdd={yyyymmdd}
                />
              }
            />
          ),
          ListFooterComponent: undefined,
          ref: undefined,
        }}
      />
      <BottomFABContainer />
    </BackgroundWrapper>
  );
};

export default Event;
