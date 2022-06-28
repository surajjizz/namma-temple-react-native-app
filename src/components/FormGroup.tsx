import * as React from 'react';
import Shake from './Shake';
import { Theme } from '../constants';
import { Text } from 'react-native';
import { COLORS } from '../constants/Theme';

interface IProps {
    children: any
    required?: boolean
    error?: boolean
}

export default class FormGroup extends React.Component<IProps, {}> {
    render() {
        return (
            <>
                {this.props.children}
                {this.props.required && this.props.error &&
                    <Shake>
                        <Text style={{ color: COLORS.error, fontSize: 11, marginLeft:10}}>{this.props.error}</Text>
                    </Shake>
                }
            </>
        )
    }
}
