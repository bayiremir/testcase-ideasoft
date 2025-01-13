import {Image, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';
import {COLORS} from '../../constants/COLORS';

const ProductCard = ({item}: any) => {
  const navigation = useNavigation<any>();
  console.log(item.fullName);
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('ProductForm', {name: item.name, id: item.id})
      }
      style={styles.card}>
      <Image
        source={{
          uri: 'https://img.icons8.com/color/96/product.png',
        }}
        style={styles.productImage}
      />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productDetails}>{item.pageTitle}</Text>
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
