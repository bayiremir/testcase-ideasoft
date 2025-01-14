import React, {useEffect} from 'react';
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
import {
  useGetCategoryByIdQuery,
  useUpdateCategoryMutation,
} from '../../../redux/services/ideasoftApi';
import {useCustomModal} from '../../../components/other_components/Modal/CustomModal/CustomModalProvider';
import {COLORS} from '../../../components/constants/COLORS';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {RouteProp, useRoute} from '@react-navigation/native';
import {styles} from './styles';
import Lottie from '../../../components/other_components/Lottie';

interface CategoryRouteParams {
  categoryId: number;
}

const CategoryEditScreen = () => {
  const route = useRoute<RouteProp<{params: CategoryRouteParams}, 'params'>>();
  const {categoryId: categoryId} = route.params;
  const {data, isLoading, refetch} = useGetCategoryByIdQuery(categoryId) as {
    data?: any;
    isLoading: boolean;
    refetch: () => void;
  };
  const [updateCategory, {isLoading: isUpdating}] = useUpdateCategoryMutation();
  const {showModal, hideModal} = useCustomModal();
  console.log('Data:', data);
  const {control, handleSubmit, reset, setValue, watch} = useForm({
    defaultValues: {
      name: '',
      slug: '',
      sortOrder: '',
      distributorCode: '',
      percent: '',
      showcaseContent: '',
      metaKeywords: '',
      metaDescription: '',
      status: '',
    },
  });

  const nameValue = watch('name');

  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data, reset]);

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

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const onSubmit = async (data: any) => {
    try {
      const payload = {
        ...data,
        sortOrder: parseInt(data.sortOrder, 10),
        percent: parseFloat(data.percent),
      };

      console.log('Gönderilen Payload:', payload);
      await updateCategory({id: categoryId, data: payload}).unwrap();

      showModal({
        type: 'success',
        description: 'Kategori başarıyla güncellendi.',
        buttons: [
          {
            text: 'Tamam',
            onPress: hideModal,
            isFocused: true,
          },
        ],
      });
      refetch();
    } catch (e) {
      showModal({
        type: 'error',
        description: 'Kategori güncellenirken bir hata oluştu.',
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
    {
      name: 'name',
      label: 'Kategori Adı',
      placeholder: 'Kategori Adı',
      required: true,
    },
    {name: 'slug', label: 'Slug', placeholder: 'Slug'},
    {
      name: 'sortOrder',
      label: 'Sıralama',
      placeholder: 'Sıralama',
      keyboardType: 'numeric',
      required: true,
    },
    {
      name: 'distributorCode',
      label: 'Distribütör Kodu',
      placeholder: 'Distribütör Kodu',
    },
    {
      name: 'percent',
      label: 'Yüzde (%)',
      placeholder: 'Yüzde',
      keyboardType: 'numeric',
      required: true,
    },
    {
      name: 'showcaseContent',
      label: 'Vitrin İçeriği',
      placeholder: 'Vitrin İçeriği',
      required: true,
    },
    {
      name: 'metaKeywords',
      label: 'Meta Anahtar Kelimeler',
      placeholder: 'Meta Anahtar Kelimeler',
      required: true,
    },
    {
      name: 'metaDescription',
      label: 'Meta Açıklama',
      placeholder: 'Meta Açıklama',
      required: true,
    },
    {
      name: 'status',
      label: 'Durum',
      placeholder: 'Durum',
      required: true,
      keyboardType: 'numeric',
    },
  ];

  return (
    <>
      <GoBackTabBar title="Kategori Düzenleme" add={false} product={false} />
      {isLoading ? (
        <Lottie />
      ) : (
        <KeyboardAwareScrollView
          style={styles.container}
          extraScrollHeight={50}
          showsVerticalScrollIndicator={false}>
          <View style={styles.secondcontainer}>
            <Text style={styles.title}>Kategori Bilgilerini Düzenleyin</Text>

            {formFields.map(
              ({name, label, placeholder, required, keyboardType}) => (
                <Controller
                  key={name}
                  control={control}
                  name={name as any}
                  rules={
                    name === 'status'
                      ? {
                          required: `${label} zorunludur`,
                          validate: value =>
                            value === '1' ||
                            value === '0' ||
                            'Durum yalnızca 1 veya 0 olabilir',
                        }
                      : required
                      ? {required: `${label} zorunludur`}
                      : undefined
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
              disabled={isUpdating}>
              {isUpdating ? (
                <ActivityIndicator color={COLORS.textDisabled} />
              ) : (
                <Text style={styles.submitButtonText}>Kaydet</Text>
              )}
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      )}
    </>
  );
};

export default CategoryEditScreen;
