import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import { QueryKeys } from '../../types/keys';
import { useAuth } from '../../context/AuthContext';
import MongoApi from '../../services/api/requests';

const useMutationUpdateProfileImage = (onComplete?: () => void) => {
  const queryClient = useQueryClient();
  const { userId: authUserId } = useAuth();

  const [isComplete, setIsComplete] = useState<boolean>(true);

  const { mutate, isLoading } = useMutation({
    mutationFn: async () => {
      setIsComplete(false);
      try {
        const result = await launchImageLibrary({
          maxWidth: 200,
          maxHeight: 200,
          mediaType: 'photo',
        });
        if (result && result.assets) {
          const { uri } = result.assets[0];
          if (uri) {
            await MongoApi.uploadProfilePicture(uri);
          }
        }
      } catch {
        console.error('error in useUpdateProfileImage');
      }
    },
    onSuccess: async () => {
      // re-fetch predictions so the UI updates
      await queryClient.invalidateQueries({
        queryKey: [QueryKeys.USER + authUserId],
      });
      setIsComplete(true);
      onComplete && onComplete();
    },
  });

  return { mutate, isLoading, isComplete };
};

export default useMutationUpdateProfileImage;
