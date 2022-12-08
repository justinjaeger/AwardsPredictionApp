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
  resetSearchHack?: boolean;
  label?: string;
  placeholder?: string;
  caption?: string;
  onBlur?: () => void;
  status?: EvaStatus;
  style?: any;
}) => {
  const {
    handleSearch,
    resetSearchHack,
    label,
    placeholder,
    caption,
    onBlur,
    status,
    style,
  } = props;

  const [searchInput, setSearchInput] = useState<string>('');
  const [searching, setSearching] = useState<boolean>(false);
  const debouncedSearch = useDebounce(searchInput, 500, { trailing: true });

  // Enables us to reset the search bar from the outer component
  useEffect(() => {
    setSearchInput('');
    setSearching(false);
  }, [resetSearchHack]);

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
        placeholderTextColor={COLORS.gray}
        onChangeText={setSearchInput}
        caption={caption}
        onBlur={onBlur}
        status={status || 'basic'}
        style={{
          marginBottom: 10,
          borderRadius: 100,
          borderWidth: 0,
          backgroundColor: COLORS.primaryLight,
          color: 'green',
          ...style,
        }}
        selectionColor={COLORS.gray} // the cursor
        textStyle={{
          marginLeft: 10,
          marginRight: '20%',
          height: INPUT_HEIGHT - 15,
          fontSize: 16,
          color: COLORS.white,
        }}
        autoFocus
        accessoryLeft={() => (
          <CustomIcon
            name="search-outline"
            color={COLORS.gray}
            size={25}
            styles={{ marginLeft: 10 }}
          />
        )}
        keyboardAppearance={'dark'}
      />
      {searching ? (
        <View
          style={{
            position: 'absolute',
            top: 18,
            right: 20,
            justifyContent: 'center',
            height: INPUT_HEIGHT,
          }}
        >
          <Spinner
            size="medium"
            status="secondary"
            style={{ borderColor: COLORS.gray }}
          />
        </View>
      ) : null}
    </View>
  );
};

export default SearchInput;
