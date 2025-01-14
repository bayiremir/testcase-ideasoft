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
import {styles} from './styles';
import {useCreateCategoryMutation} from '../../../redux/services/ideasoftApi';
import {useCustomModal} from '../../../components/other_components/Modal/CustomModal/CustomModalProvider';
import {COLORS} from '../../../components/constants/COLORS';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const CategoryAddScreen = () => {
  const [createCategory, {isLoading}] = useCreateCategoryMutation();
  const {showModal, hideModal} = useCustomModal();

  const {control, handleSubmit, reset, watch, setValue} = useForm({
    defaultValues: {
      name: '',
      slug: '',
      sortOrder: '',
      status: 1,
      distributorCode: '',
      percent: '',
      showcaseContent: '',
      showcaseContentDisplayType: 1,
      metaKeywords: '',
      isSearchable: 1,
      metaDescription: '',
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
    try {
      const payload = {
        ...data,
        sortOrder: parseInt(data.sortOrder, 10),
        percent: parseFloat(data.percent),
      };

      await createCategory(payload).unwrap();

      showModal({
        type: 'success',
        description: 'Kategori başarıyla eklendi.',
        buttons: [
          {
            text: 'Tamam',
            onPress: hideModal,
            isFocused: true,
          },
        ],
      });
      reset();
    } catch (e) {
      showModal({
        type: 'error',
        description: 'Kategori eklenirken bir hata oluştu.',
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
  ];

  return (
    <>
      <GoBackTabBar title="Kategori Ekle" add={false} />
      <KeyboardAwareScrollView
        style={styles.container}
        extraScrollHeight={50}
        showsVerticalScrollIndicator={false}>
        <View style={styles.secondcontainer}>
          <Text style={styles.title}>Kategori Bilgilerini Girin</Text>

          {formFields.map(
            ({name, label, placeholder, required, keyboardType}) => (
              <Controller
                key={name}
                control={control}
                name={name as any}
                rules={required ? {required: `${label} zorunludur`} : undefined}
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
                    {error && <Text style={styles.error}>{error.message}</Text>}
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
              <Text style={styles.submitButtonText}>Kaydet</Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </>
  );
};

export default CategoryAddScreen;
