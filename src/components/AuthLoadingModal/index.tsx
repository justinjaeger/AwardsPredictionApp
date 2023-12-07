import React from 'react';
import { useAuth } from '../../context/AuthContext';
import LoadingStatueModal from '../LoadingStatueModal';
import useMagicLinkListener from '../../screens/Authenticator/Email/useMagicLinkListener';
import Snackbar from '../Snackbar';

const AuthLoadingModal = () => {
  const { isLoadingSignIn, isLoadingSignOut } = useAuth();
  const { isLoading: isLoadingVerification } = useMagicLinkListener((message: string) => {
    // onFail callback:
    console.error(message);
    Snackbar.error(message);
  });

  return (
    <LoadingStatueModal
      visible={isLoadingSignIn || isLoadingVerification}
      text={
        isLoadingSignOut
          ? 'Signing out...'
          : isLoadingSignIn
          ? 'Signing in...'
          : 'Verifying...'
      }
    />
  );
};

export default AuthLoadingModal;
