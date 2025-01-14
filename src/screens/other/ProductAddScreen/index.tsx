import React, {useEffect, useState} from 'react';
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
  const [createProduct, {isLoading}] = useCreateProductMutation();
  const {data: categories, isLoading: categoryLoading} =
    useGetCategoriesQuery();
  const [currencyId, setCurrencyId] = useState(1);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [selectedGift, setSelectedGift] = useState('');
  const {showModal, hideModal} = useCustomModal();

  const {control, handleSubmit, reset, watch, setValue} = useForm({
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
      categoryId: '',
      status: 1,
      currency: {id: 1},
      gift: '',
      details: '',
      extraDetails: '',
    },
  });

  const nameValue = watch('name');

  useEffect(() => {
    const generateSlug = (text: string) => {
      const turkishCharMap: {[key: string]: string} = {
        ç: 'c',
        ğ: 'g',
        ı: 'i',
        ö: 'o',
        ş: 's',
        ü: 'u',
        Ç: 'c',
        Ğ: 'g',
        İ: 'i',
        Ö: 'o',
        Ş: 's',
        Ü: 'u',
      };
      return text
        .replace(/[çğışöüÇĞİŞÖÜ]/g, char => turkishCharMap[char] || char)
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9-]/g, '-')
        .replace(/-+/g, '-');
    };

    setValue('slug', generateSlug(nameValue || ''));
  }, [nameValue, setValue]);

  const onSubmit = async (data: any) => {
    if (!selectedCategoryId) {
      showModal({
        type: 'error',
        description: 'Kategori seçmelisiniz.',
        buttons: [
          {
            text: 'Tamam',
            onPress: hideModal,
            isFocused: true,
          },
        ],
      });
      return;
    }
    try {
      const payload = {
        ...data,
        price1: parseFloat(data.price1),
        stockAmount: parseFloat(data.stockAmount),
        discount: parseFloat(data.discount),
        tax: parseFloat(data.tax),
        warranty: parseInt(data.warranty, 10),
        currency: {id: currencyId},
        status: data.status,
        categories: selectedCategoryId ? [{id: selectedCategoryId}] : [],
        hasGift: selectedGift,
        detail: {
          details: `${data.details}`,
          extraDetails: data.extraDetails || '',
        },
      };

      console.log('Gönderilen Payload:', payload); // Debug için
      await createProduct(payload).unwrap();

      showModal({
        type: 'success',
        description: 'Ürün başarıyla eklendi.',
        buttons: [
          {
            text: 'Tamam',
            onPress: hideModal,
            isFocused: true,
          },
        ],
      });
      reset();
      setSelectedCategoryId('');
    } catch (e) {
      showModal({
        type: 'error',
        description: 'Ürün eklenirken bir hata oluştu.',
        buttons: [
          {
            text: 'Tamam',
            onPress: hideModal,
            isFocused: true,
          },
        ],
      });
      console.error('Hata:', e);
    }
  };

  const formFields = [
    {name: 'name', label: 'Ürün Adı', placeholder: 'Ürün Adı', required: true},
    {
      name: 'fullName',
      label: 'Ürün Tam Adı',
      placeholder: 'Ürün Tam Adı',
      required: true,
    },
    {name: 'slug', label: 'Slug', placeholder: 'Slug'},
    {name: 'sku', label: 'SKU *', placeholder: 'Stok Kodu', required: true},
    {name: 'barcode', label: 'Barkod', placeholder: 'Barkod', required: true},
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
      required: true,
    },
    {
      name: 'tax',
      label: 'Vergi Oranı (%)',
      placeholder: 'Vergi Oranı',
      keyboardType: 'numeric',
      required: true,
    },
    {
      name: 'warranty',
      label: 'Garanti Süresi (Ay)',
      placeholder: 'Garanti Süresi',
      keyboardType: 'numeric',
      required: true,
    },
    {
      name: 'distributor',
      label: 'Distribütör',
      placeholder: 'Distribütör',
      required: true,
    },
    {
      name: 'details',
      label: 'Detay Bilgisi',
      placeholder: 'Ürün detaylarını girin',
      required: true,
    },
    {
      name: 'extraDetails',
      label: 'Ekstra Detay Bilgisi',
      placeholder: 'Ekstra detayları girin',
    },
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

            <View style={styles.currencyContainer}>
              <Text style={styles.label}>Döviz Seçimi</Text>
              <View style={styles.currencyButtons}>
                {['USD', 'EUR', 'TL'].map((currency, index) => (
                  <TouchableOpacity
                    key={currency}
                    style={[
                      styles.currencyButton,
                      currencyId === index + 1 && styles.currencyButtonActive,
                    ]}
                    onPress={() => setCurrencyId(index + 1)}>
                    <Text
                      style={[
                        styles.currencyButtonText,
                        currencyId === index + 1 && {
                          color: COLORS.buttonPrimaryText,
                        },
                      ]}>
                      {currency}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Kategori</Text>
              <RNPickerSelect
                textInputProps={{pointerEvents: 'none'}}
                onValueChange={setSelectedCategoryId}
                items={
                  categories
                    ? categories
                        .filter(cat => cat.status === 1)
                        .map(cat => ({label: cat.name, value: cat.id}))
                    : []
                }
                value={selectedCategoryId}
                placeholder={{label: 'Kategori Seçiniz', value: null}}
                style={pickerSelectStyles}
              />
            </View>

            {formFields.map(
              ({name, label, placeholder, required, keyboardType}) => (
                <Controller
                  key={name}
                  control={control}
                  name={name as any}
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

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Hediye</Text>
              <RNPickerSelect
                textInputProps={{pointerEvents: 'none'}}
                onValueChange={setSelectedGift}
                items={[
                  {label: 'Hediye Yok', value: '0'},
                  {label: 'Hediye Var', value: '1'},
                ]}
                value={selectedGift}
                placeholder={{label: 'Hediye Seçiniz', value: null}}
                style={pickerSelectStyles}
              />
            </View>

            {selectedGift === '1' && (
              <Controller
                key={'gift'}
                control={control}
                name="gift"
                rules={{required: 'Hediye ürün zorunludur'}}
                render={({
                  field: {onChange, onBlur, value},
                  fieldState: {error},
                }) => (
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Hediye Ürün</Text>
                    <TextInput
                      style={[
                        styles.input,
                        error ? styles.inputError : styles.inputNormal,
                      ]}
                      placeholder={'Hediye Ürün'}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={String(value)}
                    />
                  </View>
                )}
              />
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
