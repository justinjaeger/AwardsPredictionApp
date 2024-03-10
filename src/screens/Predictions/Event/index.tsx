import React, { useEffect, useRef, useState } from 'react';
import PredictionTabsNavigator from '../../../navigation/PredictionTabsNavigator';
import { useAuth } from '../../../context/AuthContext';
import useQueryGetUserPredictions from '../../../hooks/queries/useQueryGetUserPredictions';
import useQueryGetCommunityPredictions from '../../../hooks/queries/useQueryGetCommunityPredictions';
import BottomFABContainer from '../../../components/BottomFABContainer';
import { useRouteParams } from '../../../hooks/useRouteParams';
import BackgroundWrapper from '../../../components/BackgroundWrapper';
import { View, useWindowDimensions } from 'react-native';
import useDevice from '../../../util/device';
import { AWARDS_BODY_TO_PLURAL_STRING } from '../../../constants/awardsBodies';
import { EVENT_TOP_TABS_HEIGHT } from '../../../components/HorizontalScrollingTabs';
import HeaderDropdownOverlay from '../../../components/HeaderDropdownOverlay';
import { useEventSelect } from '../../../hooks/useEventSelect';
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
import {
  AGENDER_CATEGORIES,
  GENDERED_CATEGORIES,
  PHASE_TO_STRING_PLURAL,
} from '../../../constants/categories';
import { FlashList } from '@shopify/flash-list';
import { usePersonalCommunityTab } from '../../../context/PersonalCommunityContext';
import HeaderListTypeDropdown from '../../../components/HeaderComponents/HeaderListTypeDropdown';
import ListSettingsModal from '../../../components/ListSettingsModal';
import HeaderButton from '../../../components/HeaderComponents/HeaderButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AsyncStorageKeys } from '../../../types/keys';

type iGenderDisplayPreference = 'gendered' | 'agender' | 'all' | 'all-if-defined';

const getPredictionsData = (
  userPredictionSet: WithId<PredictionSet> | undefined,
  communityPredictionSet: WithId<PredictionSet> | undefined,
  event: EventModel | undefined,
  genderDisplayPreference: iGenderDisplayPreference,
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

  const result = orderedUserPredictions
    .filter(([category, predictions]) => {
      const isGenderedCategory = GENDERED_CATEGORIES.includes(category);
      const isAgenderCategory = AGENDER_CATEGORIES.includes(category);
      if (isGenderedCategory || isAgenderCategory) {
        switch (genderDisplayPreference) {
          case 'gendered':
            return isGenderedCategory;
          case 'agender':
            return isAgenderCategory;
          case 'all-if-defined':
            return isGenderedCategory || isAgenderCategory
              ? predictions.length > 0
              : true;
          default:
            return true;
        }
      }
      return true;
    })
    .map((category, i) => {
      return [
        category,
        orderedCommuintyPredictions.find(([c]) => c === category[0]) ||
          orderedCommuintyPredictions[i],
      ];
    });
  return result;
};

