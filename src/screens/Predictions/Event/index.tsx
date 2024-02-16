import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import PredictionTabsNavigator from '../../../navigation/PredictionTabsNavigator';
import { useAuth } from '../../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import CategoryList from './CategoryList';
import useQueryGetUserPredictions from '../../../hooks/queries/useQueryGetUserPredictions';
import useQueryGetCommunityPredictions from '../../../hooks/queries/useQueryGetCommunityPredictions';
import { eventToString } from '../../../util/stringConversions';
import BottomFABContainer from '../../../components/BottomFABContainer';
import { useRouteParams } from '../../../hooks/useRouteParams';
import { PredictionsNavigationProp } from '../../../navigation/types';
import { getTwoLineHeaderTitle } from '../../../constants';
import { PHASE_TO_STRING } from '../../../constants/categories';
import useQueryGetAllEvents from '../../../hooks/queries/useQueryGetAllEvents';
import { AwardsBody, EventModel, WithId } from '../../../models';
import EventTopTabs from '../../../components/EventTopTabs';
import BackgroundWrapper from '../../../components/BackgroundWrapper';
import { ScrollView, View } from 'react-native';
import { HeaderLight } from '../../../components/Text';
import theme from '../../../constants/theme';
import TabBodies from '../../../navigation/PredictionTabsNavigator/TabBodies';
import { getPredictionTabHeight } from '../../../navigation/PredictionTabsNavigator/PredictionTab';
import useDevice from '../../../util/device';
import { AWARDS_BODY_TO_PLURAL_STRING } from '../../../constants/awardsBodies';
import CollapsableHeaderScrollViewWrapper from '../../../components/CollapsableHeaderScrollViewWrapper';
import HeaderDropdownButton from '../../../components/HeaderDropdownButton';
import { EVENT_TOP_TABS_HEIGHT } from '../../../components/TopTabs';
import HeaderDropdownOverlay from '../../../components/HeaderDropdownOverlay';

/**
 * TODO:
 * - render back button when going back is an option
 * - had some bug where it wasn't passing "event" into CategoryList I think, since it didn't navigate when I pressed a category
 *
 * Whole screen is a scroll view, not a flatlist
 * - header is HeaderComponent
 */
