import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { TouchableHighlight, View } from 'react-native';
import { EventStatus } from '../../../API';
import { Body } from '../../../components/Text';
import COLORS from '../../../constants/colors';
import { EVENT_STATUS_TO_STRING } from '../../../constants/events';
import BasicModal from '../../../components/BasicModal';
import { FAB } from '../../../components/Buttons/FAB';
import ApiServices from '../../../services/graphql';
import Snackbar from '../../../components/Snackbar';

const UpdateStatusModal = (props: {
  visible: boolean;
  onClose: () => void;
  eventId: string | undefined;
  initialStatus: EventStatus | undefined;
  onSaveSuccess: () => void;
}) => {
  const { visible, onClose, eventId, initialStatus, onSaveSuccess } = props;
  const [selectedStatus, setSelectedStatus] = useState<EventStatus | undefined>(
    initialStatus,
  );

  useEffect(() => {
    setSelectedStatus(initialStatus);
  }, [initialStatus]);

  const onUpdateEventStatus = async (eventStatus: EventStatus) => {
    if (!eventId) return;
    const { status } = await ApiServices.updateEvent(eventId, {
      status: eventStatus,
    });
    if (status === 'success') {
      onSaveSuccess();
      Snackbar.success('Event status updated successfully');
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
      header={{ title: 'Edit Status' }}
    >
      <>
        <View style={{ flexDirection: 'column' }}>
          {_.entries(EVENT_STATUS_TO_STRING).map(([key, value]) => {
            // @ts-ignore
            const status = EventStatus[key] as EventStatus;
            return (
              <View key={key}>
                <TouchableHighlight
                  style={{
                    backgroundColor:
                      selectedStatus === status ? COLORS.secondaryDark : 'transparent',
                    height: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={() => {
                    setSelectedStatus(status);
                  }}
                >
                  <Body style={{ padding: 10 }}>{value}</Body>
                </TouchableHighlight>
              </View>
            );
          })}
        </View>
        <FAB
          iconName="checkmark"
          text="Save"
          onPress={() => {
            if (!selectedStatus) return;
            onUpdateEventStatus(selectedStatus);
          }}
          visible={initialStatus !== selectedStatus}
        />
      </>
    </BasicModal>
  );
};

export default UpdateStatusModal;
