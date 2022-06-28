// import * as React from 'react';
// import { StatusBar, StyleSheet, Text, View, Alert, BackHandler, Image, ActivityIndicator } from 'react-native';
// import { Theme, Images } from '../../constants';
// import { IDistricts } from '../../interface/IDistrict';
// import { IGods } from '../../interface/IGod';
// import { ITemples } from '../../interface/ITemple';
// import { connect } from 'react-redux';
// import { getDistricts } from '../../helpers/District';
// import { getGods } from '../../helpers/Gods';
// import { getTemples } from '../../helpers/Temple';

// const { appLogo } = Images;
// const { COLORS } = Theme;

// interface IProps {
//     navigation: any
//     dispatch: any
//     districtStore: { districts: IDistricts }
//     godStore: { gods: IGods }
// }

// class LoginLoader extends React.Component<IProps, {}>{
//     resDistricts: IDistricts | undefined
//     resGods: IGods | undefined
//     resTemples: ITemples | undefined

//     constructor(props: any) {
//         super(props);
//     }

//     backAction = () => {
//         if (this.props.navigation.isFocused()) {
//             Alert.alert('Confirm Exit', 'Do you want to exit the app', [
//                 {
//                     text: "Cancel",
//                     onPress: () => null,
//                     style: "cancel"
//                 },
//                 { text: "YES", onPress: () => BackHandler.exitApp() }
//             ]);
//             return true;
//         }
//         else {
//             return false;
//         }
//     };

//     componentDidMount() {
//         BackHandler.addEventListener("hardwareBackPress", this.backAction);
//         this.getAllDatas();
//     }

//     componentWillUnmount() {
//         BackHandler.removeEventListener("hardwareBackPress", this.backAction);
//     }

//     getAllDatas = async () => {
//         await this.props.dispatch(getDistricts());
//         await this.props.dispatch(getGods());
//         await this.props.dispatch(getTemples());
//         console.log("loader",this.props.districtStore.districts)
//         if (this.props.districtStore.districts && this.props.districtStore.districts.results) {
//             this.navigateToHome();
//         } else {
//             this.props.navigation.navigate("LoginScreen")
//         }
//     }

//     navigateToHome = () => {
//         this.props.navigation.navigate('HomeRouter');
//     }

//     goToBack = () => {
//         this.props.navigation.goBack();
//     }

//     render() {
//         return (
//             <View style={styles.container} >
//                 <StatusBar barStyle='default' backgroundColor={COLORS.tertiary} />
//                 <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
//                     <Image
//                         style={{
//                             width: 170,
//                             height: 170,
//                             borderRadius: 30
//                         }}
//                         resizeMode='contain'
//                         source={appLogo}
//                     />
//                     <Text style={{ color: COLORS.white, fontWeight: 'bold', fontStyle: 'italic', fontSize: 25 }}>Namma Temple</Text>
//                 </View>
//                 <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//                     <ActivityIndicator color={COLORS.white} size="large" />
//                 </View>
//                 {/* <View style={{ flex: 3 }}>
//                     <Image
//                         style={{
//                             width: 350,
//                             height: 450,
//                             marginTop: 12
//                         }}
//                         resizeMode='contain'
//                         source={loadingBanner}
//                     />
//                 </View> */}
//                 <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
//                     <View style={{ flexDirection: "row" }}>
//                         <Text style={{ color: COLORS.orange, paddingRight: 10 }}>Fetching data. Please wait ...</Text>
//                         {/* <ActivityIndicator size="small" color={COLORS.orange} /> */}
//                     </View>
//                     {/* <View style={{ width: '50%', paddingTop: 10, justifyContent: 'center', alignItems: 'center' }}>
//                         <Text style={{ color: COLORS.white, fontSize: 17 }}>STAY INFORMED</Text>
//                         <Text style={{ color: COLORS.darkGray }}>{Strings.loginContent}</Text>
//                     </View> */}
//                 </View>
//             </View >
//         )
//     }
// }

// const mapStateToProps = (state: any) => {
//     return {
//         districtStore: state.districtReducer,
//         godStore: state.godReducer
//     }
// };

// export default connect(mapStateToProps)(LoginLoader);

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: COLORS.tertiary
//     }
// });
