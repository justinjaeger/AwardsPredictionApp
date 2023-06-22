import React from 'react';
import { ScrollView } from 'react-native';
import BackgroundWrapper from '../../../components/BackgroundWrapper';
import { SubmitButton } from '../../../components/Buttons';
import SafeAreaViewFixed from '../../../components/SafeAreaViewFixed';
import deleteDuplicateUsers from '../../../services/scripts/deleteDuplicateUsers';
import deleteDuplicatedRelationships from '../../../services/scripts/deleteDuplicatedRelationships';
import deleteDuplicatedContenders from '../../../services/scripts/deleteDuplicatedContenders';
import deleteDuplicatedMovies from '../../../services/scripts/deleteDuplicatedMovies';
import deleteDuplicatedPredictionSets from '../../../services/scripts/deleteDuplicatedPredictionSets';
import deleteDuplicatedPeople from '../../../services/scripts/deleteDuplicatedPeople';
import deleteDuplicatedSongs from '../../../services/scripts/deleteDuplicatedSongs';
import EmailService from '../../../services/email';
import Snackbar from '../../../components/Snackbar';

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
            text={'Test Confirmation Email'}
            onPress={async () => {
              const isSuccess = await EmailService.sendCode('jjustinjaeger@gmail.com');
              if (isSuccess) {
                Snackbar.success('Email sent!');
              } else {
                Snackbar.error('Email failed to send');
              }
            }}
            style={{ marginTop: 30 }}
          />
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
          <SubmitButton
            text={'Delete Duplicated Movies'}
            onPress={() => {
              deleteDuplicatedMovies();
            }}
            style={{ marginTop: 30 }}
          />
          <SubmitButton
            text={'Delete Duplicated People'}
            onPress={() => {
              deleteDuplicatedPeople();
            }}
            style={{ marginTop: 30 }}
          />
          <SubmitButton
            text={'Delete Duplicated Songs'}
            onPress={() => {
              deleteDuplicatedSongs();
            }}
            style={{ marginTop: 30 }}
          />
          <SubmitButton
            text={'Delete Duplicated Contenders'}
            onPress={() => {
              deleteDuplicatedContenders();
            }}
            style={{ marginTop: 30 }}
          />
          <SubmitButton
            text={'Delete Duplicated PredictionSets'}
            onPress={() => {
              deleteDuplicatedPredictionSets();
            }}
            style={{ marginTop: 30 }}
          />
        </ScrollView>
      </SafeAreaViewFixed>
    </BackgroundWrapper>
  );
};

export default AdminScripts;
