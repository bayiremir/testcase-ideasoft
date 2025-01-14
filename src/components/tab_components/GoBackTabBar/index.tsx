import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {
  ChevronLeftIcon as ChevronLeftIconOutline,
  PlusCircleIcon as PlusCircleIconOutline,
  TrashIcon as TrashIconOutline,
  Bars3Icon as Bars3IconOutline,
  PencilSquareIcon as PencilSquareIconOutline,
} from 'react-native-heroicons/outline';
import {useNavigation} from '@react-navigation/native';
import {
  useDeleteCategoryMutation,
  useDeleteProductMutation,
} from '../../../redux/services/ideasoftApi';
import {Fonts} from '../../../interface/fonts.enum';
import {useCustomModal} from '../../other_components/Modal/CustomModal/CustomModalProvider';
import {RootNavigationType} from '../../../interface/navigation.interface';
import {useDispatch, useSelector} from 'react-redux';
import {setListView} from '../../../redux/slices/userSlice';
import {storage} from '../../../utils/Storage';
import {COLORS} from '../../constants/COLORS';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {userSliceInitialStateType} from '../../../interface/userslice.interface';

const GoBackTabBar = ({
  title,
  add,
  productId,
  change,
  addcategory,
  product,
  category,
  categoryId,
}: {
  title: string;
  add: boolean;
  productId?: number;
  change?: boolean;
  addcategory?: boolean;
  product?: boolean;
  category?: boolean;
  categoryId?: number;
}) => {
  const navigation = useNavigation<RootNavigationType>();
  const [deleteProduct, {data: deleteProductData}] = useDeleteProductMutation();
  const [deleteCategory, {data: deleteCategoryData}] =
    useDeleteCategoryMutation();
  const {showModal, hideModal} = useCustomModal();
  const dispatch = useDispatch();
  const {listview} = useSelector(
    (state: userSliceInitialStateType) => state.userSlice,
  );
  const insets = useSafeAreaInsets();
  const statusBarHeight = insets.top;
  const confirmDelete = () => {
    showModal({
      type: 'info',
      description: 'Ürünü silmek istediğinizden emin misiniz?',
      buttons: [
        {
          text: 'Hayır',
          onPress: () => {
            hideModal();
          },
          isFocused: true,
        },
        {
          text: 'Evet',
          onPress: () => {
            handleDeleteProduct();
            hideModal();
          },
          isFocused: false,
        },
      ],
    });
  };

  const handleDeleteProduct = async () => {
    if (product) {
      try {
        if (productId !== undefined) {
          await deleteProduct(productId).unwrap();
        }
      } catch (error) {
        console.error('Silme işlemi sırasında hata:', error);
        showModal({
          type: 'error',
          description:
            'Ürün silinirken bir hata oluştu. Lütfen tekrar deneyin.',
          buttons: [
            {
              text: 'Tamam',
              onPress: () => hideModal(),
              isFocused: false,
            },
          ],
        });
      }
    } else if (category) {
      try {
        if (categoryId !== undefined) {
          await deleteCategory(categoryId).unwrap();
        }
      } catch (error) {
        console.error('Silme işlemi sırasında hata:', error);
        showModal({
          type: 'error',
          description:
            'Ürün silinirken bir hata oluştu. Lütfen tekrar deneyin.',
          buttons: [
            {
              text: 'Tamam',
              onPress: () => hideModal(),
              isFocused: false,
            },
          ],
        });
      }
    }
  };

  useEffect(() => {
    if (deleteProductData === null) {
      showModal({
        type: 'success',
        description: 'Ürün başarıyla silindi.',
        buttons: [
          {
            text: 'Tamam',
            onPress: () => {
              hideModal();
              navigation.goBack();
            },
            isFocused: true,
          },
        ],
      });
    } else if (deleteCategoryData === null) {
      showModal({
        type: 'success',
        description: 'Kategori başarıyla silindi.',
        buttons: [
          {
            text: 'Tamam',
            onPress: () => {
              hideModal();
              navigation.goBack();
            },
            isFocused: true,
          },
        ],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteProductData, deleteCategoryData]);

  useEffect(() => {
    console.log('delete', deleteCategoryData);
  }, [deleteCategoryData]);

  const changeListView = async () => {
    const currentListView = listview === 1 ? 2 : 1;
    dispatch(setListView(currentListView));
    await storage.set('listview', currentListView);
  };

  return (
    <View>
      <View style={[styles.tabBarContainer, {marginTop: statusBarHeight}]}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <ChevronLeftIconOutline color="black" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerText}>{title}</Text>
        {product && (
          <View>
            <TouchableOpacity onPress={confirmDelete}>
              <TrashIconOutline color="black" size={24} />
            </TouchableOpacity>
          </View>
        )}
        {category && (
          <View style={styles.rowcontainer}>
            <TouchableOpacity
              style={styles.rightIcon}
              onPress={() => {
                navigation.navigate('CategoryEditScreen', {
                  categoryId: categoryId,
                });
              }}>
              <PencilSquareIconOutline color="black" size={24} />
            </TouchableOpacity>
            <TouchableOpacity onPress={confirmDelete}>
              <TrashIconOutline color="black" size={24} />
            </TouchableOpacity>
          </View>
        )}
        {add && change && (
          <View style={styles.rowcontainer}>
            <TouchableOpacity
              style={styles.rightIcon}
              onPress={() => {
                changeListView();
              }}>
              <Bars3IconOutline
                color={listview === 1 ? 'black' : COLORS.buttonPrimaryBg}
                size={24}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ProductAddScreen', {});
              }}>
              <PlusCircleIconOutline color="black" size={24} />
            </TouchableOpacity>
          </View>
        )}
        {addcategory && (
          <View style={styles.rowcontainer}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('CategoryAddScreen', {});
              }}>
              <PlusCircleIconOutline color="black" size={24} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default GoBackTabBar;

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  headerText: {
    fontSize: 16,
    fontFamily: Fonts.Bold,
  },
  rowcontainer: {
    flexDirection: 'row',
  },
  rightIcon: {
    right: 10,
  },
});
