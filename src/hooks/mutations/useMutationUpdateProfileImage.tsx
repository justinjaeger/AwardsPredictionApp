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
  const [isSuccessful, setIsSuccessful] = useState<boolean>(false);
  const [isChoosingImage, setIsChoosingImage] = useState<boolean>(false);

  const { mutate, isLoading } = useMutation({
    mutationFn: async () => {
      setIsComplete(false);
      try {
        setIsChoosingImage(true);
        const [resultSm, resultMd, resultLg] = await Promise.all([
          launchImageLibrary({
            maxWidth: 50,
            maxHeight: 50,
            mediaType: 'photo',
          }),
          launchImageLibrary({
            maxWidth: 200,
            maxHeight: 200,
            mediaType: 'photo',
          }),
          launchImageLibrary({
            maxWidth: 600,
            maxHeight: 600,
            mediaType: 'photo',
          }),
        ]);
        const uploadImagesPromises = [resultSm, resultMd, resultLg].map((result, i) => {
          const size = i === 0 ? 'sm' : i === 1 ? 'md' : 'lg';
          if (result && result.assets) {
            const { uri } = result.assets[0];
            if (uri) {
              setIsSuccessful(true);
              return MongoApi.uploadProfilePicture(uri, size);
            }
          }
          return undefined;
        });
        await Promise.all(uploadImagesPromises);
        setIsChoosingImage(false);
      } catch {
        console.error('error in useUpdateProfileImage');
        setIsSuccessful(false);
        setIsChoosingImage(false);
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

  return { mutate, isLoading, isComplete, isSuccessful, isChoosingImage };
};

export default useMutationUpdateProfileImage;
