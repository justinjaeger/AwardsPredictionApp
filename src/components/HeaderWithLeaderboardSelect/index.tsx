import { TouchableHighlight, View } from 'react-native';
import theme from '../../constants/theme';
import { HeaderLight } from '../Text';
import React from 'react';
import HeaderDropdownButton from '../HeaderDropdownButton';
import { EventModel, Phase, WithId } from '../../models';
import LeaderboardTopTabs from '../LeaderboardTabs';
import { useNavigation } from '@react-navigation/native';
import COLORS from '../../constants/colors';
import CustomIcon from '../CustomIcon';

export const HEADER_TITLE_MARGIN_TOP = 10;
export const HEADER_TITLE_HEIGHT = 40;
export const HEADER_TOP_TAB_MARGIN_BOTTOM = 10;
export const HEADER_TOP_TAB_MARGIN_TOP = 10;
export const BACK_BUTTON_HEIGHT = 40;

// TODO: This is awfully similar to HeaderWithEventSelect
const HeaderWithLeaderboardSelect = ({
  title,
  event,
  phase,
  setLeaderboard,
  eventOptions,
  setYear,
  disableBack,
}: {
  title: string;
  event: WithId<EventModel> | undefined;
  phase: Phase | undefined;
  setLeaderboard: (event: WithId<EventModel>, phase: Phase) => void;
  eventOptions: WithId<EventModel>[];
  setYear: (year: number) => void;
  disableTabs?: boolean;
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
      {event && phase ? (
        <LeaderboardTopTabs
          selectedEvent={event}
          phase={phase}
          setLeaderboard={setLeaderboard}
          style={{
            marginTop: HEADER_TOP_TAB_MARGIN_TOP,
            marginBottom: HEADER_TOP_TAB_MARGIN_BOTTOM,
          }}
        />
      ) : null}
    </View>
  );
};

export default HeaderWithLeaderboardSelect;
