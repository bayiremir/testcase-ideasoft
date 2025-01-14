import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {Categories} from '../../../interface/categories.interface';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationType} from '../../../interface/navigation.interface';

interface CategoryCardProps {
  item: Categories;
}

const CategoryCard = ({item}: CategoryCardProps) => {
  const navigation = useNavigation<RootNavigationType>();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('CategoryForm', {name: item.name, id: item.id})
      }
      style={styles.card}>
      <Image
        source={{
          uri:
            item.imageUrl ||
            'https://ideacdn.net/idea/kh/32/myassets/std_theme_files/tpl-fexx/assets/uploads/nopic_image.png?revision=1653389725',
        }}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.categoryName}>{item.name}</Text>
        <Text style={styles.categoryDetails}>
          {item.metaDescription || 'Bu kategori için açıklama mevcut değil.'}
        </Text>
        <Text
          style={[styles.status, {color: item.status === 0 ? 'red' : 'green'}]}>
          {item.status === 1 ? 'Durum: Aktif' : 'Durum: Pasif'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CategoryCard;
