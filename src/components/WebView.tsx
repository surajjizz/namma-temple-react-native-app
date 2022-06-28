// import * as React from 'react';
// import { SafeAreaView, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
// import { Theme } from '../constants';
// import Icon from 'react-native-vector-icons/MaterialIcons';

// const { COLORS } = Theme;

// interface IProps {
//     navigation: any,
//     route: any,
// }

// const { height } = Dimensions.get('window');

// export default class CustomWebView extends React.Component<IProps, {}> {

//     onClose = () => {
//         this.props.navigation.goBack();
//     }

//     render() {
//         return (
//             <SafeAreaView style={{ flex: 1 }}>
//                 <TouchableOpacity style={styles.closeBtn} onPress={this.onClose} >
//                     <Icon name="close" size={21} color={COLORS.white} />
//                 </TouchableOpacity>
//             </SafeAreaView>
//         )
//     }
// }

// const styles = StyleSheet.create({
//     closeBtn: {
//         position: "absolute",
//         marginTop: height / 2,
//         backgroundColor: COLORS.gray,
//         opacity: 0.6,
//         elevation: 2,
//         width: 45,
//         height: 40,
//         zIndex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//         borderTopEndRadius: 25,
//         borderBottomEndRadius: 25
//     }
// });
