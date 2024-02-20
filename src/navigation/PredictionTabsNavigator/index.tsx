import React from 'react';
import { ScrollView, useWindowDimensions } from 'react-native';
import { usePersonalCommunityTab } from '../../context/EventContext';
import { useAuth } from '../../context/AuthContext';
import { useRouteParams } from '../../hooks/useRouteParams';
import { truncateText } from '../../util/truncateText';
import SectionTopTabs from '../../components/SectionTopTabs';
import { useNavigateAwayEffect } from '../../util/hooks';

/**
 * Note: This component is a bit whack but it's done in this way to prevent re-renders of lists
 * We call the setPersonalCommunityTab function manually WHEN we navigate, instead of calling it inside here
 */
const PredictionTabsNavigator = ({
  horizontalTabsScrollViewRef,
  onChangeTab,
}: {
  horizontalTabsScrollViewRef: React.RefObject<ScrollView>;
  onChangeTab?: (tab: 'personal' | 'community') => void;
}) => {
  const { width } = useWindowDimensions();
  const { personalCommunityTab, setPersonalCommunityTab } = usePersonalCommunityTab();
  const { userId: authUserId } = useAuth();
  const { userInfo } = useRouteParams();
  const isAuthUser = userInfo?.userId === authUserId;

  const initialTabIndex = personalCommunityTab === 'personal' ? 0 : 1;

  const [currentTab, setCurrentTab] = React.useState<'personal' | 'community'>(
    personalCommunityTab,
  );

  // important for tracking the current tab
  useNavigateAwayEffect(() => {
    setPersonalCommunityTab(currentTab);
  }, []);

  return (
    <SectionTopTabs
      tabs={[
        {
          title: isAuthUser
            ? 'My Predictions'
            : truncateText(userInfo?.userName ?? 'My Predictions', 13),
          onOpenTab: (isOpeningWithoutAnimation) => {
            setCurrentTab('personal');
            onChangeTab && onChangeTab('personal');
            horizontalTabsScrollViewRef.current?.scrollTo({
              x: 0,
              animated: !isOpeningWithoutAnimation,
            });
          },
        },
        {
          title: 'Community',
          onOpenTab: (isOpeningWithoutAnimation) => {
            setCurrentTab('community');
            onChangeTab && onChangeTab('community');
            horizontalTabsScrollViewRef.current?.scrollTo({
              x: width,
              animated: !isOpeningWithoutAnimation,
            });
          },
        },
      ]}
      initialTabIndex={initialTabIndex}
    />
  );
};

export default PredictionTabsNavigator;
