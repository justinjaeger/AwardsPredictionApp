import React, { useState } from 'react';
import { Alert, ScrollView, View } from 'react-native';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import { SubmitButton } from '../../components/Buttons';
import LoadingStatue from '../../components/LoadingStatue';
import { Body } from '../../components/Text';
import COLORS from '../../constants/colors';
import { useAuth } from '../../context/UserContext';
import AuthServices from '../../services/auth';
import ApiServices from '../../services/graphql';
import { useNavigateAwayEffect } from '../../util/hooks';

const Settings = () => {
  const { userId, signOutUser } = useAuth();
  const [deletionStatus, setDeletionStatus] = useState<
    'isLoading' | 'error' | 'success' | undefined
  >('error');

  const userIsSignedIn = !!userId;

  useNavigateAwayEffect(() => {
    // reset the screen
    setDeletionStatus(undefined);
  }, []);

  const onDeleteAccount = async () => {
    if (!userId) return;
    setDeletionStatus('isLoading');
    const handleError = () => {
      setDeletionStatus('error');
    };
    const res = await ApiServices.permanentlyDeleteUser(userId);
    if (res.status !== 'success') {
      return handleError();
    }
    const authRes = await AuthServices.deleteUser();
    if (authRes.status !== 'success') {
      handleError();
    }
    setDeletionStatus('success');
    // then log the user out
    AuthServices.signOut().then((res) => {
      // sign out in context as well
      if (res.status === 'success') {
        signOutUser();
      }
    });
  };

  const onPressDelete = () => {
    // alert user that this is permanent
    Alert.alert(
      'Delete Account',
      'This removes your profile and relationships with other users permanently.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            Alert.alert(
              'Delete account',
              'Are you sure? This action cannot be undone.',
              [
                {
                  text: 'Cancel',
                  style: 'cancel',
                },
                {
                  text: 'Delete',
                  onPress: onDeleteAccount,
                },
              ],
              { cancelable: false },
            );
          },
        },
      ],
      { cancelable: false },
    );
  };

  return (
    <BackgroundWrapper>
      <ScrollView
        style={{ width: '100%' }}
        contentContainerStyle={{ width: '90%', alignSelf: 'center' }}
      >
        {userIsSignedIn ? (
          <SubmitButton
            text={'Delete Account'}
            onPress={onPressDelete}
            style={{ marginTop: 40, backgroundColor: COLORS.error }}
            underlayColor={COLORS.errorDark}
          />
        ) : (
          <Body style={{ textAlign: 'center', marginTop: 40 }}>
            No settings to show when logged out
          </Body>
        )}
        {deletionStatus !== undefined ? (
          <View style={{ alignSelf: 'center' }}>
            <Body style={{ textAlign: 'center', marginTop: 40 }}>
              {deletionStatus === 'isLoading'
                ? 'Deleting account, please wait...'
                : deletionStatus === 'error'
                ? 'Sorry, there was an error deleting your account. Please use the contact form to submit request.'
                : deletionStatus === 'success'
                ? 'Account successfully deleted'
                : ''}
            </Body>
            {deletionStatus === 'isLoading' ? <LoadingStatue /> : null}
          </View>
        ) : null}
      </ScrollView>
    </BackgroundWrapper>
  );
};

export default Settings;
