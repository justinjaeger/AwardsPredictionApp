import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import MovieListDraggable from '../../../components/MovieList/MovieListDraggable';
import SignedOutState from '../../../components/SignedOutState';
import { BodyBold } from '../../../components/Text';
import useMutationUpdatePredictions from '../../../hooks/mutations/useMutationUpdatePredictions';
import { useNavigateAwayEffect, useNavigateToEffect } from '../../../util/hooks';
import { formatLastUpdated } from '../../../util/formatDateTime';
import { useAuth } from '../../../context/AuthContext';
import EventLink from '../../../components/EventLinkButton';
import { iPrediction } from '../../../types/api';
import useQueryGetUserPredictions from '../../../hooks/queries/useQueryGetUserPredictions';
import CategorySkeleton from '../../../components/Skeletons/CategorySkeleton';
import { sortPredictions } from '../../../util/sortPredictions';
import ScreenshotMode from '../../../components/Buttons/ScreenshotMode';
import { FAB } from '../../../components/Buttons/FAB';
import { useFollowingBar } from '../../../context/FollowingBarContext';
import BottomFABContainer from '../../../components/BottomFABContainer';
import FloatingButton from '../../../components/Buttons/FloatingButton';
import { useRouteParams } from '../../../hooks/useRouteParams';
import { useNavigation } from '@react-navigation/native';
import { PredictionsNavigationProp } from '../../../navigation/types';

// used in both FromProfile and from event
const CategoryPersonal = ({
  showEventLink,
  onBack,
}: {
  showEventLink?: boolean;
  onBack?: () => void;
}) => {
  const { setHideAbsolutely } = useFollowingBar();

  const { category: _category, event: _event, userInfo, yyyymmdd } = useRouteParams();
  const category = _category!;
  const event = _event!;

  const navigation = useNavigation<PredictionsNavigationProp>();
  const { userId: authUserId } = useAuth();
  const isAuthProfile = userInfo?.userId === authUserId;

  const { data: predictionData, isLoading } = useQueryGetUserPredictions({
    userId: userInfo?.userId,
    yyyymmdd,
  });
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
  }, [userInfo?.userId, predictionData !== undefined]);

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
    if (!userInfo?.userId || !isAuthProfile) return;
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
      category,
      eventId: event._id,
      initialPredictions: predictions,
      onFinish: (ps: iPrediction[]) => {
        setPredictions(ps);
        onSaveContenders(ps); // save when you finish adding predictions
      },
    });
  };

  // get last updated time
  const lastUpdatedString = formatLastUpdated(new Date(createdAt || ''));

  if (!userInfo?.userId) {
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
      <BottomFABContainer>
        {showEventLink ? <EventLink /> : null}
        {isAuthProfile ? <FloatingButton onPress={onPressAdd} icon={'plus'} /> : null}
        <ScreenshotMode predictions={predictions} isCommunity={false} />
      </BottomFABContainer>
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
