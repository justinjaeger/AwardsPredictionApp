import React from 'react';
import { Input } from '@ui-kitten/components';
import { iTextContentType } from './types';
import { EvaStatus } from '@ui-kitten/components/devsupport';
import COLORS from '../../constants/colors';
import { Body } from '../Text';

const FormInput = ({
  label,
  value,
  setValue,
  textContentType,
  isYear,
  caption,
  onBlur,
  status,
  style,
  autoFocus,
}: {
  label: string;
  value: string;
  setValue: (v: string) => void;
  textContentType?: iTextContentType;
  isYear?: boolean;
  caption?: string;
  onBlur?: () => void;
  status?: EvaStatus;
  style?: any;
  autoFocus?: boolean;
}) => {
  const onChangeText = (v: string) => {
    if (isYear) {
      if (/^[0-9]*$/.test(v) === true && v.length <= 4) {
        setValue(v.toLowerCase());
      }
      return;
    }
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
      case 'name':
        if (/^[a-zA-Z0-9 ]*$/.test(v) === true) {
          setValue(v);
        }
        break;
      default:
        setValue(v);
    }
  };

  return (
    <Input
      label={() => <Body style={{ marginBottom: 5 }}>{label}</Body>}
      value={value}
      placeholder=""
      onChangeText={onChangeText}
      textContentType={textContentType}
      caption={caption}
      onBlur={onBlur}
      status={status || 'basic'}
      textStyle={{ color: COLORS.white }}
      autoFocus={autoFocus}
      style={{
        marginBottom: 10,
        backgroundColor: 'transparent',
        borderColor: COLORS.white,
        ...style,
      }}
    />
  );
};

export default FormInput;
