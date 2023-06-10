import React from 'react';
import { Divider, List, ListItem } from '@ui-kitten/components';
import Poster from '../Images/Poster';

type iSearchListItem = {
  title: string;
  image: string | null;
  onPress: () => void;
  description?: string;
};

type iSearchResultsListProps = {
  data: iSearchListItem[];
};

const Item = ({ item }: { item: iSearchListItem }) => (
  <ListItem
    title={item.title}
    description={item.description}
    onPress={item.onPress}
    accessoryLeft={<Poster path={item.image} title={item.title} />}
  />
);

const SearchResultsList = (props: iSearchResultsListProps) => {
  const { data } = props;

  return (
    <List
      style={{ maxHeight: '80%', width: '90%' }}
      data={data}
      ItemSeparatorComponent={Divider}
      renderItem={Item}
    />
  );
};

export default SearchResultsList;
