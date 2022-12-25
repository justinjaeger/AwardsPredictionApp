import React from 'react';
import { Input } from '@ui-kitten/components';
import { iTextContentType } from './types';
import { EvaStatus } from '@ui-kitten/components/devsupport';
import { titleCase } from 'title-case';
import COLORS from '../../constants/colors';
import { Body } from '../Text';

const FormInput = (props: {
  label: string;
  value: string;
  setValue: (v: string) => void;
  textContentType?: iTextContentType;
  isYear?: boolean;
  caption?: string;
  onBlur?: () => void;
  status?: EvaStatus;
  style?: any;
}) => {
  const {
    label,
    value,
    setValue,
    textContentType,
    isYear,
    caption,
    onBlur,
    status,
    style,
  } = props;

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
        setValue(titleCase(v));
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
      style={{
        marginBottom: 10,
        backgroundColor: COLORS.primary,
        borderColor: COLORS.white,
        ...style,
      }}
    />
  );
};

export default FormInput;
