import * as React from 'react';
import { ScrollView, Text, View } from 'react-native';
import Button from '../../components/Button';
import AppFooter from '../../components/AppFooter';
import { Theme } from '../../constants';
import DistrictStore from '../../mobx-store/DistrictStore';
import { RootStackParams } from '../../navigation/StackNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import FunctionUtils from '../../utils/Function';
import { inject, observer } from 'mobx-react';
import RootStore from '../../mobx-store/RootStore';
import Carousel from '../../components/Carousel';
import { action, makeObservable, observable } from 'mobx';
import Common from '../../constants/Common';

const { COLORS } = Theme;

interface IProps {
    navigation: NativeStackNavigationProp<RootStackParams>;
    districtStore: DistrictStore;
}

interface IDetailTab {
    label: string
    detail: string
}

const DetailTab = ({ label, detail }: IDetailTab) => {
    return (
        <View>
            <Text style={{ fontWeight: 'bold', fontSize: 17, padding: 4, color: COLORS.lightGray }}>{label}</Text>
            <Text style={{ fontSize: 15, padding: 7 }}>{detail}</Text>
        </View>
    )
}

@inject(() => ({
    districtStore: RootStore.districtStore
}))

@observer
export default class DistrictDetail extends React.Component<IProps, {}>{
    @observable selectedTab: number = 0;
    @observable images: any[] = Common.getImageList();
    @observable footerTabs: any[] = Common.getDistrictFooterTabs();

    constructor(props: IProps) {
        super(props);
        makeObservable(this);
    }

    componentDidMount() {
        this.initImages();
    }

    @action initImages = () => {
        var { selectedDistrict } = this.props.districtStore;
        this.images = Common.getImageList();
        this.images[0].image = selectedDistrict.image_1;
        this.images[1].image = selectedDistrict.image_2;
        this.images[2].image = selectedDistrict.image_3;
        this.images[3].image = selectedDistrict.image_4;
    }

    @action onTabChange = (index: number) => {
        this.selectedTab = index;
        this.footerTabs.forEach((tab, i) => i === index ? tab.focused = true : tab.focused = false);
    }

    navigateToGod = () => {
        var { selectedDistrict } = this.props.districtStore;
        this.props.navigation.navigate('Gods', {
            districtId: selectedDistrict.id, districtName: selectedDistrict.name_english,
            name: `Gods (${selectedDistrict.name_english})`
        })
    }

    onVideoPlayer = () => {
        // this.props.navigation.navigate('YoutubePlayerScreen',
        //     { id: 0, name: this.district?.nameEnglish, videoId: this.district?.videoId })
    }

    onSocialShare = async () => {
        await FunctionUtils.socialShare();
    }

    navigateToMap = (latitute: string, longitute: string) => {
        FunctionUtils.navigateToGoogleMap(latitute, longitute);
    }

    render() {
        var { history_english, tourist_english, festival_english, food_english,
            video_english, latitude, longitude } = this.props.districtStore.selectedDistrict;
        var elements: any = null;

        if (this.selectedTab === 0) {
            elements = <DetailTab label='History' detail={history_english} />
        } else if (this.selectedTab === 1) {
            elements = <DetailTab label='Tourism' detail={tourist_english} />
        } else if (this.selectedTab === 2) {
            elements = <DetailTab label='Festival' detail={festival_english} />
        } else {
            elements = <DetailTab label='Foods' detail={food_english} />
        }

        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, }}>
                    <View style={{ height: 280 }}>
                        <Carousel isImageOnly={true} isUri={true} contentList={this.images} dotColor={COLORS.white} />
                    </View>
                    <View style={{ flexDirection: 'row', height: 45, justifyContent: 'space-evenly', alignItems: 'center' }}>
                        <Button icon='home' title="Gods" onPress={this.navigateToGod} backgroundColor={COLORS.gray} borderRadius={25} />
                        {(video_english !== '' && video_english !== null) &&
                            <Button icon='play-circle-filled' title="Video" onPress={this.onVideoPlayer} backgroundColor={COLORS.gray} borderRadius={25} />
                        }
                        <Button icon='share' title="Share" onPress={this.onSocialShare} backgroundColor={COLORS.gray} borderRadius={25} />
                        {(latitude !== '' && latitude !== null) &&
                            <Button icon='place' title="Map" backgroundColor={COLORS.gray} borderRadius={25}
                                onPress={() => this.navigateToMap(latitude, longitude)} />
                        }
                    </View>
                    <View style={{ flex: 3 }}>
                        <ScrollView>{elements}</ScrollView>
                    </View>
                </View>
                <AppFooter
                    tabs={this.footerTabs}
                    onTabChange={this.onTabChange}
                    focused={true}
                    bgColors={COLORS.white}
                />
            </View >
        )
    }
}
