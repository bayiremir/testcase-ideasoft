import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import React from 'react';
import {
  ChevronLeftIcon as ChevronLeftIconOutline,
  PlusCircleIcon as PlusCircleIconOutline,
  TrashIcon as TrashIconOutline,
} from 'react-native-heroicons/outline';
import {useNavigation} from '@react-navigation/native';
import {useDeleteProductMutation} from '../../../redux/services/ideasoftApi';
import {Fonts} from '../../../interface/fonts.enum';
import {useCustomModal} from '../../other_components/Modal/CustomModal/CustomModalProvider';

const GoBackTabBar = ({
  title,
  detail,
  add,
  productId,
}: {
  title: string;
  detail: boolean;
  add: boolean;
  productId?: number;
}) => {
  const navigation = useNavigation();
  const [deleteProduct] = useDeleteProductMutation();
  const {showModal, hideModal} = useCustomModal();

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
            handleDelete();
            hideModal();
          },
          isFocused: false,
        },
      ],
    });
  };

  const handleDelete = async () => {
    if (productId) {
      try {
        await deleteProduct(productId).unwrap();
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

  return (
    <View>
      <View style={styles.tabBarContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <ChevronLeftIconOutline color="black" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerText}>{title}</Text>
        {detail && productId && (
          <View>
            <TouchableOpacity onPress={confirmDelete}>
              <TrashIconOutline color="black" size={24} />
            </TouchableOpacity>
          </View>
        )}
        {add && (
          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ProductAddScreen');
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
    paddingTop: 50,
    marginVertical: 10,
  },
  headerText: {
    fontSize: 18,
    fontFamily: Fonts.Bold,
  },
});
