import React from 'react';
import COLORS from '../../constants/colors';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { View } from 'react-native';
import theme from '../../constants/theme';

export const DateInput = (props: {
  date: Date | undefined;
  setDate: (d: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  style?: any;
}) => {
  const { date, setDate, minDate, maxDate, style } = props;

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date | undefined) => {
    selectedDate && setDate(selectedDate);
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        borderRadius: theme.borderRadius,
        alignItems: 'center',
      }}
    >
      <DateTimePicker
        display={'default'}
        testID="dateTimePicker"
        value={date || new Date()}
        mode={'date'}
        onChange={onChange}
        style={{
          alignSelf: 'center',
          ...style,
        }}
        accentColor={COLORS.secondary}
        minimumDate={minDate}
        maximumDate={maxDate}
      />
    </View>
  );
};