const Event = () => {
  const tabsScrollRef = useRef<ScrollView>(null);
  const verticalScrollRef = useRef<ScrollView>(null);

  const { isPad } = useDevice();
  const navigation = useNavigation<PredictionsNavigationProp>();
  const {
    userInfo,
    event: initialEvent,
    yyyymmdd: initialYyyymmdd,
    phase,
    isLeaderboard,
  } = useRouteParams();
  const { data: events, defaultEvent } = useQueryGetAllEvents();
  const { userId: authUserId } = useAuth();
  const userId = userInfo?.userId || authUserId || '';

  const [yyyymmdd, setYyyymmdd] = useState<number | undefined>(initialYyyymmdd);
  const [year, _setYear] = useState<number | undefined>(
    initialEvent?.year ?? defaultEvent?.year,
  );
  const [event, setEvent] = useState<WithId<EventModel> | undefined>(
    initialEvent ?? defaultEvent,
  );
  const setYear = (year: number) => {
    _setYear(year);
    const eventsWithNewYear = events?.filter((e) => e.year === year);
    const eventWithNewYearAndSameAwardsBody = eventsWithNewYear?.find(
      (e) => e.awardsBody === event?.awardsBody,
    );
    if (eventWithNewYearAndSameAwardsBody) {
      setEvent(eventWithNewYearAndSameAwardsBody);
      return;
    }
    const defaultEvent =
      eventsWithNewYear?.find((e) => e.awardsBody === AwardsBody.ACADEMY_AWARDS) ||
      eventsWithNewYear?.[0];
    if (defaultEvent) {
      setEvent(defaultEvent);
    }
  };

  // sets event as most recent academy awards if none is selected
  useEffect(() => {
    if (!event && defaultEvent) {
      setEvent(defaultEvent);
      setYear(defaultEvent.year);
    }
  }, [defaultEvent]);

  const { data: userPredictionData, isLoading: isLoadingPersonal } =
    useQueryGetUserPredictions({ event, userId, yyyymmdd });
  const { data: communityPredictionData, isLoading: isLoadingCommunity } =
    useQueryGetCommunityPredictions({ event, yyyymmdd });

  // define the header
  useLayoutEffect(() => {
    if (!event) return;
    const headerTitle = eventToString(event.awardsBody, event.year);
    // need to add "shortlist leaderboard"
    const leaderboardTitle =
      isLeaderboard && phase ? `\n${PHASE_TO_STRING[phase]} Results` : '';
    navigation.setOptions({
      headerTitle: getTwoLineHeaderTitle(headerTitle + leaderboardTitle),
    });
  }, [navigation]);

  const titleMarginTop = 10;
  const titleHeight = 40;
  const predictionTabHeight = getPredictionTabHeight(isPad);
  const eventTopTabsMarginBottom = 10;

  if (!event) return null;

  const yearOptions = (events ?? []).reduce((acc, e) => {
    if (acc.includes(e.year)) return acc;
    return [...acc, e.year];
  }, [] as number[]);

  return (
    <BackgroundWrapper>
      <HeaderDropdownOverlay />
      <CollapsableHeaderScrollViewWrapper
        scrollViewProps={{
          // @ts-ignore
          ref: verticalScrollRef,
        }}
        topOnlyContent={{
          height:
            titleHeight +
            titleMarginTop +
            EVENT_TOP_TABS_HEIGHT +
            eventTopTabsMarginBottom,
          component: (
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginLeft: theme.windowMargin,
                  marginRight: theme.windowMargin,
                  marginTop: titleMarginTop,
                  height: titleHeight,
                }}
              >
                <View
                  style={{
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                  }}
                >
                  <HeaderLight>{'Predictions'}</HeaderLight>
                </View>
                <HeaderDropdownButton
                  height={titleHeight - 5}
                  position={{ top: titleMarginTop, right: theme.windowMargin }}
                  options={yearOptions.map((y) => ({
                    text: y.toString(),
                    value: y,
                    isSelected: y === year,
                  }))}
                  onSelect={(value) => setYear(value)}
                />
              </View>
              {event ? (
                <EventTopTabs
                  style={{
                    marginBottom: eventTopTabsMarginBottom,
                  }}
                  selectedEvent={event}
                  setEvent={setEvent}
                />
              ) : null}
            </View>
          ),
        }}
        titleWhenCollapsed={`${AWARDS_BODY_TO_PLURAL_STRING[event?.awardsBody]} ${
          event?.year ?? ''
        }`}
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
                scrollViewRef={tabsScrollRef}
                onChangeTab={(tab) => {
                  // if showing the "sign in to make predictions" scroll to top so it's in view
                  if (!userInfo?.userId && tab === 'personal') {
                    verticalScrollRef.current?.scrollTo({ y: 0 });
                  }
                }}
              />
            </View>
          ),
        }}
      >
        <>
          <TabBodies
            scrollViewRef={tabsScrollRef}
            personal={
              <CategoryList
                tab={'personal'}
                predictionData={userPredictionData ?? undefined}
                isLoading={isLoadingPersonal}
                event={event}
                yyyymmdd={yyyymmdd}
              />
            }
            community={
              <CategoryList
                tab={'community'}
                predictionData={communityPredictionData ?? undefined}
                isLoading={isLoadingCommunity}
                event={event}
                yyyymmdd={yyyymmdd}
              />
            }
          />
        </>
      </CollapsableHeaderScrollViewWrapper>
      <BottomFABContainer />
    </BackgroundWrapper>
  );
};

export default Event;
