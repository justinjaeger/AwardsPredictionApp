import React, { useEffect, useState } from 'react';
import { Switch, View, useWindowDimensions } from 'react-native';
import COLORS from '../../constants/colors';
import theme from '../../constants/theme';
import { HeaderLight, SubHeader } from '../Text';
import { AsyncStorageKeys } from '../../types/keys';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ListSettingsModal = ({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) => {
  const { width, height } = useWindowDimensions();

  const [displayGenderedCategories, setDisplayGenderedCategories] = useState<boolean>();

  useEffect(() => {
    AsyncStorage.getItem(AsyncStorageKeys.GENDERED_PREFERENCE).then((value) => {
      setDisplayGenderedCategories(value === 'true');
    });
  }, [visible]);

  const close = () => {
    onClose();
    AsyncStorage.setItem(
      AsyncStorageKeys.GENDERED_PREFERENCE,
      displayGenderedCategories ? 'true' : 'false',
    );
  };

  if (!visible) return null;

  return (
    <>
      <View
        style={{
          position: 'absolute',
          top: 0,
          width,
          height,
          backgroundColor: 'black',
          opacity: 0.3,
          zIndex: 1,
          elevation: 1,
        }}
        onTouchEnd={() => close()}
      />
      <View
        style={{
          position: 'absolute',
          borderRadius: theme.borderRadius,
          zIndex: 2,
          elevation: 2,
          marginTop: '50%',
          backgroundColor: COLORS.primary,
          width: '80%',
          alignSelf: 'center',
          padding: 20,
          alignItems: 'flex-start',
        }}
      >
        <HeaderLight>Settings</HeaderLight>
        <View
          style={{
            marginTop: 10,
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <SubHeader style={{ color: COLORS.white, fontWeight: '500' }}>
            Gendered Categories
          </SubHeader>
          <Switch
            value={displayGenderedCategories}
            onValueChange={() => {
              setDisplayGenderedCategories((prev) => !prev);
            }}
            thumbColor={COLORS.white}
            trackColor={{
              false: 'red',
              true: COLORS.secondaryDark,
            }}
            // style={{ marginRight: 20 }}
          />
        </View>
      </View>
    </>
  );
};

export default ListSettingsModal;
