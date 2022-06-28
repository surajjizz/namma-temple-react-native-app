// import * as React from "react";
// import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
// // import { DistrictBottomRouter } from './BottomRouter';
// import DashboardScreen from '../screens/dashboard/Dashboard';
// import { COLORS } from "../constants/Theme";
// import { Alert, Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
// import Icon from "react-native-vector-icons/MaterialIcons";
// import DistrictTopRouter from "./DistrictTopRouter";
// import FunctionUtils from "../utils/Function";
// import * as RootNavigation from './RootNavigation';
// import Store from '../redux-store/store';
// import MyAccount from '../screens/my-account/Profile';

// const Drawer = createDrawerNavigator();

// const onConfirmLogout = () => {
//     return (
//         Alert.alert('Namma Temple', 'Are you sure you want to logout', [
//             {
//                 text: "Cancel",
//                 onPress: () => null,
//                 style: "cancel"
//             },
//             {
//                 text: "YES", onPress: () => {
//                     FunctionUtils.clearData();
//                     RootNavigation.resetRoot("LoginScreen");
//                 }
//             }
//         ])
//     )
// }

// const HomeRouter = () => {
//     return (
//         <Drawer.Navigator initialRouteName="HomeScreen"
//             screenOptions={{
//                 // cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid,
//                 headerShown: true,
//                 headerStyle: {
//                     backgroundColor: COLORS.primary,
//                     shadowOpacity: 10,
//                     elevation: 0,
//                 },
//                 headerTintColor: COLORS.white,
//                 headerTitleAlign: 'left',
//                 headerTitleStyle: {
//                     fontSize: 19,
//                 }
//             }}
//             drawerContentOptions={{ activeBackgroundColor: COLORS.primary, activeTintColor: COLORS.white, labelStyle: { fontSize: 15 } }}
//             // drawerContent={props => <SideBar {...props} />}
//             drawerContent={(props: any) => {
//                 return (
//                     <SafeAreaView style={{ flex: 1 }}>
//                         <View
//                             style={{
//                                 height: 180,
//                                 alignItems: "center",
//                                 justifyContent: "center",
//                                 backgroundColor: COLORS.primary
//                             }} >
//                             <Image
//                                 source={require('../assets/img/app-logo.jpg')}
//                                 style={{ width: 100, height: 100, borderRadius: 50 }}
//                             />
//                             {Store.getState().loginReducer.fullname &&
//                                 <Text style={{ color: COLORS.white, marginTop: 10, fontSize: 15 }}>
//                                     {Store.getState().loginReducer.fullname}
//                                 </Text>
//                             }
//                         </View>
//                         <DrawerItemList {...props} />
//                         <View
//                             style={{
//                                 height: 45,
//                                 width: '100%',
//                                 alignItems: "center",
//                                 justifyContent: "center",
//                                 backgroundColor: COLORS.white,
//                                 bottom: 0,
//                                 position: 'absolute',
//                                 borderTopColor: COLORS.darkGray,
//                                 borderTopWidth: 0.5
//                             }} >
//                             <TouchableOpacity onPress={onConfirmLogout}>
//                                 <Text>Logout</Text>
//                             </TouchableOpacity>
//                         </View>
//                     </SafeAreaView>
//                 );
//             }}>
//             <Drawer.Screen name="MyAccountScreen" component={MyAccount}
//                 options={{
//                     drawerLabel: 'MyAccount', headerTitle: 'MyAccount',
//                     drawerIcon: ({ focused, size }) => (
//                         <Icon name="account-circle" size={size} color={focused ? COLORS.white : COLORS.gray} />),
//                 }} />
//             <Drawer.Screen name="Dashboard" component={DashboardScreen}
//                 options={{
//                     drawerLabel: 'Dashboard', headerTitle: 'Dashboard',
//                     drawerIcon: ({ focused, size }) => (
//                         <Icon name="insert-chart-outlined" size={size} color={focused ? COLORS.white : COLORS.gray} />),
//                     headerRight: () => (
//                         <View style={{
//                             flexDirection: 'row',
//                             width: 60,
//                             justifyContent: 'space-between',
//                             marginRight: 10,
//                         }}>
//                             <Icon name="search" size={22} color={COLORS.white} />
//                             <Icon name="more-vert" size={22} color={COLORS.white} />
//                         </View>
//                     )
//                 }} />
//             <Drawer.Screen name="HomeScreen" component={DistrictTopRouter}
//                 options={{
//                     drawerLabel: 'Home', headerTitle: 'Namma Temple',
//                     drawerIcon: ({ focused, size }) => (
//                         <Icon name="home" size={size} color={focused ? COLORS.white : COLORS.gray} />),
//                     headerRight: () => (
//                         <View style={{
//                             flexDirection: 'row',
//                             width: 70,
//                             justifyContent: 'space-between',
//                             marginRight: 10,
//                         }}>
//                             <Icon name="search" size={24} color={COLORS.white} />
//                             <Icon name="more-vert" size={24} color={COLORS.white} />
//                         </View>
//                     )
//                 }}
//             />
//         </Drawer.Navigator>
//     );
// }

// export default HomeRouter;
