import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants/COLORS';
import {Fonts} from '../../../interface/fonts.enum';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 15,
  },
  card: {
    margin: 15,
    backgroundColor: COLORS.surface,
    borderRadius: 10,
    shadowColor: COLORS.shadowDark,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginVertical: 8,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  gridCard: {
    margin: 15,
    width: '48%',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 1,
  },
  imageContainer: {
    marginRight: 10,
  },
  productImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
    backgroundColor: COLORS.background,
  },
  productInfo: {
    flex: 2,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 16,
    fontFamily: Fonts.Bold,
    color: COLORS.textPrimary,
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 14,
    fontFamily: Fonts.Medium,
    color: COLORS.textSecondary,
    marginBottom: 5,
  },
  productStock: {
    fontSize: 12,
    fontFamily: Fonts.Medium,
  },
});
