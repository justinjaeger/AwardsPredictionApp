import React, { useEffect, useRef, useState } from 'react';
import { Animated, TouchableHighlight, useWindowDimensions, View } from 'react-native';
import COLORS from '../../constants/colors';
import useDevice from '../../util/device';
import { SubHeader } from '../Text';

type iSectionTopTab = {
  title: string;
  onOpenTab?: (isOpeningWithoutAnimation?: boolean) => void;
};

export const getSectionTabHeight = (isPad: boolean) => (isPad ? 65 : 45);

const SectionTopTabs = ({
  tabs,
  initialTabIndex,
}: {
  tabs: iSectionTopTab[];
  initialTabIndex?: number;
}) => {
  const { isPad } = useDevice();
  const { width } = useWindowDimensions();

  const scrollBarAnim = useRef(
    new Animated.Value(initialTabIndex ? width / initialTabIndex : 0),
  ).current;

  const [selectedTab, setSelectedTab] = useState<iSectionTopTab>(
    initialTabIndex ? tabs[initialTabIndex] : tabs[0],
  );

  const openTab = (t: iSectionTopTab, index: number, instant?: boolean) => {
    setSelectedTab(t);

    t.onOpenTab && t.onOpenTab(instant);

    const scrollBarPosition = index * (width / (index + 1));
    Animated.timing(scrollBarAnim, {
      toValue: scrollBarPosition,
      duration: instant ? 0 : 250,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (initialTabIndex !== undefined) {
      openTab(tabs[initialTabIndex], initialTabIndex, true);
    }
  }, [initialTabIndex]);

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
              borderBottomColor: COLORS.primaryLight,
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
