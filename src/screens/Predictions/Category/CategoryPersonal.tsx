import _ from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, View } from 'react-native';
import MovieListDraggable from '../../../components/MovieList/MovieListDraggable';
import SignedOutState from '../../../components/SignedOutState';
import { BodyBold } from '../../../components/Text';
import { useEvent } from '../../../context/EventContext';
import useMutationUpdatePredictions from '../../../hooks/mutations/useMutationUpdatePredictions';
import { PredictionsParamList } from '../../../navigation/types';
import {
  useNavigateAwayEffect,
  useNavigateToEffect,
  useTypedNavigation,
} from '../../../util/hooks';
import { formatLastUpdated } from '../../../util/formatDateTime';
import { useAuth } from '../../../context/AuthContext';
import { AddPredictionsFab } from '../../../components/Buttons/DisplayFAB';
import EventLink from './EventLink';
import { iPrediction } from '../../../types/api';
import useQueryGetUserPredictions from '../../../hooks/queries/useQueryGetUserPredictions';
import CategorySkeleton from '../../../components/Skeletons/CategorySkeleton';
import { sortPredictions } from '../../../util/sortPredictions';
import ScreenshotMode from '../../../components/Buttons/ScreenshotMode';
import { FAB } from '../../../components/Buttons/FAB';
import { useFollowingBar } from '../../../context/FollowingBarContext';
import useDevice from '../../../util/device';

const EXTRA_BOTTOM_HEIGHT = 70;

// used in both FromProfile and from event
const CategoryPersonal = ({
  userId,
  userImage,
  userName,
  showEventLink,
  onBack,
}: {
  userId: string | undefined;
  userImage?: string | undefined;
  userName?: string | undefined;
  showEventLink?: boolean;
  onBack?: () => void;
}) => {
  const { isPad } = useDevice();
  const animatedBottomButtons = useRef(new Animated.Value(0)).current;
  const { isHidden, setHideAbsolutely } = useFollowingBar();
  useEffect(() => {
    Animated.timing(animatedBottomButtons, {
      toValue: isHidden ? 0 : EXTRA_BOTTOM_HEIGHT,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [isHidden]);

  const { category: _category, event: _event } = useEvent();
  const category = _category!;
  const event = _event!;

  const navigation = useTypedNavigation<PredictionsParamList>();
  const { userId: authUserId } = useAuth();
  const isAuthProfile = userId === authUserId;

  const { data: predictionData, isLoading } = useQueryGetUserPredictions(userId);
  const { createdAt } = predictionData?.categories[category] ?? {};
  const initialPredictions = sortPredictions(
    predictionData?.categories[category]?.predictions ?? [],
  );

  const [predictions, setPredictions] = useState<iPrediction[]>(initialPredictions);
  const [showSave, setShowSave] = useState(false);

  useEffect(() => {
    setHideAbsolutely(showSave);
  }, [showSave]);

  useEffect(() => {
    setPredictions(initialPredictions);
  }, [userId, predictionData !== undefined]);

  useNavigateAwayEffect(() => {
    onBack && onBack();
    onSaveContenders();
  }, []);
  useNavigateToEffect(() => {
    onSaveContenders();
  }, []);

  const [isSaving, setIsSaving] = useState(false);
  // func to fire after we update predictions on db
  const onComplete = () => {
    setIsSaving(false);
    setShowSave(false);
  };
  const onIsSaving = () => {
    setIsSaving(true);
  };
  const { mutate: updatePredictions } = useMutationUpdatePredictions(
    onComplete,
    onIsSaving,
  );

  const onSaveContenders = async (ps?: iPrediction[]) => {
    if (!userId || !isAuthProfile) return;
    const predictionsToSave = ps || predictions;
    const predictionsHaveNotChanged = _.isEqual(
      predictionsToSave.map((p) => p.contenderId),
      initialPredictions.map((p) => p.contenderId),
    );
    if (predictionsHaveNotChanged) return;
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
      {showEventLink ? (
        <EventLink userId={userId} userImage={userImage} userName={userName} />
      ) : null}
      <View style={{ height: '100%' }}>
        <MovieListDraggable
          predictions={predictions}
          setPredictions={(ps) => {
            setShowSave(
              !_.isEqual(
                ps.map((p) => p.contenderId),
                initialPredictions.map((p) => p.contenderId),
              ),
            );
            setPredictions(ps);
          }}
          lastUpdatedString={lastUpdatedString}
          isAuthProfile={isAuthProfile}
          onPressAdd={onPressAdd}
        />
      </View>
      <Animated.View
        style={{
          transform: [{ translateY: animatedBottomButtons }],
        }}
      >
        <ScreenshotMode
          predictions={predictions}
          userId={userId}
          positionFromBottom={EXTRA_BOTTOM_HEIGHT + 10}
        />
        {isAuthProfile ? (
          <AddPredictionsFab
            onPress={onPressAdd}
            positionFromBottom={EXTRA_BOTTOM_HEIGHT + 10}
            positionFromRight={isPad ? 120 : 80}
          />
        ) : null}
      </Animated.View>
      {isAuthProfile && showSave ? (
        <FAB
          iconName="save-outline"
          text="Save"
          onPress={() => {
            onSaveContenders();
          }}
          visible={showSave}
          left
          isLoading={isSaving}
        />
      ) : null}
    </>
  );
};

export default CategoryPersonal;
