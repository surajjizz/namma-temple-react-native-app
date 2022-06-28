import * as React from "react";
import { StyleSheet, Text, View, Animated } from "react-native";
import { TouchableOpacity } from "react-native";
import { Theme } from "../constants";

const { COLORS } = Theme;

interface IState {
    message: String
}

export default class SnackBar extends React.Component<{}, IState> {
    constructor() {
        super();
        this.animatedValue = new Animated.Value(55);
        this.ShowSnackBar = false;
        this.HideSnackBar = true;
        this.state = {
            message: ""
        }
    }

    show = (content: any) => {
        this.setState({ message: content });
        if (this.ShowSnackBar === false) {
            this.ShowSnackBar = true;

            Animated.timing(this.animatedValue,
                {
                    toValue: -6,
                    duration: 400,
                    useNativeDriver: false
                }
            ).start(this.hide());
        }
    }

    hide = () => {
        this.timerID = setTimeout(() => {
            // if (this.HideSnackBar === true) {
            //     this.HideSnackBar = false;

            Animated.timing(this.animatedValue,
                {
                    toValue: 100,
                    duration: 400,
                    useNativeDriver: false
                }
            ).start(() => {
                this.HideSnackBar = true;
                this.ShowSnackBar = false;
                clearTimeout(this.timerID);
            })
            this.setState({ message: "" });
            // }
        }, 5000);
    }

    close = () => {
        if (this.HideSnackBar === true) {
            this.HideSnackBar = false;
            clearTimeout(this.timerID);

            Animated.timing(this.animatedValue,
                {
                    toValue: 55,
                    duration: 400,
                    useNativeDriver: false
                }
            ).start(() => {
                this.ShowSnackBar = false;
                this.HideSnackBar = true;
            });
        }
    }

    render() {
        return (
            <Animated.View style={[{ transform: [{ translateY: this.animatedValue }] }, styles.containter]}>
                <View style={{ flex: 2 }}>
                    <Text numberOfLines={2} style={styles.snackBarMessage}>{this.state.message}</Text>
                </View>
                <TouchableOpacity style={styles.snackBarBtn} onPress={this.close}>
                    <Text style={{ color: COLORS.warning }}>OK</Text>
                </TouchableOpacity>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    containter: {
        flex: 1,
        position: 'absolute',
        backgroundColor: COLORS.lightGray,
        flexDirection: 'row',
        alignItems: 'center',
        left: 5,
        bottom: 0,
        right: 5,
        height: 55,
        paddingLeft: 10,
        paddingRight: 55,
        borderRadius: 5
    },
    snackBarMessage: {
        color: COLORS.white,
        fontSize: 14
    },
    snackBarBtn: {
        flex: 1,
        color: COLORS.orange,
        fontSize: 18,
        position: 'absolute',
        right: 10,
        justifyContent: 'center',
        padding: 6
    }
});