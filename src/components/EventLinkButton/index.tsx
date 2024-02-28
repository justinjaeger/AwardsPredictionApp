import { StackActions, useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableHighlight } from 'react-native';
import CustomIcon from '../CustomIcon';
import COLORS from '../../constants/colors';
import theme from '../../constants/theme';
import { BodyBold } from '../Text';
import { hexToRgb } from '../../util/hexToRgb';
import { useRouteParams } from '../../hooks/useRouteParams';
import { IPAD_PROFILE_IMAGE_SCALE } from '../ProfileImage';
import useDevice from '../../util/device';
import { PredictionsNavigationProp } from '../../navigation/types';

const EventLinkButton = ({ text }: { text?: string }) => {
  const { userInfo } = useRouteParams();
  const navigation = useNavigation<PredictionsNavigationProp>();
  const { event } = useRouteParams();
  const { isPad } = useDevice();

  if (!event) return null;

  return (
    <TouchableHighlight
      onPress={() => {
        // overrides category and goes to event
        navigation.dispatch(
          StackActions.replace('Event', { userInfo, eventId: event._id }),
        );
      }}
      style={{
        position: 'absolute',
        right: 0,
        bottom: 60 * (isPad ? IPAD_PROFILE_IMAGE_SCALE : 1),
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
        <BodyBold>{text ?? 'All Categories'}</BodyBold>
        <CustomIcon name={'chevron-right'} size={30} />
      </>
    </TouchableHighlight>
  );
};

export default EventLinkButton;
