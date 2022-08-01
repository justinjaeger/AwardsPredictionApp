import React, { useState } from 'react';
import { Icon, Input } from '@ui-kitten/components';
import { ImageProps, TouchableWithoutFeedback } from 'react-native';
import { EvaStatus } from '@ui-kitten/components/devsupport';

const PasswordInput = (props: {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
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
      label="Password"
      placeholder=""
      caption={caption}
      accessoryRight={showPassIcon}
      secureTextEntry={secureTextEntry}
      autoFocus={false}
      onChangeText={(nextValue) => setValue(nextValue)}
      onBlur={onBlur}
      status={status}
    />
  );
};

export default PasswordInput;
