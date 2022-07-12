import React from 'react';
import { Input } from '@ui-kitten/components';

const FormInput = (props: {
  label: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { label, value, setValue } = props;
  return <Input label={label} value={value} placeholder="" onChangeText={setValue} />;
};

export default FormInput;
