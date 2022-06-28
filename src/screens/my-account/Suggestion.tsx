// import * as React from 'react';
// import { StyleSheet, Text, View, Image } from 'react-native';
// import { Images, Theme } from '../../constants';
// import { connect } from 'react-redux';
// import { AppHeader } from '../../components';
// import AppDefaults from '../../defaults/AppDefaults';
// import { StoreUrl } from '../../interface/ILogin';

// const { SIZES, COLORS } = Theme;
// const { envelope } = Images;

// interface IProps {
//     navigation: any
//     loginReducer: any
// }

// class Suggestion extends React.Component<IProps, {}>{
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
//                                     source={envelope}
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
//                                 <Text>UserName1:{AppDefaults.userName}</Text>
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

// export default connect(mapStateToProps)(Suggestion);

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: COLORS.secondary
//     }
// });
