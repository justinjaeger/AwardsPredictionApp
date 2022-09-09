import React, { useEffect, useState } from 'react';
import { Input, Spinner } from '@ui-kitten/components';
import { EvaStatus } from '@ui-kitten/components/devsupport';
import CustomIcon from '../CustomIcon';
import COLORS from '../../constants/colors';
import { useDebounce } from '../../util/hooks';
import { View } from 'react-native';

const INPUT_HEIGHT = 50;

const SearchInput = (props: {
  handleSearch: (s: string) => void;
  label?: string;
  placeholder?: string;
  caption?: string;
  onBlur?: () => void;
  status?: EvaStatus;
  style?: any;
}) => {
  const { handleSearch, label, placeholder, caption, onBlur, status, style } = props;

  const [searchInput, setSearchInput] = useState<string>('');
  const [searching, setSearching] = useState<boolean>(false);
  const debouncedSearch = useDebounce(searchInput, 500, { trailing: true });

  useEffect(() => {
    setSearching(true);
    if (searchInput === '') setSearching(false);
  }, [searchInput]);

  useEffect(() => {
    handleSearch(searchInput);
    setSearching(false);
  }, [debouncedSearch]);

  return (
    <View>
      <Input
        label={label}
        value={searchInput}
        placeholder={placeholder}
        onChangeText={setSearchInput}
        caption={caption}
        onBlur={onBlur}
        status={status || 'basic'}
        style={{ marginBottom: 10, borderRadius: 100, ...style }}
        textStyle={{ marginLeft: 10, marginRight: '20%', height: INPUT_HEIGHT - 15 }}
        autoFocus
        accessoryLeft={() => (
          <CustomIcon
            name="search-outline"
            color={COLORS.border}
            size={25}
            styles={{ marginLeft: 10 }}
          />
        )}
      />
      {searching ? (
        <View
          style={{
            position: 'absolute',
            top: 0,
            right: 20,
            justifyContent: 'center',
            height: INPUT_HEIGHT,
          }}
        >
          <Spinner size="medium" status="primary" />
        </View>
      ) : null}
    </View>
  );
};

export default SearchInput;
