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

const TIMING = 250;

export type iCategoryListProps = {
  display: 'list' | 'grid';
  toggleDisplay: () => void;
  gridOpacity: Animated.Value;
  listOpacity: Animated.Value;
};

const TabsWrapper = () => {
  const gridOpacity = useRef(new Animated.Value(0)).current;
  const listOpacity = useRef(new Animated.Value(0)).current;

  const { category, event } = useCategory();
  const navigation = useTypedNavigation<PredictionsParamList>();

  const [display, setDisplay] = useState<'list' | 'grid'>('list');

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
      }, TIMING);
    }
  }, [display]);

  // Set the header
  useLayoutEffect(() => {
    if (!category || !event) return;
    const awardsBodyCategories = getAwardsBodyCategories(event.awardsBody, event.year);
    const headerTitle =
      'Best ' + awardsBodyCategories[CategoryName[category.name]]?.name || '';
    navigation.setOptions({
      headerTitle,
    });
  }, [navigation]);

  return PredictionTabsNavigator(
    <CategoryCommunity
      display={display}
      toggleDisplay={toggleDisplay}
      gridOpacity={gridOpacity}
      listOpacity={listOpacity}
    />,
    <CategoryPersonal
      display={display}
      toggleDisplay={toggleDisplay}
      gridOpacity={gridOpacity}
      listOpacity={listOpacity}
    />,
  );
};

export default TabsWrapper;
