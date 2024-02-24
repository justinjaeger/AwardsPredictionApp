import { View } from 'react-native';
import theme from '../../constants/theme';
import { HeaderLight } from '../Text';
import React from 'react';
import HeaderDropdownButton from '../HeaderDropdownButton';
import { EventModel, Phase, WithId } from '../../models';
import LeaderboardTopTabs from '../LeaderboardTabs';

export const HEADER_TITLE_MARGIN_TOP = 10;
export const HEADER_TITLE_HEIGHT = 40;
export const HEADER_TOP_TAB_MARGIN_BOTTOM = 10;
export const HEADER_TOP_TAB_MARGIN_TOP = 10;

// TODO: This is awfully similar to HeaderWithEventSelect
const HeaderWithLeaderboardSelect = ({
  title,
  event,
  phase,
  setLeaderboard,
  eventOptions,
  setYear,
}: {
  title: string;
  event: WithId<EventModel> | undefined;
  phase: Phase | undefined;
  setLeaderboard: (event: WithId<EventModel>, phase: Phase) => void;
  eventOptions: WithId<EventModel>[];
  setYear: (year: number) => void;
  disableTabs?: boolean;
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
          marginBottom: HEADER_TOP_TAB_MARGIN_TOP,
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
      {event && phase ? (
        <LeaderboardTopTabs
          selectedEvent={event}
          phase={phase}
          setLeaderboard={setLeaderboard}
          style={{ marginBottom: HEADER_TOP_TAB_MARGIN_BOTTOM }}
        />
      ) : null}
    </View>
  );
};

export default HeaderWithLeaderboardSelect;
