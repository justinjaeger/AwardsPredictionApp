import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { Animated, TouchableHighlight, useWindowDimensions, View } from 'react-native';
import { AwardsBody, EventStatus, UserRole } from '../../../API';
import { Body, SubHeader } from '../../../components/Text';
import {
  AWARDS_BODY_TO_PLURAL_STRING,
  AWARDS_BODY_TO_STRING,
} from '../../../constants/awardsBodies';
import COLORS from '../../../constants/colors';
import sortByObjectOrder from '../../../util/sortByObjectOrder';
import { iEvent } from '../../../types';
import theme from '../../../constants/theme';
import LoadingStatue from '../../../components/LoadingStatue';
import BackgroundWrapper from '../../../components/BackgroundWrapper';
import useQueryAllEvents from '../../../hooks/queries/getAllEvents';
import AwardsBodyImage from '../../../components/AwardsBodyImage';
import { EVENT_STATUS_TO_STRING } from '../../../constants/events';
import { useAuth } from '../../../context/UserContext';
import useQueryGetUser from '../../../hooks/queries/getUser';
import { SubmitButton } from '../../../components/Buttons';
import UpdateStatusModal from './UpdateStatusModal';
import CreateEventModal from './CreateEventModal';
import SelectCategoryModal from './SelectCategoryModal';

export const getEventName = (awardsBody: AwardsBody) => {
  return AWARDS_BODY_TO_PLURAL_STRING[AwardsBody[awardsBody]];
};

const ManageEvents = () => {
  const { width } = useWindowDimensions();
  const { userId } = useAuth();

  const { data: events, isLoading, refetch: refetchEvents } = useQueryAllEvents();
  const { data: user, refetch: refetchUser } = useQueryGetUser(userId);

  const [highlightedEvent, setHighlightedEvent] = useState<string>('');
  const [selectedEvent, setSelectedEvent] = useState<iEvent | undefined>();
  const [openUpdateStatusModal, setOpenUpdateStatusModal] = useState<boolean>(false);
  const [openCreateEventModal, setOpenCreateEventModal] = useState<boolean>(false);
  const [openSelectCategoryModal, setOpenSelectCategoryModal] = useState<boolean>(false);

  // just in case there's some refresh problem
  useEffect(() => {
    if (events === undefined) {
      refetchEvents();
    }
    if (user === undefined) {
      refetchUser();
    }
  }, [events, user, userId]);

  const eventList = Object.values(events || {});
  const orderedEvents = sortByObjectOrder<AwardsBody, iEvent>(
    AWARDS_BODY_TO_STRING,
    Object.values(eventList),
    eventList.map((e) => AwardsBody[e.awardsBody]),
  );
  const groupedByYear = _.groupBy(orderedEvents, (e) => e.year);

  const userIsAdmin = user ? user.role === UserRole.ADMIN : false;

  return (
    <BackgroundWrapper>
      <>
        {isLoading ? (
          <Animated.View
            style={{
              position: 'absolute',
              width: '100%',
              height: '80%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <LoadingStatue />
          </Animated.View>
        ) : (
          <Animated.ScrollView
            contentContainerStyle={{
              alignSelf: 'flex-start',
              marginTop: theme.windowMargin,
              paddingBottom: 100,
              marginLeft: theme.windowMargin,
            }}
          >
            <SubmitButton
              onPress={() => {
                setOpenCreateEventModal(true);
              }}
              text={'Create Event'}
              style={{ width: 'auto', padding: 10, margin: 10 }}
            />
            {Object.entries(groupedByYear).map(([year, events]) => (
              <>
                <SubHeader style={{ marginBottom: theme.windowMargin }}>{`${
                  parseInt(year, 10) - 1
                }/${year.slice(2)}`}</SubHeader>
                <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
                  {events.map((event) => {
                    const { awardsBody, status } = event;
                    const eventIsAdminOnly = status === EventStatus.NOMS_STAGING;
                    if (eventIsAdminOnly && !userIsAdmin) return null; // don't display events with status NOMS_STAGING to non-admin
                    return (
                      <TouchableHighlight
                        key={event.id}
                        style={{
                          flexDirection: 'column',
                          backgroundColor: 'rgba(0,0,0,0.1)',
                          borderRadius: theme.borderRadius,
                          borderWidth: 1,
                          borderColor: COLORS.white,
                          marginBottom: theme.windowMargin,
                          marginRight: theme.windowMargin,
                          width: width - theme.windowMargin * 2,
                          padding: 10,
                          justifyContent: 'flex-start',
                        }}
                        underlayColor={COLORS.secondaryDark}
                        onPressIn={() => setHighlightedEvent(event.id)}
                        onPressOut={() => setHighlightedEvent('')}
                      >
                        <>
                          <View style={{ flexDirection: 'row' }}>
                            <AwardsBodyImage
                              awardsBody={awardsBody}
                              white={highlightedEvent === event.id}
                            />
                            <View
                              style={{
                                flexDirection: 'column',
                                justifyContent: 'space-around',
                              }}
                            >
                              <SubHeader>
                                {AWARDS_BODY_TO_PLURAL_STRING[awardsBody]}
                              </SubHeader>
                            </View>
                          </View>
                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Body
                              style={{
                                color: COLORS.white,
                              }}
                            >{`${EVENT_STATUS_TO_STRING[status]}`}</Body>
                            <SubmitButton
                              onPress={() => {
                                setSelectedEvent(event);
                                setOpenUpdateStatusModal(true);
                              }}
                              text={'Edit Status'}
                              style={{ width: 'auto', padding: 5, marginLeft: 10 }}
                            />
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              marginTop: 15,
                            }}
                          >
                            <Body
                              style={{
                                color: COLORS.white,
                              }}
                            >
                              {'Manage Contenders'}
                            </Body>
                            <SubmitButton
                              onPress={() => {
                                setSelectedEvent(event);
                                setOpenSelectCategoryModal(true);
                              }}
                              text={'Manage Contenders'}
                              style={{ width: 'auto', padding: 5, marginLeft: 10 }}
                            />
                          </View>
                        </>
                      </TouchableHighlight>
                    );
                  })}
                </View>
              </>
            ))}
          </Animated.ScrollView>
        )}
        <UpdateStatusModal
          visible={openUpdateStatusModal}
          onClose={() => setOpenUpdateStatusModal(false)}
          eventId={selectedEvent?.id}
          onSaveSuccess={() => refetchEvents()}
          initialStatus={selectedEvent?.status}
        />
        <CreateEventModal
          visible={openCreateEventModal}
          onClose={() => setOpenCreateEventModal(false)}
          onSaveSuccess={() => refetchEvents()}
        />
        {selectedEvent ? (
          <SelectCategoryModal
            visible={openSelectCategoryModal}
            onClose={() => setOpenSelectCategoryModal(false)}
            event={selectedEvent}
          />
        ) : null}
      </>
    </BackgroundWrapper>
  );
};

export default ManageEvents;
