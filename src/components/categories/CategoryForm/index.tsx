import {Text, View} from 'react-native';
import React, {useCallback} from 'react';
import {RouteProp, useFocusEffect, useRoute} from '@react-navigation/native';
import {useGetCategoryByIdQuery} from '../../../redux/services/ideasoftApi';
import {Categories} from '../../../interface/categories.interface';
import Lottie from '../../other_components/Lottie';
import {styles} from './styles';
import GoBackTabBar from '../../tab_components/GoBackTabBar';

interface CategoryRouteParams {
  id: number;
  name: string;
}
const CategoryForm = () => {
  const route = useRoute<RouteProp<{params: CategoryRouteParams}, 'params'>>();
  const {id, name} = route.params;
  const {data, isLoading, refetch} = useGetCategoryByIdQuery(id) as {
    data?: Categories;
    isLoading: boolean;
    refetch: () => void;
  };

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  return (
    <View style={styles.container}>
      <GoBackTabBar add={false} category={true} title={name} categoryId={id} />
      {isLoading ? (
        <Lottie />
      ) : (
        <View style={styles.categoryContainer}>
          <Text style={styles.categoryName}>{data?.name}</Text>
          <Text style={styles.categoryDetails}>
            {data?.metaDescription || 'Bu kategori için açıklama mevcut değil.'}
          </Text>
          <Text
            style={[
              styles.status,
              // eslint-disable-next-line react-native/no-inline-styles
              {color: data?.status === 0 ? 'red' : 'green'},
            ]}>
            {data?.status === 1 ? 'Durum: Aktif' : 'Durum: Pasif'}
          </Text>
        </View>
      )}
    </View>
  );
};

export default CategoryForm;
