import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filtersContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  filterButton: {
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  selectedFilter: {
    backgroundColor: '#007BFF',
    borderColor: '#0056b3',
  },
  filterText: {
    color: '#000',
    fontSize: 14,
  },
  selectedFilterText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
