// import * as React from 'react';
// import { Dimensions, Easing, Image, StatusBar, StyleSheet, Text, View, Animated, Keyboard, TouchableOpacity } from 'react-native';
// import APIDetails from '../../defaults/APIDetails';
// import FunctionUtils from '../../utils/Function';
// import AppDefaults from '../../defaults/AppDefaults';
// import { Theme, Images } from '../../constants';
// import { AnimatedButton, FloatingLabelInput, Shake } from '../../components';
// import { connect } from 'react-redux';
// import { IRegister } from '../../interface/ILogin';
// import { setRegisterDetails } from '../../redux-store/actions/Login';
// import { forgotPassword, login } from '../../helpers/Login';

// const { appLogo } = Images;
// const { COLORS } = Theme;

// interface IProps {
//     navigation: any
//     loginStore: IRegister
//     dispatch: any
// }

// interface IState {
//     screenAnimation: any,
//     value: string
// }

// const { width, height } = Dimensions.get('window');

// class ForgotPassword extends React.Component<IProps, IState>{
//     keyboardDidHideListener: any;
//     state: IState;
//     loadingButton: any;
//     email: any;
//     password: any;
//     errMessage: string;
//     refShake: any
//     constructor(props: any) {
//         super(props);
//         this.email = '';
//         this.password = '';
//         this.errMessage = '';
//         this.refShake = React.createRef();
//         this.state = {
//             screenAnimation: new Animated.Value(height),
//             value: '',
//         }
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

//     componentWillUnmount() {
//         this.keyboardDidHideListener.remove();
//     }

//     keyboardDidHide = () => {
//         Keyboard.dismiss();
//     };

//     componentDidMount() {
//         this.animateContainer();
//         this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
//     }

//     navigateToRegistration = () => {
//         this.props.navigation.navigate('Register');
//     }

//     navigateToOTPVerification = () => {
//         this.props.navigation.navigate('OTPVerify');
//     }

//     navigateToForgotPassword = () => {
//         this.props.navigation.navigate('ForgotPassword');
//     }

//     onChangeValue = (value: any, name: string) => {
//         var { fullname, email, device_id } = this.props.loginStore
//         var loginData: IRegister = { fullname: fullname, email: email, username: email, password: '', password2: '', device_id: device_id };
//         if (name === 'email') {
//             loginData['email'] = value;
//         } else {
//             loginData['password'] = value;
//             loginData['device_id'] = value;
//         }
//         console.log("loginData", loginData)
//         this.props.dispatch(setRegisterDetails(loginData));
//     }

//     isValidFields = () => {
//         var isValid: boolean;
//         var { email } = this.props.loginStore;

//         if (email === '') {
//             this.errMessage = 'Please fill required fields';
//             isValid = false;
//         } else if (FunctionUtils.isValidEmail(email) === false) {
//             this.errMessage = 'Please enter valid email';
//             isValid = false;
//         } else {
//             this.errMessage = '';
//             isValid = true;
//         }
//         this.setState({});
//         return isValid;
//     }

//     onSubmitForgotPassword = async () => {
//         if (this.isValidFields() === true) {
//             this.loadingButton.showLoading(true);
//             await this.props.dispatch(forgotPassword());
//             this.loadingButton.showLoading(false);
//         } else {
//             this.refShake.current.startShake();
//         }
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
//                             <Text style={{ fontSize: 21, textAlign: "center" }}>Forgot Password</Text>
//                             <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
//                                 <View style={{ width: '100%', marginBottom: 8 }}>
//                                     <FloatingLabelInput onFocus={this.animateInput} onBlur={this.animateContainer}
//                                         keyboardType="email-address" placeholder="Email" onChangeText={(value: any) => this.onChangeValue(value, 'email')}
//                                         value={loginStore.email} secureTextEntry={false} autoCapitalize='none'
//                                     />
//                                 </View>
//                                 <Shake ref={this.refShake}>
//                                     {this.errMessage !== '' &&
//                                         <Text style={{ fontSize: 11, color: COLORS.error, marginBottom: 8 }}>{this.errMessage}</Text>
//                                     }
//                                 </Shake>
//                                 <AnimatedButton
//                                     ref={c => (this.loadingButton = c)}
//                                     title="Send"
//                                     borderRadius={10}
//                                     onPress={this.onSubmitForgotPassword}
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

// export default connect(mapStateToProps)(ForgotPassword);

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
