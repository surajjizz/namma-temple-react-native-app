import * as React from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';

interface IProps {
    size: any
    pulseMaxSize: any
    borderColor: any
    backgroundColor: any
    getStyle: any
    interval: number
}

export default class Pulse extends React.Component<IProps, {}> {
    anim: any;

    constructor(props: any) {
        super(props);

        this.anim = new Animated.Value(0);
    }

    componentDidMount() {
        Animated.timing(this.anim, {
            toValue: 1,
            duration: this.props.interval,
            easing: Easing.in,
            useNativeDriver: false
        })
            .start();
    }

    render() {
        const { size, pulseMaxSize, borderColor, backgroundColor, getStyle } = this.props;

        return (
            <View style={[styles.circleWrapper, {
                width: pulseMaxSize,
                height: pulseMaxSize,
                marginLeft: -pulseMaxSize / 2,
                marginTop: -pulseMaxSize / 2,
            }]}>
                <Animated.View
                    style={[styles.circle, {
                        borderColor,
                        backgroundColor,
                        width: this.anim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [size, pulseMaxSize]
                        }),
                        height: this.anim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [size, pulseMaxSize]
                        }),
                        borderRadius: pulseMaxSize / 2,
                        opacity: this.anim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [1, 0]
                        })
                    }, getStyle && getStyle(this.anim)]}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    circleWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute'
    },
    circle: {
        borderWidth: 4 * StyleSheet.hairlineWidth,
    },
});
