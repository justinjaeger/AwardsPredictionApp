import React, { useEffect } from 'react';
import { View } from 'react-native';
import { EventStatus } from '../../API';
import theme from '../../constants/theme';
import { useCategory } from '../../context/CategoryContext';
import { iEvent } from '../../types';
import HeaderButton from '../HeaderButton';
import { DateInput } from '../Inputs/DateInput';
import { Body, SubHeader } from '../Text';

const HistoryTab = () => {
  const { event: _event, date, setDate } = useCategory();
  const event = _event as iEvent;
  const isArchived = event.status === EventStatus.ARCHIVED;
  const isHistory = !!date || isArchived;

  const dateOfClose = event.winDateTime ? new Date(event.winDateTime) : new Date();
  const today = new Date();
  const maxDate = dateOfClose > today ? today : dateOfClose; // if date of close is in the past, use today
  const minDate = new Date(event.createdAt);
  minDate.setDate(minDate.getDate() + 1); // add a day to when it was created for safety

  // is is archived, don't let date be undefined; instead default to last day of event
  useEffect(() => {
    if (date === undefined && isArchived) {
      setDate(dateOfClose);
    }
  }, [event]);

  const onClose = () => {
    // reset date
    if (date !== undefined) {
      setDate(undefined);
    }
  };

  // if event is archived, it's always history; don't let user turn it off

  if (!isHistory) return null; // TODO: make animation for when it collapses
  return (
    <View
      style={{
        height: 90,
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: 'rgba(255,255,255,0.3)',
        paddingTop: 10,
        paddingBottom: 10,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          alignItems: 'center',
        }}
      >
        <View style={{ width: '15%' }} />
        <SubHeader style={{ marginBottom: 5 }}>Time Machine: ON</SubHeader>
        <HeaderButton
          style={{ marginRight: theme.windowMargin }}
          icon={'close-outline'}
          onPress={() => onClose()}
        />
      </View>
      <View
        style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}
      >
        <View
          style={{
            alignSelf: 'center',
            marginLeft: theme.windowMargin,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Body>View Predictions for: </Body>
          <DateInput date={date} setDate={setDate} minDate={minDate} maxDate={maxDate} />
        </View>
      </View>
    </View>
  );
};

export default HistoryTab;
