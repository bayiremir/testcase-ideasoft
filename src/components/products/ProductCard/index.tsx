import {Image, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';
import {COLORS} from '../../constants/COLORS';
import {Products2} from '../../../interface/products.interface';
import {RootNavigationType} from '../../../interface/navigation.interface';
import {useSelector} from 'react-redux';

interface ProductCardProps {
  item: Products2;
}

const ProductCard = ({item}: ProductCardProps) => {
  const navigation = useNavigation<RootNavigationType>();
  const {listview} = useSelector((state: any) => state.userSlice);
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('ProductForm', {name: item.name, id: item.id})
      }
      style={listview === 1 ? styles.card : styles.gridCard}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: item?.images?.[0]?.url
              ? item.images[0].url
              : 'https://ideacdn.net/idea/kh/32/myassets/std_theme_files/tpl-fexx/assets/uploads/nopic_image.png?revision=1653389725',
          }}
          style={styles.productImage}
        />
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>
          {item.price1} {item.currency?.abbr || 'TL'}
        </Text>
        <Text
          style={[
            styles.productStock,
            {color: item.stockAmount === 0 ? 'red' : COLORS.textPrimary},
          ]}>
          Stok: {item.stockAmount} {item.stockTypeLabel}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;
