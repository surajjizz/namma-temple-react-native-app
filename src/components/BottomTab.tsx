import * as React from 'react';
import { Animated, StyleSheet, Text, TouchableWithoutFeedback } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Theme } from '../constants';

const { COLORS, SIZES } = Theme;

interface IProps {
    index: number
    label: String
    icon: String
    accessibilityState: any
    onPress: any
    focused: any
    bgColors: any
}

interface IState {
    fadeAnim: any
}

const scrollX = new Animated.Value(0);

export default class BottomTab extends React.Component<IProps, IState>{
    state: IState;
    backgroundRef: any;
    bgColors: any;
    textColors: any;

    constructor(props: any) {
        super(props);
        this.state = {
            fadeAnim: new Animated.Value(1)
        }
        this.backgroundRef = React.createRef();
        this.bgColors = {
            Tab1: COLORS.bottomTabBg1,
            Tab2: COLORS.bottomTabBg2,
            Tab3: COLORS.bottomTabBg3,
            Tab4: COLORS.bottomTabBg4,
            Tab5: COLORS.bottomTabBg5,
        };
        this.textColors = {
            Tab1: COLORS.bottomTabText1,
            Tab2: COLORS.bottomTabText2,
            Tab3: COLORS.bottomTabText3,
            Tab4: COLORS.bottomTabText4,
            Tab5: COLORS.bottomTabText5,
        };
    }

    animateTab = () => {
        this.state.fadeAnim.setValue(0);
        Animated.sequence([
            Animated.timing(this.state.fadeAnim, {
                toValue: 1,
                duration: 1200,
                useNativeDriver: false
            })
        ]).start();
    }

    render() {
        const { index, label, icon, accessibilityState, onPress } = this.props;
        const focused = accessibilityState.selected;

        return (
            <TouchableWithoutFeedback
                onPress={() => {
                    this.animateTab();
                    onPress();
                }}>
                <Animated.View
                    style={[styles.tabBackground, {
                        flex: focused ? 2 : 1,
                        opacity: this.state.fadeAnim,
                        backgroundColor: focused ? this.bgColors['Tab' + index] : COLORS.white,
                    }]}
                    ref={this.backgroundRef}>
                    <MaterialIcons name={icon} size={focused ? 20 : 26} color={focused ? this.textColors['Tab' + index] : COLORS.gray} />
                    {focused && (
                        <Text style={{ color: this.textColors['Tab' + index], paddingLeft: 6, fontWeight: 'bold', }}>
                            {label.toUpperCase()}
                        </Text>
                    )}
                </Animated.View>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = StyleSheet.create({
    tabBackground: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        margin: 5
    }
});
