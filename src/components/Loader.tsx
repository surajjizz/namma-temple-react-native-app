import * as React from 'react';
import { StyleSheet, ActivityIndicator, View, Text } from 'react-native';
import { Theme } from '../constants';

const { COLORS } = Theme;

interface IProps {
    visibility: boolean
}

export default class Loader extends React.Component<IProps, {}> {
    render() {
        return (
            this.props.visibility &&
            <View style={styles.container}>
                <View style={styles.loader}>
                    <ActivityIndicator color={COLORS.blue} size="large" />
                    <Text style={{ textAlign: 'center', color: COLORS.gray, fontSize: 11, marginTop: 8 }}>Loading...</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    loader: {
        backgroundColor: COLORS.white,
        borderRadius: 10,
        width: 100,
        height: 100,
        // justifyContent: "center",
        paddingTop: 30,
        elevation: 2,
        borderColor: COLORS.darkGray,
        borderWidth: 0.05
    }
});
