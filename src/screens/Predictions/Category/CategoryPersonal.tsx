import _ from 'lodash';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Alert, Animated, View } from 'react-native';
import BackButton from '../../../components/Buttons/BackButton';
import LoadingStatueModal from '../../../components/LoadingStatueModal';
import MovieGrid from '../../../components/MovieGrid';
import MovieListDraggable from '../../../components/MovieList/MovieListDraggable';
import SignedOutState from '../../../components/SignedOutState';
import Snackbar from '../../../components/Snackbar';
import { BodyBold } from '../../../components/Text';
import theme from '../../../constants/theme';
import { useEvent } from '../../../context/EventContext';
import useMutationUpdatePredictions from '../../../hooks/mutations/useMutationUpdatePredictions';
import { PredictionsParamList } from '../../../navigation/types';
import { useAsyncReference, useTypedNavigation } from '../../../util/hooks';
import { formatLastUpdated } from '../../../util/formatDateTime';
import { iCategoryProps } from '.';
import LastUpdatedText from '../../../components/LastUpdatedText';
import { useAuth } from '../../../context/AuthContext';
import useDevice from '../../../util/device';
import { AddPredictionsFab } from '../../../components/Buttons/DisplayFAB';
import useShowAddTab from '../../../hooks/useShowAddTab';
import EventLink from './EventLink';
import EditToolbar from '../../../components/Buttons/EditToolbar';
import { iPrediction } from '../../../types/api';
import useQueryGetUserPredictions from '../../../hooks/queries/useQueryGetUserPredictions';

// used in both FromProfile and from event
const CategoryPersonal = ({
  collapsedOpacity,
  expandedOpacity,
  delayedDisplay,
  gridOpacity,
  userId,
  predictionData,
  isLoading,
  showEventLink,
}: iCategoryProps) => {
  const { category: _category, event: _event, isEditing, setIsEditing } = useEvent();
  const category = _category!;
  const event = _event!;
  const navigation = useTypedNavigation<PredictionsParamList>();
  const { userId: authUserId } = useAuth();
  const { isPad } = useDevice();
  const { animatedOpacity } = useShowAddTab();

  const isAuthUserProfile = userId === authUserId;

  const [goBackOnComplete, setGoBackOnComplete] = useAsyncReference<boolean>(false);

  // func to fire after we update predictions on db
  const onComplete = () => {
    setIsEditing(false);
    Snackbar.success('Changes saved!');
    if (goBackOnComplete.current) {
      navigation.goBack();
    }
  };
  const { mutate: updatePredictions, isComplete } =
    useMutationUpdatePredictions(onComplete);

  // get the initialPredictions and updatedPredictions
  const { data: predictionSet } = useQueryGetUserPredictions(userId);
  const { createdAt } = predictionSet?.categories[category] || {};
  const initialPredictions = predictionData?.categories[category]?.predictions ?? [];

  const [predictions, setPredictions] = useState<iPrediction[]>(initialPredictions);

  useEffect(() => {
    setPredictions(initialPredictions);
  }, [userId]);

  // set custom back arrow functionality & hide history button when editing
  useLayoutEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/no-unstable-nested-components
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
  }, [navigation, isEditing]);

  const onSaveContenders = async (ps?: iPrediction[]) => {
    const predictionsToSave = ps || predictions;
    if (!userId) return;
    if (_.isEqual(initialPredictions, predictionsToSave)) {
      setIsEditing(false);
      return;
    }
    updatePredictions({
      categoryName: category,
      eventId: event._id,
      predictions: predictionsToSave,
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
            {'No predictions'}
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
          <LastUpdatedText lastUpdated={lastUpdatedString} style={{ top: -35 }} />
          <MovieGrid predictions={predictions} />
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
          isAuthProfile={isAuthUserProfile}
          onPressAdd={onPressAdd}
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

export default CategoryPersonal;
