import React, { useState } from 'react';
import BasicModal from '../../../components/BasicModal';
import ApiServices from '../../../services/graphql';
import Snackbar from '../../../components/Snackbar';
import { SubmitButton } from '../../../components/Buttons';
import { DateTimeInput } from '../../../components/Inputs/DateTimeInput';

const UpdateExpirationModal = (props: {
  visible: boolean;
  onClose: () => void;
  eventId: string | undefined;
  propertyToUpdate: 'nominationDateTime' | 'winDateTime';
  initialDateTime: string | undefined; // this is an ISO string (AWSDateTime)
  onSaveSuccess: () => void;
}) => {
  const {
    visible,
    onClose,
    eventId,
    propertyToUpdate,
    initialDateTime,
    onSaveSuccess,
  } = props;

  const [date, setDate] = useState<Date | undefined>(
    initialDateTime ? new Date(initialDateTime) : undefined,
  );

  const onUpdateExpiration = async () => {
    if (!eventId || !date) return;
    const newTime = date.toISOString();
    const params =
      propertyToUpdate === 'nominationDateTime'
        ? {
            nominationDateTime: newTime,
          }
        : {
            winDateTime: newTime,
          };
    const { status } = await ApiServices.updateEvent(eventId, params);
    if (status === 'success') {
      onSaveSuccess();
      Snackbar.success('Event expiration updated successfully');
      onClose();
    } else {
      Snackbar.error('Event status update failed');
    }
  };

  return (
    <BasicModal
      visible={visible}
      onClose={onClose}
      width={'100%'}
      height={'50%'}
      header={{ title: 'Edit Expiration' }}
    >
      <>
        <DateTimeInput
          label={
            propertyToUpdate === 'nominationDateTime'
              ? 'Nomination Closing Time'
              : 'Win Closing Time'
          }
          date={date}
          setDate={(d) => setDate(d)}
        />
        <SubmitButton
          text={'Update'}
          onPress={onUpdateExpiration}
          style={{ marginTop: 40 }}
        />
      </>
    </BasicModal>
  );
};

export default UpdateExpirationModal;
