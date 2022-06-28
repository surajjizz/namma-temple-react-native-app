import * as React from 'react';
import { StyleSheet, View, Alert, BackHandler, Text } from 'react-native';
import Container from '../../components/Container';
import { Messages, Theme } from '../../constants';
import Function from '../../utils/Function';

const { COLORS } = Theme;

interface IProps {
    navigation: any
}

export default class Dashboard extends React.Component<IProps, {}>{

    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.backAction);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.backAction);
    }

    backAction = () => {
        if (Function.isPrevScreen(this.props.navigation) === false) {
            Alert.alert('Confirm Exit', Messages.exitWarning, [
                {
                    text: "Cancel",
                    onPress: () => null,
                    style: "cancel"
                },
                { text: "YES", onPress: () => BackHandler.exitApp() }
            ]);
            return true;
        }
        else {
            return false;
        }
    };

    navigateToAccount = () => {
        // this.props.navigation.navigate('AccountBottomRouter');
    }

    render() {
        return (
            <Container>
                <Text>Dashboard</Text>
                {/* <AppHeader title="Dashboard" navigation={this.props.navigation} isDrawer={true} /> */}
                {/* <Button onPress={this.navigateToAccount} title="ccount" /> */}
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // flexDirection:'column',
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: COLORS.white
    }
});