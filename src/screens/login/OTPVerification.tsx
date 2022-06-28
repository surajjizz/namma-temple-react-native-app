import * as React from 'react';
import { Easing, Image, StatusBar, StyleSheet, Text, View, Animated, Keyboard } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Theme, Images } from '../../constants';
import Loader from '../../components/Loader';
import OTPTextInput from '../../components/OTPTextInput';
import Button from '../../components/Button';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../../navigation/StackNavigator';
import LoginStore from '../../mobx-store/LoginStore';
import RootStore from '../../mobx-store/RootStore';
import { inject, observer } from 'mobx-react';
import { action, observable } from 'mobx';
import LoginHelper from '../../helpers/LoginHelper';

const { appLogo } = Images;
const { COLORS, width, height } = Theme;

interface IProps {
    navigation: NativeStackNavigationProp<RootStackParams>;
    loginStore: LoginStore;
}

interface IState {
    screenAnimation: any,
    refOtpNo1: any,
    refOtpNo2: any,
    refOtpNo3: any,
    refOtpNo4: any,
    refOtpNo5: any,
    errOTP: any,
    otpInput: any,
}

@inject(() => ({
    loginStore: RootStore.loginStore
}))

@observer
export default class OTPVerification extends React.Component<IProps, IState>{
    @observable isValidForm: boolean = true;
    keyboardDidHideListener: any;
    otpInput: any;
    state: IState;
    loadingButton: any;
    otpValue: string;
    refShake: any

    constructor(props: any) {
        super(props);
        this.otpValue = '';
        this.refShake = React.createRef();
        this.state = {
            screenAnimation: new Animated.Value(height),
            refOtpNo1: "",
            refOtpNo2: "",
            refOtpNo3: "",
            refOtpNo4: "",
            refOtpNo5: "",
            errOTP: "",
            otpInput: ""
        }
    }

    componentDidMount = () => {
        this.animateContainer();
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
    }

    componentWillUnmount() {
        this.keyboardDidHideListener.remove();
    }

    animateContainer = () => {
        Animated.timing(this.state.screenAnimation, {
            toValue: height / 1.8,
            duration: 1000,
            easing: Easing.elastic(1.2),
            useNativeDriver: false
        }).start();
    }

    animateInput = () => {
        Animated.timing(this.state.screenAnimation, {
            toValue: height / 3,
            duration: 1000,
            easing: Easing.elastic(1.2),
            useNativeDriver: false
        }).start();
    }

    keyboardDidHide = () => {
        Keyboard.dismiss();
    }

    @action onChangeValue = (value: any) => {
        this.props.loginStore.register_otp = value

        if (!this.isValidForm) {
            this.props.loginStore.isValidRegisterOTPForm();
        }
    }

    @action onSubmitOTP = async () => {
        if (this.props.loginStore.isValidRegisterOTPForm()) {
            this.isValidForm = true;
            await LoginHelper.verifyRegisterOTP(this.props.navigation);
        } else {
            this.isValidForm = false;
        }
    }

    onResendOTP = async () => {
        await LoginHelper.registration(this.props.navigation);
    }

    render() {
        const animatetedContainer = {
            height: this.state.screenAnimation
        }

        var { register_otp, isLoading } = this.props.loginStore;

        return (
            <View style={{ height: height }}>
                <Animated.View style={[animatetedContainer, { width: width }]}>
                    <StatusBar barStyle="dark-content" backgroundColor={COLORS.secondary} />
                    <View style={styles.topContainer}>
                        <Image
                            source={appLogo}
                            resizeMode="contain"
                            style={styles.logoStyle}
                        />
                    </View>
                    <View style={styles.bottomContainer}>
                        <Animated.View style={styles.floatingContainer}>
                            <Text style={{ fontSize: 22, textAlign: "center" }}>OTP Verification</Text>
                            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ width: '100%', marginTop: 20, marginBottom: 20 }}>
                                    <OTPTextInput ref={e => (this.otpInput = e)} onChange={(val: any) => this.onChangeValue(val)}
                                        onFocus={this.animateInput} onBlur={this.animateContainer}
                                        otpLength={5} inputValue={register_otp} />
                                    <TouchableOpacity style={styles.resendBtnStyle} onPress={this.onResendOTP}>
                                        <Text style={{ color: COLORS.primary, fontSize: 16 }}>Resend OTP?</Text>
                                    </TouchableOpacity>
                                </View>
                                <Button onPress={this.onSubmitOTP} title={'ACTIVATE'} style={{ width: '100%' }} />
                            </View>
                        </Animated.View>
                    </View>
                </Animated.View>
                <Loader visibility={isLoading} />
            </View>
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
    logoStyle: {
        height: '30%',
        width: '30%',
        marginBottom: 70,
        borderRadius: 30
    },
    bottomContainer: {
        height: height,
        width: width,
        alignItems: 'center',
        backgroundColor: COLORS.white
    },
    floatingContainer: {
        // height: height / 3,
        width: '95%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        marginTop: -60,
        borderRadius: 20,
        padding: 25,
        elevation: 5
    },
    input: {
        fontSize: 15,
        borderWidth: 1,
        borderColor: '#aaa',
        textAlign: 'center',
        borderRadius: 10,
        height: 50,
        padding: 15,
        marginVertical: 5
    },
    resendBtnStyle: {
        flexDirection: 'row',
        justifyContent: "center",
        marginTop: 10
    },
    errMsgStyle: {
        textAlign: "center",
        fontSize: 12,
        color: COLORS.error
    }
});
