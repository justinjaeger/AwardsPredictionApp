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
import { EventModel, WithId } from '../../../models';
import EventTopTabs, { EVENT_TOP_TABS_HEIGHT } from '../../../components/EventTopTabs';
import BackgroundWrapper from '../../../components/BackgroundWrapper';
import { ScrollView, View } from 'react-native';
import { HeaderLight, SubHeader } from '../../../components/Text';
import theme from '../../../constants/theme';
import ScrollViewDynamicHeader from '../../../components/DynamicHeaderScrollViewWrapper';
import TabBodies from '../../../navigation/PredictionTabsNavigator/TabBodies';
import { getPredictionTabHeight } from '../../../navigation/PredictionTabsNavigator/PredictionTab';
import useDevice from '../../../util/device';
import { AWARDS_BODY_TO_PLURAL_STRING } from '../../../constants/awardsBodies';
import CollapsableHeaderScrollViewWrapper from '../../../components/CollapsableHeaderScrollViewWrapper';

/**
 * TODO:
 * - render back button when going back is an option
 * - make the header scrollable WITH THE BODY, but make the top tabs sticky somehow
 * - had some bug where it wasn't passing "event" into CategoryList I think, since it didn't navigate when I pressed a category
 *
 * PLAN FOR SCROLLING:
 * - capture the scroll ref from the inner FlatList
 * - when the user scrolls, the header goes off screen
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
  const { defaultEvent } = useQueryGetAllEvents();
  const { userId: authUserId } = useAuth();
  const userId = userInfo?.userId || authUserId || '';

  const [event, setEvent] = useState<WithId<EventModel> | undefined>(initialEvent);
  const [yyyymmdd, setYyyymmdd] = useState<number | undefined>(initialYyyymmdd);

  // sets event as most recent academy awards if none is selected
  useEffect(() => {
    if (!event && defaultEvent) {
      setEvent(defaultEvent);
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

  const titleHeight = 40;
  const tabHeight = getPredictionTabHeight(isPad);

  if (!event) return null;

  return (
    <BackgroundWrapper>
      <CollapsableHeaderScrollViewWrapper
        scrollViewProps={{
          // @ts-ignore
          ref: verticalScrollRef,
        }}
        headerContentOnlyAtTopHeight={titleHeight + EVENT_TOP_TABS_HEIGHT}
        HeaderContentOnlyAtTop={
          <View>
            <View
              style={{
                marginLeft: theme.windowMargin,
                height: titleHeight,
                alignItems: 'flex-start',
                justifyContent: 'center',
              }}
            >
              <HeaderLight>{`Predictions ${event?.year ?? ''}`}</HeaderLight>
            </View>
            {event ? <EventTopTabs selectedEvent={event} setEvent={setEvent} /> : null}
          </View>
        }
        titleWhenCollapsed={`${AWARDS_BODY_TO_PLURAL_STRING[event?.awardsBody]} ${
          event?.year ?? ''
        }`}
        headerContentToPersistHeight={tabHeight}
        HeaderContentToPersist={
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
        }
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
