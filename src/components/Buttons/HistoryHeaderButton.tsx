import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { EventStatus } from '../../API';
import theme from '../../constants/theme';
import { useCategory } from '../../context/CategoryContext';
import { iEvent } from '../../types';
import Snackbar from '../Snackbar';
import { IconButton } from './IconButton';

const HistoryHeaderButton = ({ isDisabled }: { isDisabled?: boolean }) => {
  const navigation = useNavigation();
  const { date, setDate, event: _event } = useCategory();
  const isHistory = !!date;
  const event = _event as iEvent;
  const isArchived = event.status === EventStatus.ARCHIVED;

  const onPress = () => {
    if (isArchived) {
      Snackbar.warning('Time Machine is always on when event has ended');
      return;
    }
    if (isDisabled) {
      Snackbar.warning('Time Machine disabled while editing predictions');
      return;
    }
    if (!isHistory) {
      setDate(new Date());
    } else {
      setDate(undefined);
    }
  };

  // hide if is archived
  if (isDisabled) return null;

  return (
    <IconButton
      iconProps={{ name: 'clock-outline' }}
      onPress={() => {
        if (onPress) {
          onPress();
        } else {
          navigation.goBack();
        }
      }}
      styles={{ marginRight: theme.windowMargin }}
    />
  );
};

export default HistoryHeaderButton;
