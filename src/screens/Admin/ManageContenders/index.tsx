import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View } from 'react-native';
import { BodyBold } from '../../../components/Text';
import useQueryCommunityEvent from '../../../hooks/queries/getCommunityEvent';
import { useCategory } from '../../../context/CategoryContext';
import { iCategory, iEvent, iPrediction } from '../../../types';
import MovieListAdmin from '../../../components/MovieList/MovieListAdmin';
import ManageContendersModal from './ManageContendersModal';
import BackgroundWrapper from '../../../components/BackgroundWrapper';
import { getHeaderTitle } from '../../../constants';
import { useNavigation } from '@react-navigation/native';

const ManageContenders = () => {
  const { event: _event, category: _category } = useCategory();
  const event = _event as iEvent;
  const category = _category as iCategory;
  const navigation = useNavigation();

  const { data: communityData } = useQueryCommunityEvent({ event, includeHidden: true });
  const contenders = communityData?.[category.id]?.predictions || [];

  const [showManageContendersModal, setShowManageContendersModal] = useState<boolean>(
    false,
  );
  const [selectedPrediction, setSelectedPrediction] = useState<iPrediction | undefined>(
    undefined,
  );

  useEffect(() => {
    setShowManageContendersModal(!!selectedPrediction);
  }, [selectedPrediction]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: getHeaderTitle(
        `Manage ${event.awardsBody}  ${category.name} Contenders`,
      ),
    });
  }, []);

  return (
    <>
      <BackgroundWrapper>
        <>
          {contenders && contenders.length === 0 ? (
            <View
              style={{
                width: '100%',
                marginTop: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <BodyBold>No contenders in this category</BodyBold>
            </View>
          ) : null}
          <MovieListAdmin
            predictions={contenders}
            onPressItem={(p) => {
              setSelectedPrediction(p);
            }}
          />
        </>
      </BackgroundWrapper>
      {selectedPrediction ? (
        <ManageContendersModal
          visible={showManageContendersModal}
          onClose={() => setShowManageContendersModal(false)}
          prediction={selectedPrediction}
          onSaveSuccess={() => {
            setShowManageContendersModal(false);
          }}
        />
      ) : null}
    </>
  );
};

export default ManageContenders;
