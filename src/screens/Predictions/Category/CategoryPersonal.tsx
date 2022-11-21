import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { Alert, Animated, View } from 'react-native';
import {
  NestableDraggableFlatList,
  ScaleDecorator,
  NestableScrollContainer,
} from 'react-native-draggable-flatlist';
import { iCategoryListProps } from '.';
import BackgroundWrapper from '../../../components/BackgroundWrapper';
import BackButton from '../../../components/Buttons/BackButton';
import HeaderButton from '../../../components/HeaderButton';
import ContenderListItem from '../../../components/List/ContenderList/ContenderListItem';
import LoadingStatueModal from '../../../components/LoadingStatueModal';
import MovieGrid from '../../../components/MovieGrid';
import { Body, BodyLarge } from '../../../components/Text';
import { PosterSize } from '../../../constants/posterDimensions';
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

  const { category: _category, displayContenderInfo, event: _event } = useCategory();
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
  const [selectedContenderId, setSelectedContenderId] = useState<string | undefined>();
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
            display: 'flex',
            height: '100%',
            width: '100%',
            alignItems: 'center',
          }}
        >
          <CategoryHeader
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
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
              {isEditing ? (
                <HeaderButton onPress={() => onSaveContenders()} icon={'save'} />
              ) : null}
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
          {/* @ts-ignore not actually broken */}
          <NestableScrollContainer
            style={{ height: '100%' }}
            contentContainerStyle={{ paddingBottom: 100 }}
          >
            {delayedDisplay === 'grid' ? (
              <Animated.View style={{ opacity: gridOpacity }}>
                <MovieGrid predictions={predictions} />
              </Animated.View>
            ) : delayedDisplay === 'list' ? (
              <Animated.View style={{ opacity: listOpacity }}>
                <NestableDraggableFlatList
                  data={predictions}
                  keyExtractor={(item) => item.contenderId}
                  contentContainerStyle={{
                    paddingBottom: PosterSize.SMALL,
                    paddingTop: theme.windowMargin,
                  }}
                  renderItem={({ item: prediction, index, drag, isActive }) => (
                    <ScaleDecorator activeScale={0.9}>
                      <ContenderListItem
                        variant={'personal'}
                        prediction={prediction}
                        ranking={(index || 0) + 1}
                        selected={selectedContenderId === prediction.contenderId}
                        onPressItem={(item) => {
                          const id = item.contenderId;
                          if (selectedContenderId === id) {
                            setSelectedContenderId(undefined);
                          } else {
                            setSelectedContenderId(id);
                          }
                        }}
                        onPressThumbnail={(prediction) =>
                          displayContenderInfo(
                            prediction.contenderId,
                            prediction.contenderPerson?.tmdbId,
                          )
                        }
                        draggable={{
                          drag,
                          isActive,
                        }}
                      />
                    </ScaleDecorator>
                  )}
                  onDragEnd={({ data }) => {
                    setPredictions(data);
                  }}
                />
              </Animated.View>
            ) : null}
          </NestableScrollContainer>
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
        </View>
      </BackgroundWrapper>
    </>
  );
};

export default CategoryPersonal;
