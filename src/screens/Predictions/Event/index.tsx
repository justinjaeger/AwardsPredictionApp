import React, { useRef } from 'react';
import PredictionTabsNavigator from '../../../navigation/PredictionTabsNavigator';
import { useAuth } from '../../../context/AuthContext';
import CategoryList from './CategoryList';
import useQueryGetUserPredictions from '../../../hooks/queries/useQueryGetUserPredictions';
import useQueryGetCommunityPredictions from '../../../hooks/queries/useQueryGetCommunityPredictions';
import BottomFABContainer from '../../../components/BottomFABContainer';
import { useRouteParams } from '../../../hooks/useRouteParams';
import BackgroundWrapper from '../../../components/BackgroundWrapper';
import { ScrollView, View } from 'react-native';
import TabBodies from '../../../navigation/PredictionTabsNavigator/TabBodies';
import useDevice from '../../../util/device';
import { AWARDS_BODY_TO_PLURAL_STRING } from '../../../constants/awardsBodies';
import { EVENT_TOP_TABS_HEIGHT } from '../../../components/HorizontalScrollingTabs';
import HeaderDropdownOverlay from '../../../components/HeaderDropdownOverlay';
import { useIsTrueAfterJavaScriptUpdates } from '../../../hooks/useIsTrueAfterJavaScriptUpdates';
import HeaderWithEventSelect, {
  HEADER_TITLE_HEIGHT,
  HEADER_TITLE_MARGIN_TOP,
  HEADER_TOP_TAB_MARGIN_BOTTOM,
  HEADER_TOP_TAB_MARGIN_TOP,
} from '../../../components/HeaderWithEventSelect';
import { useEventSelect } from '../../../hooks/useEventSelect';
import useQueryGetAllEvents from '../../../hooks/queries/useQueryGetAllEvents';
import { getSectionTabHeight } from '../../../components/SectionTopTabs';
import DynamicHeaderScrollViewWrapper from '../../../components/DynamicHeaderWrapper/DynamicHeaderScrollViewWrapper';

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
  const { userInfo } = useRouteParams();
  const { userId: authUserId } = useAuth();
  const userId = userInfo?.userId || authUserId || '';

  const { data: events } = useQueryGetAllEvents();
  const { event, year, yyyymmdd, setEvent, setYear } = useEventSelect();

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

  if (!event) return null;

  return (
    <BackgroundWrapper>
      <HeaderDropdownOverlay />
      <DynamicHeaderScrollViewWrapper
        scrollViewRef={verticalScrollRef}
        topOnlyContent={{
          height:
            HEADER_TITLE_HEIGHT +
            HEADER_TITLE_MARGIN_TOP +
            EVENT_TOP_TABS_HEIGHT +
            HEADER_TOP_TAB_MARGIN_BOTTOM +
            HEADER_TOP_TAB_MARGIN_TOP,
          component: (
            <HeaderWithEventSelect
              title={'Predictions'}
              event={event}
              setEvent={setEvent}
              eventOptions={events ?? []}
              setYear={setYear}
            />
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
        <TabBodies
          horizontalTabsScrollViewRef={horizontalTabsScrollViewRef}
          personal={
            <CategoryList
              key={'p'}
              tab={'personal'}
              predictionData={userPredictionData ?? undefined}
              isLoading={isLoadingPersonal}
              event={event}
              yyyymmdd={yyyymmdd}
              isFirstRender={!trueAfterJavaScriptRuns}
            />
          }
          community={
            <CategoryList
              key={'c'}
              tab={'community'}
              predictionData={communityPredictionData ?? undefined}
              isLoading={isLoadingCommunity}
              event={event}
              yyyymmdd={yyyymmdd}
              isFirstRender={!trueAfterJavaScriptRuns}
            />
          }
        />
      </DynamicHeaderScrollViewWrapper>
      <BottomFABContainer />
    </BackgroundWrapper>
  );
};

export default Event;
