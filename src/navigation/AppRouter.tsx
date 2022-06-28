// import * as React from 'react';
// import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
// import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
// import HomeRouter from './HomeRouter';
// // import { DistrictBottomRouter } from './BottomRouter';
// import SplashScreen from '../screens/splash/Splash';
// import WelcomeScreen from '../screens/onboarding/Onboarding';
// import LoginScreen from '../screens/login/Login';
// import RegisterScreen from '../screens/login/Register';
// import OTPVerificationScreen from '../screens/login/OTPVerification';
// import ForgotPasswordScreen from '../screens/login/ForgotPassword';
// import ResetPassswordScreen from '../screens/login/ResetPassword';
// import Religions from '../screens/religion/Religions';
// import LoginLoader from '../screens/login/LoginLoader';
// import DistrictView from '../screens/district/DistrictView';
// import Gods from '../screens/god/Gods';
// import GodView from '../screens/god/GodView';
// import TempleView from '../screens/temple/TempleView';
// import Temples from '../screens/temple/Temples';
// import { COLORS } from '../constants/Theme';
// import { YoutubePlayer } from '../components';
// import { navigationRef } from './RootNavigation';

// const Stack = createStackNavigator();

// const getHeaderTitle = (route: any) => {
//     const { name } = route.params;
//     return name;
// }

// const AppRouter = (colorScheme: any) => {
//     return (
//         <NavigationContainer ref={navigationRef} theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
//             <Stack.Navigator
//                 screenOptions={{
//                     cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid,
//                     headerStyle: {
//                         backgroundColor: COLORS.primary,
//                         shadowOpacity: 10,
//                         elevation: 10,
//                     },
//                     headerTintColor: COLORS.white,
//                     headerTitleAlign: 'left',
//                     headerTitleStyle: {
//                         fontSize: 18,
//                         marginLeft: -5
//                     }
//                 }}>
//                 <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
//                 <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
//                 <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
//                 <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
//                 <Stack.Screen name="OTPVerify" component={OTPVerificationScreen} options={{ headerShown: false }} />
//                 <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} options={{ headerShown: false }} />
//                 <Stack.Screen name="ResetPasswordScreen" component={ResetPassswordScreen} options={{ headerShown: false }} />
//                 <Stack.Screen name="LoginLoaderScreen" component={LoginLoader} options={{ headerShown: false }} />
//                 <Stack.Screen name="HomeRouter" component={HomeRouter} options={{ headerShown: false }} />
//                 <Stack.Screen name="ReligionsScreen" component={Religions}
//                     options={({ route, navigation }) => ({
//                         title: "Religions", headerLeft: () => null
//                     })} />
//                 <Stack.Screen name="DistrictViewScreen" component={DistrictView}
//                     options={({ route, navigation }) => ({
//                         title: getHeaderTitle(route)
//                     })} />
//                 <Stack.Screen name="GodsScreen" component={Gods}
//                     options={({ route, navigation }) => ({
//                         title: getHeaderTitle(route)
//                     })} />
//                 <Stack.Screen name="GodViewScreen" component={GodView}
//                     options={({ route, navigation }) => ({
//                         title: getHeaderTitle(route)
//                     })} />
//                 <Stack.Screen name="TemplesScreen" component={Temples}
//                     options={({ route, navigation }) => ({
//                         title: getHeaderTitle(route)
//                     })} />
//                 <Stack.Screen name="TempleViewScreen" component={TempleView}
//                     options={({ route, navigation }) => ({
//                         title: getHeaderTitle(route)
//                     })} />
//                 <Stack.Screen name="YoutubePlayerScreen" component={YoutubePlayer}
//                     options={({ route, navigation }) => ({
//                         title: getHeaderTitle(route)
//                     })} />
//                 {/* <Stack.Screen name="AccountBottomRouter" component={DistrictBottomRouter} options={{ headerShown: false }} /> */}
//             </Stack.Navigator>
//         </NavigationContainer>
//     );
// };

// export default AppRouter;
