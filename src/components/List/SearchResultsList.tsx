import React from 'react';
import { Divider, List, ListItem } from '@ui-kitten/components';

type iListItem = {
  title: string;
  description: string;
  onPress: () => void;
};

type iSearchResultsListProps = {
  data: iListItem[];
};

const SearchResultsList = (props: iSearchResultsListProps) => {
  const { data } = props;

  return (
    <List
      style={{ maxHeight: 200, width: '90%' }}
      data={data}
      ItemSeparatorComponent={Divider}
      renderItem={({ item }: { item: iListItem }) => (
        <ListItem
          title={item.title}
          description={item.description}
          onPress={item.onPress}
        />
      )}
    />
  );
};

export default SearchResultsList;
