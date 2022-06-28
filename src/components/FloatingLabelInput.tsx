import * as React from 'react';
import { StyleSheet, View, TextInput, Text, Keyboard, TouchableOpacity } from 'react-native';
import { Theme } from '../constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { observer } from 'mobx-react';
import { action, makeObservable, observable } from 'mobx';

const { COLORS } = Theme;

interface IProps {
    placeholder: any
    customTitle?: any
    onChangeText: any
    autoCapitalize?: any
    onFocus?: any
    onBlur?: any
    onSubmitEditing?: any
    returnKeyType?: any
    style?: any
    value?: any
    keyboardType?: any
    secureTextEntry?: boolean
    multiline?: boolean
    maxLength?: any
    blurOnSubmit?: any
}

@observer
export default class FloatingLabelInput extends React.Component<IProps, {}> {
    @observable passwordVisibility: boolean = false;
    @observable topPlaceholder: boolean = false;

    placeholder: any;
    titleText: any;
    textInput: any;
    constructor(props: any) {
        super(props);
        this.placeholder = this.props.placeholder ? this.props.placeholder : "";
        this.titleText = this.props.customTitle ? this.props.customTitle : this.placeholder;
        makeObservable(this)
    }

    @action onChangeText = (value: any) => {
        this.props?.onChangeText(value);
    }

    focus = () => {
        this.textInput.focus()
    }

    @action onFocus = (event: any) => {
        this.topPlaceholder = true;
        this.props?.onFocus(event);
    }

    @action onBlur = () => {
        if (this.props?.value === "") {
            this.topPlaceholder = false;
        }
        this.props?.onBlur(this.props?.value)
    }

    onSubmitEditing = () => {
        if (this.props.onSubmitEditing) {
            this.props.onSubmitEditing()
        }
        else {
            Keyboard.dismiss()
        }
    }

    @action onTogglePasswordVisibility = () => {
        this.passwordVisibility = !this.passwordVisibility;
    }

    render() {
        var { secureTextEntry, returnKeyType, value, keyboardType, multiline, maxLength, autoCapitalize } = this.props;
        var rightIcon = null;
        if (secureTextEntry) {
            if (this.passwordVisibility) {
                rightIcon = <Icon name="eye-off-outline" color="grey" size={20} />
            } else {
                rightIcon = <Icon name="eye-outline" color="grey" size={20} />
            }
        }

        return (
            <View style={[styles.container, this.props?.style]} >
                <Text style={[styles.placeholder]} >
                    {this.topPlaceholder ? this.titleText : ""}
                </Text>
                <View style={{ flexDirection: 'row' }}>
                    <TextInput
                        ref={(ref) => { this.textInput = ref; }}
                        returnKeyType={returnKeyType ? returnKeyType : null}
                        onSubmitEditing={() => { this.onSubmitEditing() }}
                        value={value ? value : null}
                        keyboardType={keyboardType ? keyboardType : "default"}
                        secureTextEntry={secureTextEntry && !this.passwordVisibility}
                        onChangeText={(value) => { this.onChangeText(value) }}
                        onFocus={(event) => { this.onFocus(event) }}
                        multiline={multiline ? multiline : false}
                        onBlur={() => { this.onBlur() }}
                        placeholderTextColor={COLORS.lightGray}
                        placeholder={!this.topPlaceholder ? this.placeholder : ""}
                        maxLength={maxLength ? maxLength : null}
                        style={styles.textInput}
                        blurOnSubmit={this.props.blurOnSubmit ? this.props.blurOnSubmit : false}
                        autoCapitalize={autoCapitalize ? autoCapitalize : 'sentences'}
                    />
                    <View style={styles.icon}>
                        <TouchableOpacity onPress={this.onTogglePasswordVisibility}>{rightIcon}</TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 1,
        borderBottomColor: COLORS.darkGray,
    },
    textInput: {
        flex: 5,
        height: 40,
        paddingLeft: 10,
        borderRadius: 10,
        margin: 0,
        fontSize: 16,
        color: COLORS.lightGray

    },
    icon: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 40
    },
    placeholder: {
        color: COLORS.gray,
        paddingLeft: 10,
        marginTop: 10,
        fontSize: 14
    }
})