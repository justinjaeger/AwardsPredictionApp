import _ from 'lodash';
import React from 'react';
import { View } from 'react-native';
import COLORS from '../../../constants/colors';
import { PredictionsNavigationProp } from '../../../navigation/types';
import { getOrderedEvents } from '../../../util/sortByObjectOrder';
import { usePersonalCommunityTab } from '../../../context/EventContext';
import { PHASE_TO_CTA, getEventTime } from '../../../constants/events';
import { Divider } from '@ui-kitten/components';
import { EventModel, Phase, User, WithId } from '../../../models';
import EventItem from '../../../components/EventItem';
import { AWARDS_BODY_TO_PLURAL_STRING } from '../../../constants/awardsBodies';
import { useNavigation } from '@react-navigation/native';
import { getUserInfo } from '../../../util/getUserInfo';
import { getCurrentPhaseBeingPredicted } from '../../../util/getBiggestPhaseThatHasHappened';

const EventList = ({
  events,
  user,
  isProfile,
}: {
  events: WithId<EventModel>[];
  user: WithId<User> | undefined;
  isProfile?: boolean;
}) => {
  const { setPersonalCommunityTab } = usePersonalCommunityTab();
  const navigation = useNavigation<PredictionsNavigationProp>();

  const onSelectEvent = async (event: WithId<EventModel>) => {
    setPersonalCommunityTab(user?._id ? 'personal' : 'community');
    navigation.navigate('Event', {
      userInfo: getUserInfo(user),
      eventId: event._id,
    });
  };

  const orderedEvents = getOrderedEvents(events);
  const groupedByYear = _.groupBy(orderedEvents, (e: WithId<EventModel>) => e.year);

  return (
    <>
      {Object.entries(groupedByYear)
        // sort by year
        .sort(([yearA], [yearB]) => (parseInt(yearA, 10) > parseInt(yearB, 10) ? -1 : 1))
        .map(([year, events], i) => (
          <View key={year} style={{ width: '100%' }}>
            <View style={{ flexDirection: 'column' }}>
              {i > 0 ? (
                <Divider
                  style={{
                    width: '100%',
                    marginTop: 20,
                    marginBottom: 30,
                    backgroundColor: COLORS.white,
                    opacity: 0.3,
                  }}
                />
              ) : (
                <View style={{ marginTop: 20 }} />
              )}
            </View>
            <View
              style={{
                flexWrap: 'wrap',
                flexDirection: 'row',
              }}
            >
              {events.map((event) => {
                const { awardsBody } = event;
                const phase = getCurrentPhaseBeingPredicted(event);
                const closeTime = getEventTime(event);

                // TODO: for now, if this event has closed, just don't show it.
                // When we have a history link, we can show that
                // But for now, we can just not and it will display the leaderboard
                if (phase === Phase.CLOSED) return null;

                const eventString = year + ' ' + AWARDS_BODY_TO_PLURAL_STRING[awardsBody];

                return (
                  <EventItem
                    subtitle={isProfile ? '' : eventString}
                    title={isProfile ? eventString : PHASE_TO_CTA[phase || Phase.CLOSED]}
                    onPress={() => onSelectEvent(event)}
                    mode={isProfile ? 'transparent' : 'solid'}
                    bottomRightText={closeTime ? `Closes ${closeTime}` : ''}
                  />
                );
              })}
            </View>
          </View>
        ))}
    </>
  );
};

export default EventList;
