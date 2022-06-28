import React from 'react';
import { View, Image, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import Pulse from './Pulse';
import Icon from 'react-native-vector-icons/MaterialIcons';
// import PropTypes from 'prop-types';

interface IProps {
    type: string
    isEnable: boolean
    avatar: any
    size: any
    onPress: any
    avatarBackgroundColor: string
    borderColor: string
    interval: number
    pressInValue?: any
    pressDuration?: any
    pressInEasing?: any
    pressOutEasing?: any
    duration: number
    pulseMaxSize: number
    backgroundColor: string
}

interface IState {
    circles: any
    isEnable: boolean
}

export default class PulseLoader extends React.Component<IProps, IState> {
    counter: number;
    setInterval: any;
    anim: any;
    state: IState;
    props: IProps;

    constructor(props: any) {
        super(props);

        this.state = {
            circles: [],
            isEnable: true
        };

        this.counter = 1;
        this.setInterval = null;
        this.anim = new Animated.Value(1);
    }

    componentDidMount() {
        this.setCircleInterval();
        setTimeout(
            () => {
                this.setState({ isEnable: false })
            }, this.props.duration
        );
    }

    componentWillUnmount() {
        clearInterval(this.setInterval);
    }

    setCircleInterval() {
        this.setInterval = setInterval(this.addCircle.bind(this), this.props.interval);
        this.addCircle();
    }

    addCircle() {
        this.setState({ circles: [...this.state.circles, this.counter] });
        this.counter++;
    }

    onPressIn() {
        Animated.timing(this.anim, {
            toValue: this.props.pressInValue,
            duration: this.props.pressDuration,
            easing: this.props.pressInEasing,
            useNativeDriver: true
        }).start(() => clearInterval(this.setInterval));
    }

    onPressOut() {
        Animated.timing(this.anim, {
            toValue: 1,
            duration: this.props.pressDuration,
            easing: this.props.pressOutEasing,
            useNativeDriver: true
        }).start(this.setCircleInterval.bind(this));
    }

    customPress() {
        this.setState({ isEnable: false });
        this.props.onPress();
    }

    render() {
        const { type, isEnable, size, avatar, avatarBackgroundColor } = this.props;

        return (
            <View style={styles.container}>
                {isEnable === true && this.state.isEnable && this.state.circles.map((circle: any) => (
                    <Pulse
                        key={circle}
                        {...this.props}
                    />
                ))}

                <TouchableOpacity
                    activeOpacity={1}
                    onPressIn={this.onPressIn.bind(this)}
                    onPressOut={this.onPressOut.bind(this)}
                    onPress={this.customPress.bind(this)}
                    style={[styles.itemStyle, {
                        transform: [{
                            scale: this.anim
                        }]
                    }]}>

                    {type === 'image' ?
                        <Image
                            source={avatar}
                            style={{
                                width: size,
                                height: size,
                                borderRadius: size / 2,
                                backgroundColor: avatarBackgroundColor
                            }}
                        />
                        :
                        <Icon name={avatar} size={30} color='gray' />
                    }
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center'        
    },
    itemStyle: {
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 30,
        padding: 10,
        backgroundColor: 'white',
        elevation: 2
    }
});

// PulseLoader.PropTypes = {
//     interval: 2000,
//     size: 100,
//     pulseMaxSize: 200,
//     avatar: undefined,
//     avatarBackgroundColor: 'blue',
//     pressInValue: 0.8,
//     pressDuration: 150,
//     pressInEasing: Easing.in,
//     pressOutEasing: Easing.in,
//     borderColor: '#1c1d1f',
//     backgroundColor: '#D1D1D1',
//     getStyle: undefined,
// };
