import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import MovieListDraggable from '../../../components/MovieList/MovieListDraggable';
import SignedOutState from '../../../components/SignedOutState';
import { BodyBold } from '../../../components/Text';
import { formatLastUpdated } from '../../../util/formatDateTime';
import { useAuth } from '../../../context/AuthContext';
import EventLink from '../../../components/EventLinkButton';
import { iPrediction } from '../../../models';
import CategorySkeleton from '../../../components/Skeletons/CategorySkeleton';
import { sortPredictions } from '../../../util/sortPredictions';
import ScreenshotMode from '../../../components/Buttons/ScreenshotMode';
import { FAB } from '../../../components/Buttons/FAB';
import BottomFABContainer from '../../../components/BottomFABContainer';
import FloatingButton from '../../../components/Buttons/FloatingButton';
import { useRouteParams } from '../../../hooks/useRouteParams';
import { useNavigation } from '@react-navigation/native';
import { PredictionsNavigationProp } from '../../../navigation/types';
import { eventToString } from '../../../util/stringConversions';
import { iSaveContendersResult } from './useSaveContenders';

// used in both FromProfile and from event
const CategoryPersonal = ({
  showEventLink,
  bottomHeight = 0,
  onSaveContenders,
  isSaving,
  showSave,
  predictionData,
  isLoading,
  setShowSave,
  predictionsRef,
}: {
  showEventLink?: boolean;
  bottomHeight?: number;
} & iSaveContendersResult) => {
  const { category: _category, event: _event, userInfo, yyyymmdd } = useRouteParams();
  const category = _category!;
  const event = _event!;

  const navigation = useNavigation<PredictionsNavigationProp>();
  const { userId: authUserId } = useAuth();
  const isAuthProfile = userInfo?.userId === authUserId;

  const { createdAt } = predictionData?.categories[category] ?? {};
  const initialPredictions = sortPredictions(
    predictionData?.categories[category]?.predictions ?? [],
  );

  const [predictions, _setPredictions] = useState<iPrediction[]>(initialPredictions);
  const setPredictions = (ps: iPrediction[]) => {
    _setPredictions(ps);
    predictionsRef.current = ps;
  };

  useEffect(() => {
    setPredictions(initialPredictions);
  }, [userInfo?.userId, !!predictionData]);

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

  const isEditable = isAuthProfile && !yyyymmdd;

  return (
    <>
      {predictions && predictions.length === 0 ? (
        <View
          style={{
            position: 'absolute',
            top: 15,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 20,
          }}
        >
          <BodyBold style={{ textAlign: 'center', lineHeight: 30 }}>
            {'No predictions'}
          </BodyBold>
        </View>
      ) : null}
      <View style={{ width: '100%', height: '100%' }}>
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
      <BottomFABContainer bottom={bottomHeight}>
        {showEventLink ? (
          <EventLink text={eventToString(event.awardsBody, event.year)} />
        ) : null}
        {isEditable ? <FloatingButton onPress={onPressAdd} icon={'plus'} /> : null}
        <ScreenshotMode predictions={predictions} isCommunity={false} />
      </BottomFABContainer>
      <FAB
        iconName="save-outline"
        text="Save"
        onPress={() => {
          onSaveContenders();
        }}
        bottom={bottomHeight}
        visible={showSave && isEditable}
        left
        isLoading={isSaving}
        horizontalOffset={10}
      />
    </>
  );
};

export default CategoryPersonal;
