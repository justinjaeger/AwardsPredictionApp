import React from 'react';
import { View } from 'react-native';
import { useCategory } from '../../context/CategoryContext';
import { iEvent } from '../../types';
import HeaderButton from '../HeaderButton';
import { DateInput } from '../Inputs/DateInput';

const HistoryHeader = () => {
  const { event: _event, date, setDate } = useCategory();
  const event = _event as iEvent;

  const dateOfClose = event.winDateTime ? new Date(event.winDateTime) : new Date();
  const today = new Date();
  const maxDate = dateOfClose > today ? today : dateOfClose; // if date of close is in the past, use today
  const minDate = new Date(event.createdAt);
  minDate.setDate(minDate.getDate() + 1); // add a day to when it was created for safety

  const onTouchClock = () => {
    if (date !== undefined) {
      // reset date
      setDate(undefined);
    } else {
      setDate(new Date());
    }
  };

  return (
    <>
      <View style={{ marginRight: 10, alignSelf: 'center' }}>
        {date !== undefined ? (
          <DateInput date={date} setDate={setDate} minDate={minDate} maxDate={maxDate} />
        ) : null}
      </View>
      <HeaderButton onPress={onTouchClock} icon={'clock-outline'} />
    </>
  );
};

export default HistoryHeader;
