import React, { useEffect, useRef } from 'react';
import { Modal } from '@ui-kitten/components';
import LoadingStatue from '../LoadingStatue';
import { BodyLarge } from '../Text';
import { Animated, View } from 'react-native';

type iLoadingStatueModalProps = {
  visible: boolean;
  text?: string;
};

const LoadingStatueModal = (props: iLoadingStatueModalProps) => {
  const { visible, text } = props;

  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: visible ? 1 : 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  return (
    <Animated.View style={{ opacity }}>
      <Modal
        visible={visible}
        backdropStyle={{
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
        }}
      >
        <LoadingStatue />
        <View style={{ width: '100%', alignSelf: 'center' }}>
          <BodyLarge style={{ textAlign: 'center' }}>{text || 'Loading...'}</BodyLarge>
        </View>
      </Modal>
    </Animated.View>
  );
};

export default LoadingStatueModal;
