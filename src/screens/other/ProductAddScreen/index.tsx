import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardTypeOptions,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import GoBackTabBar from '../../../components/tab_components/GoBackTabBar';
import {pickerSelectStyles, styles} from './styles';
import {
  useCreateProductMutation,
  useGetCategoriesQuery,
} from '../../../redux/services/ideasoftApi';
import {useCustomModal} from '../../../components/other_components/Modal/CustomModal/CustomModalProvider';
import {COLORS} from '../../../components/constants/COLORS';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Lottie from '../../../components/other_components/Lottie';
import RNPickerSelect from 'react-native-picker-select';

const ProductAddScreen = () => {
  const {showModal, hideModal} = useCustomModal();
  const {control, handleSubmit, reset} = useForm({
    defaultValues: {
      name: '',
      fullName: '',
      slug: '',
      sku: '',
      barcode: '',
      stockAmount: '',
      price1: '',
      discount: '',
      tax: '',
      warranty: '',
      distributor: '',
      categoryId: '', // Yeni kategori alanı
      status: 1,
      currency: {id: 1},
    },
  });

  const [createProduct, {isLoading}] = useCreateProductMutation();
  const {data: category, isLoading: categoryLoading} = useGetCategoriesQuery();
  const [currencyId, setCurrencyId] = useState(1);
  const [selectedCategoryId, setSelectedCategoryId] = useState(''); // Kategori seçimi için state

  const onSubmit = async (data: any) => {
    try {
      await createProduct({
        ...data,
        price1: parseFloat(data.price1),
        stockAmount: parseFloat(data.stockAmount),
        discount: parseFloat(data.discount),
        tax: parseFloat(data.tax),
        warranty: parseInt(data.warranty, 10),
        currency: {id: currencyId},
        status: data.status,
      }).unwrap();
      showModal({
        type: 'success',
        description: 'Ürün başarıyla eklendi.',
        buttons: [
          {
            text: 'Tamam',
            onPress: () => {
              hideModal();
            },
            isFocused: true,
          },
        ],
      });
      reset(); // Formu sıfırla
    } catch (e) {
      showModal({
        type: 'error',
        description: 'Ürün eklenirken bir hata oluştu.',
        buttons: [
          {
            text: 'Tamam',
            onPress: () => {
              hideModal();
            },
            isFocused: true,
          },
        ],
      });
      console.error(e);
    }
  };

  const formFields: Array<{
    name:
      | 'name'
      | 'fullName'
      | 'slug'
      | 'sku'
      | 'barcode'
      | 'stockAmount'
      | 'price1'
      | 'discount'
      | 'tax'
      | 'warranty'
      | 'distributor'
      | 'categoryId'
      | 'status'
      | 'currency'
      | 'currency.id';
    label: string;
    placeholder: string;
    required?: boolean;
    keyboardType?: KeyboardTypeOptions;
  }> = [
    {name: 'name', label: 'Ürün Adı', placeholder: 'Ürün Adı', required: true},
    {
      name: 'fullName',
      label: 'Ürün Tam Adı',
      placeholder: 'Ürün Tam Adı',
      required: true,
    },
    {name: 'slug', label: 'Slug', placeholder: 'Slug'},
    {name: 'sku', label: 'SKU *', placeholder: 'Stok Kodu', required: true},
    {name: 'barcode', label: 'Barkod', placeholder: 'Barkod'},

    {
      name: 'stockAmount',
      label: 'Stok Miktarı *',
      placeholder: 'Stok Miktarı',
      required: true,
      keyboardType: 'numeric',
    },
    {
      name: 'price1',
      label: 'Fiyat *',
      placeholder: 'Fiyat',
      required: true,
      keyboardType: 'numeric',
    },
    {
      name: 'discount',
      label: 'İndirim',
      placeholder: 'İndirim (%)',
      keyboardType: 'numeric',
    },
    {
      name: 'tax',
      label: 'Vergi Oranı (%)',
      placeholder: 'Vergi Oranı',
      keyboardType: 'numeric',
    },
    {
      name: 'warranty',
      label: 'Garanti Süresi (Ay)',
      placeholder: 'Garanti Süresi',
      keyboardType: 'numeric',
    },
    {name: 'distributor', label: 'Distribütör', placeholder: 'Distribütör'},
  ];

  return (
    <>
      <GoBackTabBar title="Ürün Ekle" detail={false} add={false} />
      {categoryLoading ? (
        <Lottie />
      ) : (
        <KeyboardAwareScrollView
          style={styles.container}
          extraScrollHeight={50}
          showsVerticalScrollIndicator={false}>
          <View style={styles.secondcontainer}>
            <Text style={styles.title}>Ürün Bilgilerini Girin</Text>

            {/* Döviz Seçimi */}
            <View style={styles.currencyContainer}>
              <Text style={styles.label}>Döviz Seçimi</Text>
              <View style={styles.currencyButtons}>
                <TouchableOpacity
                  style={[
                    styles.currencyButton,
                    currencyId === 1 && styles.currencyButtonActive,
                  ]}
                  onPress={() => setCurrencyId(1)}>
                  <Text
                    style={[
                      styles.currencyButtonText,
                      currencyId === 1 && {color: COLORS.buttonPrimaryText},
                    ]}>
                    USD
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.currencyButton,
                    currencyId === 2 && styles.currencyButtonActive,
                  ]}
                  onPress={() => setCurrencyId(2)}>
                  <Text
                    style={[
                      styles.currencyButtonText,
                      currencyId === 2 && {color: COLORS.buttonPrimaryText},
                    ]}>
                    EUR
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.currencyButton,
                    currencyId === 3 && styles.currencyButtonActive,
                  ]}
                  onPress={() => setCurrencyId(3)}>
                  <Text
                    style={[
                      styles.currencyButtonText,
                      currencyId === 3 && {color: COLORS.buttonPrimaryText},
                    ]}>
                    TL
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Kategori Seçimi */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Kategori</Text>
              <RNPickerSelect
                onValueChange={value => setSelectedCategoryId(value)}
                items={
                  category
                    ? category.map((cat: any) => ({
                        label: cat.name,
                        value: cat.id,
                      }))
                    : []
                }
                value={selectedCategoryId}
                placeholder={{label: 'Kategori Seçiniz', value: null}}
                style={pickerSelectStyles}
              />
            </View>

            {/* Form Alanları */}
            {formFields.map(
              ({name, label, placeholder, required, keyboardType}) => (
                <Controller
                  key={name}
                  control={control}
                  name={name}
                  rules={
                    required ? {required: `${label} zorunludur`} : undefined
                  }
                  render={({
                    field: {onChange, onBlur, value},
                    fieldState: {error},
                  }) => (
                    <View style={styles.inputGroup}>
                      <Text style={styles.label}>{label}</Text>
                      <TextInput
                        style={[
                          styles.input,
                          error ? styles.inputError : styles.inputNormal,
                        ]}
                        placeholder={placeholder}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={String(value)}
                        keyboardType={keyboardType as KeyboardTypeOptions}
                      />
                      {error && (
                        <Text style={styles.error}>{error.message}</Text>
                      )}
                    </View>
                  )}
                />
              ),
            )}

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit(onSubmit)}
              disabled={isLoading}>
              {isLoading ? (
                <ActivityIndicator color={COLORS.textDisabled} />
              ) : (
                <Text style={styles.submitButtonText}>Ürünü Kaydet</Text>
              )}
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      )}
    </>
  );
};

export default ProductAddScreen;
