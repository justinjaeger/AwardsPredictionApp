import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import CustomIcon from '../../components/CustomIcon';
import COLORS from '../../constants/colors';
import { BOTTOM_TAB_HEIGHT } from '../../constants';
import SafeAreaViewFixed from '../../components/SafeAreaViewFixed';
import useDevice from '../../util/device';
import useKeyboard from '../../hooks/useKeyboard';

export type ITabBarProps = {
  state: any;
  descriptors: any;
  navigation: any;
};

const TabBar = (props: ITabBarProps) => {
  const { state, descriptors, navigation } = props;
  const { tabBarVisible } = descriptors[state.routes[state.index].key].options;
  const { isPad } = useDevice();
  const { androidKeyboardIsVisible } = useKeyboard();

  const unfocusedColor = 'rgba(255,255,255,0.5)';
  const focusedColor = COLORS.white;

  if (tabBarVisible === false || androidKeyboardIsVisible) {
    return null;
  }

  return (
    <SafeAreaViewFixed
      edges={['bottom']}
      style={{
        borderTopWidth: 1,
        backgroundColor: COLORS.primary,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          height: BOTTOM_TAB_HEIGHT * (isPad ? 1.3 : 1),
        }}
      >
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };
          const icon = (() => {
            switch (route.name) {
              case 'Social':
                return (
                  <View key={index}>
                    <CustomIcon
                      name={'people-outline'}
                      color={isFocused ? focusedColor : unfocusedColor}
                    />
                  </View>
                );
              case 'Predictions':
                return (
                  <View key={index}>
                    <CustomIcon
                      name={'home'}
                      color={isFocused ? focusedColor : unfocusedColor}
                    />
                  </View>
                );
              case 'Leaderboard':
                return (
                  <View key={index}>
                    <CustomIcon
                      name={'bar-chart'}
                      color={isFocused ? focusedColor : unfocusedColor}
                    />
                  </View>
                );
              case 'ProfileTab':
                return (
                  <View key={index}>
                    <CustomIcon
                      name={'person'}
                      color={isFocused ? focusedColor : unfocusedColor}
                    />
                  </View>
                );
              case 'Admin':
                return (
                  <View key={index}>
                    <CustomIcon
                      name={'lock'}
                      color={isFocused ? focusedColor : unfocusedColor}
                    />
                  </View>
                );
              case 'HelpTab':
                return (
                  <View key={index}>
                    <CustomIcon
                      name={'question-mark'}
                      color={isFocused ? focusedColor : unfocusedColor}
                    />
                  </View>
                );
            }
          })();
          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              testID={options.tabBarTestID}
              onPress={onPress}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
              }}
            >
              {icon}
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaViewFixed>
  );
};

export default TabBar;
