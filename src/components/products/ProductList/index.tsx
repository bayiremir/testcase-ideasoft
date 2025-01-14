import React from 'react';
import {FlatList, View, StyleSheet, RefreshControl} from 'react-native';
import {COLORS} from '../../constants/COLORS';
import ProductCard from '../ProductCard';
import {Products} from '../../../interface/products.interface';

const ProductList = ({
  data,
  refetch,
  isLoading,
}: {
  data: Products;
  isLoading: boolean;
  refetch: () => void;
}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        contentContainerStyle={{paddingBottom: 50}}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => <ProductCard item={item} />}
        keyExtractor={item => item.id.toString()}
        refreshControl={
          <RefreshControl
            style={styles.refresh}
            refreshing={isLoading}
            onRefresh={refetch}
          />
        }
      />
    </View>
  );
};

export default ProductList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  refresh: {
    backgroundColor: COLORS.buttonPrimaryBg,
  },
});
