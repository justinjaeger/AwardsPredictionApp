import theme from '../../../constants/theme';
import React from 'react';
import HeaderDropdownButton from '../../HeaderDropdownButton';
import { EventModel, WithId } from '../../../models';
import { HEADER_HEIGHT } from '../Header';

const YearDropdown = ({
  event,
  eventOptions,
  setYear,
  heightAboveDropdown,
}: {
  event: WithId<EventModel> | undefined;
  eventOptions: WithId<EventModel>[];
  setYear: (year: number) => void;
  heightAboveDropdown: number;
}) => {
  const yearOptions = (eventOptions ?? [])
    .reduce((acc, e) => {
      if (acc.includes(e.year)) return acc;
      return [...acc, e.year];
    }, [] as number[])
    .sort((a, b) => b - a);

  return (
    <HeaderDropdownButton
      height={HEADER_HEIGHT - 5}
      position={{ top: heightAboveDropdown, right: theme.windowMargin }}
      options={yearOptions.map((y) => ({
        text: y.toString(),
        value: y,
        isSelected: y === event?.year,
      }))}
      onSelect={(value) => setYear(value)}
    />
  );
};

export default YearDropdown;
