import _ from 'lodash';
import React, { memo, useEffect, useLayoutEffect, useState } from 'react';
import { Alert, Animated, View } from 'react-native';
import BackButton from '../../../components/Buttons/BackButton';
import LoadingStatueModal from '../../../components/LoadingStatueModal';
import MovieListDraggable from '../../../components/MovieList/MovieListDraggable';
import SignedOutState from '../../../components/SignedOutState';
import Snackbar from '../../../components/Snackbar';
import { BodyBold } from '../../../components/Text';
import { useEvent } from '../../../context/EventContext';
import useMutationUpdatePredictions from '../../../hooks/mutations/useMutationUpdatePredictions';
import { PredictionsParamList } from '../../../navigation/types';
import { useAsyncReference, useTypedNavigation } from '../../../util/hooks';
import { formatLastUpdated } from '../../../util/formatDateTime';
import { useAuth } from '../../../context/AuthContext';
import useDevice from '../../../util/device';
import { AddPredictionsFab } from '../../../components/Buttons/DisplayFAB';
import useShowAddTab from '../../../hooks/useShowAddTab';
import EventLink from './EventLink';
import EditToolbar from '../../../components/Buttons/EditToolbar';
import { iPrediction } from '../../../types/api';
import useQueryGetUserPredictions from '../../../hooks/queries/useQueryGetUserPredictions';
import CategorySkeleton from '../../../components/Skeletons/CategorySkeleton';
import { sortPredictions } from '../../../util/sortPredictions';

// used in both FromProfile and from event
const CategoryPersonal = ({
  userId,
  showEventLink,
  onBack,
}: {
  userId: string | undefined;
  showEventLink?: boolean;
  onBack?: () => void;
}) => {
  const { category: _category, event: _event, isEditing, setIsEditing } = useEvent();
  const category = _category!;
  const event = _event!;

  const navigation = useTypedNavigation<PredictionsParamList>();
  const { userId: authUserId } = useAuth();
  const { isPad } = useDevice();
  const { animatedOpacity: showAddTabOpacity } = useShowAddTab();
  const isAuthUserProfile = userId === authUserId;

  const { data: predictionData, isLoading } = useQueryGetUserPredictions(userId);
  const { createdAt } = predictionData?.categories[category] || {};
  const initialPredictions = sortPredictions(
    predictionData?.categories[category]?.predictions ?? [],
  );

  const [predictions, setPredictions] = useState<iPrediction[]>(initialPredictions);
  const [goBackOnComplete, setGoBackOnComplete] = useAsyncReference<boolean>(false);

  // TODO: this isn't working because we can't set useLayoutEffect here AND in CategoryCommunity
  const goBack = () => {
    onBack && onBack();
    navigation.goBack();
  };

  useEffect(() => {
    setPredictions(initialPredictions);
  }, [userId]);

  // func to fire after we update predictions on db
  const onComplete = () => {
    setIsEditing(false);
    Snackbar.success('Changes saved!');
    if (goBackOnComplete.current) {
      goBack();
    }
  };
  const { mutate: updatePredictions, isComplete } =
    useMutationUpdatePredictions(onComplete);

  const predictionsHaveNotChanged = _.isEqual(predictions, initialPredictions);
  useEffect(() => {
    setIsEditing(!predictionsHaveNotChanged);
  }, [predictionsHaveNotChanged]);

  // set custom back arrow functionality & hide history button when editing
  useLayoutEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/no-unstable-nested-components
      headerLeft: () => (
        <BackButton
          onPress={async () => {
            if (isEditing) {
              setGoBackOnComplete(true);
              onSaveContenders();
            } else {
              goBack();
            }
          }}
        />
      ),
    });
  }, [navigation, isEditing]);

  const onSaveContenders = async (ps?: iPrediction[]) => {
    const predictionsToSave = ps || predictions;
    if (!userId) return;
    if (_.isEqual(initialPredictions, predictionsToSave)) {
      setIsEditing(false);
      return;
    }
    // set then rankings according to INSERTION ORDER
    const orderedPredictions: iPrediction[] = predictionsToSave.map((p, i) => ({
      ...p,
      ranking: i + 1,
    }));
    await updatePredictions({
      categoryName: category,
      eventId: event._id,
      predictions: orderedPredictions,
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

  // get last updated time
  const lastUpdatedString = formatLastUpdated(new Date(createdAt || ''));

  if (!userId) {
    return <SignedOutState />;
  }

  if (isLoading) {
    return <CategorySkeleton />;
  }
  return (
    <>
      <LoadingStatueModal visible={!isComplete} text={'Saving changes...'} />
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
            {'No predictions'}
          </BodyBold>
        </View>
      ) : null}
      {showEventLink ? <EventLink userId={userId} /> : null}
      <MovieListDraggable
        predictions={predictions}
        setPredictions={(ps) => setPredictions(ps)}
        lastUpdatedString={lastUpdatedString}
        isAuthProfile={isAuthUserProfile}
        onPressAdd={onPressAdd}
      />
      {isPad ? (
        <Animated.View
          style={{
            opacity: showAddTabOpacity,
            position: 'absolute',
            bottom: '1%',
            alignSelf: 'flex-end',
          }}
        >
          <AddPredictionsFab onPress={onPressAdd} />
        </Animated.View>
      ) : null}
      <EditToolbar
        visible={isEditing}
        buttons={[
          {
            text: 'Undo',
            iconName: 'undo',
            onPress: () => {
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
            },
          },
          {
            text: 'Add',
            iconName: 'plus',
            onPress: () => onPressAdd(),
          },
          {
            text: 'Save',
            iconName: 'save-outline',
            onPress: () => onSaveContenders(),
          },
        ]}
      />
    </>
  );
};

export default memo(CategoryPersonal);
