import * as React from 'react';
import { Easing, Image, StatusBar, StyleSheet, Text, View, Animated, Keyboard } from 'react-native';
import { Theme, Images } from '../../constants';
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

const { COLORS, width, height } = Theme;

interface IProps {
    navigation: NativeStackNavigationProp<RootStackParams>;
    loginStore: LoginStore;
}

@inject(() => ({
    loginStore: RootStore.loginStore
}))

@observer
export default class Register extends React.Component<IProps, {}>{
    @observable isValidForm: boolean = true;
    @observable screenAnimation: any = new Animated.Value(height);
    keyboardDidHideListener: any;
    refShake: any

    constructor(props: any) {
        super(props);
        this.refShake = React.createRef();
    }

    // backAction = () => {
    //     if (this.props.navigation.isFocused()) {
    //         console.log("this.props.navigation",this.props.navigation)
    //     }
    //     else {
    //         return false;
    //     }
    // };

    componentDidMount() {
        this.animateContainer();
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
        // BackHandler.addEventListener("hardwareBackPress", this.backAction);
    }

    componentWillUnmount() {
        this.props.loginStore.resetRegisterPostData();
        this.keyboardDidHideListener.remove();
        // BackHandler.removeEventListener("hardwareBackPress", this.backAction);
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

    navigateToOTPVerification = () => {
        this.props.navigation.navigate('OTPVerification');
    }

    @action onChangeValue = (value: any, name: string) => {
        if (name === 'full_name') {
            this.props.loginStore.full_name = value;
        } else if (name === 'email') {
            this.props.loginStore.email = value;
        } else {
            this.props.loginStore.password = value;
        }

        if (!this.isValidForm) {
            this.props.loginStore.isValidRegisterForm();
        }
    }

    @action onSubmitRegister = async () => {
        if (this.props.loginStore?.isValidRegisterForm()) {
            this.isValidForm = true;
            await LoginHelper.registration(this.props.navigation);
        } else {
            this.isValidForm = false;
        }
    }

    render() {
        const animatetedContainer = {
            height: this.screenAnimation
        }

        var { full_name, email, password, formRegisterErrors, isLoading } = this.props.loginStore;

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
                        <Text style={{ position: 'absolute', fontSize: 25, color: COLORS.white, fontWeight: 'bold' }}>CREATE ACCOUNT</Text>
                    </View>
                    <View style={styles.bottomContainer}>
                        <Animated.View style={styles.floatingContainer}>
                            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ width: '100%', marginBottom: 6 }}>
                                    <FormGroup required error={formRegisterErrors?.full_name}>
                                        <FloatingLabelInput onFocus={this.animateInput} onBlur={this.animateContainer}
                                            placeholder="Full Name" onChangeText={(value: any) => this.onChangeValue(value, 'full_name')}
                                            value={full_name}
                                        />
                                    </FormGroup>
                                    <FormGroup required error={formRegisterErrors?.email}>
                                        <FloatingLabelInput onFocus={this.animateInput} onBlur={this.animateContainer}
                                            keyboardType="email-address" placeholder="Email" onChangeText={(value: any) => this.onChangeValue(value, 'email')}
                                            value={email} autoCapitalize='none'
                                        />
                                    </FormGroup>
                                    <FormGroup required error={formRegisterErrors?.password}>
                                        <FloatingLabelInput onFocus={this.animateInput} onBlur={this.animateContainer}
                                            placeholder="Password" onChangeText={(value: any) => this.onChangeValue(value, 'password')}
                                            value={password} secureTextEntry
                                        />
                                    </FormGroup>
                                </View>
                                <Button onPress={this.onSubmitRegister} title={'REGISTER'} style={{ width: '100%', marginTop: 15 }} />
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
        backgroundColor: COLORS.overlay,
    }
});
