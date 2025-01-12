import React from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';

const HomeScreen = () => {
  const navigation = useNavigation<any>();

  return (
    <LinearGradient
      colors={['#6a11cb', '#2575fc']}
      style={styles.container}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}>
      <Text style={styles.title}>Yönetim Paneli</Text>

      <View style={styles.cardContainer}>
        {/* Ürünler */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('ProductScreen', {})}>
          <View style={styles.iconContainer}>
            <Image
              source={{
                uri: 'https://img.icons8.com/color/96/product.png',
              }}
              style={styles.icon}
            />
          </View>
          <Text style={styles.cardTitle}>Ürün Yönetimi</Text>
        </TouchableOpacity>

        {/* Kategoriler */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('CategoryScreen', {})}>
          <View style={styles.iconContainer}>
            <Image
              source={{
                uri: 'https://img.icons8.com/color/96/category.png',
              }}
              style={styles.icon}
            />
          </View>
          <Text style={styles.cardTitle}>Kategori Yönetimi</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default HomeScreen;
