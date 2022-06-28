import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import AntdIcon from 'react-native-vector-icons/AntDesign';
import CustomDrawer from '../components/CustomDrawer';
import { HomeTabNavigator } from './TabNavigator';
import Dashboard from '../screens/dashboard/Dashboard';
import Notification from '../screens/notification/Notification';
import { COLORS } from '../constants/Theme';
import MyAccount from '../screens/my-account/MyAccount';

export type RootStackParams = {
    MyAccount: undefined
    Home: undefined
    Dashboard: undefined
    Notification: undefined
};

const Drawer = createDrawerNavigator<RootStackParams>();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator
            initialRouteName='Home'
            drawerContent={props => <CustomDrawer {...props} />}
            screenOptions={{
                drawerActiveBackgroundColor: '#219e90fc',
                drawerActiveTintColor: COLORS.white,
                drawerInactiveTintColor: '#333',
                drawerLabelStyle: {
                    marginLeft: -12,
                    fontFamily: 'Roboto-Medium',
                    fontSize: 16,
                },
                headerStyle: {
                    backgroundColor: COLORS.primary,
                    shadowOpacity: 10,
                    elevation: 0,
                },
                headerTintColor: COLORS.white,
                headerTitleAlign: 'left',
                headerTitleStyle: {
                    fontSize: 18,
                }

            }}>
            <Drawer.Screen name="MyAccount" component={MyAccount}
                options={{
                    drawerLabel: 'Acccount',
                    drawerIcon: ({ color }) => (
                        <AntdIcon name="user" size={22} color={color} />
                    )
                }}
            />
            <Drawer.Screen name="Home" component={HomeTabNavigator}
                options={{
                    drawerLabel: 'Home', headerTitle: 'Namma Temple',
                    drawerIcon: ({ color }) => (
                        <AntdIcon name="home" size={22} color={color} />
                    )
                }}
            />
            <Drawer.Screen name="Dashboard" component={Dashboard}
                options={{
                    drawerIcon: ({ color }) => (
                        <AntdIcon name="barschart" size={22} color={color} />
                    )
                }}
            />
            <Drawer.Screen name="Notification" component={Notification}
                options={{
                    drawerIcon: ({ color }) => (
                        <MaterialIcon name="notifications-none" size={22} color={color} />
                    )
                }}
            />
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;
