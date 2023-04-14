import React, { useEffect, useRef } from 'react';
import { Animated, TouchableHighlight, View, useWindowDimensions } from 'react-native';
import COLORS from '../../constants/colors';
import useDevice from '../../util/device';
import CustomIcon from '../CustomIcon';
import { SubHeader } from '../Text';

type iToolbarButtonProps = {
  text: string;
  iconName?: string;
  onPress: () => void;
};

const ToolbarButton = ({ text, iconName, onPress }: iToolbarButtonProps) => {
  const { isPad } = useDevice();

  return (
    <TouchableHighlight
      style={{
        backgroundColor: COLORS.primary,
        borderColor: COLORS.white,
        borderWidth: 1,
        borderRadius: 100,
        alignItems: 'center',
        width: '30%',
        padding: 15 * (isPad ? 2 : 1),
      }}
      onPress={onPress}
      underlayColor={COLORS.secondaryDark}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {iconName ? <CustomIcon name={iconName} color={COLORS.white} size={24} /> : null}
        {text ? (
          <SubHeader style={[{ marginLeft: 5, marginRight: 5 }]}>{text}</SubHeader>
        ) : null}
      </View>
    </TouchableHighlight>
  );
};

const EditToolbar = ({
  visible,
  buttons,
}: {
  visible: boolean;
  buttons: iToolbarButtonProps[];
}) => {
  const { width } = useWindowDimensions();

  const posY = useRef(new Animated.Value(0)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(posY, {
      toValue: visible ? 0 : 100,
      duration: 250,
      useNativeDriver: false,
    }).start();
    Animated.timing(buttonOpacity, {
      toValue: visible ? 1 : 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [visible]);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        bottom: 0,
        alignSelf: 'flex-end',
        transform: [{ translateY: posY }],
        opacity: buttonOpacity,
        width,
        backgroundColor: COLORS.primary,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
      }}
    >
      {buttons.map((b) => (
        <ToolbarButton text={b.text} iconName={b.iconName} onPress={b.onPress} />
      ))}
    </Animated.View>
  );
};

export default EditToolbar;
