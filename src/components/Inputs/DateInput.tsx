import React from 'react';
import COLORS from '../../constants/colors';
import { Body } from '../Text';
import DateTimePicker, {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { GestureResponderEvent, Platform, TouchableHighlight, View } from 'react-native';
import theme from '../../constants/theme';

const DateInput = (props: {
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
          testID="dateTimePicker"
          value={date || new Date()}
          // @ts-ignore flagging because it will break if you use 'datetime' as mode for Android, but I'm not allowing Android
          mode={'datetime'}
          is24Hour={true}
          onChange={onChange}
          style={{ alignSelf: 'center', backgroundColor: COLORS.white }}
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

export default DateInput;
