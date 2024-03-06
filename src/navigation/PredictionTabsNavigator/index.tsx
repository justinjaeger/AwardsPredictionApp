import React from 'react';
import { usePersonalCommunityTab } from '../../context/PersonalCommunityContext';
import { useAuth } from '../../context/AuthContext';
import { useRouteParams } from '../../hooks/useRouteParams';
import SectionTopTabs from '../../components/SectionTopTabs';

/**
 * Note: This component is a bit whack but it's done in this way to prevent re-renders of lists
 * We call the setPersonalCommunityTab function manually WHEN we navigate, instead of calling it inside here
 */
const PredictionTabsNavigator = ({
  onChangeTab,
}: {
  onChangeTab?: (tab: 'personal' | 'community') => void;
}) => {
  const { userId } = useAuth();
  const { setPersonalCommunityTab } = usePersonalCommunityTab();

  // This respects whether commuinty or personal tab is focused first
  const initialTabIndex = userId ? 0 : 1;

  const { userId: authUserId } = useAuth();
  const { userInfo } = useRouteParams();
  const isAuthUser = !userInfo || userInfo?.userId === authUserId;

  return (
    <SectionTopTabs
      tabs={[
        {
          title: isAuthUser ? 'My Predictions' : userInfo?.userName ?? 'User',
          onOpenTab: () => {
            setPersonalCommunityTab('personal');
            onChangeTab && onChangeTab('personal');
          },
        },
        {
          title: 'Community',
          onOpenTab: () => {
            setPersonalCommunityTab('community');
            onChangeTab && onChangeTab('community');
          },
        },
      ]}
      initialTabIndex={initialTabIndex}
    />
  );
};

export default PredictionTabsNavigator;
