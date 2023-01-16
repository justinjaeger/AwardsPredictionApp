import { useNavigation } from '@react-navigation/native';
import React from 'react';
import theme from '../../constants/theme';
import { useCategory } from '../../context/CategoryContext';
import Snackbar from '../Snackbar';
import { IconButton } from './IconButton';

const HistoryHeaderButton = ({ isDisabled }: { isDisabled?: boolean }) => {
  const navigation = useNavigation();
  const { date, setDate } = useCategory();
  const isHistory = !!date;

  const onPress = () => {
    if (isDisabled) {
      Snackbar.warning('History disabled while editing predictions');
      return;
    }
    if (!isHistory) {
      setDate(new Date());
    }
  };

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
