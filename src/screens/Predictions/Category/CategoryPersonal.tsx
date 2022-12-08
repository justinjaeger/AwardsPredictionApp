import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { Alert, Animated, View } from 'react-native';
import { iCategoryListProps } from '.';
import BackgroundWrapper from '../../../components/BackgroundWrapper';
import BackButton from '../../../components/Buttons/BackButton';
import { FAB } from '../../../components/Buttons/FAB';
import HeaderButton from '../../../components/HeaderButton';
import LoadingStatueModal from '../../../components/LoadingStatueModal';
import MovieGrid from '../../../components/MovieGrid';
import MovieListDraggable from '../../../components/MovieList/MovieListDraggable';
import SignedOutState from '../../../components/SignedOutState';
import Snackbar from '../../../components/Snackbar';
import { BodyBold } from '../../../components/Text';
import theme from '../../../constants/theme';
import { useCategory } from '../../../context/CategoryContext';
import { useAuth } from '../../../context/UserContext';
import useQueryCommunityOrPersonalEvent from '../../../hooks/getCommunityOrPersonalEvent';
import useMutationUpdatePredictions from '../../../hooks/updatePredictions';
import { PredictionsParamList } from '../../../navigation/types';
import { iCategory, iEvent, iPrediction } from '../../../types';
import { useAsyncReference, useTypedNavigation } from '../../../util/hooks';
import { CategoryHeader } from '../styles';

// NOTE: Has a lot in common with ContenderListDraggable
const CategoryPersonal = (props: iCategoryListProps) => {
  const { display, delayedDisplay, toggleDisplay, gridOpacity, listOpacity } = props;

  const { category: _category, event: _event } = useCategory();
  const { userId: _userId } = useAuth();
  const navigation = useTypedNavigation<PredictionsParamList>();

  const category = _category as iCategory;
  const event = _event as iEvent;
  const userId = _userId as string;

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
  const { data: predictionData, isLoading } = useQueryCommunityOrPersonalEvent(
    'personal',
    !!userId,
    { event, userId },
  );
  const initialPredictions = predictionData ? predictionData[category.id] || [] : [];

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [predictions, setPredictions] = useState<iPrediction[]>(initialPredictions || []);

  // keeps track of whether we've edited the predictions from their initial state
  useEffect(() => {
    const resultIsSame = _.isEqual(
      predictions.map((p) => p.contenderId),
      initialPredictions.map((p) => p.contenderId),
    );
    setIsEditing(!resultIsSame);
  }, [predictions]);

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
      predictionSetParams: { userId, categoryId: category.id, eventId: event.id },
      predictionData: newPredictionData,
    });
  };

  if (isLoading) {
    return null;
  }

  if (!userId) {
    return <SignedOutState />;
  }

  return (
    <>
      <LoadingStatueModal visible={!isComplete} text={'Saving changes...'} />
      <BackgroundWrapper>
        <>
          <CategoryHeader>
            <View style={{ flexDirection: 'row' }}>
              {!isEditing ? (
                <HeaderButton
                  onPress={() => {
                    toggleDisplay();
                  }}
                  icon={display === 'grid' ? 'list' : display === 'list' ? 'grid' : ''}
                />
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
            </View>
            <View style={{ flexDirection: 'row' }}>
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
                icon={'plus'}
              />
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
                {'No predictions yet.\nAdd some!'}
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
              display: delayedDisplay === 'list' ? 'flex' : 'none',
              opacity: listOpacity,
            }}
          >
            <MovieListDraggable
              predictions={predictions}
              setPredictions={(ps) => setPredictions(ps)}
            />
          </Animated.View>
          <FAB
            iconName="save-outline"
            text="Save"
            onPress={onSaveContenders}
            visible={isEditing}
          />
        </>
      </BackgroundWrapper>
    </>
  );
};

export default CategoryPersonal;
