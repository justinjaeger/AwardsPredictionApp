import _ from 'lodash';
import React, { useState } from 'react';
import { TouchableHighlight, useWindowDimensions, View } from 'react-native';
import { AwardsBody, EventStatus, UserRole } from '../../../API';
import { Body, HeaderLight, SubHeader } from '../../../components/Text';
import {
  AWARDS_BODY_TO_PLURAL_STRING,
  AWARDS_BODY_TO_STRING,
} from '../../../constants/awardsBodies';
import COLORS from '../../../constants/colors';
import { PredictionsParamList } from '../../../navigation/types';
import { useTypedNavigation } from '../../../util/hooks';
import sortByObjectOrder from '../../../util/sortByObjectOrder';
import { useCategory } from '../../../context/CategoryContext';
import { iEvent, iUser } from '../../../types';
import theme from '../../../constants/theme';
import AwardsBodyImage from '../../../components/AwardsBodyImage';
import { EVENT_STATUS_TO_STRING, getEventTime } from '../../../constants/events';
import { Divider } from '@ui-kitten/components';

const EVENT_ITEM_HEIGHT = 110;

const EventList = ({ events, user }: { events: iEvent[]; user: iUser }) => {
  const { width } = useWindowDimensions();
  const { setEvent } = useCategory();
  const navigation = useTypedNavigation<PredictionsParamList>();

  const [highlightedEvent, setHighlightedEvent] = useState<string>('');

  const onSelectEvent = async (event: iEvent) => {
    setEvent(event);
    navigation.navigate('Event', { userId: user.id });
  };

  const orderedEvents = sortByObjectOrder<AwardsBody, iEvent>(
    AWARDS_BODY_TO_STRING,
    _.values(events),
    events.map((e) => AwardsBody[e.awardsBody]),
  );
  const groupedByYear = _.groupBy(orderedEvents, (e) => e.year);

  const userIsAdmin = user ? user.role === UserRole.ADMIN : false;

  const trophyPercentage = 20;

  return (
    <>
      {Object.entries(groupedByYear)
        // sort by year
        .sort(([yearA], [yearB]) => (parseInt(yearA, 10) > parseInt(yearB, 10) ? -1 : 1))
        .map(([year, events], i) => (
          <View key={year}>
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
            <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
              {events.map((event) => {
                const { awardsBody, status } = event;
                const eventIsAdminOnly = status === EventStatus.NOMS_STAGING;
                if (eventIsAdminOnly && !userIsAdmin) return null; // don't display events with status NOMS_STAGING to non-admin
                const closeTime = getEventTime(event);
                return (
                  <TouchableHighlight
                    key={event.awardsBody + year}
                    style={{
                      flexDirection: 'row',
                      height: EVENT_ITEM_HEIGHT,
                      backgroundColor: 'rgba(0,0,0,0.1)',
                      borderRadius: theme.borderRadius,
                      borderWidth: 1,
                      borderColor: COLORS.white,
                      marginBottom: theme.windowMargin,
                      width: width - theme.windowMargin * 2,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    underlayColor={COLORS.secondaryDark}
                    onPress={() => onSelectEvent(event)}
                    onPressIn={() => setHighlightedEvent(event.id)}
                    onPressOut={() => setHighlightedEvent('')}
                  >
                    <>
                      <View
                        style={{
                          width: `${trophyPercentage}%`,
                          height: '100%',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <AwardsBodyImage
                          awardsBody={awardsBody}
                          white={highlightedEvent === event.id}
                          size={EVENT_ITEM_HEIGHT - 20}
                        />
                      </View>
                      <View
                        style={{
                          flexDirection: 'column',
                          justifyContent: 'space-around',
                          width: `${100 - trophyPercentage}%`,
                          height: '100%',
                          padding: 10,
                          paddingLeft: 0,
                        }}
                      >
                        <SubHeader>
                          {year + ' ' + AWARDS_BODY_TO_PLURAL_STRING[awardsBody]}
                        </SubHeader>
                        <HeaderLight
                          style={{
                            color: COLORS.white,
                            marginTop: 5,
                            marginBottom: 10,
                          }}
                        >{`${EVENT_STATUS_TO_STRING[status]}`}</HeaderLight>
                        <View style={{ alignItems: 'flex-end' }}>
                          <Body
                            style={{
                              color: COLORS.white,
                            }}
                          >
                            {closeTime === '' ? '' : `Closes: ${closeTime}`}
                          </Body>
                        </View>
                      </View>
                    </>
                  </TouchableHighlight>
                );
              })}
            </View>
          </View>
        ))}
    </>
  );
};

export default EventList;
