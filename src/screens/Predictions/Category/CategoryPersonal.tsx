import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { Animated, View } from 'react-native';
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
  const { display, toggleDisplay, gridOpacity, listOpacity } = props;

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

  // set custom back arrow functionality
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <BackButton
          onPress={() => {
            // TODO: warn that about to go back if needed
            console.error('backkkk');
            navigation.goBack();
          }}
        />
      ),
    });
  }, [navigation]);

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
            alignItems: 'center',
          }}
        >
          <View
            style={{
              display: 'flex',
              height: '100%',
              width: '100%',
            }}
          >
            <>
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
                      icon={
                        display === 'grid' ? 'list' : display === 'list' ? 'grid' : ''
                      }
                    />
                  ) : (
                    <HeaderButton
                      onPress={() => {
                        // TODO: give a warning first
                        setPredictions(initialPredictions);

                        setIsEditing(false);
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
                      //   navigation.navigate('AddPredictions');
                    }}
                    icon={'plus'}
                  />
                </View>
              </CategoryHeader>
              {/* {loading ? <LoadingStatue /> : null} */}
              {/* {loading ? <LoadingStatueModal visible={!isComplete} /> : null} */}
              <View>
                {/* @ts-ignore not actually broken */}
                <NestableScrollContainer contentContainerStyle={{ paddingBottom: 100 }}>
                  <Animated.View
                    style={{
                      opacity: gridOpacity,
                      position: 'absolute',
                    }}
                  >
                    <MovieGrid predictions={predictions} />
                  </Animated.View>
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
                            tab={'personal'}
                            prediction={prediction}
                            ranking={(index || 0) + 1}
                            selected={selectedContenderId === prediction.contenderId}
                            toggleSelected={(id: string) => {
                              if (selectedContenderId === id) {
                                setSelectedContenderId(undefined);
                              } else {
                                setSelectedContenderId(id);
                              }
                            }}
                            onPressItem={(item) => {
                              setSelectedContenderId(item.contenderId);
                            }}
                            onPressThumbnail={displayContenderInfo}
                            draggable={{
                              drag,
                              isActive,
                            }}
                          />
                        </ScaleDecorator>
                      )}
                      onDragEnd={({ data }) => {
                        // have to compare string[] or else it knows that new version is not DEEPLY equal, but we only care if shallow
                        const resultIsSame = _.isEqual(
                          data.map((c) => c.contenderId),
                          initialPredictions.map((c) => c.contenderId),
                        );
                        setIsEditing(!resultIsSame);
                        setPredictions(data);
                      }}
                    />
                  </Animated.View>
                </NestableScrollContainer>
              </View>
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
            </>
          </View>
        </View>
      </BackgroundWrapper>
    </>
  );
};

export default CategoryPersonal;
