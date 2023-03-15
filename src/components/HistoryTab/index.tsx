import React, { useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';
import { EventStatus } from '../../API';
import { useCategory } from '../../context/CategoryContext';
import { iEvent } from '../../types';
import { DateInput } from '../Inputs/DateInput';
import { SubHeader } from '../Text';

const TAB_HEIGHT = 60;

const HistoryTab = () => {
  const { event: _event, date, setDate } = useCategory();
  const event = _event as iEvent;
  const isArchived = event.status === EventStatus.ARCHIVED;
  const isHistory = !!date || isArchived;

  const height = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const [disableInput, setDisableInput] = useState<boolean>(false);

  const dateOfClose = event.winDateTime ? new Date(event.winDateTime) : new Date();
  const today = new Date();
  const maxDate = dateOfClose > today ? today : dateOfClose; // if date of close is in the past, use today
  const minDate = new Date(event.liveAt || event.createdAt);
  minDate.setDate(minDate.getDate() + 1); // add a day to when it was created for safety

  // is is archived, don't let date be undefined; instead default to last day of event
  useEffect(() => {
    if (date === undefined && isArchived) {
      setDate(dateOfClose);
    }
  }, [event]);

  useEffect(() => {
    if (isHistory) {
      setDisableInput(false);
      Animated.timing(height, {
        toValue: TAB_HEIGHT,
        duration: 250,
        useNativeDriver: false,
      }).start(() => {
        Animated.timing(opacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: false,
        }).start();
      });
    } else {
      setTimeout(() => {
        setDisableInput(true);
      }, 250);
      Animated.timing(opacity, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false,
      }).start(() => {
        Animated.timing(height, {
          toValue: 0,
          duration: 250,
          useNativeDriver: false,
        }).start();
      });
    }
  }, [isHistory]);

  if (minDate > maxDate) {
    return null;
  }

  return (
    <Animated.View
      style={{
        height,
        opacity,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: 'rgba(255,255,255,0.3)',
      }}
    >
      <SubHeader style={{ marginBottom: 5, marginTop: 5 }}>Time Machine: </SubHeader>
      {!disableInput ? (
        // disableInput check is necessary bc date will handle clicks even when hidden
        <DateInput date={date} setDate={setDate} minDate={minDate} maxDate={maxDate} />
      ) : null}
    </Animated.View>
  );
};

export default HistoryTab;
