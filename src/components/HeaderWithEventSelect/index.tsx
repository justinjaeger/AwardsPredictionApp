import { View } from 'react-native';
import theme from '../../constants/theme';
import { HeaderLight } from '../Text';
import React from 'react';
import HeaderDropdownButton from '../HeaderDropdownButton';
import EventTopTabs from '../EventTopTabs';
import { EventModel, WithId } from '../../models';

export const HEADER_TITLE_MARGIN_TOP = 10;
export const HEADER_TITLE_HEIGHT = 40;
export const HEADER_TOP_TAB_MARGIN_BOTTOM = 10;

const HeaderWithEventSelect = ({
  title,
  event,
  setEvent,
  eventOptions,
  setYear,
}: {
  title: string;
  event: WithId<EventModel>;
  setEvent: (event: WithId<EventModel>) => void;
  eventOptions: WithId<EventModel>[];
  setYear: (year: number) => void;
}) => {
  const yearOptions = (eventOptions ?? [])
    .reduce((acc, e) => {
      if (acc.includes(e.year)) return acc;
      return [...acc, e.year];
    }, [] as number[])
    .sort((a, b) => b - a);

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginLeft: theme.windowMargin,
          marginRight: theme.windowMargin,
          marginTop: HEADER_TITLE_MARGIN_TOP,
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
            isSelected: y === event.year,
          }))}
          onSelect={(value) => setYear(value)}
        />
      </View>
      {event ? (
        <EventTopTabs
          style={{
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
