import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeNavigator from './HomeNavigator';
import MyPredictionsNavigator from './MyPredictionsNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity, View } from 'react-native';
import CustomIcon from '../components/CustomIcon';
import ProfileNavigator from './ProfileNavigator';
import theme from '../theme';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator tabBar={(p: ITabBarProps) => <TabBar {...p} />}>
      <Tab.Screen name="Home" component={HomeNavigator} />
      <Tab.Screen name="MyPredictions" component={MyPredictionsNavigator} />
      <Tab.Screen name="Profile" component={ProfileNavigator} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

// TAB BAR
const BOTTOM_TAB_HEIGHT = 60;

type ITabBarProps = {
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
    <SafeAreaView
      edges={['bottom']}
      style={{
        borderTopWidth: 1,
        borderColor: theme['grayscale-400'],
        shadowOpacity: 0.2,
        shadowRadius: 10,
        shadowOffset: {
          height: -5,
          width: 0,
        },
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          marginTop: 5,
          marginBottom: 5,
        }}
      >
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          const routeName = route.name.toLowerCase();
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
            switch (routeName) {
              case 'home':
                return (
                  <>
                    {isFocused ? (
                      <CustomIcon name={'home'} />
                    ) : (
                      <CustomIcon name={'home-outline'} />
                    )}
                  </>
                );
              case 'mypredictions':
                return (
                  <>
                    {isFocused ? (
                      <CustomIcon name={'list'} />
                    ) : (
                      <CustomIcon name={'list-outline'} />
                    )}
                  </>
                );
              case 'profile':
                return (
                  <>
                    {isFocused ? (
                      <CustomIcon name={'person'} />
                    ) : (
                      <CustomIcon name={'person-outline'} />
                    )}
                  </>
                );
            }
          })();
          return (
            <TouchableOpacity
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
                height: BOTTOM_TAB_HEIGHT,
              }}
            >
              {icon}
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
};
