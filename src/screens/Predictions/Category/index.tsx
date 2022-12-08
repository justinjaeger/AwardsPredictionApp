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

export type iListDisplay = 'list' | 'grid' | 'condensed';

export type iCategoryListProps = {
  display: iListDisplay;
  delayedDisplay: iListDisplay;
  toggleDisplay: () => void;
  toggleCondensed: () => void;
  gridOpacity: Animated.Value;
  listOpacity: Animated.Value;
  condensedOpacity: Animated.Value;
};

const Category = () => {
  const gridOpacity = useRef(new Animated.Value(0)).current;
  const listOpacity = useRef(new Animated.Value(0)).current;
  const condensedOpacity = useRef(new Animated.Value(0)).current;

  const { category, event } = useCategory();
  const navigation = useTypedNavigation<PredictionsParamList>();

  const [display, setDisplay] = useState<iListDisplay>('list');
  const [delayedDisplay, setDelayedDisplay] = useState<iListDisplay>('list');

  const toggleCondensed = () => {
    if (display === 'list') setDisplay('condensed');
    if (display === 'condensed') setDisplay('list');
  };

  const toggleDisplay = () => {
    if (display === 'grid') {
      setDisplay('list');
    } else {
      setDisplay('grid');
    }
  };

  useEffect(() => {
    if (display === 'grid') {
      Animated.timing(listOpacity, {
        toValue: 0,
        duration: TIMING,
        useNativeDriver: true,
      }).start();
      Animated.timing(condensedOpacity, {
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
      }, 0);
    }
    if (display === 'list') {
      Animated.timing(gridOpacity, {
        toValue: 0,
        duration: TIMING,
        useNativeDriver: true,
      }).start();
      Animated.timing(condensedOpacity, {
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
      }, 0);
    }
    if (display === 'condensed') {
      Animated.timing(gridOpacity, {
        toValue: 0,
        duration: TIMING,
        useNativeDriver: true,
      }).start();
      Animated.timing(listOpacity, {
        toValue: 0,
        duration: TIMING,
        useNativeDriver: true,
      }).start();
      setTimeout(() => {
        Animated.timing(condensedOpacity, {
          toValue: 1,
          duration: TIMING,
          useNativeDriver: true,
        }).start();
        setDelayedDisplay('condensed');
      }, 0);
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
      toggleCondensed={toggleCondensed}
      gridOpacity={gridOpacity}
      listOpacity={listOpacity}
      condensedOpacity={condensedOpacity}
    />,
    <CategoryPersonal
      display={display}
      delayedDisplay={delayedDisplay}
      toggleDisplay={toggleDisplay}
      toggleCondensed={toggleCondensed}
      gridOpacity={gridOpacity}
      listOpacity={listOpacity}
      condensedOpacity={condensedOpacity}
    />,
  );
};

export default Category;
