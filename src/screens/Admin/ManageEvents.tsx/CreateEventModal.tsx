import _ from 'lodash';
import React, { useState } from 'react';
import { ScrollView, TouchableHighlight, View } from 'react-native';
import { AwardsBody } from '../../../API';
import { Body } from '../../../components/Text';
import COLORS from '../../../constants/colors';
import BasicModal from '../../../components/BasicModal';
import { FAB } from '../../../components/Buttons/FAB';
import ApiServices from '../../../services/graphql';
import Snackbar from '../../../components/Snackbar';
import { AWARDS_BODY_TO_STRING } from '../../../constants/awardsBodies';
import FormInput from '../../../components/Inputs/FormInput';

const CreateEventModal = (props: {
  visible: boolean;
  onClose: () => void;
  onSaveSuccess: () => void;
}) => {
  const { visible, onClose, onSaveSuccess } = props;
  const [selectedAwardsBody, setSelectedAwardsBody] = useState<AwardsBody | undefined>(
    undefined,
  );
  const [year, setYear] = useState<number | undefined>(undefined);

  const onCreateEvent = async () => {
    if (!selectedAwardsBody || !year) return;
    const { status } = await ApiServices.createEvent(selectedAwardsBody, year);
    if (status === 'success') {
      onSaveSuccess();
      Snackbar.success('Event status updated successfully');
      onClose();
    } else {
      Snackbar.error('Event status update failed');
    }
  };

  const ITEM_HEIGHT = 50;

  const awardsBodies = _.entries(AWARDS_BODY_TO_STRING);

  return (
    <BasicModal
      visible={visible}
      onClose={onClose}
      width={'100%'}
      height={'50%'}
      header={{ title: 'Edit Status' }}
    >
      <>
        <View
          style={{
            flexDirection: 'column',
            height: '100%',
          }}
        >
          <FormInput
            label={'Year'}
            value={(year || '')?.toString()}
            setValue={(y) => setYear(parseInt(y, 10))}
            isYear
            style={{ alignSelf: 'center', width: '80%' }}
          />
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{
              paddingBottom: awardsBodies.length * ITEM_HEIGHT - 400,
            }}
          >
            <>
              {awardsBodies.map(([key, value]) => {
                // @ts-ignore we know this is a valid key
                const awardsBody = AwardsBody[key] as AwardsBody;
                return (
                  <>
                    <TouchableHighlight
                      style={{
                        backgroundColor:
                          selectedAwardsBody === awardsBody
                            ? COLORS.secondaryDark
                            : 'transparent',
                        height: ITEM_HEIGHT,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() => {
                        if (selectedAwardsBody === awardsBody) {
                          setSelectedAwardsBody(undefined);
                        } else {
                          setSelectedAwardsBody(awardsBody);
                        }
                      }}
                    >
                      <Body style={{ padding: 10 }}>{value}</Body>
                    </TouchableHighlight>
                  </>
                );
              })}
            </>
          </ScrollView>
        </View>
        <FAB
          iconName="checkmark"
          text="Save"
          onPress={onCreateEvent}
          visible={!!selectedAwardsBody && year?.toString().length === 4}
          bottomPercentage={'20%'}
        />
      </>
    </BasicModal>
  );
};

export default CreateEventModal;
