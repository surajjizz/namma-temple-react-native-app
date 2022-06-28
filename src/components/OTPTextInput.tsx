// import React, { Component } from "react";
// import { View, TextInput, StyleSheet } from "react-native";
// import PropTypes from "prop-types";
// import { Theme } from '../constants';

// const { COLORS } = Theme;

// const styles = StyleSheet.create({
//     container: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//     },
//     textInput: {
//         height: 50,
//         width: 50,
//         borderWidth: 2,
//         borderColor: COLORS.black,
//         borderRadius: 10,
//         margin: 5,
//         textAlign: "center",
//         fontSize: 18,
//         fontWeight: "500",
//         color: COLORS.black,
//     },
// });

// const getOTPTextChucks = (inputCount, inputCellLength, text) => {
//     let otpText = text.match(new RegExp(".{1," + inputCellLength + "}", "g")) || [];
//     otpText = otpText.slice(0, inputCount);
//     return otpText;
// };

// export default class OTPTextInput extends Component {
//     constructor(props: any) {
//         super(props);
//         this.state = {
//             focusedInput: 0,
//             otpText: getOTPTextChucks(
//                 props.inputCount,
//                 props.inputCellLength,
//                 props.defaultValue
//             ),
//         };

//         this.inputs = [];
//     }

//     basicValidation = (text) => {
//         const validText = /^[0-9a-zA-Z]+$/;
//         return text.match(validText);
//     };

//     onTextChange = (text, i) => {
//         const { inputCellLength, inputCount, handleTextChange } = this.props;

//         if (text && !this.basicValidation(text)) {
//             return;
//         }

//         this.setState(
//             (prevState) => {
//                 let { otpText } = prevState;

//                 otpText[i] = text;
//                 return {
//                     otpText,
//                 };
//             },
//             () => {
//                 handleTextChange(this.state.otpText.join(""));
//                 if (text.length === inputCellLength && i !== inputCount - 1) {
//                     this.inputs[i + 1].focus();
//                 }
//             }
//         );
//     };

//     onInputFocus = (i) => {
//         const { otpText } = this.state;
//         const prevIndex = i - 1;
//         if (prevIndex > -1 && !otpText[prevIndex] && !otpText.join("")) {
//             this.inputs[prevIndex].focus();
//             return;
//         }
//         this.props.animateInput();

//         this.setState({ focusedInput: i });
//     };

//     onInputBlur = () => {
//         this.props.animateContainer();
//     }

//     onKeyPress = (e, i) => {
//         const val = this.state.otpText[i] || "";

//         if (e.nativeEvent.key === "Backspace" && i !== 0 && !(val.length - 1)) {
//             this.inputs[i - 1].focus();
//         }
//     };

//     clear = () => {
//         this.setState(
//             {
//                 otpText: [],
//             },
//             () => {
//                 this.inputs[0].focus();
//             }
//         );
//     };

//     setValue = (value) => {
//         const { inputCount, inputCellLength } = this.props;
//         this.setState(
//             {
//                 otpText: getOTPTextChucks(inputCount, inputCellLength, value),
//             },
//             () => {
//                 this.props.handleTextChange(value);
//             }
//         );
//     };

//     render() {
//         const { inputCount, offTintColor, tintColor, defaultValue, inputCellLength,
//             containerStyle, textInputStyle, keyboardType, ...textInputProps } = this.props;
//         const { focusedInput, otpText } = this.state;
//         const TextInputs = [];

//         for (let i = 0; i < inputCount; i += 1) {
//             const inputStyle = [styles.textInput, textInputStyle, { borderColor: offTintColor }];

//             if (focusedInput === i) {
//                 inputStyle.push({ borderColor: tintColor });
//             }

