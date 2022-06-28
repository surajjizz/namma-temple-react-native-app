import {StyleSheet} from 'react-native';
import {COLORS} from '../constants/Theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  itemContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    padding: 11,
  },
  leftContainer: {
    flex: 2,
    justifyContent: 'space-around',
    paddingHorizontal: 5,
  },
  midContainer: {
    flex: 8,
    justifyContent: 'space-around',
    paddingHorizontal: 5,
  },
  rightContainer: {
    flex: 2,
    justifyContent: 'space-around',
    alignItems: 'flex-end',
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 50,
    marginRight: 15,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  history: {
    fontSize: 15,
    color: COLORS.gray,
    textAlign: 'left',
  },
  count: {
    fontSize: 16,
    color: COLORS.gray,
    paddingRight: 6,
  },
  divider: {
    borderBottomColor: COLORS.gray,
    borderBottomWidth: 0.5,
    width: '80%',
    alignSelf: 'flex-end',
  },
  listStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  listOrderStyle: {
    color: COLORS.success,
    fontSize: 40,
  },
  listContentStyle: {
    fontSize: 15,
    paddingVertical: 4,
    paddingHorizontal: 15,
  },
});

export default styles;
