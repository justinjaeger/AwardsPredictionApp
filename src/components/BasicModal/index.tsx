import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import theme from '../../constants/theme';
import COLORS from '../../constants/colors';
import { Body } from '../Text';
import HeaderButton from '../HeaderButton';
import { HEADER_HEIGHT } from '../../constants';

type iBasicModalProps = {
  visible: boolean;
  onClose: () => void;
  children: JSX.Element;
  width?: number | string;
  height?: number | string;
  header?: {
    title?: string;
    showClose?: boolean;
  };
};

const BasicModal = (props: iBasicModalProps) => {
  const { visible, onClose, children, width, height, header } = props;

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
      <Modal visible={visible} transparent onDismiss={onClose} onRequestClose={onClose}>
        <TouchableOpacity
          style={{
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.8)',
          }}
          activeOpacity={1}
          onPressOut={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          <TouchableWithoutFeedback
            onPress={(e) => {
              e.stopPropagation();
            }}
          >
            <View
              style={{
                width: width || '85%',
                height: height || '50%',
                position: 'relative',
                backgroundColor: COLORS.primary,
                borderRadius: 10,
                overflow: 'hidden',
              }}
            >
              {header ? (
                <View
                  style={{
                    width: '100%',
                    height: HEADER_HEIGHT + 20,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderBottomColor: COLORS.primaryLight,
                  }}
                >
                  <Body style={{ textAlign: 'center' }}>{header.title || ''}</Body>
                  <View style={{ position: 'absolute', right: theme.windowMargin }}>
                    <HeaderButton
                      onPress={onClose}
                      icon={'close-outline'}
                      style={{
                        backgroundColor: COLORS.primaryLight,
                      }}
                    />
                  </View>
                </View>
              ) : null}
              <View style={{ paddingTop: 10 }}>{children}</View>
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
    </Animated.View>
  );
};

export default BasicModal;
