import React from 'react';
import { Input } from '@ui-kitten/components';
import { EvaStatus } from '@ui-kitten/components/devsupport';

const SearchInput = (props: {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  label?: string;
  caption?: string;
  onBlur?: () => void;
  status?: EvaStatus;
  style?: any;
}) => {
  const { search, setSearch, label, caption, onBlur, status, style } = props;

  return (
    <Input
      label={label}
      value={search}
      placeholder=""
      onChangeText={setSearch}
      caption={caption}
      onBlur={onBlur}
      status={status || 'basic'}
      style={{ marginBottom: 10, ...style }}
    />
  );
};

export default SearchInput;
