import React from 'react';
import { ScrollView, TouchableHighlight, View } from 'react-native';
import { Body } from '../../../components/Text';
import BasicModal from '../../../components/BasicModal';
import { iCategory, iEvent } from '../../../types';
import { useTypedNavigation } from '../../../util/hooks';
import { AdminParamList } from '../../../navigation/types';
import { getAwardsBodyCategories } from '../../../constants/categories';
import sortByObjectOrder from '../../../util/sortByObjectOrder';
import { CategoryName } from '../../../API';
import { useCategory } from '../../../context/CategoryContext';

const SelectCategoryModal = (props: {
  event: iEvent;
  visible: boolean;
  onClose: () => void;
}) => {
  const { visible, onClose, event } = props;
  const { setCategory, setEvent } = useCategory();
  const navigation = useTypedNavigation<AdminParamList>();

  const onSelectCategory = async (category: iCategory) => {
    // navigate to category
    // just need the categroy id to make the react query query for categories
    setCategory(category);
    setEvent(event);
    navigation.navigate('ManageContenders');
    onClose();
  };

  const ITEM_HEIGHT = 50;

  const categoryList = Object.values(event.categories);
  const awardsBodyCategories = getAwardsBodyCategories(event.awardsBody, event.year);
  const categories = sortByObjectOrder<CategoryName, iCategory>(
    awardsBodyCategories,
    categoryList,
    categoryList.map((cat) => CategoryName[cat.name]),
  );

  return (
    <BasicModal
      visible={visible}
      onClose={onClose}
      width={'100%'}
      height={'50%'}
      header={{ title: 'Edit Status' }}
    >
      <View
        style={{
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            paddingBottom: categories.length * ITEM_HEIGHT - 400,
          }}
        >
          <>
            {categories.map((category) => {
              if (!category) return null;
              return (
                <TouchableHighlight
                  key={category.id}
                  style={{
                    height: ITEM_HEIGHT,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={() => {
                    onSelectCategory(category);
                  }}
                >
                  <Body style={{ padding: 10 }}>{category.name}</Body>
                </TouchableHighlight>
              );
            })}
          </>
        </ScrollView>
      </View>
    </BasicModal>
  );
};

export default SelectCategoryModal;
