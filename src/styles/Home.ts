import { StyleSheet } from 'react-native';
import { COLORS } from '../constants/Theme';

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
    borderRadius: 55,
    // marginRight: 15,
  },
  name: {
    color:COLORS.lightGray,
    fontWeight: 'bold',
    fontSize: 16,
  },
  history: {
    fontSize: 15,
    color: COLORS.gray,
    textAlign: 'left',
  },
  count: {
    display: 'flex',
    backgroundColor: COLORS.lightGreen,
    height: 22,
    width: 22,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countText: {
    color: COLORS.white,
    fontSize: 10,
  },
  divider: {
    borderBottomColor: COLORS.gray,
    borderBottomWidth: 0.5,
    width: '80%',
    alignSelf: 'flex-end',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    // backgroundColor: 'rgba(0,0,0,0.7)',
    backgroundColor: COLORS.overlay,
  }
});

export default styles;
