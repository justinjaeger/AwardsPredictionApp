import React, { ComponentType, useEffect, useState } from 'react';
import { SceneMap, TabView } from 'react-native-tab-view';
import { useWindowDimensions } from 'react-native';
import { useCategory } from '../../context/CategoryContext';

const PredictionTabsNavigator = (
  community: ComponentType<unknown>,
  personal: ComponentType<unknown>,
) => {
  console.error('PredictionTabsNavigator');
  const { personalCommunityTab, setPersonalCommunityTab } = useCategory();
  const layout = useWindowDimensions();

  const routes = [
    { key: 'community', title: 'Community' },
    { key: 'personal', title: 'Personal' },
  ];

  const [index, setIndex] = useState<number>(personalCommunityTab === 'personal' ? 1 : 0);

  useEffect(() => {
    setPersonalCommunityTab(index === 0 ? 'community' : 'personal');
  }, [index]);

  useEffect(() => {
    setIndex(personalCommunityTab === 'personal' ? 1 : 0);
  }, [personalCommunityTab]);

  const renderScene = SceneMap({
    personal,
    community,
  });

  return (
    <TabView
      tabBarPosition="bottom"
      swipeEnabled={false}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
};

export default PredictionTabsNavigator;
