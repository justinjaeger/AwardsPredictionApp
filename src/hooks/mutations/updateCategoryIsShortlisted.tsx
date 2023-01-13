import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { CategoryIsShortlisted } from '../../API';
import ApiServices from '../../services/graphql';
import { QueryKeys } from '../../types';

const useMutationUpdateCategoryIsShortlisted = (onComplete?: () => void) => {
  const queryClient = useQueryClient();

  const [isComplete, setIsComplete] = useState<boolean>(true);

  const { mutate: updateContenderIsShortlisted, isLoading } = useMutation({
    mutationFn: async (params: {
      categoryId: string;
      isShortlisted: CategoryIsShortlisted;
    }) => {
      setIsComplete(false);
      return ApiServices.updateCategoryIsShortlisted(
        params.categoryId,
        params.isShortlisted,
      );
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [QueryKeys.EVENTS] });
      setIsComplete(true);
      onComplete && onComplete();
    },
  });

  return { updateContenderIsShortlisted, isLoading, isComplete };
};

export default useMutationUpdateCategoryIsShortlisted;
