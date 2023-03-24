import { StackActions, useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableHighlight } from 'react-native';
import AwardsBodyImage from '../../../components/AwardsBodyImage';
import CustomIcon from '../../../components/CustomIcon';
import COLORS from '../../../constants/colors';
import theme from '../../../constants/theme';
import { useCategory } from '../../../context/CategoryContext';

const EventLink = ({ userId }: { userId: string | undefined }) => {
  const navigation = useNavigation();
  const { event } = useCategory();

  if (!event) return null;

  const image = <AwardsBodyImage awardsBody={event.awardsBody} white size={36} />;

  return (
    <TouchableHighlight
      onPress={() => {
        // overrides category and goes to event
        navigation.dispatch(StackActions.replace('Event', { userId }));
      }}
      style={{
        position: 'absolute',
        right: 0,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: 5,
        paddingLeft: 10,
        zIndex: 100,
        borderRadius: theme.borderRadius,
        backgroundColor: COLORS.primary,
        borderWidth: 1,
        borderColor: COLORS.primaryLight,
        borderTopWidth: 0,
        borderRightWidth: 0,
      }}
      underlayColor={COLORS.secondaryDark}
    >
      <>
        {image}
        <CustomIcon name={'chevron-right'} />
      </>
    </TouchableHighlight>
  );
};

export default EventLink;
