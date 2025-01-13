import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants/COLORS';
import {Fonts} from '../../../interface/fonts.enum';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: COLORS.shadow,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.iconSecondary,
    marginRight: 15,
  },
  productInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 18,
    fontFamily: Fonts.Bold,
    color: COLORS.textPrimary,
    marginBottom: 5,
  },
  productDetails: {
    fontSize: 14,
    fontFamily: Fonts.Regular,
    color: COLORS.textSecondary,
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    fontFamily: Fonts.Regular,
    color: COLORS.successBg,
    marginBottom: 5,
  },
  productStock: {
    fontSize: 14,
    fontFamily: Fonts.Regular,
    color: COLORS.warningBg,
  },
});
