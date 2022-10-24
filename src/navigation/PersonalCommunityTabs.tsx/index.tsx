import React, { useEffect, useState } from 'react';
import { BottomNavigation, BottomNavigationTab } from '@ui-kitten/components';
import { useCategory } from '../../context/CategoryContext';

const PersonalCommunityTabs = () => {
  const { setPersonalCommunityTab } = useCategory();

  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (selectedIndex === 0) setPersonalCommunityTab('community');
    if (selectedIndex === 1) setPersonalCommunityTab('personal');
  }, [selectedIndex]);

  return (
    <BottomNavigation
      selectedIndex={selectedIndex}
      onSelect={(index) => {
        setSelectedIndex(index);
      }}
    >
      <BottomNavigationTab title="Community" />
      <BottomNavigationTab title="Personal" />
    </BottomNavigation>
  );
};

export default PersonalCommunityTabs;
