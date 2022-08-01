import React from 'react';
import { Input } from '@ui-kitten/components';
import { iTextContentType } from './types';
import { EvaStatus } from '@ui-kitten/components/devsupport';

const FormInput = (props: {
  label: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  textContentType?: iTextContentType;
  caption?: string;
  onBlur?: () => void;
  status?: EvaStatus;
}) => {
  const { label, value, setValue, textContentType, caption, onBlur, status } = props;

  const onChangeText = (v: string) => {
    switch (textContentType) {
      case 'emailAddress':
        setValue(v.toLowerCase());
        break;
      case 'username':
        if (/^[a-zA-Z0-9_.]*$/.test(v) === true) {
          setValue(v.toLowerCase());
        }
        break;
      case 'oneTimeCode':
        if (/^[0-9]*$/.test(v) === true && v.length <= 6) {
          setValue(v.toLowerCase());
        }
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
      caption={caption}
      onBlur={onBlur}
      status={status || 'basic'}
      style={{ marginBottom: 10 }}
    />
  );
};

export default FormInput;
