import {View} from 'react-native';
import React, {useCallback} from 'react';
import GoBackTabBar from '../../../components/tab_components/GoBackTabBar';
import ProductList from '../../../components/products/ProductList';
import {styles} from './styles';
import {useGetProductsQuery} from '../../../redux/services/ideasoftApi';
import Lottie from '../../../components/other_components/Lottie';
import {useFocusEffect} from '@react-navigation/native';

const ProductScreen = () => {
  const {data, isLoading, refetch} = useGetProductsQuery();

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  return (
    <View style={styles.container}>
      <GoBackTabBar
        change={true}
        add={true}
        detail={false}
        title={'Ürünler Listesi'}
      />
      {isLoading ? (
        <Lottie />
      ) : (
        <ProductList
          isLoading={isLoading}
          data={data ?? []}
          refetch={refetch}
        />
      )}
    </View>
  );
};

export default ProductScreen;
