import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { Alert, Animated, View } from 'react-native';
import BackButton from '../../../components/Buttons/BackButton';
import { FAB } from '../../../components/Buttons/FAB';
import HeaderButton from '../../../components/HeaderButton';
import LoadingStatueModal from '../../../components/LoadingStatueModal';
import MovieGrid from '../../../components/MovieGrid';
import MovieListDraggable from '../../../components/MovieList/MovieListDraggable';
import SignedOutState from '../../../components/SignedOutState';
import Snackbar from '../../../components/Snackbar';
import { Body, BodyBold } from '../../../components/Text';
import theme from '../../../constants/theme';
import { useCategory } from '../../../context/CategoryContext';
import { useAuth } from '../../../context/UserContext';
import { useCollapsible } from '../../../hooks/animatedState/useCollapsible';
import { useDisplay } from '../../../hooks/animatedState/useDisplay';
import useMutationUpdatePredictions from '../../../hooks/mutations/updatePredictions';
import { PredictionsParamList } from '../../../navigation/types';
import { iCategory, iEvent, iPrediction } from '../../../types';
import {
  useAsyncReference,
  useDeepCompareEffect,
  useTypedNavigation,
} from '../../../util/hooks';
import { CategoryHeader } from '../styles';
import { formatLastUpdated } from '../../../util/formatDateTime';
import usePredictionData from '../../../hooks/queries/usePredictionData';
import HistoryHeader from '../../../components/HistoryHeader';
import { eventStatusToPredictionType } from '../../../constants/events';
import PlusMinus from '../../../assets/icons/plusMinus.svg';
import { EventStatus } from '../../../API';

