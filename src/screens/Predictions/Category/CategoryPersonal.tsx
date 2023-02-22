import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { Animated, View } from 'react-native';
import BackButton from '../../../components/Buttons/BackButton';
import { FAB } from '../../../components/Buttons/FAB';
import LoadingStatueModal from '../../../components/LoadingStatueModal';
import MovieGrid from '../../../components/MovieGrid';
import MovieListDraggable from '../../../components/MovieList/MovieListDraggable';
import SignedOutState from '../../../components/SignedOutState';
import Snackbar from '../../../components/Snackbar';
import { BodyBold } from '../../../components/Text';
import theme from '../../../constants/theme';
import { useCategory } from '../../../context/CategoryContext';
import useMutationUpdatePredictions from '../../../hooks/mutations/updatePredictions';
import { PredictionsParamList } from '../../../navigation/types';
import { iCategory, iEvent, iPrediction } from '../../../types';
import {
  useAsyncReference,
  useDeepCompareEffect,
  useTypedNavigation,
} from '../../../util/hooks';
import { formatLastUpdated } from '../../../util/formatDateTime';
import { eventStatusToPredictionType } from '../../../constants/events';
import { iCategoryProps } from '.';
import LastUpdatedText from '../../../components/LastUpdatedText';
import HistoryHeaderButton from '../../../components/Buttons/HistoryHeaderButton';
import { useAuth } from '../../../context/UserContext';

const CategoryPersonal = ({
  collapsedOpacity,
  expandedOpacity,
  isCollapsed,
  delayedDisplay,
  gridOpacity,
  listOpacity,
  userId,
  predictionData,
  isLoading,
}: iCategoryProps) => {
  const { category: _category, event: _event, date } = useCategory();
  const navigation = useTypedNavigation<PredictionsParamList>();
  const { userId: authUserId } = useAuth();

  const isFriendProfile = userId !== authUserId;

  const isHistory = !!date;
  const category = _category as iCategory;
  const event = _event as iEvent;

  const [goBackOnComplete, setGoBackOnComplete] = useAsyncReference<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <HistoryHeaderButton isDisabled={!!isEditing} />,
    });
  }, [isEditing]);

  const onComplete = () => {
    setIsEditing(false);
    Snackbar.success('Changes saved!');
    if (goBackOnComplete.current) {
      navigation.goBack();
    }
  };

  // We use the SAME KEY as the previous screen, because it avoids a re-fetch of the data which was available previously
  const { mutate: updatePredictions, isComplete } = useMutationUpdatePredictions(
    onComplete,
  );
  const initialPredictions = predictionData
    ? predictionData[category.id]?.predictions || []
    : [];
  const initialPredictionIds = initialPredictions.map((p) => p.contenderId);

  // get last updated time
  const lastUpdated = predictionData?.[category.id]?.updatedAt;
  const lastUpdatedString = formatLastUpdated(new Date(lastUpdated || ''));

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
    if (!userId) return;
    if (_.isEqual(initialPredictions, predictions)) {
      setIsEditing(false);
      return;
    }
    const newPredictionData = predictions.map((p, i) => ({
      contenderId: p.contenderId,
      ranking: i + 1,
    }));
    const predictionType = eventStatusToPredictionType(event.status);
    updatePredictions({
      predictionSetParams: {
        userId,
        categoryId: category.id,
        eventId: event.id,
        type: predictionType,
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
            {isHistory ? 'No predictions for this date' : 'No predictions'}
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
          <LastUpdatedText
            lastUpdated={lastUpdatedString}
            isDisabled={isHistory}
            style={{ top: -30 }}
          />
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
            lastUpdatedString={lastUpdatedString}
            isFriendProfile={isFriendProfile}
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
            lastUpdatedString={lastUpdatedString}
            isCollapsed
            isFriendProfile={isFriendProfile}
          />
        </Animated.View>
      </Animated.View>
      <FAB
        iconName="save-outline"
        text="Save"
        onPress={onSaveContenders}
        visible={isEditing && !isHistory}
      />
      <FAB
        iconName="undo"
        text="Undo"
        horizontalOffset={120}
        onPress={() => {
          setPredictions(initialPredictions);
        }}
        visible={isEditing && !isHistory}
      />
    </>
  );
};

export default CategoryPersonal;
