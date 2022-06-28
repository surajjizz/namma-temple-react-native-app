import * as React from 'react';
import { TouchableNativeFeedback, Text, StyleSheet, View, StyleProp, ViewStyle } from 'react-native';
import { Theme } from '../constants';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const { COLORS } = Theme;

interface IProps {
    onPress: any,
    title: any,
    borderRadius?: number
    height?: number
    backgroundColor?: string
    color?: string
    fontSize?: number
    icon?: string
    style?: StyleProp<ViewStyle>
}

interface IState {
    rippleColor: any,
    rippleOverflow: boolean
}

export default class Button extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            rippleColor: COLORS.darkGray,
            rippleOverflow: false
        }
    }

    setRippleColor = () => {
        this.setState({ rippleOverflow: !this.state.rippleOverflow })
    }

    render() {
        const { height, borderRadius, backgroundColor, color, title, onPress, fontSize, icon, style } = this.props;
        
        return (
            <View style={style}>
                <TouchableNativeFeedback
                    onPress={() => { this.setRippleColor; onPress() }}
                    background={TouchableNativeFeedback.Ripple(this.state.rippleColor, this.state.rippleOverflow)}>
                    <View style={[styles.buttonStyle, {
                        borderRadius: borderRadius ? borderRadius : 5,
                        height: height ? height : 40,
                        backgroundColor: backgroundColor ? backgroundColor : COLORS.primary
                    }]}>
                        {icon &&
                            <View style={{ backgroundColor: COLORS.white, borderRadius: 25, padding: 5, marginRight: 5 }}>
                                <MaterialIcon name={icon} size={fontSize ? fontSize : 18} color={color ? color : COLORS.gray} />
                            </View>
                        }
                        <Text style={[styles.textStyle, { color: color ? color : COLORS.white, fontSize: fontSize ? fontSize : 14 }]}>{title}</Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    buttonStyle: {
        paddingVertical: 5,
        paddingLeft: 5,
        paddingRight: 10,
        elevation: 2,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    textStyle: {
        backgroundColor: 'transparent',
        textAlign: 'center',
        color: COLORS.white,
        textTransform: 'uppercase',
        fontWeight: '400'
    },
    text: {
        alignSelf: "center"
    }
});
