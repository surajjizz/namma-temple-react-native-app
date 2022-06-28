import * as React from 'react';
import { TouchableOpacity, Text, StyleSheet, SafeAreaView, View } from 'react-native';
import { Theme } from '../constants';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import Animated from 'react-native-reanimated';
import AppDefaults from '../defaults/AppDefaults';
import FunctionUtils from '../utils/Function';

const { COLORS } = Theme;

interface IProps {
    navigation: any
}

const routes = [
    {
        name: 'My Account',
        path: 'MyAccount',
        icon: 'person'
    },
    {
        name: 'Dashboard',
        path: 'Dashboard',
        icon: 'pie-chart'
    },
    {
        name: 'District',
        path: 'District',
        icon: 'pie-chart'
    },
    {
        name: 'God',
        path: 'God',
        icon: 'pie-chart'
    },
    {
        name: 'Temple',
        path: 'Temple',
        icon: 'pie-chart'
    },
];



function Sidebar({ progress, ...props }) {
    const onLogout = () => {
        // FunctionUtils.clearData();
        // props.navigation.navigate("Welcome");
    }

    const translateX = Animated.interpolateNode(progress, {
        inputRange: [0, 1],
        outputRange: [-100, 0]
    });

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ height: 180, alignItems: "center", justifyContent: "center", backgroundColor: COLORS.primary }}>
                <Icon name="account-circle" size={130} color={COLORS.white} />
                {/* <Text style={{ color: COLORS.white, fontSize: 17, textTransform: 'uppercase' }}>{AppDefaults.userName}</Text> */}
            </View>
            <DrawerContentScrollView {...props}>
                <Animated.View style={{ transform: [{ translateX }] }}>
                    {routes.map((route, id) => {
                        return (<TouchableOpacity key={id} onPress={() => props.navigation.navigate(route.path)} style={[styles.listStyle]}>
                            <View style={{ alignItems: 'flex-start', marginLeft: 5 }}>
                                <Icon name={route.icon} size={24} color={COLORS.primary} />
                            </View>
                            <View style={{ alignItems: 'flex-start', marginLeft: 20 }}>
                                <Text style={styles.textStyle}>{route.name}</Text>
                            </View>
                        </TouchableOpacity>)
                    })}
                </Animated.View>
            </DrawerContentScrollView>
            <TouchableOpacity style={[styles.footerStyle]} onPress={onLogout}>
                <Icon name="exit-to-app" size={25} color={COLORS.primary} />
                <Text style={{ color: COLORS.lightGray, fontSize: 16, marginLeft: 10 }}>Logout1</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default Sidebar;

const styles = StyleSheet.create({
    listStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 48,
        marginLeft: 5,
        marginRight: 5,
        padding: 10,
        borderRadius: 5
    },
    textStyle: {
        color: COLORS.lightGray,
        textTransform: 'uppercase',
        fontSize: 15
    },
    footerStyle: {
        flexDirection: 'row',
        bottom: 0,
        position: 'absolute',
        borderTopColor: COLORS.darkGray,
        borderLeftColor: COLORS.white,
        borderRightColor: COLORS.white,
        borderBottomColor: COLORS.white,
        borderWidth: 1,
        width: '100%',
        alignItems: "center",
        justifyContent: "center",
        height: 45
    }
});
