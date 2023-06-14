import React, { useState } from 'react';
import { TouchableHighlight, View } from 'react-native';
import BasicModal from '../../../components/BasicModal';
import { iCategory } from '../../../types';
import { Body } from '../../../components/Text';
import { CategoryIsShortlisted } from '../../../API';
import LoadingStatueModal from '../../../components/LoadingStatueModal';
import COLORS from '../../../constants/colors';
import { FAB } from '../../../components/Buttons/FAB';
import useMutationUpdateCategoryIsShortlisted from '../../../hooks/mutations/updateCategoryIsShortlisted';
import { IS_SHORTLISTED_TO_STRING } from '../../../constants/categories';
import { useNavigation } from '@react-navigation/native';

/**
 * Lets you change visibility on an item
 */
const UpdateCategoryShortlistedModal = (props: {
  visible: boolean;
  onClose: () => void;
  category: iCategory;
  onSaveSuccess: () => void; // basically hides the modal
}) => {
  const { visible, onClose, category, onSaveSuccess } = props;
  const initialIsShortlisted = category.isShortlisted;

  const navigation = useNavigation();

  const { updateContenderIsShortlisted, isComplete } =
    useMutationUpdateCategoryIsShortlisted(() => navigation.goBack());

  const [isShortlisted, setIsShortlisted] =
    useState<CategoryIsShortlisted>(initialIsShortlisted);

  const onSetIsShortlisted = async () => {
    if (isShortlisted) {
      updateContenderIsShortlisted({
        categoryId: category.id,
        isShortlisted,
      });
      onSaveSuccess();
    }
  };

  return (
    <>
      <LoadingStatueModal visible={!isComplete} text={'Saving changes...'} />
      <BasicModal
        visible={visible}
        onClose={onClose}
        width={'100%'}
        height={'50%'}
        header={{ title: 'Set Category Is Shortlisted' }}
      >
        <>
          <View style={{ flexDirection: 'column' }}>
            {[...Object.entries(IS_SHORTLISTED_TO_STRING)].map(
              ([isShortlistedKey, text]) => {
                return (
                  <View key={isShortlistedKey}>
                    <TouchableHighlight
                      style={{
                        backgroundColor:
                          isShortlistedKey === isShortlisted
                            ? COLORS.secondaryDark
                            : 'transparent',
                        height: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() => {
                        setIsShortlisted(isShortlistedKey as CategoryIsShortlisted);
                      }}
                    >
                      <Body style={{ padding: 10 }}>{text || 'undefined'}</Body>
                    </TouchableHighlight>
                  </View>
                );
              },
            )}
          </View>
          <FAB
            iconName="checkmark"
            text="Save"
            onPress={onSetIsShortlisted}
            visible={initialIsShortlisted !== isShortlisted}
          />
        </>
      </BasicModal>
    </>
  );
};

export default UpdateCategoryShortlistedModal;
