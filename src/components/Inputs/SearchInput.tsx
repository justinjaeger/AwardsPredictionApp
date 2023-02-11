import React from 'react';
import { Input, Spinner } from '@ui-kitten/components';
import { EvaStatus } from '@ui-kitten/components/devsupport';
import CustomIcon from '../CustomIcon';
import COLORS from '../../constants/colors';
import { View } from 'react-native';
import { HEADER_HEIGHT } from '../../constants';
import { useSearch } from '../../context/ContenderSearchContext';

// MUST WRAP IN SearchProvider
const SearchInput = (props: {
  label?: string;
  placeholder?: string;
  caption?: string;
  onBlur?: () => void;
  status?: EvaStatus;
  style?: any;
}) => {
  const { label, placeholder, caption, onBlur, status, style } = props;

  const { searchInput, setSearchInput, isLoadingSearch } = useSearch();

  return (
    <View>
      <Input
        label={label}
        value={searchInput}
        placeholder={placeholder}
        placeholderTextColor={COLORS.gray}
        onChangeText={setSearchInput}
        caption={caption}
        onFocus={() => {}}
        onBlur={() => {
          onBlur && onBlur();
        }}
        status={status || 'basic'}
        style={{
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
          height: HEADER_HEIGHT - 15,
          fontSize: 16,
          color: COLORS.white,
        }}
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
      {isLoadingSearch ? (
        <View
          style={{
            position: 'absolute',
            right: 20,
            top: 9,
            justifyContent: 'center',
            height: HEADER_HEIGHT,
          }}
        >
          <Spinner size="medium" style={{ borderColor: COLORS.gray }} />
        </View>
      ) : null}
    </View>
  );
};

export default SearchInput;
