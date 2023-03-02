import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import ApiServices from '../../services/graphql';
import AWSStorage from '../../services/storage';
import { QueryKeys } from '../../types';

const useUpdateProfileImage = (onComplete?: () => void) => {
  const queryClient = useQueryClient();

  const [isComplete, setIsComplete] = useState<boolean>(true);

  const { mutate, isLoading } = useMutation({
    mutationFn: async (params: { userId: string; userEmail: string }) => {
      const { userId, userEmail } = params;
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
            const key = await AWSStorage.uploadProfilePicture(uri, userEmail || '');
            if (key) {
              await ApiServices.updateProfileImage(userId, key);
            }
          }
        }
      } catch {
        console.error('error in useUpdateProfileImage');
      }
    },
    onSuccess: async () => {
      // re-fetch predictions so the UI updates
      await queryClient.invalidateQueries({
        queryKey: [QueryKeys.USER],
      });
      await queryClient.invalidateQueries({
        queryKey: [QueryKeys.USER_PROFILE],
      });
      setIsComplete(true);
      onComplete && onComplete();
    },
  });

  return { mutate, isLoading, isComplete };
};

export default useUpdateProfileImage;
