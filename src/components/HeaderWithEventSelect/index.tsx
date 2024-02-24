import { TouchableHighlight, View } from 'react-native';
import theme from '../../constants/theme';
import { HeaderLight } from '../Text';
import React from 'react';
import HeaderDropdownButton from '../HeaderDropdownButton';
import EventTopTabs from '../EventTopTabs';
import { EventModel, WithId } from '../../models';
import CustomIcon from '../CustomIcon';
import { useNavigation } from '@react-navigation/native';
import COLORS from '../../constants/colors';

export const HEADER_TITLE_MARGIN_TOP = 10;
export const HEADER_TITLE_HEIGHT = 40;
export const HEADER_TOP_TAB_MARGIN_BOTTOM = 10;
export const HEADER_TOP_TAB_MARGIN_TOP = 10;
export const BACK_BUTTON_HEIGHT = 40;

const HeaderWithEventSelect = ({
  title,
  event,
  setEvent,
  eventOptions,
  setYear,
  disableBack,
}: {
  title: string;
  event: WithId<EventModel> | undefined;
  setEvent: (event: WithId<EventModel>) => void;
  eventOptions: WithId<EventModel>[];
  setYear: (year: number) => void;
  disableBack?: boolean;
}) => {
  const navigation = useNavigation();

  const yearOptions = (eventOptions ?? [])
    .reduce((acc, e) => {
      if (acc.includes(e.year)) return acc;
      return [...acc, e.year];
    }, [] as number[])
    .sort((a, b) => b - a);

  return (
    <View
      style={{
        marginTop: HEADER_TOP_TAB_MARGIN_TOP,
        marginBottom: HEADER_TOP_TAB_MARGIN_BOTTOM,
      }}
    >
      <View style={{ marginLeft: theme.windowMargin, marginRight: theme.windowMargin }}>
        {!disableBack ? (
          <View style={{ height: BACK_BUTTON_HEIGHT, justifyContent: 'center' }}>
            <TouchableHighlight
              onPress={() => {
                navigation.goBack();
              }}
              style={{
                width: BACK_BUTTON_HEIGHT - 10,
                backgroundColor: COLORS.primaryLight,
                borderRadius: 100,
              }}
            >
              <CustomIcon
                name="chevron-left-outline"
                size={BACK_BUTTON_HEIGHT - 10}
                color={COLORS.white}
              />
            </TouchableHighlight>
          </View>
        ) : null}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: HEADER_TITLE_HEIGHT,
          }}
        >
          <View
            style={{
              alignItems: 'flex-start',
              justifyContent: 'center',
            }}
          >
            <HeaderLight>{title}</HeaderLight>
          </View>
          <HeaderDropdownButton
            height={HEADER_TITLE_HEIGHT - 5}
            position={{ top: HEADER_TITLE_MARGIN_TOP, right: theme.windowMargin }}
            options={yearOptions.map((y) => ({
              text: y.toString(),
              value: y,
              isSelected: y === event?.year,
            }))}
            onSelect={(value) => setYear(value)}
          />
        </View>
      </View>
      {event ? (
        <EventTopTabs
          style={{
            marginTop: HEADER_TOP_TAB_MARGIN_TOP,
            marginBottom: HEADER_TOP_TAB_MARGIN_BOTTOM,
          }}
          selectedEvent={event}
          setEvent={setEvent}
        />
      ) : null}
    </View>
  );
};

export default HeaderWithEventSelect;
