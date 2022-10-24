import { useNavigation } from '@react-navigation/native';
import _ from 'lodash';
import { useCallback, useEffect, useState } from 'react';

type NavigationParams<
  ParamList,
  RouteName extends keyof ParamList
> = ParamList[RouteName];

export const useTypedNavigation = <ParamList>() => {
  const navigation = useNavigation();
  const navigate = (
    routeName: keyof ParamList,
    params?: NavigationParams<ParamList, keyof ParamList>,
  ) =>
    navigation.navigate(
      // @ts-ignore
      routeName,
      // @ts-ignore
      params,
    );
  return { ...navigation, navigate };
};

export const useAsyncEffect = (effect: () => Promise<void>, deps: any[]) => {
  useEffect(() => {
    (async () => {
      await effect();
    })();
  }, deps);
};

/**
 * useAsyncEffect that reloads every time the page is focused
 * useful for when we make a change, go back, and want to see that change updated
 */
export const useSubscriptionEffect = (effect: () => Promise<void>, deps: any[]) => {
  const navigation = useNavigation();

  const [trigger, setTrigger] = useState<boolean>(false);

  navigation.addListener('focus', () => {
    setTrigger(!trigger);
  });

  useAsyncEffect(async () => {
    await effect();
  }, [trigger, ...deps]);
};

/**
 * use like so:
 * const [search, setSearch] = useState();
 * const debouncedSearch = useDebounce(search, 500, { trailing: true });
 * useEffect(() => executeSearch(), [debouncedSearch])
 */
export const useDebounce = <T>(value: T, delay = 1000, options?: _.DebounceSettings) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  const debounce = useCallback(
    _.debounce(
      (_prop: T) => {
        setDebouncedValue(_prop);
      },
      delay,
      options,
    ),
    [],
  );

  useEffect(() => debounce(value), [value]);

  return debouncedValue;
};