// NOTE: Has a lot in common with ContenderListDraggable
const CategoryPersonal = () => {
  const {
    display,
    delayedDisplay,
    toggleDisplay,
    gridOpacity,
    listOpacity,
  } = useDisplay();
  const {
    collapsedOpacity,
    expandedOpacity,
    isCollapsed,
    toggleCollapsed,
  } = useCollapsible();

  const { category: _category, event: _event, date } = useCategory();
  const { userId: _userId } = useAuth();
  const navigation = useTypedNavigation<PredictionsParamList>();

  const isHistory = !!date;
  const category = _category as iCategory;
  const event = _event as iEvent;
  const userId = _userId as string;
  const eventIsArchived = event.status === EventStatus.ARCHIVED;

  const [goBackOnComplete, setGoBackOnComplete] = useAsyncReference<boolean>(false);

  const onComplete = () => {
    setIsEditing(false);
    Snackbar.success('Changes saved!');
    if (goBackOnComplete.current) {
      navigation.goBack();
    }
  };

  // We use the SAME KEY as the previous screen, because it avoids a re-fetch of the data which was available previously
  const { mutate, isComplete } = useMutationUpdatePredictions(onComplete);
  const { predictionData, isLoading } = usePredictionData('personal');
  const initialPredictions = predictionData
    ? predictionData[category.id]?.predictions || []
    : [];
  const initialPredictionIds = initialPredictions.map((p) => p.contenderId);

  // get last updated time
  const lastUpdated = predictionData?.[category.id]?.updatedAt;
  const lastUpdatedString = formatLastUpdated(new Date(lastUpdated || ''));

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [_predictions, setPredictions] = useState<iPrediction[]>(
    initialPredictions || [],
  );

  // _predictions is for editing, initialPredictions has the history
  const predictions = isHistory ? initialPredictions : _predictions;
  const predictionIds = predictions.map((p) => p.contenderId);

  // if we go to history, then switch back to current, this will let us see current
  useEffect(() => {
    if (!isHistory) {
      setPredictions(initialPredictions);
    }
  }, [isHistory]);

  // keeps track of whether we've edited the predictions from their initial state
  useDeepCompareEffect(() => {
    // only can edit if not viewing history
    if (!isHistory) {
      const resultIsSame = _.isEqual(predictionIds, initialPredictionIds);
      setIsEditing(!resultIsSame);
    }
  }, [predictionIds]);

  // set custom back arrow functionality
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <BackButton
          onPress={async () => {
            const onGoBack = () => {
              navigation.goBack();
            };
            if (isEditing) {
              setGoBackOnComplete(true);
              onSaveContenders();
            } else {
              onGoBack();
            }
          }}
        />
      ),
    });
  }, [navigation]);

  const onSaveContenders = async () => {
    if (_.isEqual(initialPredictions, predictions)) {
      setIsEditing(false);
      return;
    }
    const newPredictionData = predictions.map((p, i) => ({
      contenderId: p.contenderId,
      ranking: i + 1,
    }));
    mutate({
      predictionSetParams: {
        userId,
        categoryId: category.id,
        eventId: event.id,
        type: eventStatusToPredictionType(event.status),
      },
      predictionData: newPredictionData,
    });
  };

  if (!userId) {
    return <SignedOutState />;
  }

  return (
    <>
      <LoadingStatueModal
        visible={isLoading || !isComplete}
        text={isLoading ? 'Loading Predictions...' : 'Saving changes...'}
      />
      <CategoryHeader>
        <View style={{ flexDirection: 'row' }}>
          {!isEditing ? (
            <>
              <HeaderButton
                onPress={() => {
                  toggleDisplay();
                }}
                icon={display === 'grid' ? 'list' : 'grid'}
              />
            </>
          ) : (
            <HeaderButton
              onPress={() => {
                Alert.alert('Undo recent changes?', '', [
                  {
                    text: 'Cancel',
                    onPress: () => {},
                    style: 'cancel',
                  },
                  {
                    text: 'Undo',
                    onPress: () => {
                      setPredictions(initialPredictions);
                      setIsEditing(false);
                    },
                  },
                ]);
              }}
              icon={'undo'}
            />
          )}
          <Animated.View style={{ opacity: listOpacity }}>
            <HeaderButton
              onPress={toggleCollapsed}
              icon={isCollapsed ? 'collapse' : 'expand'}
            />
          </Animated.View>
        </View>
        <View style={{ flexDirection: 'row' }}>
          {!isHistory && lastUpdatedString !== 'Invalid Date' ? (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Body>{`Updated: ${lastUpdatedString}`}</Body>
            </View>
          ) : null}
          {!isEditing ? (
            // don't allow user to see history while they're in the middle of editing
            <HistoryHeader />
          ) : null}
          {!isHistory && !eventIsArchived ? (
            <HeaderButton
              onPress={() => {
                if (display === 'grid') {
                  toggleDisplay();
                }
                navigation.navigate('AddPredictions', {
                  initialPredictions: predictions,
                  onFinish: (predictions: iPrediction[]) => {
                    setPredictions(predictions);
                  },
                });
              }}
              customIcon={<PlusMinus width={24} height={24} />}
            />
          ) : null}
        </View>
      </CategoryHeader>
      {predictions && predictions.length === 0 ? (
        <View
          style={{
            width: '100%',
            marginTop: 20,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <BodyBold style={{ textAlign: 'center', lineHeight: 30 }}>
            {isHistory
              ? 'No predictions for this date'
              : 'No predictions yet.\nAdd some!'}
          </BodyBold>
        </View>
      ) : null}
      <Animated.ScrollView
        style={{
          display: delayedDisplay === 'grid' ? 'flex' : 'none',
          opacity: gridOpacity,
        }}
        contentContainerStyle={{
          paddingBottom: 100,
          marginTop: theme.windowMargin,
        }}
      >
        <Animated.View style={{ opacity: gridOpacity }}>
          <MovieGrid predictions={predictions} />
        </Animated.View>
      </Animated.ScrollView>
      <Animated.View
        style={{
          opacity: listOpacity,
          display: delayedDisplay === 'list' ? 'flex' : 'none',
        }}
      >
        <Animated.View
          style={{
            display: !isCollapsed ? 'flex' : 'none',
            opacity: expandedOpacity,
          }}
        >
          <MovieListDraggable
            predictions={predictions}
            setPredictions={(ps) => setPredictions(ps)}
          />
        </Animated.View>
        <Animated.View
          style={{
            display: isCollapsed ? 'flex' : 'none',
            opacity: collapsedOpacity,
          }}
        >
          <MovieListDraggable
            predictions={predictions}
            setPredictions={(ps) => setPredictions(ps)}
            isCollapsed
          />
        </Animated.View>
      </Animated.View>
      <FAB
        iconName="save-outline"
        text="Save"
        onPress={onSaveContenders}
        visible={isEditing && !isHistory}
      />
    </>
  );
};

export default CategoryPersonal;
