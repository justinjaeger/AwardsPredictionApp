import React from 'react';
import { ScrollView, TouchableHighlight, View } from 'react-native';
import { TouchableText } from '../../../components/Buttons';
import ContenderListItem from '../../../components/List/ContenderList/ContenderListItem';
import { BodyLarge } from '../../../components/Text';
import COLORS from '../../../constants/colors';
import { PosterSize } from '../../../constants/posterDimensions';
import { useCategory } from '../../../context/CategoryContext';
import { iPrediction, usePredictions } from '../../../context/PredictionContext';
import { PredictionsParamList } from '../../../navigation/types';
import { useTypedNavigation } from '../../../util/hooks';

type iContenderListProps = {
  isSelectable?: boolean; // makes items appear "on" or "off"
  onPressItem?: (contenderId: string) => void;
};

// NOTE: Has a lot in common with ContenderListDraggable
const Category = (props: iContenderListProps) => {
  const { isSelectable, onPressItem } = props;

  const { category, personalCommunityTab } = useCategory();
  const { predictionData, displayContenderInfo } = usePredictions();
  const navigation = useTypedNavigation<PredictionsParamList>();

  const ps: iPrediction[] | undefined =
    category?.getCategory?.id && predictionData[category?.getCategory?.id]
      ? predictionData[category.getCategory.id] // this might be undefined
      : [];

  const categoryPredictions = ps || [];

  return (
    <ScrollView
      contentContainerStyle={{ alignItems: 'center', marginTop: 40, paddingBottom: 100 }}
    >
      <TouchableHighlight
        style={{
          display: 'flex',
          height: '100%',
          width: '100%',
          backgroundColor: COLORS.lightestGray,
        }}
      >
        <>
          {categoryPredictions.length === 0 ? (
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
          {personalCommunityTab === 'personal' ? (
            <>
              <TouchableText
                text={'Edit Predictions'}
                onPress={() => {
                  navigation.navigate('PersonalPredictions');
                }}
                style={{ margin: 10 }}
              />
            </>
          ) : null}
          {categoryPredictions.map((prediction, i) => (
            <ContenderListItem
              prediction={prediction}
              ranking={i + 1}
              onPressItem={onPressItem}
              onPressThumbnail={displayContenderInfo}
              selected={false}
              isSelectable={isSelectable}
              size={PosterSize.MEDIUM}
            />
          ))}
        </>
      </TouchableHighlight>
    </ScrollView>
  );
};

export default Category;
