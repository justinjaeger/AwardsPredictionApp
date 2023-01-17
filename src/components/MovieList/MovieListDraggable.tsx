import { useNavigation } from '@react-navigation/native';
import { Divider } from '@ui-kitten/components';
import React, { useState } from 'react';
import { TouchableHighlight, View } from 'react-native';
import DraggableFlatList, { ScaleDecorator } from 'react-native-draggable-flatlist';
import { PredictionType } from '../../API';
import { CATEGORY_TYPE_TO_STRING, getCategorySlots } from '../../constants/categories';
import COLORS from '../../constants/colors';
import theme from '../../constants/theme';
import { useCategory } from '../../context/CategoryContext';
import { iCategory, iEvent, iPrediction } from '../../types';
import LastUpdatedText from '../LastUpdatedText';
import ContenderListItem, {
  iContenderListItemProps,
} from '../List/ContenderList/ContenderListItem';
import ContenderListItemCondensed from '../List/ContenderList/ContenderListItemCondensed';
import { SubHeader } from '../Text';

type iMovieListProps = {
  predictions: iPrediction[];
  setPredictions: (ps: iPrediction[]) => void;
  lastUpdatedString: string;
  isCollapsed?: boolean;
};

const MovieListDraggable = ({
  predictions,
  setPredictions,
  isCollapsed,
  lastUpdatedString,
}: iMovieListProps) => {
  const navigation = useNavigation();
  const { event: _event, category: _category, date } = useCategory();
  const isHistory = !!date;

  const event = _event as iEvent;
  const category = _category as iCategory;

  const [selectedContenderId, setSelectedContenderId] = useState<string | undefined>(); // this selection is whether the film is big or not

  const onPressThumbnail = (prediction: iPrediction) => {
    const id = prediction.contenderId;
    if (selectedContenderId === id) {
      setSelectedContenderId(undefined);
    } else {
      setSelectedContenderId(id);
    }
  };

  const predictionType = predictions[0]?.predictionType || PredictionType.NOMINATION;

  const slots = getCategorySlots(event, category.name, predictionType);

  const onPressItem = (item: iPrediction) => {
    const id = item.contenderId;
    if (selectedContenderId === id) {
      setSelectedContenderId(undefined);
    } else {
      setSelectedContenderId(id);
    }
  };

  return (
    <DraggableFlatList
      data={predictions}
      keyExtractor={(item) => item.contenderId}
      style={{ width: '100%' }}
      contentContainerStyle={{
        paddingBottom: 100,
        paddingTop: theme.windowMargin,
      }}
      ListHeaderComponent={
        <LastUpdatedText
          lastUpdated={lastUpdatedString}
          isDisabled={isHistory}
          style={{ top: -30 }}
        />
      }
      ListFooterComponent={
        !isHistory ? (
          <View style={{ width: '100%', alignItems: 'center', marginTop: 10 }}>
            <TouchableHighlight
              style={{
                width: '90%',
                height: 40,
                borderRadius: theme.borderRadius,
                borderWidth: 1,
                borderColor: COLORS.white,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              underlayColor={COLORS.secondaryDark}
              onPress={() => {
                navigation.navigate('AddPredictions', {
                  initialPredictions: predictions,
                  onFinish: (predictions: iPrediction[]) => {
                    console.log('predictions', predictions.length);
                    setPredictions(predictions);
                  },
                });
              }}
            >
              <SubHeader>
                {predictions.length === 0
                  ? `+ Add ${CATEGORY_TYPE_TO_STRING[category.type]}s`
                  : `Add/Delete ${CATEGORY_TYPE_TO_STRING[category.type]}s`}
              </SubHeader>
            </TouchableHighlight>
          </View>
        ) : null
      }
      renderItem={({ item: prediction, index: _index, drag, isActive }) => {
        const index = _index || 0;
        const ranking = index + 1;
        const listItemProps: iContenderListItemProps = {
          variant: 'personal',
          prediction,
          ranking,
          selected: selectedContenderId === prediction.contenderId,
          onPressItem,
          onPressThumbnail,
          draggable: {
            drag,
            isActive,
          },
          categoryType: category.type,
        };
        return (
          <>
            {index === slots ? (
              <Divider
                style={{
                  margin: 10,
                  backgroundColor: isActive ? 'transparent' : COLORS.secondary,
                }}
              />
            ) : null}
            <ScaleDecorator activeScale={0.9}>
              {!isCollapsed ? (
                <ContenderListItem {...listItemProps} />
              ) : (
                <ContenderListItemCondensed {...listItemProps} />
              )}
            </ScaleDecorator>
          </>
        );
      }}
      onDragEnd={({ data }) => {
        setPredictions(data);
      }}
    />
  );
};

export default MovieListDraggable;
