import React, { useEffect, useRef, useState } from 'react';
import PredictionTabsNavigator from '../../../navigation/PredictionTabsNavigator';
import { useAuth } from '../../../context/AuthContext';
import CategoryList from './CategoryList';
import useQueryGetUserPredictions from '../../../hooks/queries/useQueryGetUserPredictions';
import useQueryGetCommunityPredictions from '../../../hooks/queries/useQueryGetCommunityPredictions';
import BottomFABContainer from '../../../components/BottomFABContainer';
import { useRouteParams } from '../../../hooks/useRouteParams';
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
 * When changing events, it's pretty slow
 * - Could optimize by not rendering all of the javascript which is not in view
 * - But it might be hard to determine what the height of the out-of-view javascript is
 * - maybe we just don't render posters if you're out of view!
 * - Although it's still slow when you switch from Academy Awards to Golden Globes with no posters :/
 * - But even still, it's reeeeally long when switching to the WITH-photos
 */
const Event = () => {
  const verticalScrollRef = useRef<ScrollView>(null);
  const horizontalTabsScrollViewRef = useRef<ScrollView>(null);

  const { isPad } = useDevice();
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
        scrollViewRef={verticalScrollRef}
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
                horizontalTabsScrollViewRef={horizontalTabsScrollViewRef}
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
      >
        <>
          <TabBodies
            horizontalTabsScrollViewRef={horizontalTabsScrollViewRef}
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
