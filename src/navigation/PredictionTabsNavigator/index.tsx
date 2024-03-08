import React from 'react';
import { usePersonalCommunityTab } from '../../context/PersonalCommunityContext';
import { useAuth } from '../../context/AuthContext';
import { useRouteParams } from '../../hooks/useRouteParams';
import SectionTopTabs from '../../components/SectionTopTabs';

const PredictionTabsNavigator = ({
  onChangeTab,
  initialTabIndex,
}: {
  onChangeTab?: (tab: 'personal' | 'community') => void;
  // whatever is passed as initial tab gets rendered as the current tab
  // useful for showing community predictions when the user is signed out
  // but also caution: we don't want to override the preservation of the usePersonalCommunityTab state, which it will default to when this is undefined
  initialTabIndex?: number;
}) => {
  const { personalCommunityTab, setPersonalCommunityTab } = usePersonalCommunityTab();

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
      initialTabIndex={initialTabIndex ?? personalCommunityTab === 'personal' ? 0 : 1}
    />
  );
};

export default PredictionTabsNavigator;
