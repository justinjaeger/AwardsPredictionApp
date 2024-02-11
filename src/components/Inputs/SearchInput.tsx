import React, { useState } from 'react';
import { Spinner } from '@ui-kitten/components';
import { EvaStatus } from '@ui-kitten/components/devsupport';
import CustomIcon from '../CustomIcon';
import COLORS from '../../constants/colors';
import {
  Keyboard,
  StyleProp,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import theme from '../../constants/theme';
import useDevice from '../../util/device';
import { BodyBold } from '../Text';

const SearchInput = ({
  handleSearch,
  searchIsActive,
  onReset,
  placeholder,
  onBlur,
  onFocus,
  autoFocus,
  style,
}: {
  handleSearch: (s: string) => void;
  searchIsActive?: boolean;
  onReset?: () => void;
  label?: string;
  placeholder?: string;
  caption?: string;
  onBlur?: () => void;
  onFocus?: () => void;
  status?: EvaStatus;
  autoFocus?: boolean;
  style?: StyleProp<ViewStyle>;
}) => {
  const { isPad } = useDevice();

  const [search, setSearch] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const resetSearch = () => {
    setSearch('');
  };

  const closeSearch = () => {
    resetSearch();
    onReset && onReset();
    Keyboard.dismiss();
  };

  const searchHeight = isPad ? 45 : 35;

  return (
    <View style={[{ flexDirection: 'row', padding: 10 }, style]}>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          height: searchHeight,
        }}
      >
        <View
          style={{
            position: 'relative',
            width: searchIsActive ? '80%' : '100%',
          }}
        >
          <TextInput
            style={{
              height: searchHeight,
              borderRadius: 100,
              backgroundColor: COLORS.primaryLight,
              paddingLeft: 45,
              color: COLORS.white,
              fontSize: 16,
            }}
            value={search}
            placeholder={placeholder}
            placeholderTextColor={COLORS.gray}
            onChangeText={(s) => {
              if (s === '') {
                resetSearch();
              }
              setSearch(s);
            }}
            onFocus={() => {
              onFocus && onFocus();
            }}
            onBlur={() => {
              onBlur && onBlur();
            }}
            autoFocus={autoFocus}
            onSubmitEditing={async () => {
              if (search.length) {
                setIsLoading(true);
                await handleSearch(search);
                setIsLoading(false);
              }
            }}
            returnKeyType={'search'}
            selectionColor={COLORS.gray} // the cursor
            keyboardAppearance={'dark'}
          />
          <View
            style={{
              position: 'absolute',
              left: 0,
              height: searchHeight,
              justifyContent: 'center',
            }}
          >
            <CustomIcon
              name="search-outline"
              color={COLORS.gray}
              size={25}
              styles={{ marginLeft: 10 }}
            />
          </View>
          <View
            style={{
              position: 'absolute',
              right: 10,
              height: searchHeight,
              justifyContent: 'center',
            }}
          >
            {isLoading ? (
              <Spinner size="small" style={{ borderColor: COLORS.gray }} />
            ) : search.length ? (
              <TouchableOpacity
                onPress={() => {
                  resetSearch();
                  Keyboard.dismiss();
                }}
              >
                <CustomIcon
                  name="close-outline"
                  color={COLORS.gray}
                  size={25}
                  styles={{ marginRight: 2 }}
                />
              </TouchableOpacity>
            ) : undefined}
          </View>
        </View>
        {searchIsActive ? (
          <View
            style={{
              width: '20%',
              justifyContent: 'center',
              paddingLeft: 10,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                closeSearch();
              }}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: COLORS.primaryLight,
                borderRadius: theme.borderRadius,
                height: '100%',
              }}
            >
              <BodyBold>Close</BodyBold>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default SearchInput;
