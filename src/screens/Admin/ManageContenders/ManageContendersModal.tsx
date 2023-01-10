import React, { useState } from 'react';
import { TouchableHighlight, View } from 'react-native';
import BasicModal from '../../../components/BasicModal';
import { iPrediction } from '../../../types';
import { SubmitButton } from '../../../components/Buttons';
import { Body } from '../../../components/Text';
import { ContenderAccolade, ContenderVisibility } from '../../../API';
import useMutationUpdateContenderVisibility from '../../../hooks/mutations/updateContenderVisibility';
import LoadingStatueModal from '../../../components/LoadingStatueModal';
import { ACCOLADE_TO_STRING } from '../../../constants/events';
import COLORS from '../../../constants/colors';
import { FAB } from '../../../components/Buttons/FAB';
import useMutationUpdateContenderAccolade from '../../../hooks/mutations/updateContenderAccolade';

/**
 * Lets you change visibility on an item
 */
const ManageContendersModal = (props: {
  visible: boolean;
  onClose: () => void;
  prediction: iPrediction;
  onSaveSuccess: () => void; // basically hides the modal
}) => {
  const { visible, onClose, prediction, onSaveSuccess } = props;

  const {
    updateContenderVisibility,
    isComplete: visibilityIsComplete,
  } = useMutationUpdateContenderVisibility();
  const {
    updateContenderAccolade,
    isComplete: accoladeIsComplete,
  } = useMutationUpdateContenderAccolade();

  const [selectedAccolade, setSelectedAccolade] = useState<ContenderAccolade | undefined>(
    prediction.accolade,
  );

  const isVisible = prediction.visibility !== ContenderVisibility.HIDDEN;

  const onSetEventHidden = async () => {
    const contenderMovieId = prediction.contenderMovie?.id;
    if (!contenderMovieId) return;
    const newVisibility = isVisible
      ? ContenderVisibility.HIDDEN
      : ContenderVisibility.VISIBLE;
    updateContenderVisibility({
      contenderId: prediction.contenderId,
      contenderMovieId,
      visibility: newVisibility,
    });
    onSaveSuccess();
  };

  const onUpdateAccolade = () => {
    if (!prediction.contenderId) return;
    updateContenderAccolade({
      contenderId: prediction.contenderId,
      accolade: selectedAccolade,
    });
    onSaveSuccess();
  };

  const ContenderSetting = ({
    text,
    buttonText,
    onPress,
  }: {
    text: string;
    buttonText: string;
    onPress: () => void;
  }) => (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between',
        padding: 20,
      }}
    >
      <Body style={{ fontWeight: '700' }}>{text}</Body>
      <SubmitButton onPress={onPress} text={buttonText} />
    </View>
  );

  return (
    <>
      <LoadingStatueModal
        visible={!visibilityIsComplete || !accoladeIsComplete}
        text={'Saving changes...'}
      />
      <BasicModal
        visible={visible}
        onClose={onClose}
        width={'100%'}
        height={'50%'}
        header={{ title: 'Contender Settings' }}
      >
        <>
          <ContenderSetting
            text={`Visibility: ${prediction.visibility}`}
            buttonText={isVisible ? 'Hide' : 'Unhide'}
            onPress={() => onSetEventHidden()}
          />
          <View
            style={{
              width: '100%',
              alignSelf: 'center',
              alignItems: 'center',
              margin: 15,
            }}
          >
            <Body style={{ fontWeight: '700' }}>{'Accolade:'}</Body>
          </View>
          <View style={{ flexDirection: 'column' }}>
            {[...Object.entries(ACCOLADE_TO_STRING), [undefined, 'None']].map(
              ([accolade, text]) => {
                return (
                  <View key={accolade}>
                    <TouchableHighlight
                      style={{
                        backgroundColor:
                          selectedAccolade === accolade
                            ? COLORS.secondaryDark
                            : 'transparent',
                        height: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() => {
                        setSelectedAccolade(accolade as ContenderAccolade);
                      }}
                    >
                      <Body style={{ padding: 10 }}>{text || 'undefined'}</Body>
                    </TouchableHighlight>
                  </View>
                );
              },
            )}
          </View>
          <FAB
            iconName="checkmark"
            text="Save"
            onPress={onUpdateAccolade}
            visible={selectedAccolade !== prediction.accolade}
          />
        </>
      </BasicModal>
    </>
  );
};

export default ManageContendersModal;
