import * as React from "react"
import { StatusBar, StyleSheet, View } from "react-native"
import { COLORS } from "../constants/Theme";

interface IProps {
    statusBarBg?: string
    backgroundColor?: string
    children?: any
}

const Container = (props: IProps) => {
    return (
        <View style={[styles.container, { backgroundColor: props?.backgroundColor ? props?.backgroundColor : COLORS.white }]}>
            <StatusBar barStyle='default' backgroundColor={props?.statusBarBg ? props?.statusBarBg : COLORS.secondary} />
            {props?.children}
        </View>
    )
}

export default Container;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})
