import React from 'react';
import { Input } from '@ui-kitten/components';
import { iTextContentType } from './types';
import { EvaStatus } from '@ui-kitten/components/devsupport';
import COLORS from '../../constants/colors';
import { Body } from '../Text';

const FormInput = ({
  value,
  setValue,
  label,
  placeholder,
  textContentType,
  isYear,
  caption,
  onBlur,
  status,
  style,
  autoFocus,
  multiline,
}: {
  value: string;
  setValue: (v: string) => void;
  label?: string;
  placeholder?: string;
  textContentType?: iTextContentType;
  isYear?: boolean;
  caption?: string;
  onBlur?: () => void;
  status?: EvaStatus;
  style?: any;
  autoFocus?: boolean;
  multiline?: boolean;
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

  const _status: EvaStatus = status || 'basic';

  return (
    <Input
      value={value}
      label={label}
      placeholder={placeholder}
      placeholderTextColor={COLORS.gray}
      multiline={multiline}
      onChangeText={onChangeText}
      textContentType={textContentType}
      caption={
        <Body
          style={{
            color: ['warning', 'danger'].includes(_status)
              ? COLORS.warning
              : COLORS.white,
          }}
        >
          {caption || ''}
        </Body>
      }
      onBlur={onBlur}
      status={_status}
      textStyle={{
        color: 'rgba(255,255,255,0.8)',
        fontSize: 18,
        padding: 5,
        minHeight: multiline ? 100 : undefined,
      }}
      autoFocus={autoFocus}
      style={{
        backgroundColor: 'transparent',
        borderColor: COLORS.white,
        ...style,
      }}
    />
  );
};

export default FormInput;
