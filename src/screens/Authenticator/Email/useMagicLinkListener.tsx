import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import useDeepLink from '../../../hooks/useDeepLink';
import MongoApi from '../../../services/api/requests';

const useMagicLinkListener = (onFailure: (m: string) => void) => {
  const { signInUser } = useAuth();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onError = (message: string) => {
    setIsLoading(false);
    onFailure(message);
  };

  // when verification link is clicked, this callback fires
  const handleSignIn = async (url: string) => {
    console.error('handleSignIn', url); // because this seems to be getting invoked like 3 times
    try {
      setIsLoading(true);
      const { data: email } = await MongoApi.verifyEmailMagicLink(url);
      if (!email) {
        return onError('error: invalid link');
      }
      const { data: user } = await MongoApi.getUser({ email });
      if (!user) {
        return onError('error: unable to find user');
      }
      signInUser({ userId: user._id, email: user.email, role: user.role });
    } finally {
      setIsLoading(false);
    }
  };

  // listen for verification link
  // looks like oscar://signin/?token={jwt}&email={email")
  useDeepLink((u: string) => handleSignIn(u));

  return { isLoading };
};

export default useMagicLinkListener;
