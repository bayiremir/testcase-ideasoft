import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  productImage: {
    width: '100%',
    height: 300,
    backgroundColor: '#eaeaea',
  },
  detailsContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#E91E63',
    marginBottom: 8,
  },
  productDiscount: {
    fontSize: 16,
    color: '#FF5722',
    marginBottom: 4,
  },
  productStock: {
    fontSize: 16,
    color: '#4CAF50',
    marginBottom: 4,
  },
  productWarranty: {
    fontSize: 16,
    color: '#2196F3',
    marginBottom: 4,
  },
  productBrand: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 4,
  },
  productSKU: {
    fontSize: 14,
    color: '#9E9E9E',
    marginBottom: 4,
  },
  descriptionContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  productDescription: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  addToCartButton: {
    margin: 16,
    padding: 16,
    backgroundColor: '#E91E63',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addToCartButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});
