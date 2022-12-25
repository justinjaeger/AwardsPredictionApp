import _ from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, TouchableHighlight, useWindowDimensions, View } from 'react-native';
import { AwardsBody, EventStatus, UserRole } from '../../../API';
import { Body, SubHeader } from '../../../components/Text';
import {
  AWARDS_BODY_TO_PLURAL_STRING,
  AWARDS_BODY_TO_STRING,
} from '../../../constants/awardsBodies';
import COLORS from '../../../constants/colors';
import { PredictionsParamList } from '../../../navigation/types';
import { useTypedNavigation } from '../../../util/hooks';
import sortByObjectOrder from '../../../util/sortByObjectOrder';
import { useCategory } from '../../../context/CategoryContext';
import { iEvent } from '../../../types';
import theme from '../../../constants/theme';
import LoadingStatue from '../../../components/LoadingStatue';
import BackgroundWrapper from '../../../components/BackgroundWrapper';
import useQueryAllEvents from '../../../hooks/queries/getAllEvents';
import AwardsBodyImage from '../../../components/AwardsBodyImage';
import { EVENT_STATUS_TO_STRING, getEventTime } from '../../../constants/events';
import { useAuth } from '../../../context/UserContext';
import useQueryGetUser from '../../../hooks/queries/getUser';

const EVENT_ITEM_HEIGHT = 90;

const EventSelect = () => {
  const { width } = useWindowDimensions();
  const { setEvent } = useCategory();
  const { userId } = useAuth();
  const navigation = useTypedNavigation<PredictionsParamList>();

  const loadingOpacity = useRef(new Animated.Value(1)).current;
  const bodyOpacity = useRef(new Animated.Value(0)).current;

  const { data: events, isLoading, refetch: refetchEvents } = useQueryAllEvents();
  const { data: user, refetch: refetchUser } = useQueryGetUser(userId);

  const [highlightedEvent, setHighlightedEvent] = useState<string>('');

  // just in case there's some refresh problem
  useEffect(() => {
    if (events === undefined) {
      refetchEvents();
    }
    if (user === undefined) {
      refetchUser();
    }
  }, [events, user, userId]);

  useEffect(() => {
    if (!isLoading) {
      Animated.timing(loadingOpacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
      setTimeout(() => {
        Animated.timing(bodyOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      }, 500);
    }
  }, [isLoading]);

  const onSelectEvent = async (event: iEvent) => {
    setEvent(event);
    navigation.navigate('Event');
  };

  const eventList = _.values(events || {});
  const orderedEvents = sortByObjectOrder<AwardsBody, iEvent>(
    AWARDS_BODY_TO_STRING,
    _.values(eventList),
    eventList.map((e) => AwardsBody[e.awardsBody]),
  );
  const groupedByYear = _.groupBy(orderedEvents, (e) => e.year);

  const userIsAdmin = user ? user.role === UserRole.ADMIN : false;

  return (
    <BackgroundWrapper>
      <>
        <Animated.View
          style={{
            position: 'absolute',
            width: '100%',
            height: '80%',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: loadingOpacity,
          }}
        >
          <LoadingStatue />
        </Animated.View>
        <Animated.ScrollView
          style={{ opacity: bodyOpacity }}
          contentContainerStyle={{
            alignSelf: 'flex-start',
            marginTop: theme.windowMargin,
            paddingBottom: 100,
            marginLeft: theme.windowMargin,
          }}
        >
          {_.entries(groupedByYear)
            // sort by year
            .sort(([yearA], [yearB]) =>
              parseInt(yearA, 10) > parseInt(yearB, 10) ? -1 : 1,
            )
            .map(([year, events]) => (
              <View key={year}>
                <SubHeader style={{ marginBottom: theme.windowMargin }}>{`${
                  parseInt(year, 10) - 1
                }/${year.slice(2)}`}</SubHeader>
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
                              width: '15%', // if changing this, also change component % below to match 100%
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
                              width: '85%', // if changing this, also change component % below to match 100%
                              height: '100%',
                              padding: 10,
                              paddingLeft: 0,
                            }}
                          >
                            <SubHeader>
                              {AWARDS_BODY_TO_PLURAL_STRING[awardsBody]}
                            </SubHeader>
                            <Body
                              style={{
                                color: COLORS.white,
                              }}
                            >{`${EVENT_STATUS_TO_STRING[status]}`}</Body>
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
        </Animated.ScrollView>
      </>
    </BackgroundWrapper>
  );
};

export default EventSelect;
