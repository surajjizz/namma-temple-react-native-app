import * as React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Images } from '../constants';
import { COLORS } from '../constants/Theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import LoginStore from '../mobx-store/LoginStore';
import ReligionStore from '../mobx-store/ReligionStore';
import RootStore from '../mobx-store/RootStore';
import FunctionUtils from '../utils/Function';
import commonStyles from '../styles/Home';
import RootNavigation from '../navigation/RootNavigation';

export interface IBottomList {
    name: string
    icon: string
    onPress: any
    selectedVal?: string
}

const onConfirmLogout = () => {
    return (
        Alert.alert('Namma Temple', 'Are you sure you want to logout', [
            {
                text: "Cancel",
                onPress: () => null,
                style: "cancel"
            },
            {
                text: "YES", onPress: () => {
                    FunctionUtils.clearAllData(RootStore);
                    RootNavigation.resetRoot('Login');
                }
            }
        ])
    )
}

const navigateToReligion = () => {
    RootNavigation.navigate('Religions');
}

const BottomList = ({ name, icon, onPress, selectedVal }: IBottomList) => {
    return <View style={{ borderTopWidth: 0.4, borderTopColor: COLORS.gray }}>
        <TouchableOpacity onPress={onPress} style={{ paddingVertical: 12, flexDirection: 'row', marginLeft: 25, alignItems: 'center' }}>
            <Ionicons name={icon} size={22} />
            <Text style={{ fontSize: 14, fontFamily: 'Roboto-Medium', marginLeft: 10 }}>{name}</Text>
            {selectedVal !== undefined &&
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.badge}>{selectedVal}</Text>
                </View>
            }
        </TouchableOpacity>
    </View>
}

const CustomDrawer = (props: any) => {
    var { full_name, email }: LoginStore = RootStore.loginStore;
    var { selectedReligion }: ReligionStore = RootStore.religionStore;

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground source={Images.welcomeLogo1} style={{ height: 180, padding: 15 }}>
                <View style={commonStyles.overlay} />
                <View style={styles.avatarText}>
                    <Text style={styles.initialText}>{full_name?.charAt(0).toUpperCase()}</Text>
                </View>
                <Text numberOfLines={1} style={styles.nameText}>{full_name}</Text>
                <Text numberOfLines={1} style={styles.mailText}>{email}</Text>
            </ImageBackground>
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
            <BottomList name='Switch Religion' icon='git-branch-outline' onPress={navigateToReligion}
                selectedVal={selectedReligion.name_english}
            />
            <BottomList name='Sign Out' icon='exit-outline' onPress={onConfirmLogout} />
        </SafeAreaView>
    );
};

export default CustomDrawer;

const styles = StyleSheet.create({
    nameText: {
        fontSize: 18,
        color: COLORS.white,
        fontFamily: 'Roboto-Medium',
        marginBottom: 5
    },
    mailText: {
        color: COLORS.white,
        fontFamily: 'Roboto-Regular',
        marginRight: 5,
    },
    avatarText: {
        height: 75,
        width: 75,
        borderRadius: 50,
        marginBottom: 10,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center'
    },
    initialText: {
        fontWeight: 'bold',
        fontSize: 25
    },
    badge: {
        fontSize: 9, backgroundColor: COLORS.lightGreen,
        color: COLORS.white, padding: 3, borderRadius: 5,
        marginLeft: 10, textTransform: 'uppercase'
    }
})
