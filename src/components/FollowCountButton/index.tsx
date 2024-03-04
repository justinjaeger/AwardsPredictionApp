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
  loading?: boolean;
  text: string;
}) => {
  return (
    <TouchableHighlight
      onPress={onPress}
      style={{
        alignItems: 'center',
        backgroundColor: COLORS.primaryLight,
        borderRadius: theme.borderRadius,
        height: 30,
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: 'center',
        marginRight: 10,
      }}
      underlayColor={COLORS.secondary}
    >
      {loading ? (
        <Spinner size="medium" style={{ borderColor: COLORS.gray }} />
      ) : (
        <BodyBold style={{ fontWeight: '600' }}>{text}</BodyBold>
      )}
    </TouchableHighlight>
  );
};

export default FollowCountButton;
