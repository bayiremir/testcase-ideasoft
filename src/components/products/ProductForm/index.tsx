import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useRoute, RouteProp} from '@react-navigation/native';
import {useGetProductByIdQuery} from '../../../redux/services/ideasoftApi';
import GoBackTabBar from '../../tab_components/GoBackTabBar';
import Lottie from '../../other_components/Lottie';
import {Products2} from '../../../interface/products.interface';
import {styles} from './styles';

interface ProductRouteParams {
  id: number;
  name: string;
}

const ProductForm = () => {
  const route = useRoute<RouteProp<{params: ProductRouteParams}, 'params'>>();
  const {id, name} = route.params;
  const {data, isLoading} = useGetProductByIdQuery(id) as {
    data?: Products2;
    isLoading: boolean;
  };

  return (
    <View style={styles.container}>
      <GoBackTabBar add={false} detail={true} title={name} productId={id} />
      {isLoading || !data ? (
        <Lottie />
      ) : (
        <ScrollView>
          <Image
            style={styles.productImage}
            source={{
              uri:
                data.images?.[0]?.url ||
                'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png',
            }}
            resizeMode="contain"
          />
          <View style={styles.detailsContainer}>
            <Text style={styles.productName}>{data.name}</Text>
            <Text style={styles.productPrice}>{data.price1} ₺</Text>
            {data.discount > 0 && (
              <Text style={styles.productDiscount}>
                İndirimli Fiyat: {data.price1 - data.discount} ₺ (İndirim:{' '}
                {data.discount} ₺)
              </Text>
            )}
            <Text style={styles.productStock}>
              Stok Durumu: {data.stockAmount > 0 ? 'Mevcut' : 'Tükendi'}
            </Text>
            <Text style={styles.productWarranty}>
              Garanti Süresi: {data.warranty} ay
            </Text>
            <Text style={styles.productBrand}>
              Dağıtıcı: {data.distributor || 'Belirtilmemiş'}
            </Text>
            <Text style={styles.productSKU}>Barkod: {data.barcode}</Text>
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.sectionTitle}>Ürün Açıklaması</Text>
            <Text style={styles.productDescription}>
              {data.metaDescription || 'Açıklama bulunmamaktadır.'}
            </Text>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default ProductForm;
