import { observer, inject } from 'mobx-react';
import * as React from 'react'
import { View, Text, StatusBar, StyleSheet, Image } from 'react-native';
import { Theme, Images } from '../../constants';
import LoginStore from '../../mobx-store/LoginStore';
import RootStore from '../../mobx-store/RootStore';
import AppStorage from '../../storage/AppStorage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../../navigation/StackNavigator';
import { IUserInfo } from '../../interface/ILogin';

const { COLORS } = Theme;

interface IProps {
  navigation: NativeStackNavigationProp<RootStackParams>;
  loginStore: LoginStore;
}

@inject(() => ({
  loginStore: RootStore.loginStore
}))

@observer
export default class Splash extends React.Component<IProps, {}> {

  componentDidMount = () => {
    this.onHandleInitialScreen();
  }

  onHandleInitialScreen = async () => {
    var userInfo: IUserInfo = await AppStorage.getUserDetails() || {};
    setTimeout(() => {
      if (userInfo?.token) {
        this.props.loginStore.setProfileInfo(userInfo);
        this.navigateToReligions();
      } else {
        this.navigateToWelcome();
      }
    }, 2500);
  }

  navigateToWelcome = () => {
    this.props.navigation.replace('Onboarding');
  }

  navigateToReligions = () => {
    this.props.navigation.reset({ index: 0, routes: [{ name: 'Religions' }] });
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle='dark-content' backgroundColor={COLORS.white} />
        <View>
          <View style={styles.logoStyle}>
            <Image
              source={Images.appLogo}
              resizeMode='contain'
              style={{ height: 125, width: 125, borderRadius: 15 }}
            />
          </View>
          <Text style={styles.appNameStyle}>NAMMA TEMPLE</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white
  },
  logoStyle: {
    alignItems: "center"
  },
  appNameStyle: {
    color: COLORS.primary,
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 10
  }
});
