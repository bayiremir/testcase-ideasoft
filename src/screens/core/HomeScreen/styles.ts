import {Dimensions, StyleSheet} from 'react-native';
import {Fonts} from '../../../interface/fonts.enum';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    position: 'absolute',
    top: 100,
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: Fonts.ExtraBold,
    color: '#fff',
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    width: '100%',
    paddingHorizontal: 20,
  },
  card: {
    width: Dimensions.get('window').width / 2 - 30,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  iconContainer: {
    width: 70,
    height: 70,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  icon: {
    width: 50,
    height: 50,
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: Fonts.Bold,
    color: '#fff',
    textAlign: 'center',
  },
});

export default styles;
