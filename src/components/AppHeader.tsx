import * as React from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native';
import { Theme } from '../constants';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { DrawerActions } from '@react-navigation/native';

const { COLORS } = Theme;

interface IProps {
    title?: any,
    navigation: any,
    isDrawer?: boolean,
    isBack?: boolean,
    isSearch?: boolean,
    onSearch?: any
    backgroundColor?: string
    color?: string
}

export default class AppHeader extends React.Component<IProps, {}>{
    
    toggleDrawer = () => {
        this.props.navigation.dispatch(DrawerActions.toggleDrawer());
    }

    goToBack = () => {
        this.props.navigation.goBack();
    }

    render() {
        const { title, isDrawer, isBack, isSearch, color, backgroundColor, onSearch } = this.props;
        return (
            <SafeAreaView style={[styles.container, {
                backgroundColor: backgroundColor ? backgroundColor : COLORS.primary
                , elevation: backgroundColor ? 0 : 5
            }]}>
                {/* <StatusBar barStyle="dark-content" backgroundColor={COLORS.secondary} /> */}
                {isDrawer ?
                    <TouchableOpacity style={[styles.toggleStyle]} onPress={this.toggleDrawer}>
                        <Icon name="menu" size={25} color={color ? color : COLORS.white} />
                    </TouchableOpacity>
                    :
                    isBack &&
                    <TouchableOpacity style={[styles.toggleStyle]} onPress={this.goToBack}>
                        <Icon name="arrow-back" size={25} color={color ? color : COLORS.white} />
                    </TouchableOpacity>
                }
                <View style={[styles.titleStyle]}>
                    <Text style={{ color: color ? color : COLORS.white, fontSize: 19 }}>{title}</Text>
                </View>
                {isSearch &&
                    <TouchableOpacity style={[styles.searchStyle]} onPress={onSearch}>
                        <Icon name="search" size={25} color={color ? color : COLORS.white} />
                    </TouchableOpacity>
                }
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 55,
        justifyContent: 'center',
        alignItems: 'center'
    },
    toggleStyle: {
        // flex: 1,
        width: 50,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    titleStyle: {
        flex: 4,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingLeft: 15
    },
    searchStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    }
});
