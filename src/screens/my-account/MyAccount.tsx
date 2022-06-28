import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { action, makeObservable, observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Modal } from '../../components';
import AppFooter from '../../components/AppFooter';
import Container from '../../components/Container';
import { Images, Theme } from '../../constants';
import Common from '../../constants/Common';
import { height, SIZES, width } from '../../constants/Theme';
import GodStore from '../../mobx-store/GodStore';
import RootStore from '../../mobx-store/RootStore';
import { RootStackParams } from '../../navigation/TabNavigator';
import FunctionUtils from '../../utils/Function';
import CommonStyles from '../../styles/Home';

const { COLORS } = Theme;

interface IProps {
    navigation: NativeStackNavigationProp<RootStackParams>;
    route: RouteProp<RootStackParams, 'Gods'>;
    godStore: GodStore;
}

@inject(() => ({
    godStore: RootStore.godStore
}))

@observer
export default class MyAccount extends React.Component<IProps, {}>{
    @observable footerTabs: any[] = Common.getAccountFooterTabs();
    @observable selectedTab: number = 0;

    constructor(props: any) {
        super(props);
        makeObservable(this);
    }

    componentDidMount() {

    }

    @action onTabChange = (index: number) => {
        this.selectedTab = index;
        this.footerTabs.forEach((tab, i) => i === index ? tab.focused = true : tab.focused = false);
    }

    showLanguageModal = () => {
        this.setState({ isLanguageModal: true });
    }

    hideLanguageModal = () => {
        this.setState({ isLanguageModal: false });
    }

    switchLanguage = (language: string) => {
        console.log("language", language)
        // FunctionUtils.switchLanguage(language);
        this.hideLanguageModal();
    }

    languages() {
        return (
            <View>
                <TouchableOpacity onPress={() => this.switchLanguage("Tamil")} style={{ flexDirection: 'row', padding: 10 }}>
                    <Text>தமிழ்</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.switchLanguage("English")} style={{ flexDirection: 'row', padding: 10 }}>
                    <Text>English</Text>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        var elements: any = null;

        // if (this.selectedTab === 0) {
        //     elements = <DetailTab label='History' detail={history_english} />
        // } else if (this.selectedTab === 1) {
        //     elements = <DetailTab label='Nick Name' detail={nick_name_english} />
        // } else {
        //     elements = <DetailTab label='Nick Name' detail={nick_name_english} />
        // }

        return (
            <Container>
                {/* <ScrollView>{elements}</ScrollView> */}
                <View style={{ flex: 1, width:width }}>
                    <View style={{
                        height: '40%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: COLORS.primary
                    }}>
                        <Image
                            source={Images.welcomeLogo4}
                            resizeMode='cover'
                        />
                        <View style={CommonStyles.overlay} />
                        <Text style={{ position: 'absolute', fontSize: 25, color: COLORS.white, fontWeight: 'bold' }}>LOGIN</Text>
                    </View>
                    <View style={{
                        height: height,
                        width: width,
                        alignItems: 'center',
                        backgroundColor: COLORS.white,
                        justifyContent: 'center',
                        borderTopLeftRadius: 35,
                        borderTopRightRadius: 35,
                        elevation: 10,
                        marginTop: -20
                    }}>
                        <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 15, alignItems: 'center', }}>
                            <Text style={{ fontSize: 16, color: COLORS.lightGray }}>Hi</Text>
                        </View>
                        <View style={{ flex: 1, paddingHorizontal: 15, alignItems: 'center', }}>
                            <Text>App Version:</Text>
                            <Text>Build No:</Text>
                            <Text>Expiry Date:</Text>
                        </View>
                    </View>
                </View>
                <AppFooter
                    tabs={this.footerTabs}
                    onTabChange={this.onTabChange}
                    focused={true}
                    bgColors={COLORS.white}
                />
            </Container>
        )
    }
}
