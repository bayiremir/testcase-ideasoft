import {StyleSheet} from 'react-native';
import {COLORS} from '../../../components/constants/COLORS';
import {Fonts} from '../../../interface/fonts.enum';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  secondcontainer: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: Fonts.Bold,
    color: COLORS.textPrimary,
    marginBottom: 24,
  },
  form: {
    flex: 1,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontFamily: Fonts.Bold,
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  input: {
    padding: 14,
    borderRadius: 8,
    fontSize: 16,
    fontFamily: Fonts.Regular,
  },
  inputNormal: {
    borderWidth: 1,
    borderColor: COLORS.listItemBorder,
    backgroundColor: COLORS.buttonPrimaryText,
  },
  inputError: {
    borderWidth: 1,
    borderColor: COLORS.errorButtonBg,
    backgroundColor: '#FFE4E6',
  },
  error: {
    fontSize: 12,
    fontFamily: Fonts.Regular,
    marginTop: 4,
    color: COLORS.errorButtonBg,
  },
  currencyContainer: {
    marginBottom: 20,
  },
  currencyButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  currencyButton: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.listItemBorder,
    borderRadius: 8,
    alignItems: 'center',
  },
  currencyButtonActive: {
    backgroundColor: COLORS.buttonPrimaryBg,
    borderColor: COLORS.buttonPrimaryBg,
  },
  currencyButtonText: {
    fontSize: 16,
    fontFamily: Fonts.Medium,
    color: COLORS.textPrimary,
  },
  submitButton: {
    backgroundColor: COLORS.buttonPrimaryBg,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 120,
  },
  submitButtonText: {
    color: COLORS.buttonPrimaryText,
    fontSize: 16,
    fontFamily: Fonts.Medium,
  },
});

export const pickerSelectStyles = {
  inputAndroid: {
    height: 40,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 5,
    paddingHorizontal: 10,
    color: COLORS.textPrimary,
    backgroundColor: COLORS.background,
  },
  inputIOS: {
    height: 40,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 5,
    paddingHorizontal: 10,
    color: COLORS.textPrimary,
    backgroundColor: COLORS.background,
  },
};
