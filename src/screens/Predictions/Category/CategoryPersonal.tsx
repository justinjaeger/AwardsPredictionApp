import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { Alert, Animated, View } from 'react-native';
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
import useDevice from '../../../util/device';
import { AddPredictionsFab } from '../../../components/Buttons/DisplayFAB';
import useShowAddTab from '../../../hooks/useShowAddTab';
import EventLink from './EventLink';

const CategoryPersonal = ({
  collapsedOpacity,
  expandedOpacity,
  delayedDisplay,
  gridOpacity,
  userId,
  predictionData,
  isLoading,
  showEventLink,
  allIsLoading, // this also disables editing while true
}: iCategoryProps) => {
  const {
    category: _category,
    event: _event,
    date,
    setIsEditing: contextSetIsEditing,
  } = useCategory();
  const navigation = useTypedNavigation<PredictionsParamList>();
  const { userId: authUserId } = useAuth();
  const { isPad } = useDevice();

  const isAuthUserProfile = userId === authUserId;

  const { animatedOpacity } = useShowAddTab();

  const isHistory = !!date;
  const category = _category as iCategory;
  const event = _event as iEvent;

  const [goBackOnComplete, setGoBackOnComplete] = useAsyncReference<boolean>(false);
  const [isEditing, localSetIsEditing] = useState<boolean>(false);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <HistoryHeaderButton isDisabled={isEditing} />,
    });
  }, [isEditing]);

  // updates for context so the friend bar can go away and buttons can appear at bottom
  const setIsEditing = (v: boolean) => {
    localSetIsEditing(v);
    contextSetIsEditing(v);
  };

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
    isAuthUserProfile,
  );
  const initialPredictions = predictionData?.[category.id]?.predictions || [];
  const initialPredictionIds = initialPredictions.map((p) => p.contenderId);

  // get last updated time
  const lastUpdated = predictionData?.[category.id]?.updatedAt;
  const lastUpdatedString = formatLastUpdated(new Date(lastUpdated || ''));

  const [_predictions, setPredictions] = useState<iPrediction[]>(
    initialPredictions || [],
  );

  // _predictions is for editing, initialPredictions has the history. History is disallowed if editing, so this isn't a problem
  const predictions = isHistory ? initialPredictions : _predictions;
  const predictionIds = predictions.map((p) => p.contenderId);

  // if we go to history, then switch back to current, this will let us see current
  useEffect(() => {
    if (!isHistory) {
      setPredictions(initialPredictions);
    }
  }, [isHistory]);

  // when predictionData changes, should update. When we're coming from a profile this is necessary
  useEffect(() => {
    setPredictions(initialPredictions);
  }, [initialPredictions.length]);

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

  const onSaveContenders = async (ps?: iPrediction[]) => {
    const predictionsToSave = ps || predictions;
    if (!userId) return;
    if (_.isEqual(initialPredictions, predictionsToSave)) {
      setIsEditing(false);
      return;
    }
    const newPredictionData = predictionsToSave.map((p, i) => ({
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

  const onPressAdd = () => {
    navigation.navigate('AddPredictions', {
      initialPredictions: predictions,
      onFinish: (ps: iPrediction[]) => {
        setPredictions(ps);
        onSaveContenders(ps); // save when you finish adding predictions
      },
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
      {!isLoading && predictions && predictions.length === 0 ? (
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
      {showEventLink ? <EventLink userId={userId} /> : null}
      <Animated.ScrollView
        style={{
          display: delayedDisplay === 'grid' ? 'flex' : 'none',
          opacity: gridOpacity,
        }}
        contentContainerStyle={{
          paddingBottom: 100,
          marginTop: theme.windowMargin,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={{ opacity: gridOpacity }}>
          <LastUpdatedText
            lastUpdated={lastUpdatedString}
            isDisabled={isHistory}
            style={{ top: -35 }}
          />
          <MovieGrid predictions={predictions} allIsLoading={allIsLoading} />
        </Animated.View>
      </Animated.ScrollView>
      <Animated.View
        style={{
          display: delayedDisplay === 'list' ? 'flex' : 'none',
          opacity: expandedOpacity,
        }}
      >
        <MovieListDraggable
          predictions={predictions}
          setPredictions={(ps) => setPredictions(ps)}
          lastUpdatedString={lastUpdatedString}
          isAuthProfile={isAuthUserProfile}
          onPressAdd={onPressAdd}
          allIsLoading={allIsLoading}
        />
      </Animated.View>
      <Animated.View
        style={{
          display: delayedDisplay === 'list-collapsed' ? 'flex' : 'none',
          opacity: collapsedOpacity,
        }}
      >
        <MovieListDraggable
          predictions={predictions}
          setPredictions={(ps) => setPredictions(ps)}
          lastUpdatedString={lastUpdatedString}
          isCollapsed
          isAuthProfile={isAuthUserProfile}
          onPressAdd={onPressAdd}
          allIsLoading={allIsLoading}
        />
      </Animated.View>
      {isPad ? (
        <Animated.View
          style={{
            opacity: animatedOpacity,
            position: 'absolute',
            bottom: '1%',
            alignSelf: 'flex-end',
          }}
        >
          <AddPredictionsFab onPress={onPressAdd} />
        </Animated.View>
      ) : null}
      <FAB
        iconName="save-outline"
        text="Save"
        onPress={onSaveContenders}
        visible={isEditing && !isHistory}
      />
      <FAB
        iconName="undo"
        text="Undo"
        horizontalOffset={120 * (isPad ? 2 : 1)}
        onPress={() => {
          Alert.alert('Undo Changes?', 'Reverts all changes since last saved', [
            {
              text: 'Cancel',
              onPress: () => {},
              style: 'cancel',
            },
            {
              text: 'Yes',
              onPress: () => setPredictions(initialPredictions),
            },
          ]);
        }}
        visible={isEditing && !isHistory}
      />
    </>
  );
};

export default CategoryPersonal;
