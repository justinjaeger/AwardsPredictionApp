import React, { useEffect, useLayoutEffect, useState } from 'react';
import CategoryPersonal from './CategoryPersonal';
import { useTypedNavigation } from '../../../util/hooks';
import { PredictionsParamList } from '../../../navigation/types';
import { getAwardsBodyCategories } from '../../../constants/categories';
import { CategoryName } from '../../../API';
import { useCategory } from '../../../context/CategoryContext';
import { eventToString } from '../../../util/stringConversions';
import { getHeaderTitleWithTrophy } from '../../../constants';
import { useCollapsible } from '../../../hooks/animatedState/useCollapsible';
import { iListDisplay, useDisplay } from '../../../hooks/animatedState/useDisplay';
import { Animated, View } from 'react-native';
import DisplayFAB from '../../../components/Buttons/DisplayFAB';
import { iEvent } from '../../../types';
import { useAuth } from '../../../context/UserContext';
import { RouteProp, useRoute } from '@react-navigation/native';
import { BodyBold } from '../../../components/Text';
import BackgroundWrapper from '../../../components/BackgroundWrapper';
import useQueryGetUser from '../../../hooks/queries/getUser';
import HistoryTab from '../../../components/HistoryTab';

export type iCategoryProps = {
  collapsedOpacity: Animated.Value;
  expandedOpacity: Animated.Value;
  isCollapsed: boolean;
  delayedDisplay: iListDisplay;
  listOpacity: Animated.Value;
  gridOpacity: Animated.Value;
  userId: string | undefined;
};

const Category = () => {
  const { params } = useRoute<RouteProp<PredictionsParamList, 'Category'>>();
  const { userId: authUserId } = useAuth();
  const userId = params?.userId || authUserId;

  const { data } = useQueryGetUser(userId);
  const username = data?.username || 'user';

  const { category, event: _event } = useCategory();
  const navigation = useTypedNavigation<PredictionsParamList>();
  const {
    collapsedOpacity,
    expandedOpacity,
    isCollapsed,
    setIsCollapsed,
  } = useCollapsible();
  const { delayedDisplay, setDisplay, gridOpacity, listOpacity } = useDisplay();

  const event = _event as iEvent;

  const props: iCategoryProps = {
    collapsedOpacity,
    expandedOpacity,
    isCollapsed,
    delayedDisplay,
    gridOpacity,
    listOpacity,
    userId,
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
      if (toggleIndex === 1) {
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

  // TODO: History is always open in archived state
  return (
    <>
      <DisplayFAB state={toggleState[toggleIndex]} toggleDisplay={toggle} />
      <BackgroundWrapper>
        <>
          <BodyBold>{`${username}'s predictions`}</BodyBold>
          <View style={{ zIndex: 2, width: '100%' }}>
            <HistoryTab />
          </View>
          <CategoryPersonal {...props} />
        </>
      </BackgroundWrapper>
    </>
  );
};

export default Category;