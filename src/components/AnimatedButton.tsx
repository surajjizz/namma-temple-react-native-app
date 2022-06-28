import * as React from 'react';
import { StyleSheet, TouchableNativeFeedback, Animated, ActivityIndicator, View } from 'react-native';
import { Theme } from '../constants';

const { COLORS } = Theme;

interface IProps {
    onPress: any,
    title: any,
    borderRadius: any
}

interface IState {
    showLoading: boolean
}

var width = 330;
var height = 45;

export default class AnimatedButton extends React.Component<IProps, IState>{
    loadingValue : any
    constructor(props: any) {
        super(props);
        this.state = {
            showLoading: false
        };

        this.loadingValue = {
            width: new Animated.Value(width),
            borderRadius: new Animated.Value(props.borderRadius),
            opacity: new Animated.Value(1)
        };
    }

    showLoading(showLoading: any) {
        if (showLoading) {
            this.loadingAnimation(width, height, this.props.borderRadius, height / 2, 1, 0);
            this.setState({ showLoading: showLoading });
        } else {
            setTimeout(() => {
                this.loadingAnimation(height, width, height / 2, this.props.borderRadius, 0, 1);
                this.setState({ showLoading: showLoading });
            }, 600);
        }
    }

    loadingAnimation(widthStart: any, widthEnd: any, borderRadiusStart: any, borderRadiusEnd: any, opacityStart: any, opacityEnd: any) {
        if (this.loadingValue.width._value !== widthEnd) {
            this.loadingValue.width.setValue(widthStart);
            this.loadingValue.opacity.setValue(opacityStart);
            this.loadingValue.borderRadius.setValue(borderRadiusStart);

            Animated.timing(this.loadingValue.width, {
                toValue: widthEnd,
                duration: 380,
                useNativeDriver: false
            }).start();

            Animated.timing(this.loadingValue.borderRadius, {
                toValue: borderRadiusEnd,
                duration: 380,
                useNativeDriver: false
            }).start();

            Animated.timing(this.loadingValue.opacity, {
                toValue: opacityEnd,
                duration: 300,
                useNativeDriver: false
            }).start();
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableNativeFeedback onPress={!this.state.showLoading ? this.props.onPress : null}>
                    <Animated.View style={[styles.containerButton, { width: this.loadingValue.width, borderRadius: this.loadingValue.borderRadius }]}>
                        {this.state.showLoading ? this._renderIndicator() : this._renderTitle()}
                    </Animated.View>
                </TouchableNativeFeedback>
            </View>
        );
    }

    _renderTitle() {
        return (
            <Animated.Text style={[styles.buttonText, { opacity: this.loadingValue.opacity, }]}>
                {this.props.title}
            </Animated.Text>
        );
    }

    _renderIndicator() {
        return <ActivityIndicator color={COLORS.white} size="large" />
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    containerButton: {
        height: 45,
        elevation: 2,
        justifyContent: 'center',
        alignItems: 'center',
        color: COLORS.white,
        backgroundColor: COLORS.primary
    },
    buttonText: {
        backgroundColor: 'transparent',
        textAlign: 'center',
        color: COLORS.white,
        textTransform: 'uppercase',
        fontWeight: '600',
        fontSize: 16
    }
});
