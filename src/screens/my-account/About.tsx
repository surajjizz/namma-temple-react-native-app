// import * as React from 'react';
// import { StyleSheet, Text, View, Image } from 'react-native';
// import { Images, Theme, Strings } from '../../constants';
// import { connect } from 'react-redux';
// import { AppHeader } from '../../components';
// import AppDefaults from '../../defaults/AppDefaults';
// import { StoreUrl } from '../../interface/ILogin';

// const { SIZES, COLORS } = Theme;
// const { information } = Images;

// interface IProps {
//     navigation: any
//     loginReducer: any
// }

// class About extends React.Component<IProps, {}>{
//     props: IProps;
//     selectedStore: StoreUrl;

//     componentDidMount() {
//         this.selectedStore = this.props.loginReducer.selectedStoreData;
//         this.setState({});
//     }

//     goToBack = () => {
//         this.props.navigation.goBack();
//     }

//     render() {
//         return (
//             <View>
//                 <AppHeader title="My Account" navigation={this.props.navigation} isDrawer={true}
//                     backgroundColor={COLORS.primary} />
//                 <View style={{ height: SIZES.height, backgroundColor: COLORS.primary }}>
//                     {this.selectedStore &&
//                         <View style={{ flex: 1 }}>
//                             <View style={{ flex: 1 }}>
//                                 <Image
//                                     source={information}
//                                     resizeMode="contain"
//                                     style={{
//                                         width: SIZES.width,
//                                         height: SIZES.height / 3,
//                                     }}
//                                 />
//                             </View>
//                             <View style={{
//                                 flex: 2,
//                                 justifyContent: 'center',
//                                 alignItems: 'center',
//                                 borderTopLeftRadius: 35,
//                                 borderTopRightRadius: 35,
//                                 elevation: 10,
//                                 width: SIZES.width,
//                                 backgroundColor: COLORS.white
//                             }}>
//                                 <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 15, alignItems: 'center', }}>
//                                     <Text style={{ fontSize: 16, color: COLORS.lightGray }}>{Strings.aboutMessage}</Text>
//                                 </View>
//                                 <View style={{ flex: 1, paddingHorizontal: 15, alignItems: 'center', }}>
//                                     <Text>App Version:{AppDefaults.appVersion}</Text>
//                                     <Text>Build No:{AppDefaults.buildNo}</Text>
//                                     <Text>Expiry Date:{AppDefaults.expiredDate}</Text>
//                                 </View>
//                             </View>
//                         </View>
//                     }
//                 </View>
//             </View>
//         )
//     }
// }

// const mapStateToProps = (state: any) => {
//     return {
//         loginReducer: state.loginReducer
//     }
// };

// export default connect(mapStateToProps)(About);

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: COLORS.secondary
//     }
// });
