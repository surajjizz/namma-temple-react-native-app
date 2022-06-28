// import * as React from 'react';
// import { Dimensions, Easing, Image, StatusBar, StyleSheet, Text, View, Animated, Keyboard } from 'react-native';
// import FunctionUtils from '../../utils/Function';
// import { Theme, Images } from '../../constants';
// import { AnimatedButton, FloatingLabelInput, Shake } from '../../components';
// import { connect } from 'react-redux';
// import { IRegister } from '../../interface/ILogin';
// import { setRegisterDetails } from '../../redux-store/actions/Login';
// import { HttpClient } from '../../services/Http';

// const { appLogo } = Images;
// const { COLORS } = Theme;

// interface IProps {
//     navigation: any
//     loginStore: IRegister
//     dispatch: any
// }

// interface IState {
//     screenAnimation: any
//     OTP: any
// }

// const { width, height } = Dimensions.get('window');

// class ResetPassword extends React.Component<IProps, IState>{
//     keyboardDidHideListener: any;
//     state: IState;
//     loadingButton: any;
//     errMessage: string;
//     refShake: any
//     constructor(props: any) {
//         super(props);
//         this.errMessage = '';
//         this.refShake = React.createRef();
//         this.state = {
//             screenAnimation: new Animated.Value(height),
//             OTP: '',
//         }
//     }

//     componentDidMount() {
//         this.animateContainer();
//         this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
//     }

//     componentWillUnmount() {
//         this.keyboardDidHideListener.remove();
//     }

//     animateContainer = () => {
//         Animated.timing(this.state.screenAnimation, {
//             toValue: height / 1.8,
//             duration: 1000,
//             easing: Easing.elastic(1.2),
//             useNativeDriver: false
//         }).start();
//     }

//     animateInput = () => {
//         Animated.timing(this.state.screenAnimation, {
//             toValue: height / 3,
//             duration: 1000,
//             easing: Easing.elastic(1.2),
//             useNativeDriver: false
//         }).start();
//     }

//     keyboardDidHide = () => {
//         Keyboard.dismiss();
//     }

//     onChangeValue = (value: any, name: string) => {
//         var { fullname, email, device_id } = this.props.loginStore
//         var loginData: IRegister = { fullname: fullname, email: email, username: email, password: '', password2: '', device_id: device_id };
//         if (name === 'password') {
//             loginData['password'] = value;
//         }
//         console.log("loginData", loginData)
//         this.props.dispatch(setRegisterDetails(loginData));
//     }

//     isValidFields = () => {
//         var isValid: boolean;
//         var { password } = this.props.loginStore;

//         if (password === '' || this.state.OTP === '') {
//             this.errMessage = 'Please fill required fields';
//             isValid = false;
//         } else if (this.state.OTP.length !== 5) {
//             this.errMessage = 'Please enter valid OTP number';
//             isValid = false;
//         } else if (password.length < 6) {
//             this.errMessage = 'Password must be at least 6 characters';
//             isValid = false;
//         } else {
//             this.errMessage = '';
//             isValid = true;
//         }
//         this.setState({});
//         return isValid;
//     }

//     onSubmitResetPassword = async () => {
//         var { email, password } = this.props.loginStore;
//         var resResetPassword: any = {};
//         var data: any = {
//             email: email,
//             passcode: this.state.OTP,
//             password: password,
//         };
//         if (this.isValidFields() === true) {
//             this.loadingButton.showLoading(true);
//             resResetPassword = await HttpClient().postResponse(
//                 '/reset-password',
//                 'PATCH',
//                 data,
//             );
//             this.loadingButton.showLoading(false);
//             console.log('resResetPassword', resResetPassword);
//             if (resResetPassword && resResetPassword.message) {
//                 this.navigateToLogin();
//                 FunctionUtils.snackBar(resResetPassword.message);
//             }
//         } else {
//             this.refShake.current.startShake();
//         }
//     }

//     navigateToLogin = () => {
//         this.props.navigation.navigate('LoginScreen');
//     }

//     render() {
//         const animatetedContainer = {
//             height: this.state.screenAnimation
//         }

//         var { loginStore } = this.props;
//         console.log("loginStore", loginStore)
//         return (
//             <View style={{ height: height }}>
//                 <Animated.View style={[animatetedContainer, { width: width }]}>
//                     <StatusBar barStyle="dark-content" backgroundColor={COLORS.secondary} />
//                     <View style={styles.topContainer}>
//                         <Image
//                             source={appLogo}
//                             resizeMode="contain"
//                             style={styles.logoStyle}
//                         />
//                     </View>
//                     <View style={styles.bottomContainer}>
//                         <Animated.View style={styles.floatingContainer}>
//                             <Text style={{ fontSize: 21, textAlign: "center" }}>Reset Password</Text>
//                             <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
//                                 <View style={{ width: '100%', marginBottom: 8 }}>
//                                     <FloatingLabelInput onFocus={this.animateInput} onBlur={this.animateContainer}
//                                         placeholder="OTP" onChangeText={(text: any) => this.setState({ OTP: text })}
//                                         keyboardType='numeric' secureTextEntry={false}
//                                     />
//                                     <FloatingLabelInput onFocus={this.animateInput} onBlur={this.animateContainer}
//                                         placeholder="Password" onChangeText={(value: any) => this.onChangeValue(value, 'password')}
//                                         value={loginStore.password} secureTextEntry={true}
//                                     />
//                                 </View>
//                                 <Shake ref={this.refShake}>
//                                     {this.errMessage !== '' &&
//                                         <Text style={{ fontSize: 11, color: COLORS.error, marginBottom: 8 }}>{this.errMessage}</Text>
//                                     }
//                                 </Shake>
//                                 <AnimatedButton
//                                     ref={c => (this.loadingButton = c)}
//                                     title="Reset Password"
//                                     borderRadius={10}
//                                     onPress={this.onSubmitResetPassword}
//                                 />
//                             </View>
//                         </Animated.View>
//                     </View>
//                 </Animated.View>
//             </View >
//         )
//     }
// }

// const mapStateToProps = (state: any) => {
//     return {
//         loginStore: state.loginReducer
//     }
// };

// export default connect(mapStateToProps)(ResetPassword);

// const styles = StyleSheet.create({
//     topContainer: {
//         height: '80%',
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: COLORS.primary
//     },
//     logoStyle: {
//         height: '30%',
//         width: '30%',
//         marginBottom: 70,
//         borderRadius: 30
//     },
//     bottomContainer: {
//         height: height,
//         width: width,
//         alignItems: 'center',
//         backgroundColor: COLORS.white
//     },
//     floatingContainer: {
//         width: '94%',
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: COLORS.white,
//         marginTop: -70,
//         borderRadius: 20,
//         paddingLeft: 25,
//         paddingRight: 25,
//         paddingTop: 10,
//         paddingBottom: 10,
//         elevation: 5
//     },
//     input: {
//         fontSize: 15,
//         borderBottomWidth: 1,
//         borderBottomColor: COLORS.darkGray,
//         margin: 8,
//         height: 50
//     },
//     errMsgStyle: {
//         marginLeft: 10,
//         fontSize: 12,
//         color: COLORS.error
//     },
//     forgotPasswordBtnStyle: {
//         marginBottom: 15,
//         width: '100%',
//         justifyContent: 'flex-end'
//     },
//     signupBtnStyle: {
//         marginBottom: 15,
//         width: '100%',
//         justifyContent: 'center'
//     },
// });
