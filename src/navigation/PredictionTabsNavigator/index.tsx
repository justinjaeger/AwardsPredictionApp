import React from 'react';
import { usePersonalCommunityTab } from '../../context/PersonalCommunityContext';
import { useAuth } from '../../context/AuthContext';
import { useRouteParams } from '../../hooks/useRouteParams';
import SectionTopTabs from '../../components/SectionTopTabs';

const PredictionTabsNavigator = ({
  onOpenTab,
}: {
  onOpenTab?: (tab: 'personal' | 'community') => void;
}) => {
  const { tabsPosX, personalCommunityTab } = usePersonalCommunityTab();

  const { userId: authUserId } = useAuth();
  const { userInfo } = useRouteParams();
  const isAuthUser = !userInfo || userInfo?.userId === authUserId;

  return (
    <SectionTopTabs
      tabs={[
        {
          title: isAuthUser ? 'My Predictions' : userInfo?.userName ?? 'User',
          onOpenTab: () => onOpenTab?.('personal'),
        },
        { title: 'Community', onOpenTab: () => onOpenTab?.('community') },
      ]}
      tabsPosX={tabsPosX}
      initialTabIndex={personalCommunityTab === 'personal' ? 0 : 1}
    />
  );
};

export default PredictionTabsNavigator;
