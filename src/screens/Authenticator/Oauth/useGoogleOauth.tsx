import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useAuth } from '../../../context/AuthContext';
import Snackbar from '../../../components/Snackbar';
import MongoApi from '../../../services/api/requests';
import { useState } from 'react';

const useGoogleOAuth = () => {
  const { signInUser } = useAuth();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const googleSignIn = async () => {
    try {
      setIsLoading(true);
      // google modal pops up, we get the user info
      const res = await GoogleSignin.signIn();
      const { email, name } = res.user;
      // see if this user exists in our db
      const { data: existingUser } = await MongoApi.getUser({ email });
      let dbUser = existingUser;

      // if user with this email doesn't exist, create the user
      if (!dbUser) {
        const { status, data: newUser } = await MongoApi.createUser({
          email,
          name: name || undefined,
        });
        if (status === 'error' || !newUser) {
          throw new Error('Error creating user');
        }
        dbUser = newUser;
      }
      // dbUser shouldn't be undefined; sign in the user
      signInUser({ userId: dbUser._id, email: dbUser.email, role: dbUser.role });
    } catch (e) {
      Snackbar.error(JSON.stringify(e) || 'Something went wrong');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return { googleSignIn, isLoading };
};

export default useGoogleOAuth;
