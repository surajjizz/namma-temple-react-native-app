import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Districts from '../screens/district/Districts';
import Gods from '../screens/god/Gods';
import Temples from '../screens/temple/Temples';
import { COLORS } from '../constants/Theme';

export type RootStackParams = {
    Districts: undefined;
    //   RestaurantsStack: NavigatorScreenParams<RestaurantsStackParams>;
    Gods: undefined;
    Temples: undefined;
    //   Restaurant: {
    //     name: string;
    //   };
};

const TopTab = createMaterialTopTabNavigator<RootStackParams>();

const HomeTabNavigator = () => {
    return (
        <TopTab.Navigator initialRouteName="Districts" screenOptions={({ route }) => ({
            headerShown: false,
            tabBarActiveTintColor: COLORS.white,
            tabBarLabelStyle: { fontWeight: 'bold' },
            tabBarStyle: { backgroundColor: COLORS.primary },
            tabBarIndicatorStyle: { borderColor: COLORS.white, borderBottomWidth: 3, elevation: 2 }
        })}>
            <TopTab.Screen name="Districts" component={Districts} />
            <TopTab.Screen name="Gods" component={Gods} />
            <TopTab.Screen name="Temples" component={Temples} />
        </TopTab.Navigator>
    )
}

export { HomeTabNavigator };
