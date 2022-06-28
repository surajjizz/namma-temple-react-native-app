import * as React from 'react';
import { Animated, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Theme } from '../constants';

const { COLORS, SIZES } = Theme;

interface IProps {
    tabs: any
    onTabChange: any
    focused: any
    bgColors: any
}

interface IState {
    fadeAnim: any
}

const scrollX = new Animated.Value(0);

export default class AppFooter extends React.Component<IProps, IState>{
    state: IState;
    backgroundRef: any;
    bgColors: any;
    textColors: any;

    constructor(props: IProps) {
        super(props);
        this.state = {
            fadeAnim: new Animated.Value(1)
        }
        this.backgroundRef = React.createRef();
        this.bgColors = {
            Tab0: COLORS.bottomTabBg1,
            Tab1: COLORS.bottomTabBg2,
            Tab2: COLORS.bottomTabBg3,
            Tab3: COLORS.bottomTabBg4,
            Tab4: COLORS.bottomTabBg5,
        };
        this.textColors = {
            Tab0: COLORS.bottomTabText1,
            Tab1: COLORS.bottomTabText2,
            Tab2: COLORS.bottomTabText3,
            Tab3: COLORS.bottomTabText4,
            Tab4: COLORS.bottomTabText5,
        };
    }

    animateTab = () => {
        this.state.fadeAnim.setValue(0);
        Animated.sequence([
            Animated.timing(this.state.fadeAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: false
            })
        ]).start();
    }


    render() {
        const { tabs, onTabChange, bgColors } = this.props;

        return (
            <View style={{ flexDirection: 'row', height: 50, backgroundColor: bgColors, elevation: 20, justifyContent: 'space-around', alignItems: 'center' }}>
                {tabs.map((tab: any, index: number) => {
                    return (
                        <TouchableWithoutFeedback
                            key={index}
                            onPress={() => {
                                // this.animateTab();
                                onTabChange(index);
                            }}>
                            <Animated.View
                                style={[styles.tabBackground, {
                                    flex: tab.focused ? 2 : 1,
                                    // opacity: this.state.fadeAnim,
                                    height: 40,
                                    backgroundColor: tab.focused ? this.bgColors['Tab' + index] : COLORS.white,
                                }]}
                                ref={this.backgroundRef}>
                                <MaterialIcons name={tab.icon} size={tab.focused ? 20 : 26} color={tab.focused ? this.textColors['Tab' + index] : COLORS.gray} />
                                {tab.focused && (
                                    <Text style={{ color: this.textColors['Tab' + index], paddingLeft: 6, fontWeight: 'bold', }}>
                                        {tab.label.toUpperCase()}
                                    </Text>
                                )}
                            </Animated.View>
                        </TouchableWithoutFeedback>
                    )
                })}
            </View>
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
