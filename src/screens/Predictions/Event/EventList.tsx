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
import { useAuth } from '../../../context/UserContext';
import { hexToRgb } from '../../../util/hexToRgb';
import useDevice from '../../../util/device';

const EVENT_ITEM_HEIGHT = 110;

const EventList = ({
  events,
  user,
  isSubtle,
}: {
  events: iEvent[];
  user: iUser | undefined;
  isSubtle?: boolean;
}) => {
  const { userId: authUserId } = useAuth();
  const { width } = useWindowDimensions();
  const { setEvent } = useCategory();
  const navigation = useTypedNavigation<PredictionsParamList>();
  const { isPad } = useDevice();

  const eventItemHeight = EVENT_ITEM_HEIGHT * (isPad ? 1.5 : 1);

  const [highlightedEvent, setHighlightedEvent] = useState<string>('');

  const onSelectEvent = async (event: iEvent) => {
    setEvent(event);
    const noProfileSelected = !user?.id; // happens when signed out and click from home screen
    if ((authUserId && authUserId === user?.id) || noProfileSelected) {
      navigation.navigate('Event', { userId: user?.id });
    } else {
      navigation.navigate('EventFromProfile', { userId: user?.id });
    }
  };

  const orderedEvents = sortByObjectOrder<AwardsBody, iEvent>(
    AWARDS_BODY_TO_STRING,
    _.values(events),
    events.map((e) => AwardsBody[e.awardsBody]),
  );
  const groupedByYear = _.groupBy(orderedEvents, (e) => e.year);

  const userIsAdminOrTester = user
    ? user.role === UserRole.ADMIN || user.role === UserRole.TESTER
    : false;

  const trophyPercentage = 20;

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
                const { awardsBody, status } = event;
                const eventIsAdminOnly = status === EventStatus.NOMS_STAGING;
                if (eventIsAdminOnly && !userIsAdminOrTester) return null; // don't display events with status NOMS_STAGING to non-admin
                const closeTime = getEventTime(event);
                return (
                  <TouchableHighlight
                    key={event.awardsBody + year}
                    style={{
                      marginLeft: theme.windowMargin,
                      flexDirection: 'row',
                      height: eventItemHeight,
                      backgroundColor: isSubtle
                        ? 'transparent'
                        : hexToRgb(COLORS.secondaryDark, 1),
                      borderRadius: theme.borderRadius,
                      borderWidth: 1,
                      borderColor: COLORS.white,
                      marginBottom: theme.windowMargin,
                      width: (isPad ? width / 2 : width) - theme.windowMargin * 1.5,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    underlayColor={isSubtle ? COLORS.secondaryDark : COLORS.secondary}
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
                          white={isSubtle ? highlightedEvent === event.id : true}
                          size={EVENT_ITEM_HEIGHT - 20} // Important that this DOES NOT scale with iPad, because AwardsBodyImage already does
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
                        <View style={{ justifyContent: 'flex-start' }}>
                          <SubHeader>
                            {year + ' ' + AWARDS_BODY_TO_PLURAL_STRING[awardsBody]}
                          </SubHeader>
                          <HeaderLight
                            style={{
                              color: COLORS.white,
                              marginTop: 5,
                              marginBottom: 10,
                              fontWeight: '700',
                            }}
                          >{`${EVENT_STATUS_TO_STRING[status]}`}</HeaderLight>
                        </View>
                        <View style={{ alignItems: 'flex-end' }}>
                          <Body
                            style={{
                              color: isSubtle ? COLORS.secondary : COLORS.white,
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
