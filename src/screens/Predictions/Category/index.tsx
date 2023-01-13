import React, { useEffect, useLayoutEffect, useState } from 'react';
import PredictionTabsNavigator from '../../../navigation/PredictionTabsNavigator';
import CategoryCommunity from './CategoryCommunity';
import CategoryPersonal from './CategoryPersonal';
import { useTypedNavigation } from '../../../util/hooks';
import { PredictionsParamList } from '../../../navigation/types';
import { getAwardsBodyCategories } from '../../../constants/categories';
import { CategoryName, EventStatus } from '../../../API';
import { useCategory } from '../../../context/CategoryContext';
import { eventToString } from '../../../util/stringConversions';
import { getHeaderTitleWithTrophy } from '../../../constants';
import { useCollapsible } from '../../../hooks/animatedState/useCollapsible';
import HistoryFAB from '../../../components/Buttons/HistoryFAB';
import { iListDisplay, useDisplay } from '../../../hooks/animatedState/useDisplay';
import { Animated } from 'react-native';
import DisplayFAB from '../../../components/Buttons/DisplayFAB';
import { iEvent } from '../../../types';

export type iCategoryProps = {
  collapsedOpacity: Animated.Value;
  expandedOpacity: Animated.Value;
  isCollapsed: boolean;
  delayedDisplay: iListDisplay;
  listOpacity: Animated.Value;
  gridOpacity: Animated.Value;
};

const Category = () => {
  const { category, event: _event, date, personalCommunityTab } = useCategory();
  const navigation = useTypedNavigation<PredictionsParamList>();
  const {
    collapsedOpacity,
    expandedOpacity,
    isCollapsed,
    setIsCollapsed,
  } = useCollapsible();
  const { delayedDisplay, setDisplay, gridOpacity, listOpacity } = useDisplay();

  const event = _event as iEvent;
  const isHistory = !!date;
  const eventIsArchived = event.status === EventStatus.ARCHIVED;

  const props: iCategoryProps = {
    collapsedOpacity,
    expandedOpacity,
    isCollapsed,
    delayedDisplay,
    gridOpacity,
    listOpacity,
  };

  // Set the header
  useLayoutEffect(() => {
    if (!category || !event) return;
    const awardsBodyCategories = getAwardsBodyCategories(event.awardsBody, event.year);
    const eventName = eventToString(event.awardsBody, event.year);
    const categoryName = awardsBodyCategories[CategoryName[category.name]]?.name || '';
    const headerTitle = eventName + '\n' + 'Best ' + categoryName;
    navigation.setOptions({
      headerTitle: getHeaderTitleWithTrophy(headerTitle, event.awardsBody),
    });
  }, [navigation]);

  const [toggleIndex, setToggleIndex] = useState(0);

  const toggleState: ('list' | 'list-collapsed' | 'grid')[] = [
    'list',
    'list-collapsed',
    'grid',
  ];

  const toggle = () => {
    if (toggleIndex === toggleState.length - 1) {
      setToggleIndex(0);
    } else {
      // if we're editing, we don't want to toggle to grid
      if (isEditing && toggleIndex === 1) {
        setToggleIndex(0);
      }
      setToggleIndex(toggleIndex + 1);
    }
  };

  // TODO: see how this is weird? could refactor to combine useCollapsible and useDisplay
  useEffect(() => {
    if (toggleState[toggleIndex] === 'list') {
      setDisplay('list');
      setIsCollapsed(false);
    } else if (toggleState[toggleIndex] === 'list-collapsed') {
      setDisplay('list');
      setIsCollapsed(true);
    } else if (toggleState[toggleIndex] === 'grid') {
      setDisplay('grid');
    }
  }, [toggleIndex]);

  const [isEditing, setIsEditing] = useState<boolean>(false);

  return (
    <>
      <DisplayFAB state={toggleState[toggleIndex]} toggleDisplay={toggle} />
      {!isHistory && !eventIsArchived && personalCommunityTab === 'personal' ? (
        <DisplayFAB state={toggleState[toggleIndex]} toggleDisplay={toggle} />
      ) : null}
      {!isEditing ? <HistoryFAB /> : null}
      {PredictionTabsNavigator(
        <CategoryCommunity {...props} />,
        <CategoryPersonal {...props} isEditing={isEditing} setIsEditing={setIsEditing} />,
      )}
    </>
  );
};

export default Category;
