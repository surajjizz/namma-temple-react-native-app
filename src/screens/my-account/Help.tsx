// import * as React from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import { Theme } from '../../constants';
// import { connect } from 'react-redux';
// import { AppHeader } from '../../components';
// import { StoreUrl } from '../../interface/ILogin';

// const { COLORS } = Theme;

// interface IProps {
//     navigation: any
// }

// class Help extends React.Component<IProps, {}>{
//     selectedStore: StoreUrl;

//     componentDidMount() {
//         this.selectedStore = this.props.loginReducer.selectedStoreData;
//         console.log("selectedStore", this.selectedStore)
//         this.setState({});
//     }
//     navigateToHome = () => {
//         this.props.navigation.navigate('HomeRouter');
//     }

//     goToBack = () => {
//         this.props.navigation.goBack();
//     }

//     render() {
//         return (
//             <View>
//                 <AppHeader title="My Account" navigation={this.props.navigation} isDrawer={true} />
//                 <View>
//                     <Text>Help Screen</Text>
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

// export default connect(mapStateToProps)(Help);

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: COLORS.secondary
//     }
// });
