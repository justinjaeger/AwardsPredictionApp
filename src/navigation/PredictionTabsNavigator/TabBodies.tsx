import React, { useState } from 'react';
import { ScrollView, useWindowDimensions, View } from 'react-native';
import { usePersonalCommunityTab } from '../../context/EventContext';

/**
 * Note: This component is a bit whack but it's done in this way to prevent re-renders of lists
 * We call the setPersonalCommunityTab function manually WHEN we navigate, instead of calling it inside here
 */
const PredictionTabsNavigator = ({
  personal,
  community,
  scrollViewRef,
}: {
  personal: JSX.Element;
  community: JSX.Element;
  scrollViewRef: React.RefObject<ScrollView>;
}) => {
  const { width } = useWindowDimensions();
  const { personalCommunityTab } = usePersonalCommunityTab();

  // This seems unnecessary but without, it breaks the animation
  const [initialTab] = useState<'personal' | 'community'>(
    personalCommunityTab || 'personal',
  );

  return (
    <ScrollView
      horizontal
      pagingEnabled
      ref={scrollViewRef}
      showsHorizontalScrollIndicator={false}
      nestedScrollEnabled
      scrollEventThrottle={1}
      scrollEnabled={false}
      // basically a starting value
      contentOffset={{
        x: initialTab === 'personal' ? 0 : width,
        y: 0,
      }}
    >
      <View style={{ width, height: '100%' }}>{personal}</View>
      <View style={{ width, height: '100%' }}>{community}</View>
    </ScrollView>
  );
};

export default PredictionTabsNavigator;
