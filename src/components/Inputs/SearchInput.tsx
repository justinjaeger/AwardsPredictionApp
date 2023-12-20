import React, { useState } from 'react';
import { Input, Spinner } from '@ui-kitten/components';
import { EvaStatus } from '@ui-kitten/components/devsupport';
import CustomIcon from '../CustomIcon';
import COLORS from '../../constants/colors';
import { Keyboard, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import theme from '../../constants/theme';
import useDevice from '../../util/device';

const SearchInput = ({
  handleSearch,
  onReset,
  label,
  placeholder,
  caption,
  onBlur,
  status,
  autoFocus,
  style,
}: {
  handleSearch: (s: string) => void;
  onReset?: () => void;
  label?: string;
  placeholder?: string;
  caption?: string;
  onBlur?: () => void;
  status?: EvaStatus;
  autoFocus?: boolean;
  style?: any;
}) => {
  const { width } = useWindowDimensions();
  const { isPad } = useDevice();

  const [search, setSearch] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const resetSearch = () => {
    onReset && onReset();
    setSearch('');
  };

  const searchHeight = isPad ? 40 : 30;

  return (
    <View
      style={{
        position: 'relative',
        width,
        padding: 10,
      }}
    >
      <Input
        label={label}
        value={search}
        placeholder={placeholder}
        placeholderTextColor={COLORS.gray}
        onChangeText={(s) => {
          if (s === '') {
            resetSearch();
          }
          setSearch(s);
        }}
        caption={caption}
        onFocus={() => {}}
        onBlur={() => onBlur && onBlur()}
        autoFocus={autoFocus}
        onSubmitEditing={async () => {
          setIsLoading(true);
          await handleSearch(search);
          setIsLoading(false);
        }}
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
          isLoading ? (
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
          ) : search.length ? (
            <View>
              <TouchableOpacity
                onPress={() => {
                  resetSearch();
                  Keyboard.dismiss();
                }}
                style={{
                  paddingLeft: 20,
                  paddingRight: 20,
                  left: -10,
                  width: searchHeight,
                  height: searchHeight,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <CustomIcon
                  name="close-outline"
                  color={COLORS.gray}
                  size={25}
                  styles={{ marginRight: 2 }}
                />
              </TouchableOpacity>
            </View>
          ) : undefined
        }
        keyboardAppearance={'dark'}
      />
    </View>
  );
};

export default SearchInput;
