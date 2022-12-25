import React from 'react';
import { View } from 'react-native';
import BasicModal from '../../../components/BasicModal';
import { iPrediction } from '../../../types';
import { SubmitButton } from '../../../components/Buttons';
import { Body } from '../../../components/Text';
import { ContenderVisibility } from '../../../API';
import useMutationUpdateContenderVisibility from '../../../hooks/mutations/updateContenderVisibility';
import LoadingStatueModal from '../../../components/LoadingStatueModal';

/**
 * Lets you change visibility on an item
 */
const ManageContendersModal = (props: {
  visible: boolean;
  onClose: () => void;
  prediction: iPrediction;
  onSaveSuccess: () => void;
}) => {
  const { visible, onClose, prediction, onSaveSuccess } = props;

  const { mutate, isComplete } = useMutationUpdateContenderVisibility(onSaveSuccess);

  const isVisible = prediction.visibility !== ContenderVisibility.HIDDEN;

  const onSetEventHidden = async () => {
    const contenderMovieId = prediction.contenderMovie?.id;
    if (!contenderMovieId) return;
    const newVisibility = isVisible
      ? ContenderVisibility.HIDDEN
      : ContenderVisibility.VISIBLE;
    mutate({
      contenderId: prediction.contenderId,
      contenderMovieId,
      visibility: newVisibility,
    });
    onSaveSuccess();
  };

  return (
    <>
      <LoadingStatueModal visible={!isComplete} text={'Saving changes...'} />
      <BasicModal
        visible={visible}
        onClose={onClose}
        width={'100%'}
        height={'50%'}
        header={{ title: 'Edit Hidden' }}
      >
        <View style={{ flexDirection: 'column' }}>
          <Body>{`Visibility: ${prediction.visibility}`}</Body>
          <SubmitButton
            onPress={() => onSetEventHidden()}
            text={isVisible ? 'Hide' : 'Unhide'}
          />
        </View>
      </BasicModal>
    </>
  );
};

export default ManageContendersModal;
