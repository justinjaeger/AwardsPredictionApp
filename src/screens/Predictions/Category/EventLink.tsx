import { StackActions, useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableHighlight } from 'react-native';
import CustomIcon from '../../../components/CustomIcon';
import COLORS from '../../../constants/colors';
import theme from '../../../constants/theme';
import { useEvent } from '../../../context/EventContext';
import { BodyBold } from '../../../components/Text';
import { hexToRgb } from '../../../util/hexToRgb';
import { useAuth } from '../../../context/AuthContext';

const EventLink = ({ userId }: { userId: string | undefined }) => {
  const { userId: authUserId } = useAuth();
  const isAuthUser = userId === authUserId;
  const navigation = useNavigation();
  const { event } = useEvent();

  if (!event) return null;

  return (
    <TouchableHighlight
      onPress={() => {
        // overrides category and goes to event
        if (isAuthUser) {
          navigation.dispatch(StackActions.replace('Event', { userId }));
        } else {
          navigation.dispatch(StackActions.replace('EventFromProfile', { userId }));
        }
      }}
      style={{
        position: 'absolute',
        right: 0,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingLeft: 10,
        zIndex: 100,
        borderRadius: theme.borderRadius,
        backgroundColor: hexToRgb(COLORS.primary, 0.8),
        borderWidth: 1,
        borderColor: COLORS.primaryLight,
        borderTopWidth: 0,
        borderRightWidth: 0,
      }}
      underlayColor={COLORS.secondaryDark}
    >
      <>
        <BodyBold>All Categories</BodyBold>
        <CustomIcon name={'chevron-right'} size={30} />
      </>
    </TouchableHighlight>
  );
};

export default EventLink;
