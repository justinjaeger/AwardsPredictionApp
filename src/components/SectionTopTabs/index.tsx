import React, { useRef, useState } from 'react';
import { Animated, TouchableHighlight, useWindowDimensions, View } from 'react-native';
import COLORS from '../../constants/colors';
import useDevice from '../../util/device';
import { SubHeader } from '../Text';
import { SharedValue, withTiming } from 'react-native-reanimated';
import { hexToRgb } from '../../util/hexToRgb';

type iSectionTopTab = {
  title: string;
  onOpenTab?: () => void;
};

export const getSectionTabHeight = (isPad: boolean) => (isPad ? 55 : 45);

const getScrollBarPosition = (index: number, width: number) =>
  index * (width / (index + 1));

/**
 * Use it with DualTabsWrapper and pass in a shared "tabsPosX" for each to get animated tab switching
 */
const SectionTopTabs = ({
  tabs,
  initialTabIndex = 0,
  tabsPosX,
}: {
  tabs: iSectionTopTab[];
  initialTabIndex?: number;
  tabsPosX?: SharedValue<number>;
}) => {
  const { isPad } = useDevice();
  const { width } = useWindowDimensions();

  const scrollBarAnim = useRef(
    new Animated.Value(getScrollBarPosition(initialTabIndex, width)),
  ).current;

  const [selectedTab, setSelectedTab] = useState<iSectionTopTab>(tabs[initialTabIndex]);

  const openTab = (t: iSectionTopTab, index: number) => {
    setSelectedTab(t);

    t.onOpenTab && t.onOpenTab();

    const scrollBarPosition = getScrollBarPosition(index, width);
    Animated.timing(scrollBarAnim, {
      toValue: scrollBarPosition,
      duration: 250,
      useNativeDriver: true,
    }).start();

    // Animates the underlying tabs, if you want to use it
    if (tabsPosX) {
      const newTabPosition = -(index * width);
      tabsPosX.value = withTiming(newTabPosition, { duration: 250 });
    }
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        width,
      }}
    >
      {/* ScrollBar */}
      <Animated.View
        style={{
          position: 'absolute',
          bottom: 0,
          transform: [{ translateX: scrollBarAnim }],
          width: width / tabs.length,
          backgroundColor: COLORS.white,
          height: 2,
          borderRadius: 5,
          zIndex: 2,
        }}
      />
      {tabs.map((t, i) => {
        const isSelected = t.title === selectedTab.title;
        return (
          <TouchableHighlight
            key={t.title}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: '50%',
              borderRadius: 0,
              borderBottomColor: hexToRgb(COLORS.primaryLight, 0.5),
              borderBottomWidth: 1,
              height: getSectionTabHeight(isPad),
            }}
            onPress={() => openTab(t, i)}
            underlayColor={COLORS.secondary}
          >
            <View style={{ zIndex: 3, flexDirection: 'row', alignItems: 'center' }}>
              <SubHeader
                style={{
                  zIndex: 3,
                  color: isSelected ? COLORS.white : 'rgba(255,255,255,0.6)',
                  textAlign: 'center',
                }}
              >
                {t.title}
              </SubHeader>
            </View>
          </TouchableHighlight>
        );
      })}
    </View>
  );
};

export default SectionTopTabs;
