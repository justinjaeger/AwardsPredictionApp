import React, { useState } from 'react';
import { Icon, Input } from '@ui-kitten/components';
import { ImageProps, TouchableWithoutFeedback } from 'react-native';
import { EvaStatus } from '@ui-kitten/components/devsupport';
import COLORS from '../../constants/colors';
import { SubHeaderLight } from '../Text';

const PasswordInput = (props: {
  value: string;
  setValue: (v: string) => void;
  label?: string;
  caption?: string;
  onBlur?: () => void;
  status?: EvaStatus;
}) => {
  const { value, setValue, label, caption, onBlur, status } = props;

  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);

  const showPassIcon = (props: Partial<ImageProps> | undefined) => (
    <TouchableWithoutFeedback onPress={() => setSecureTextEntry(!secureTextEntry)}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  return (
    <Input
      value={value}
      label={
        <SubHeaderLight style={{ marginBottom: 5 }}>{label || 'Password'}</SubHeaderLight>
      }
      placeholder=""
      caption={caption}
      accessoryRight={showPassIcon}
      secureTextEntry={secureTextEntry}
      autoFocus={false}
      onChangeText={(nextValue) => setValue(nextValue)}
      onBlur={onBlur}
      status={status}
      style={{
        marginBottom: 10,
        backgroundColor: COLORS.primary,
        borderColor: COLORS.white,
      }}
      textStyle={{
        color: 'rgba(255,255,255,0.8)',
        fontSize: 18,
        padding: 5,
      }}
    />
  );
};

export default PasswordInput;
