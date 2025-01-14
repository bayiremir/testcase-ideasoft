import {FlatList, RefreshControl, View} from 'react-native';
import React from 'react';
import {CategoriesList} from '../../../interface/categories.interface';
import {styles} from './styles';
import CategoryCard from '../CategoryCard';
import Lottie from '../../other_components/Lottie';

const CategoryList = ({
  data,
  refetch,
  isLoading,
}: {
  data: CategoriesList;
  isLoading: boolean;
  refetch: () => void;
}) => {
  return (
    <View style={styles.container}>
      {isLoading ? (
        <Lottie />
      ) : (
        <FlatList
          data={data}
          contentContainerStyle={{paddingBottom: 50}}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => <CategoryCard item={item} />}
          keyExtractor={item => item.id.toString()}
          refreshControl={
            <RefreshControl
              style={styles.refresh}
              refreshing={isLoading}
              onRefresh={refetch}
            />
          }
        />
      )}
    </View>
  );
};

export default CategoryList;
