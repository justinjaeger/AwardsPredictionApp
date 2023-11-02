import { Divider } from '@ui-kitten/components';
import React, { useCallback, useState } from 'react';
import { TouchableHighlight, View } from 'react-native';
import DraggableFlatList, { ScaleDecorator } from 'react-native-draggable-flatlist';
import { CATEGORY_TYPE_TO_STRING } from '../../constants/categories';
import COLORS from '../../constants/colors';
import theme from '../../constants/theme';
import { useEvent } from '../../context/EventContext';
import LastUpdatedText from '../LastUpdatedText';
import ContenderListItem from '../List/ContenderList/ContenderListItem';
import { SubHeader } from '../Text';
import { iPrediction } from '../../types/api';
import ContenderInfoModal from '../ContenderInfoModal';

type iMovieListProps = {
  predictions: iPrediction[];
  setPredictions: (ps: iPrediction[]) => void;
  lastUpdatedString: string;
  isAuthProfile?: boolean;
  onPressAdd: () => void;
};

const MovieListDraggable = ({
  predictions,
  setPredictions,
  lastUpdatedString,
  isAuthProfile,
  onPressAdd,
}: iMovieListProps) => {
  const { event: _event, category: _category } = useEvent();
  const event = _event!;
  const category = _category!;

  const [modalData, setModalData] = useState<iPrediction | undefined>(undefined);

  const { slots, type } = event.categories[category];

  const onPressItem = useCallback(async (prediction: iPrediction) => {
    setModalData(prediction);
  }, []);

  return (
    <>
      <DraggableFlatList
        data={predictions}
        keyExtractor={(item) => item.contenderId}
        style={{ width: '100%' }}
        contentContainerStyle={{
          paddingBottom: 150,
          paddingTop: theme.windowMargin,
        }}
        ListHeaderComponent={
          <LastUpdatedText lastUpdated={lastUpdatedString} style={{ top: -35 }} />
        }
        ListFooterComponent={
          isAuthProfile ? (
            <View style={{ width: '100%', alignItems: 'center', marginTop: 40 }}>
              <TouchableHighlight
                style={{
                  width: '90%',
                  maxWidth: 400,
                  borderRadius: theme.borderRadius,
                  borderWidth: 1,
                  borderColor: COLORS.white,
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 10,
                }}
                underlayColor={COLORS.secondaryDark}
                onPress={onPressAdd}
              >
                <SubHeader>
                  {predictions.length === 0
                    ? `+ Add ${CATEGORY_TYPE_TO_STRING[type]}s`
                    : `Add/Delete ${CATEGORY_TYPE_TO_STRING[type]}s`}
                </SubHeader>
              </TouchableHighlight>
            </View>
          ) : null
        }
        renderItem={({ item: prediction, getIndex, drag, isActive }) => {
          const index = getIndex() || 0;
          const ranking = index + 1;
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
                <ContenderListItem
                  variant="personal"
                  prediction={prediction}
                  ranking={ranking}
                  onPressItem={onPressItem}
                  onPressThumbnail={onPressItem}
                  draggable={{
                    drag,
                    isActive,
                  }}
                  categoryType={type}
                  isAuthProfile={isAuthProfile}
                />
              </ScaleDecorator>
            </>
          );
        }}
        onDragEnd={({ data }) => {
          setPredictions(data);
        }}
      />
      {modalData ? (
        <ContenderInfoModal
          visible={!!modalData}
          onClose={() => setModalData(undefined)}
          event={event}
          category={category}
          prediction={modalData}
        />
      ) : null}
    </>
  );
};

export default MovieListDraggable;
