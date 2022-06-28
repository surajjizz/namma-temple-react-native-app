import * as React from 'react';
import { View, StyleSheet, Animated, TouchableWithoutFeedback } from 'react-native';
import { Theme } from '../constants';
import Icon from 'react-native-vector-icons/AntDesign';

const { COLORS } = Theme;

interface IProps {
    items: any[],
    icon: string
}

export default class FAB extends React.Component<IProps, {}> {
    animation = new Animated.Value(0);
    open: any;

    constructor(props: any) {
        super(props);
    }

    toggleMenu = () => {
        const toValue = this.open ? 0 : 1;
        Animated.spring(this.animation, {
            toValue,
            friction: 5,
            useNativeDriver: false
        }).start();

        this.open = !this.open;
    }

    render() {
        const itemStyles = [
            {
                transform: [
                    {
                        scale: this.animation
                    },
                    {
                        translateY: this.animation.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, -60]
                        })
                    }
                ]
            },
            {
                transform: [
                    {
                        scale: this.animation
                    },
                    {
                        translateY: this.animation.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, -50]
                        })
                    }
                ]
            },
            {
                transform: [
                    {
                        scale: this.animation
                    },
                    {
                        translateY: this.animation.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, -40]
                        })
                    }
                ]
            },
            {
                transform: [
                    {
                        scale: this.animation
                    },
                    {
                        translateY: this.animation.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, -30]
                        })
                    }
                ]
            },
            {
                transform: [
                    {
                        scale: this.animation
                    },
                    {
                        translateY: this.animation.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, -20]
                        })
                    }
                ]
            }
        ]

        const rotation = {
            transform: [
                {
                    rotate: this.animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: ["0deg", "180deg"]
                    })
                }
            ]
        }

        const visibleItems = this.props.items.filter(item => item.visibility === undefined || item.visibility === true);

        return (
            <View style={styles.container}>
                {visibleItems.map((item: any, itemIndex: number) => {
                    return <TouchableWithoutFeedback key={itemIndex} onPress={item.onPress} >
                        <Animated.View style={[styles.buttonStyle, styles.secondaryButtonStyle, itemStyles[itemStyles.length - visibleItems.length + itemIndex]]}>
                            <Icon name={item.icon} size={24} color={COLORS.primary} />
                        </Animated.View>
                    </TouchableWithoutFeedback>
                })}
                <TouchableWithoutFeedback onPress={this.toggleMenu}>
                    <Animated.View style={[styles.buttonStyle, styles.primaryButtonStyle, rotation]}>
                        <Icon name={this.props.icon} size={23} color={COLORS.white} />
                    </Animated.View>
                </TouchableWithoutFeedback>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: 60,
        right: 30
    },
    buttonStyle: {
        justifyContent: "center",
        alignItems: 'center',
        elevation: 2
    },
    primaryButtonStyle: {
        width: 60,
        height: 60,
        borderRadius: 60 / 2,
        backgroundColor: COLORS.primary
    },
    secondaryButtonStyle: {
        width: 44,
        height: 44,
        borderRadius: 44 / 2,
        backgroundColor: COLORS.white,
        borderColor: COLORS.darkGray,
        borderWidth: 0.1
    }
});
