import React from 'react';
import { ScrollView } from 'react-native';
import BackgroundWrapper from '../../../components/BackgroundWrapper';
import { SubmitButton } from '../../../components/Buttons';
import SafeAreaViewFixed from '../../../components/SafeAreaViewFixed';
import deleteDuplicateUsers from '../../../services/scripts/deleteDuplicateUsers';
import deleteDuplicatedRelationships from '../../../services/scripts/deleteDuplicatedRelationships';

const AdminScripts = () => {
  return (
    <BackgroundWrapper>
      <SafeAreaViewFixed style={{ width: '100%', height: '100%' }}>
        <ScrollView
          contentContainerStyle={{
            alignItems: 'center',
            paddingBottom: 200,
          }}
        >
          <SubmitButton
            text={'Delete Duplicated Users'}
            onPress={() => {
              deleteDuplicateUsers();
            }}
            style={{ marginTop: 30 }}
          />
          <SubmitButton
            text={'Delete Duplicated Relationships'}
            onPress={() => {
              deleteDuplicatedRelationships();
            }}
            style={{ marginTop: 30 }}
          />
        </ScrollView>
      </SafeAreaViewFixed>
    </BackgroundWrapper>
  );
};

export default AdminScripts;
