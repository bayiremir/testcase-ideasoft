import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants/COLORS';
import {Fonts} from '../../../interface/fonts.enum';

export const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: COLORS.shadowDark,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  categoryName: {
    fontSize: 18,
    fontFamily: Fonts.Bold,
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  categoryDetails: {
    fontSize: 14,
    fontFamily: Fonts.Medium,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  status: {
    fontSize: 12,
    fontFamily: Fonts.Medium,
  },
  showcaseContent: {
    fontSize: 12,
    fontFamily: Fonts.Medium,
    color: COLORS.textSecondary,
    marginTop: 8,
  },
});
