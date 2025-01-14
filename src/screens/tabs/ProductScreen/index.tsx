import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState, useCallback} from 'react';
import GoBackTabBar from '../../../components/tab_components/GoBackTabBar';
import ProductList from '../../../components/products/ProductList';
import {styles} from './styles';
import {useGetProductsQuery} from '../../../redux/services/ideasoftApi';
import Lottie from '../../../components/other_components/Lottie';
import {useFocusEffect} from '@react-navigation/native';

const filtersData = [
  {key: 'fastShipping', label: 'Hızlı Gönderim'},
  {key: 'freeShipping', label: 'Ücretsiz Kargo'},
  {key: 'limitedStock', label: 'Sınırlı Stok'},
];

const ProductScreen = () => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const queryParams = selectedFilters.length
    ? {buttonType: selectedFilters.join(',')}
    : {};

  const {data, isLoading, refetch} = useGetProductsQuery(queryParams);

  const toggleFilter = (key: string) => {
    setSelectedFilters(prev =>
      prev.includes(key)
        ? prev.filter(filter => filter !== key)
        : [...prev, key],
    );
  };

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  return (
    <View style={styles.container}>
      <GoBackTabBar change={true} add={true} title={'Ürünler Listesi'} />
      <View style={styles.filtersContainer}>
        {filtersData.map(filter => (
          <TouchableOpacity
            key={filter.key}
            style={[
              styles.filterButton,
              selectedFilters.includes(filter.key) && styles.selectedFilter,
            ]}
            onPress={() => toggleFilter(filter.key)}>
            <Text
              style={[
                styles.filterText,
                selectedFilters.includes(filter.key) &&
                  styles.selectedFilterText,
              ]}>
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
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
