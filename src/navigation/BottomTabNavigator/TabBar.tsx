import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import CustomIcon from '../../components/CustomIcon';
import COLORS from '../../constants/colors';
import { BOTTOM_TAB_HEIGHT } from '../../constants';
import SafeAreaViewFixed from '../../components/SafeAreaViewFixed';

export type ITabBarProps = {
  state: any;
  descriptors: any;
  navigation: any;
};

const TabBar = (props: ITabBarProps) => {
  const { state, descriptors, navigation } = props;
  const { tabBarVisible } = descriptors[state.routes[state.index].key].options;

  if (tabBarVisible === false) {
    return null;
  }

  return (
    <SafeAreaViewFixed
      edges={['bottom']}
      style={{
        borderTopWidth: 1,
        shadowOpacity: 0.2,
        shadowRadius: 10,
        shadowOffset: {
          height: -5,
          width: 0,
        },
        backgroundColor: COLORS.primary,
        // paddingBottom: bottom,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          height: BOTTOM_TAB_HEIGHT,
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
              case 'Predictions':
                return (
                  <View key={index}>
                    {isFocused ? (
                      <CustomIcon name={'home'} />
                    ) : (
                      <CustomIcon name={'home-outline'} />
                    )}
                  </View>
                );
              case 'Profile':
                return (
                  <View key={index}>
                    {isFocused ? (
                      <CustomIcon name={'person'} />
                    ) : (
                      <CustomIcon name={'person-outline'} />
                    )}
                  </View>
                );
              case 'Friend':
                return (
                  <View key={index}>
                    {isFocused ? (
                      <CustomIcon name={'people'} />
                    ) : (
                      <CustomIcon name={'people-outline'} />
                    )}
                  </View>
                );
              case 'Admin':
                return (
                  <View key={index}>
                    {isFocused ? (
                      <CustomIcon name={'lock'} />
                    ) : (
                      <CustomIcon name={'lock-outline'} />
                    )}
                  </View>
                );
              case 'Help':
                return (
                  <View key={index}>
                    {isFocused ? (
                      <CustomIcon name={'question-mark-circle'} />
                    ) : (
                      <CustomIcon name={'question-mark-circle-outline'} />
                    )}
                  </View>
                );
            }
          })();
          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
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
