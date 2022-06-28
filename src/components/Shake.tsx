import * as React from 'react';
import { Animated } from 'react-native';

export default class Shake extends React.Component<{}, {}> {
    shakeAnimation: Animated.Value;

    constructor(props: any) {
        super(props);
        this.shakeAnimation = new Animated.Value(0);
    }

    componentDidMount(){
        this.startShake();
    }

    startShake = () => {
        Animated.sequence([
            Animated.timing(this.shakeAnimation, { toValue: 10, duration: 100, useNativeDriver: true }),
            Animated.timing(this.shakeAnimation, { toValue: -10, duration: 100, useNativeDriver: true }),
            Animated.timing(this.shakeAnimation, { toValue: 10, duration: 100, useNativeDriver: true }),
            Animated.timing(this.shakeAnimation, { toValue: 0, duration: 100, useNativeDriver: true })
        ]).start();
    }

    render() {
        return (
            <Animated.View style={{ transform: [{ translateX: this.shakeAnimation }] }}>
                {this.props.children}
            </Animated.View>
        )
    }
}
