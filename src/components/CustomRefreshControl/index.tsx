import React from 'react';
import { RefreshControl } from 'react-native';
import { useRefresh } from './useRefetch';

const CustomRefreshControl = ({ callback }: { callback: () => Promise<any> }) => {
  const { refreshing, onRefresh } = useRefresh(callback);

  return (
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      colors={['white']}
      tintColor={'white'}
    />
  );
};

export default CustomRefreshControl;
