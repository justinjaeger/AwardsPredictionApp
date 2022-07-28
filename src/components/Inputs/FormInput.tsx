import React from 'react';
import { Input } from '@ui-kitten/components';
import { iTextContentType } from './types';

const FormInput = (props: {
  label: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  textContentType?: iTextContentType;
}) => {
  const { label, value, setValue, textContentType } = props;

  const onChangeText = (v: string) => {
    switch (textContentType) {
      case 'emailAddress':
        setValue(v.toLowerCase());
        break;
      default:
        setValue(v);
    }
  };

  return (
    <Input
      label={label}
      value={value}
      placeholder=""
      onChangeText={onChangeText}
      textContentType={textContentType}
    />
  );
};

export default FormInput;
