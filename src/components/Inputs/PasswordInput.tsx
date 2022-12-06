import React, { useState } from 'react';
import { Icon, Input } from '@ui-kitten/components';
import { ImageProps, TouchableWithoutFeedback } from 'react-native';
import { EvaStatus } from '@ui-kitten/components/devsupport';
import COLORS from '../../constants/colors';
import { Body } from '../Text';

const PasswordInput = (props: {
  value: string;
  setValue: (v: string) => void;
  caption?: string;
  onBlur?: () => void;
  status?: EvaStatus;
}) => {
  const { value, setValue, caption, onBlur, status } = props;

  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);

  const showPassIcon = (props: Partial<ImageProps> | undefined) => (
    <TouchableWithoutFeedback onPress={() => setSecureTextEntry(!secureTextEntry)}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  return (
    <Input
      value={value}
      label={() => <Body style={{ marginBottom: 5 }}>{'Password'}</Body>}
      placeholder=""
      caption={caption}
      accessoryRight={showPassIcon}
      secureTextEntry={secureTextEntry}
      autoFocus={false}
      onChangeText={(nextValue) => setValue(nextValue)}
      onBlur={onBlur}
      status={status}
      textStyle={{ color: COLORS.white }}
      style={{
        marginBottom: 10,
        backgroundColor: COLORS.primary,
        borderColor: COLORS.white,
      }}
    />
  );
};

export default PasswordInput;
