import React from 'react';
import { Input, Spinner } from '@ui-kitten/components';
import { EvaStatus } from '@ui-kitten/components/devsupport';
import CustomIcon from '../CustomIcon';
import COLORS from '../../constants/colors';
import { TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { HEADER_HEIGHT } from '../../constants';
import { useSearch } from '../../context/ContenderSearchContext';
import theme from '../../constants/theme';

// MUST WRAP IN SearchProvider
const SearchInput = ({
  handleSearch,
  label,
  placeholder,
  caption,
  onBlur,
  status,
  style,
}: {
  handleSearch: () => void;
  label?: string;
  placeholder?: string;
  caption?: string;
  onBlur?: () => void;
  status?: EvaStatus;
  style?: any;
}) => {
  const { width } = useWindowDimensions();

  const { searchInput, setSearchInput, isLoadingSearch, resetSearch } = useSearch();

  const searchHeight = HEADER_HEIGHT;

  return (
    <View style={{ position: 'relative', width, padding: theme.windowMargin }}>
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
        onSubmitEditing={() => handleSearch()}
        returnKeyType="search"
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
          height: searchHeight,
          fontSize: 20,
          color: COLORS.white,
        }}
        accessoryLeft={
          <CustomIcon
            name="search-outline"
            color={COLORS.gray}
            size={25}
            styles={{ marginLeft: 10 }}
          />
        }
        accessoryRight={
          searchInput.length && !isLoadingSearch ? (
            <TouchableOpacity
              onPress={() => {
                resetSearch();
              }}
            >
              <CustomIcon
                name="close-outline"
                color={COLORS.gray}
                size={25}
                styles={{ marginRight: 2 }}
              />
            </TouchableOpacity>
          ) : undefined
        }
        keyboardAppearance={'dark'}
      />
      {isLoadingSearch ? (
        <View
          style={{
            position: 'absolute',
            right: theme.windowMargin + 15,
            top: searchHeight / 2 + 2,
            justifyContent: 'center',
            height: searchHeight,
          }}
        >
          <Spinner size="medium" style={{ borderColor: COLORS.gray }} />
        </View>
      ) : null}
    </View>
  );
};

export default SearchInput;