//             TextInputs.push(
//                 <TextInput
//                     ref={(e) => {
//                         this.inputs[i] = e;
//                     }}
//                     key={i}
//                     autoCorrect={false}
//                     keyboardType={keyboardType}
//                     autoFocus={false}
//                     value={otpText[i] || ""}
//                     style={inputStyle}
//                     maxLength={this.props.inputCellLength}
//                     onFocus={() => this.onInputFocus(i)}
//                     onBlur={() => this.onInputBlur(i)}
//                     onChangeText={(text) => this.onTextChange(text, i)}
//                     multiline={false}
//                     onKeyPress={(e) => this.onKeyPress(e, i)}
//                     {...textInputProps}
//                 />
//             );
//         }

//         return <View style={[styles.container, containerStyle]}>{TextInputs}</View>;
//     }
// }

// OTPTextInput.propTypes = {
//     defaultValue: PropTypes.string,
//     inputCount: PropTypes.number,
//     containerStyle: PropTypes.any,
//     textInputStyle: PropTypes.any,
//     inputCellLength: PropTypes.number,
//     tintColor: PropTypes.string,
//     offTintColor: PropTypes.string,
//     handleTextChange: PropTypes.func,
//     inputType: PropTypes.string,
//     keyboardType: PropTypes.string,
// };

// OTPTextInput.defaultProps = {
//     defaultValue: "",
//     inputCount: 5,
//     tintColor: COLORS.primary,
//     offTintColor: COLORS.darkGray,
//     inputCellLength: 1,
//     containerStyle: {},
//     textInputStyle: {},
//     handleTextChange: () => { },
//     keyboardType: "numeric",
// };





import * as React from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';

interface IProps {
    onChange: any
    editable?: boolean
    containerStyle?: any
    cellStyle?: any
    tintColor?: any
    offTintColor?: any
    otpLength: number
    inputValue: any
    onFocus?: any
    onBlur?: any
}

export default class OTPInput extends React.Component<IProps, {}> {

    textInput: any = null;

    state = {
        internalVal: this.props.inputValue
    }

    componentDidMount() {
        this.focus();
    }

    componentWillReceiveProps(nextProps: any) {
        if (nextProps.hasOwnProperty('value') && nextProps.value !== this.state.internalVal) {
            this.setState({ internalVal: nextProps.value });
        }
    }

    handleChangeText = (val: any) => {
        const { onChange } = this.props;

        onChange(val);
        this.setState({ internalVal: val })
    };

    // public methods
    inputRef() {
        return this.textInput;
    }

    focus() {
        if (this.props.editable !== false) {
            this.inputRef().focus();
        }
    }

    blur() {
        this.inputRef().blur();
    }

    isFocused() {
        return this.inputRef().isFocused();
    }

    clear() {
        this.setState({ internalVal: '' })
    }

    onInputFocus = () => {
        this.props.onFocus();
    }

    onInputBlur = () => {
        this.props.onBlur();
    }

    render() {
        const {
            containerStyle,
            cellStyle,
            tintColor,
            offTintColor,
            otpLength,
            ...otherProps
        } = this.props;

        const { internalVal } = this.state;

        return (
            <View>
                <TextInput
                    ref={input => (this.textInput = input)}
                    onChangeText={this.handleChangeText}
                    style={{ width: 0, height: 0 }}
                    value={internalVal}
                    maxLength={otpLength}
                    returnKeyType="done"
                    keyboardType="numeric"
                    onFocus={this.onInputFocus}
                    onBlur={this.onInputBlur}
                    {...otherProps}
                />
                <View style={[styles.container, containerStyle]}>
                    {Array(otpLength).map((_, index) => (
                        <Text
                            key={index}
                            style={[
                                styles.cell,
                                cellStyle,
                                {
                                    borderColor:
                                        internalVal && index === internalVal.length ? tintColor : offTintColor
                                }
                            ]}
                            onPress={() => this.textInput.focus()}
                        >
                            {internalVal && internalVal.length > index ? internalVal[index] : " "}
                        </Text>
                    ))}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    cell: {
        paddingVertical: 11,
        width: 40,
        margin: 5,
        textAlign: 'center',
        fontSize: 16,
        color: '#000',
        borderWidth: 1.5
    }
});
