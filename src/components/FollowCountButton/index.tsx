import { Spinner } from '@ui-kitten/components';
import React from 'react';
import { TouchableHighlight } from 'react-native';
import COLORS from '../../constants/colors';
import theme from '../../constants/theme';
import { BodyBold } from '../Text';

const FollowCountButton = ({
  onPress,
  loading,
  text,
}: {
  onPress: () => void;
  loading: boolean;
  text: string;
}) => {
  return (
    <TouchableHighlight
      onPress={onPress}
      style={{
        alignItems: 'center',
        backgroundColor: COLORS.secondaryDark,
        borderRadius: theme.borderRadius,
        width: 130,
        height: 35,
        justifyContent: 'center',
        marginRight: 10,
      }}
      underlayColor={COLORS.secondary}
    >
      {loading ? (
        <Spinner size="medium" style={{ borderColor: COLORS.gray }} />
      ) : (
        <BodyBold>{text}</BodyBold>
      )}
    </TouchableHighlight>
  );
};

export default FollowCountButton;
