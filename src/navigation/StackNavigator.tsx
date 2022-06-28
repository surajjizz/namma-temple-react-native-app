import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../screens/splash/Splash';
import Onboarding from '../screens/onboarding/Onboarding';
import Login from '../screens/login/Login';
import Register from '../screens/login/Register';
import OTPVerification from '../screens/login/OTPVerification';
// import ForgotPassword from '../screens/login/ForgotPassword';
// import ResetPassword from '../screens/login/ResetPassword';
import Religions from '../screens/religion/Religions';

import DistrictDetail from '../screens/district/DistrictDetail';
import { COLORS } from '../constants/Theme';
import DrawerNavigator from './DrawerNavigator';
import Gods from '../screens/god/Gods';
import GodDetail from '../screens/god/GodDetail';
import Temples from '../screens/temple/Temples';

export type RootStackParams = {
    Splash: undefined
    // RestaurantsStack: NavigatorScreenParams<RestaurantsStackParams>;
    Onboarding: undefined
    Login: undefined
    Register: undefined
    OTPVerification: undefined
    ForgotPassword: undefined
    ResetPassword: undefined
    Religions: undefined
    DrawerNavigator: undefined
    DistrictDetail: {
        name: string
    }
    Gods: {
        districtId?: number,
        districtName?: string
        name?: string
    }
    GodDetail: {
        name?: string
    }
    Temples: {
        districtId?: number
        districtName?: string
        godId?: number
        godName?: string
        name?: string
    }
};

const Stack = createNativeStackNavigator<RootStackParams>();

const StackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName='Splash'>
            <Stack.Group screenOptions={{
                statusBarAnimation: 'slide',
                headerStyle: { backgroundColor: COLORS.primary },
                headerTintColor: COLORS.white,
                headerTitleAlign: 'left',
                headerTitleStyle: { fontSize: 18 }
            }}>
                <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
                <Stack.Screen name="Onboarding" component={Onboarding} options={{ headerShown: false }} />
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false, animation: 'slide_from_bottom' }} />
                <Stack.Screen name="Register" component={Register} options={{ headerShown: false, animation: 'slide_from_bottom' }} />
                <Stack.Screen name="OTPVerification" component={OTPVerification} options={{ headerShown: false }} />
                {/*<Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
                    <Stack.Screen name="ResetPassword" component={ResetPassword} options={{ headerShown: false }} /> */}
                <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} options={{ headerShown: false }} />
                <Stack.Screen name="Religions" component={Religions} options={{ title: "Religions", headerLeft: () => null }} />

                <Stack.Screen name="DistrictDetail" component={DistrictDetail} options={({ route }) => ({ title: route?.params?.name })} />
                <Stack.Screen name="Gods" component={Gods} options={({ route }) => ({ title: route?.params?.name })} />
                <Stack.Screen name="GodDetail" component={GodDetail} options={({ route }) => ({ title: route?.params?.name })} />
                <Stack.Screen name="Temples" component={Temples} options={({ route }) => ({ title: route?.params?.name })} />
            </Stack.Group>
        </Stack.Navigator>
    );
};

export default StackNavigator;
