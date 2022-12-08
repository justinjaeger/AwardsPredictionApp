import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import PredictionTabsNavigator from '../../../navigation/PredictionTabsNavigator';
import CategoryCommunity from './CategoryCommunity';
import CategoryPersonal from './CategoryPersonal';
import { Animated } from 'react-native';
import { useTypedNavigation } from '../../../util/hooks';
import { PredictionsParamList } from '../../../navigation/types';
import { getAwardsBodyCategories } from '../../../constants/categories';
import { CategoryName } from '../../../API';
import { useCategory } from '../../../context/CategoryContext';
import { eventToString } from '../../../util/stringConversions';
import { getHeaderTitleWithTrophy } from '../../../constants';

const TIMING = 250;

export type iCategoryListProps = {
  display: 'list' | 'grid';
  delayedDisplay: 'list' | 'grid';
  toggleDisplay: () => void;
  gridOpacity: Animated.Value;
  listOpacity: Animated.Value;
};

const Category = () => {
  const gridOpacity = useRef(new Animated.Value(0)).current;
  const listOpacity = useRef(new Animated.Value(0)).current;

  const { category, event } = useCategory();
  const navigation = useTypedNavigation<PredictionsParamList>();

  const [display, setDisplay] = useState<'list' | 'grid'>('list');
  const [delayedDisplay, setDelayedDisplay] = useState<'list' | 'grid'>('list');

  const toggleDisplay = () => {
    if (display === 'list') setDisplay('grid');
    if (display === 'grid') setDisplay('list');
  };

  useEffect(() => {
    if (display === 'grid') {
      Animated.timing(listOpacity, {
        toValue: 0,
        duration: TIMING,
        useNativeDriver: true,
      }).start();
      setTimeout(() => {
        Animated.timing(gridOpacity, {
          toValue: 1,
          duration: TIMING,
          useNativeDriver: true,
        }).start();
        setDelayedDisplay('grid');
      }, TIMING);
    }
    if (display === 'list') {
      Animated.timing(gridOpacity, {
        toValue: 0,
        duration: TIMING,
        useNativeDriver: true,
      }).start();
      setTimeout(() => {
        Animated.timing(listOpacity, {
          toValue: 1,
          duration: TIMING,
          useNativeDriver: true,
        }).start();
        setDelayedDisplay('list');
      }, TIMING);
    }
  }, [display]);

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

  return PredictionTabsNavigator(
    <CategoryCommunity
      display={display}
      delayedDisplay={delayedDisplay}
      toggleDisplay={toggleDisplay}
      gridOpacity={gridOpacity}
      listOpacity={listOpacity}
    />,
    <CategoryPersonal
      display={display}
      delayedDisplay={delayedDisplay}
      toggleDisplay={toggleDisplay}
      gridOpacity={gridOpacity}
      listOpacity={listOpacity}
    />,
  );
};

export default Category;