const Event = () => {
  const flashListRef = useRef<FlashList<any>>(null);

  const { width } = useWindowDimensions();
  const { isPad } = useDevice();
  const navigation = useNavigation<PredictionsNavigationProp>();
  const {
    userInfo,
    isLeaderboard,
    disableBack,
    phase: phaseFromRouteParams,
  } = useRouteParams();
  const { userId: authUserId } = useAuth();
  const userId = userInfo?.userId || authUserId || undefined;
  const { user } = useProfileUser(userId);
  const isAuthProfile = user?._id === authUserId;
  const { tabsPosX, setPersonalCommunityTab } = usePersonalCommunityTab();

  const {
    event,
    phase,
    yyyymmdd,
    setEvent,
    setYear,
    eventType,
    setEventType,
    eventsToSelectFrom,
    allEvents,
  } = useEventSelect();

  const eventsUserIsPredicting = Object.keys(user?.eventsPredicting ?? {}).map((id) =>
    allEvents?.find((e) => e._id === id),
  );

  const eventTabOptions = isAuthProfile
    ? eventsToSelectFrom
    : (eventsUserIsPredicting.filter(Boolean) as WithId<EventModel>[]);

  const showListTab =
    isAuthProfile || eventsUserIsPredicting?.some((e) => e?.eventType === 'list');

  const { data: userPredictionData, isLoading: isLoadingPersonal } =
    useQueryGetUserPredictions({ event, userId, yyyymmdd });
  const { data: communityPredictionData, isLoading: isLoadingCommunity } =
    useQueryGetCommunityPredictions({ event, yyyymmdd });

  const [showSettings, setShowSettings] = React.useState(false);

  const [displayGenderedCategories, setDisplayGenderedCategories] =
    useState<iGenderDisplayPreference>('all');
  useEffect(() => {
    if (eventType === 'list') {
      if (isAuthProfile) {
        AsyncStorage.getItem(AsyncStorageKeys.GENDERED_PREFERENCE).then((pref) => {
          setDisplayGenderedCategories(pref === 'true' ? 'gendered' : 'agender');
        });
      } else {
        // for non-auth users, we'll show the gendered categories that they're predicting
        setDisplayGenderedCategories('all-if-defined');
      }
    }
    if (eventType === 'prediction') {
      setDisplayGenderedCategories('all');
    }
  }, [showSettings, isAuthProfile, eventType]);

  // This is weird, but see note in PersonalCommunityContext.tsx
  const isNotLoggedInAndHasNoDataYet =
    !userId && !isLoadingCommunity && !!communityPredictionData;
  useEffect(() => {
    if (isNotLoggedInAndHasNoDataYet) {
      setPersonalCommunityTab('community', true);
    }
  }, [
    userId,
    isLoadingPersonal,
    isLoadingCommunity,
    !!userPredictionData,
    !!communityPredictionData,
  ]);

  const predictionTabHeight = getSectionTabHeight(isPad);

  const onSelectCategory = async (category: CategoryName, isCommunityTab?: boolean) => {
    if (!event) return;
    const params = {
      userInfo: userInfo || getUserInfo(user),
      eventId: event._id,
      category,
      phase: phaseFromRouteParams,
      yyyymmdd,
      isLeaderboard,
    };
    setPersonalCommunityTab(isCommunityTab ? 'community' : 'personal', true);
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
    displayGenderedCategories,
  );

  const isLoading = isLoadingPersonal || isLoadingCommunity;

  const eventName = event
    ? `${event?.year ?? ''} ${AWARDS_BODY_TO_PLURAL_STRING[event.awardsBody]}`
    : '';
  const phaseName = (phase ? PHASE_TO_STRING_PLURAL[phase] : '') + ' ';

  const showUserInfo = userInfo && !isAuthProfile;
  const heightOfTopSection = showUserInfo
    ? USER_PROFILE_HEIGHT
    : disableBack
    ? 0
    : BACK_BUTTON_HEIGHT;

  const heightAboveDropdown = heightOfTopSection + HEADER_TITLE_MARGIN_TOP;

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
                {userInfo ? (
                  <UserProfile userInfo={userInfo} disableImageOverlap={isLeaderboard} />
                ) : null}
                <View />
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  width: '100%',
                  alignItems: 'flex-start',
                  zIndex: 1,
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
          heightOfTopSection,
        component: (
          <View style={{ marginTop: HEADER_TITLE_MARGIN_TOP }}>
            <View
              style={{
                paddingLeft: theme.windowMargin,
                paddingRight: theme.windowMargin,
              }}
            >
              <View style={{ position: 'relative', alignItems: 'center', zIndex: 2 }}>
                <View
                  style={{
                    position: showUserInfo ? 'absolute' : 'relative',
                    alignItems: 'flex-start',
                    width: '100%',
                    top: 0,
                    left: 0,
                  }}
                >
                  {disableBack ? null : <BackButton variation={'on-dark'} />}
                </View>
                {showUserInfo ? <UserProfile userInfo={userInfo} /> : null}
                <View />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  zIndex: 1,
                }}
              >
                <HeaderListTypeDropdown
                  eventType={eventType}
                  setEventType={setEventType}
                  heightAboveDropdown={heightAboveDropdown}
                  showListTab={showListTab}
                />
                <YearDropdown
                  event={event}
                  eventOptions={eventTabOptions ?? []}
                  setYear={setYear}
                  heightAboveDropdown={heightAboveDropdown}
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
                  eventOptions={eventTabOptions ?? []}
                />
              ) : null}
            </View>
          </View>
        ),
      };

  return (
    <>
      <BackgroundWrapper>
        <HeaderDropdownOverlay />
        <DynamicHeaderFlatListWrapper<iCategoryListItem[]>
          flashListRef={flashListRef}
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
                <PredictionTabsNavigator
                  type={event?.eventType === 'list' ? 'list' : 'prediction'}
                />
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
            ListHeaderComponent:
              event?.eventType === 'list' ? (
                <View style={{ width: '100%', alignItems: 'flex-end' }}>
                  <HeaderButton
                    icon={'settings-outline'}
                    onPress={() => setShowSettings(true)}
                    style={{
                      marginRight: theme.windowMargin,
                      marginTop: 5,
                    }}
                    variation="on-dark"
                  />
                </View>
              ) : null,
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
                      onPress={() => {
                        onSelectCategory(category, false);
                      }}
                      tab={'personal'}
                    />
                  }
                  tab2={
                    <CategoryListItem
                      event={event}
                      item={item[1]}
                      onPress={() => {
                        onSelectCategory(category, true);
                      }}
                      tab={'community'}
                    />
                  }
                  tabsPosX={tabsPosX}
                />
              );
            },
          }}
        />
        <BottomFABContainer />
      </BackgroundWrapper>
      <ListSettingsModal visible={showSettings} onClose={() => setShowSettings(false)} />
    </>
  );
};

export default Event;
