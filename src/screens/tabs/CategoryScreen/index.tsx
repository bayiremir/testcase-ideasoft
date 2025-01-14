import {View} from 'react-native';
import React, {useCallback} from 'react';
import GoBackTabBar from '../../../components/tab_components/GoBackTabBar';
import {useGetCategoriesQuery} from '../../../redux/services/ideasoftApi';
import Lottie from '../../../components/other_components/Lottie';
import {styles} from './styles';
import CategoryList from '../../../components/categories/CategoryList';
import {useFocusEffect} from '@react-navigation/native';

const CategoryScreen = () => {
  const {data, isLoading, refetch} = useGetCategoriesQuery();

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  return (
    <View style={styles.container}>
      <GoBackTabBar
        add={false}
        addcategory={true}
        title={'Kategoriler'}
        detail={false}
      />
      {isLoading ? (
        <Lottie />
      ) : (
        <CategoryList
          isLoading={isLoading}
          data={data ?? []}
          refetch={refetch}
        />
      )}
    </View>
  );
};

export default CategoryScreen;
