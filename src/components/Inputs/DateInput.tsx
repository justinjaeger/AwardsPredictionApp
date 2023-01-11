import React from 'react';
import COLORS from '../../constants/colors';
import { Body } from '../Text';
import DateTimePicker, {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { GestureResponderEvent, Platform, TouchableHighlight, View } from 'react-native';
import theme from '../../constants/theme';

export const DateTimeInput = (props: {
  date: Date | undefined;
  setDate: (d: Date) => void;
  label: string;
  style?: any;
}) => {
  const { date, setDate, label, style } = props;

  const isAndroid = Platform.OS === 'android';

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date | undefined) => {
    selectedDate && setDate(selectedDate);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const showTimepicker = (e: GestureResponderEvent) => {
    if (isAndroid) {
      DateTimePickerAndroid.open({
        value: date || new Date(),
        onChange,
        mode: 'time',
        is24Hour: true,
      });
    }
  };

  // TODO: Look up example for how this is done
  return (
    <View>
      {!isAndroid ? (
        <DateTimePicker
          display={'spinner'}
          testID="dateTimePicker"
          value={date || new Date()}
          // @ts-ignore flagging because it will break if you use 'datetime' as mode for Android, but I'm not allowing Android
          mode={'datetime'}
          onChange={onChange}
          style={{ backgroundColor: 'transparent' }}
          textColor={'white'}
          accentColor={'white'}
        />
      ) : (
        <TouchableHighlight onPress={showTimepicker} style={{ width: '100%', ...style }}>
          <>
            <Body style={{ marginBottom: 5 }}>{label}</Body>
            <View
              style={{
                borderWidth: 1,
                borderColor: COLORS.white,
                padding: 15,
                borderRadius: theme.borderRadius,
              }}
            >
              <Body>
                {date
                  ? date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
                  : 'No Time Selected'}
              </Body>
            </View>
          </>
        </TouchableHighlight>
      )}
    </View>
  );
};

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

  // TODO: Look up example for how this is done
  return (
    <View style={{ flexDirection: 'row' }}>
      <View
        style={{
          backgroundColor: 'rgba(255,255,255,0.8)',
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
            backgroundColor: 'transparent',
            alignSelf: 'center',
            ...style,
          }}
          accentColor={COLORS.secondary}
          minimumDate={minDate}
          maximumDate={maxDate}
        />
      </View>
    </View>
  );
};
