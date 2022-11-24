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
import { Body, BodyLarge } from '../../../components/Text';
import theme from '../../../constants/theme';
import { useCategory } from '../../../context/CategoryContext';
import { useAuth } from '../../../context/UserContext';
import useQueryCommunityOrPersonalEvent from '../../../hooks/getCommunityOrPersonalEvent';
import useMutationUpdatePredictions from '../../../hooks/updatePredictions';
import { PredictionsParamList } from '../../../navigation/types';
import { iCategory, iEvent, iPrediction } from '../../../store/types';
import { useTypedNavigation } from '../../../util/hooks';
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

  // We use the SAME KEY as the previous screen, because it avoids a re-fetch of the data which was available previously
  const { mutate, isComplete } = useMutationUpdatePredictions();
  const { data: predictionData, isLoading } = useQueryCommunityOrPersonalEvent(
    'personal',
    event,
    userId,
  );
  const initialPredictions = (predictionData || {})[category.id];

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [predictions, setPredictions] = useState<iPrediction[]>(initialPredictions || []);

  // when mutation is complete, this block runs
  useEffect(() => {
    if (isComplete) {
      setIsEditing(false);
    }
  }, [isComplete]);

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
          onPress={() => {
            const onGoBack = () => {
              navigation.goBack();
            };
            if (isEditing) {
              Alert.alert('Go back without saving?', '', [
                {
                  text: 'Cancel',
                  onPress: () => {},
                  style: 'cancel',
                },
                { text: 'Go Back', onPress: onGoBack },
              ]);
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
    <BackgroundWrapper>
      <Body>You must sign in to make predictions</Body>
    </BackgroundWrapper>;
  }

  return (
    <>
      <LoadingStatueModal visible={!isComplete} text={'Saving changes...'} />
      <BackgroundWrapper>
        <View
          style={{
            height: '100%',
            width: '100%',
            alignItems: 'center',
          }}
        >
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
          {predictions && predictions.length === 0 ? (
            <View
              style={{
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <BodyLarge>No films in this list</BodyLarge>
            </View>
          ) : null}
          <FAB
            iconName="checkmark"
            text="Save"
            onPress={onSaveContenders}
            visible={isEditing}
          />
        </View>
      </BackgroundWrapper>
    </>
  );
};

export default CategoryPersonal;
