import * as React from 'react';
import { Easing, Image, StatusBar, StyleSheet, Text, View, Animated, Keyboard, TouchableOpacity, BackHandler, Alert } from 'react-native';
import { Theme, Images, Messages } from '../../constants';
import FloatingLabelInput from '../../components/FloatingLabelInput';
import { inject, observer } from 'mobx-react';
import RootStore from '../../mobx-store/RootStore';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../../navigation/StackNavigator';
import LoginStore from '../../mobx-store/LoginStore';
import { action, observable } from 'mobx';
import LoginHelper from '../../helpers/LoginHelper';
import FormGroup from '../../components/FormGroup';
import Loader from '../../components/Loader';
import Button from '../../components/Button';
import Function from '../../utils/Function';

const { COLORS, width, height } = Theme;

interface IProps {
    navigation: NativeStackNavigationProp<RootStackParams>;
    loginStore: LoginStore;
}

@inject(() => ({
    loginStore: RootStore.loginStore
}))

@observer
export default class Login extends React.Component<IProps, {}>{
    @observable isValidForm: boolean = true;
    @observable screenAnimation: any = new Animated.Value(height);
    keyboardDidHideListener: any;
    refShake: any

    constructor(props: any) {
        super(props);
        this.refShake = React.createRef();
    }

    backAction = () => {
        if (Function.isPrevScreen(this.props.navigation) === false) {
            Alert.alert('Confirm Exit', Messages.exitWarning, [
                {
                    text: "Cancel",
                    onPress: () => null,
                    style: "cancel"
                },
                { text: "YES", onPress: () => BackHandler.exitApp() }
            ]);
            return true;
        }
        else {
            return false;
        }
    }

    componentDidMount() {
        this.animateContainer();
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
        BackHandler.addEventListener("hardwareBackPress", this.backAction);
    }

    componentWillUnmount() {
        this.keyboardDidHideListener.remove();
        BackHandler.removeEventListener("hardwareBackPress", this.backAction);
    }

    keyboardDidHide = () => {
        Keyboard.dismiss();
    };

    animateContainer = () => {
        Animated.timing(this.screenAnimation, {
            toValue: height / 1.8,
            duration: 1000,
            easing: Easing.elastic(1.2),
            useNativeDriver: false
        }).start();
    }

    animateInput = () => {
        Animated.timing(this.screenAnimation, {
            toValue: height / 3,
            duration: 1000,
            easing: Easing.elastic(1.2),
            useNativeDriver: false
        }).start();
    }

    navigateToRegistration = () => {
        this.props.loginStore.resetLoginPostData();
        this.props.navigation.navigate('Register');
    }

    navigateToForgotPassword = () => {
        this.props.loginStore.resetLoginPostData();
        this.props.navigation.navigate('ForgotPassword');
    }

    @action onChangeValue = (value: any, name: string) => {
        if (name === 'email') {
            this.props.loginStore.email = value;
        } else {
            this.props.loginStore.password = value;
        }

        if (!this.isValidForm) {
            this.props.loginStore.isValidLoginForm();
        }
    }

    @action onSubmitLogin = async () => {
        if (this.props.loginStore?.isValidLoginForm()) {
            this.isValidForm = true;
            await LoginHelper.login(this.props.navigation);
        } else {
            this.isValidForm = false;
        }
    }

    render() {
        const animatetedContainer = {
            height: this.screenAnimation
        }

        var { email, password, formLoginErrors, isLoading } = this.props.loginStore;

        return (
            <View style={{ height: height }}>
                <StatusBar barStyle='default' animated showHideTransition='slide' backgroundColor={COLORS.secondary} />
                <Animated.View style={[animatetedContainer, { width: width }]}>
                    <View style={styles.topContainer}>
                        <Image
                            source={Images.welcomeLogo4}
                            resizeMode='cover'
                        />
                        <View style={styles.overlay} />
                        <Text style={{ position: 'absolute', fontSize: 25, color: COLORS.white, fontWeight: 'bold' }}>LOGIN</Text>
                    </View>
                    <View style={styles.bottomContainer}>
                        <Animated.View style={styles.floatingContainer}>
                            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ width: '100%', marginBottom: 6 }}>
                                    <FormGroup required error={formLoginErrors?.email}>
                                        <FloatingLabelInput onFocus={this.animateInput} onBlur={this.animateContainer}
                                            keyboardType="email-address" placeholder="Email" onChangeText={(value: any) => this.onChangeValue(value, 'email')}
                                            value={email} autoCapitalize='none'
                                        />
                                    </FormGroup>
                                    <FormGroup required error={formLoginErrors?.password}>
                                        <FloatingLabelInput onFocus={this.animateInput} onBlur={this.animateContainer}
                                            placeholder="Password" onChangeText={(value: any) => this.onChangeValue(value, 'password')}
                                            value={password} secureTextEntry
                                        />
                                    </FormGroup>
                                </View>
                                <TouchableOpacity style={styles.forgotPasswordBtnStyle} onPress={this.navigateToForgotPassword}>
                                    <Text style={{ color: COLORS.primary, fontSize: 14, textAlign: 'right' }}>Forgot Password?</Text>
                                </TouchableOpacity>
                                <Button onPress={this.onSubmitLogin} title={'LOGIN'} style={{ width: '100%' }} />
                                <TouchableOpacity style={styles.signupBtnStyle} onPress={this.navigateToRegistration}>
                                    <Text style={{ color: COLORS.primary, fontSize: 15, marginTop: 10, textAlign: 'center' }}>Don't have an account</Text>
                                </TouchableOpacity>
                            </View>
                        </Animated.View>
                    </View>
                </Animated.View>
                <Loader visibility={isLoading} />
            </View >
        )
    }
}

const styles = StyleSheet.create({
    topContainer: {
        height: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primary
    },
    bottomContainer: {
        height: height,
        width: width,
        alignItems: 'center',
        backgroundColor: COLORS.white
    },
    floatingContainer: {
        width: '94%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        marginTop: -70,
        borderRadius: 20,
        paddingLeft: 25,
        paddingRight: 25,
        paddingTop: 0,
        paddingBottom: 10,
        elevation: 5
    },
    input: {
        fontSize: 15,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.darkGray,
        margin: 8,
        height: 50
    },
    forgotPasswordBtnStyle: {
        marginBottom: 15,
        width: '100%',
        justifyContent: 'flex-end'
    },
    signupBtnStyle: {
        marginBottom: 15,
        width: '100%',
        justifyContent: 'center'
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        // backgroundColor: 'rgba(0,0,0,0.7)',
        backgroundColor: COLORS.overlay,
    }
});
