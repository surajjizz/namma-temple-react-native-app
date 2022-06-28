// import * as React from 'react';
// import { ScrollView, Text, View } from 'react-native';
// import { connect } from 'react-redux';
// import { Carousel, Button } from '../../components';
// import AppFooter from '../../components/AppFooter';
// import { Theme } from '../../constants';
// import APIDetails from '../../defaults/APIDetails';
// import { IGod, IGods } from '../../interface/IGod';
// import styles from '../../styles/God';
// import FunctionUtils from '../../utils/Function';

// const { COLORS } = Theme;

// interface IProps {
//     navigation: any
//     route: any
//     godStore: { gods: IGods }
// }

// interface IState {
//     selectedTab: number
// }

// var imageList = [
//     {
//         image: '',
//     },
//     {
//         image: '',
//     },
//     {
//         image: '',
//     },
//     {
//         image: '',
//     },
// ];

// class GodView extends React.Component<IProps, IState>{
//     gods: IGods;
//     god: IGod | undefined;
//     footerTabs: { label: string; icon: string; focused: boolean; }[];
//     constructor(props: any) {
//         super(props);
//         this.gods = { count: 0, results: [] };
//         this.god = undefined;
//         this.footerTabs = [
//             {
//                 label: 'History',
//                 icon: 'auto-stories',
//                 focused: true
//             },
//             {
//                 label: 'Nick Name',
//                 icon: 'spellcheck',
//                 focused: false
//             }
//         ];
//         this.state = {
//             selectedTab: 0
//         }
//     }

//     componentDidMount() {
//         this.gods = this.props.godStore.gods;
//         if (this.props.route && this.props.route.params && this.props.route.params.godId) {
//             if (this.gods && this.gods.results && this.gods.results.length > 0) {
//                 this.god = this.gods.results.find(godObj => godObj.id === this.props.route.params.godId);
//                 if (this.god) {
//                     imageList[0].image = APIDetails.BASE_URL + this.god.image1;
//                     imageList[1].image = APIDetails.BASE_URL + this.god.image2;
//                     imageList[2].image = APIDetails.BASE_URL + this.god.image3;
//                     imageList[3].image = APIDetails.BASE_URL + this.god.image4;
//                 }
//             }
//         }
//         this.setState({});
//     }

//     onTabChange = (index: number) => {
//         this.footerTabs.forEach((tab, i) => i === index ? tab.focused = true : tab.focused = false);
//         this.setState({ selectedTab: index });
//     }

//     navigateToTemples = () => {
//         if (this.props.route && this.props.route.params && this.props.route.params.distId) {
//             this.props.navigation.navigate('TemplesScreen',
//                 {
//                     godId: this.god?.id,
//                     name: this.props.route.params.name,
//                     distId: this.props.route.params.distId
//                 })
//         } else {
//             this.props.navigation.navigate('TemplesScreen',
//                 {
//                     godId: this.god?.id,
//                     name: this.god?.nameEnglish
//                 })
//         }
//     }

//     onVideoPlayer = () => {
//         this.props.navigation.navigate('YoutubePlayerScreen',
//             { id: 0, name: this.god?.nameEnglish, videoId: this.god?.videoId })
//     }

//     onSocialShare = async () => {
//         await FunctionUtils.socialShare();
//     }

//     render() {
//         return (
//             <View style={{ flex: 1 }}>
//                 {this.god ?
//                     <View style={{ flex: 1, }}>
//                         <View style={{ height: 280 }}>
//                             <Carousel isImageOnly={true} isUri={true} contentList={imageList} dotColor={COLORS.white} />
//                         </View>
//                         <View style={{ flexDirection: 'row', height: 45, justifyContent: 'space-evenly', alignItems: 'center' }}>
//                             <Button icon='home' title="Temples" onPress={this.navigateToTemples} backgroundColor={COLORS.gray} borderRadius={25} />
//                             {this.god.videoId &&
//                                 <Button icon='play-circle-filled' title="Video" onPress={this.onVideoPlayer} backgroundColor={COLORS.gray} borderRadius={25} />
//                             }
//                             <Button icon='share' title="Share" onPress={this.onSocialShare} backgroundColor={COLORS.gray} borderRadius={25} />
//                         </View>
//                         <View style={{ flex: 3 }}>
//                             <ScrollView>
//                                 {this.state.selectedTab === 0 ?
//                                     <View>
//                                         <Text style={{ fontWeight: 'bold', fontSize: 17, padding: 4 }}>History</Text>
//                                         {this.god.historyEnglish.length > 0 ?
//                                             this.god.historyEnglish.map((history, historyIndex) => {
//                                                 return (<View key={historyIndex} style={styles.listStyle}>
//                                                     <Text style={styles.listOrderStyle}>{'\u2022'}</Text>
//                                                     <Text style={styles.listContentStyle}>{history}</Text>
//                                                 </View>)
//                                             })
//                                             :
//                                             <Text style={{ fontSize: 15, padding: 6, fontStyle: 'italic' }}>No history</Text>
//                                         }
//                                     </View>
//                                     :
//                                     <View>
//                                         <Text style={{ fontWeight: 'bold', fontSize: 17, padding: 4 }}>Nick Name</Text>
//                                         {this.god.nickNameEnglish.length > 0 ?
//                                             this.god.nickNameEnglish.map((nickName, nickNameIndex) => {
//                                                 return (<View key={nickNameIndex} style={styles.listStyle}>
//                                                     <Text style={styles.listOrderStyle}>{'\u2022'}</Text>
//                                                     <Text style={styles.listContentStyle}>{nickName}</Text>
//                                                 </View>)
//                                             })
//                                             :
//                                             <Text style={{ fontSize: 15, padding: 6, fontStyle: 'italic' }}>No nick name</Text>
//                                         }
//                                     </View>
//                                 }
//                             </ScrollView>
//                         </View>
//                     </View>
//                     :
//                     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//                         <Text>No God Data</Text>
//                     </View>
//                 }
//                 <AppFooter
//                     tabs={this.footerTabs}
//                     onTabChange={this.onTabChange}
//                     focused={true}
//                     bgColors={COLORS.white}
//                 />
//             </View>
//         )
//     }
// }

// const mapStateToProps = (state: any) => {
//     return {
//         godStore: state.godReducer
//     }
// };

// export default connect(mapStateToProps)(GodView);



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
import GodStore from '../../mobx-store/GodStore';
import { RouteProp } from '@react-navigation/native';

const { COLORS } = Theme;

interface IProps {
    navigation: NativeStackNavigationProp<RootStackParams>;
    route: RouteProp<RootStackParams, 'Gods'>;
    districtStore: DistrictStore;
    godStore: GodStore;
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
    districtStore: RootStore.districtStore,
    godStore: RootStore.godStore
}))

@observer
export default class DistrictDetail extends React.Component<IProps, {}>{
    @observable selectedTab: number = 0;
    @observable images: any[] = Common.getImageList();
    @observable footerTabs: any[] = Common.getGodFooterTabs();

    constructor(props: IProps) {
        super(props);
        makeObservable(this);
    }

    componentDidMount() {
        this.initImages();
    }

    @action initImages = () => {
        var { selectedGod } = this.props.godStore;
        this.images = Common.getImageList();
        this.images[0].image = selectedGod.image_1;
        this.images[1].image = selectedGod.image_2;
        this.images[2].image = selectedGod.image_3;
        this.images[3].image = selectedGod.image_4;
    }

    @action onTabChange = (index: number) => {
        this.selectedTab = index;
        this.footerTabs.forEach((tab, i) => i === index ? tab.focused = true : tab.focused = false);
    }

    navigateToTemple = () => {
        var { selectedGod } = this.props.godStore;
        if (this.props.route?.params?.districtId) {
            this.props.navigation.navigate('Temples', {
                districtId: this.props.route?.params?.districtId,
                districtName: this.props.route?.params?.districtName, godId: selectedGod.id,
                godName: selectedGod.name_english
            });
        } else {
            this.props.navigation.navigate('Temples', {
                godId: selectedGod.id, godName: selectedGod.name_english
            });
        }
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
        var { history_english, nick_name_english, nick_name_tamil,
            video_english, video_tamil } = this.props.godStore.selectedGod;
        var elements: any = null;

        if (this.selectedTab === 0) {
            elements = <DetailTab label='History' detail={history_english} />
        } else {
            elements = <DetailTab label='Nick Name' detail={nick_name_english} />
        }

        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, }}>
                    <View style={{ height: 280 }}>
                        <Carousel isImageOnly={true} isUri={true} contentList={this.images} dotColor={COLORS.white} />
                    </View>
                    <View style={{ flexDirection: 'row', height: 45, justifyContent: 'space-evenly', alignItems: 'center' }}>
                        <Button icon='home' title="Temples" onPress={this.navigateToTemple} backgroundColor={COLORS.gray} borderRadius={25} />
                        {(video_english !== '' && video_english !== null) &&
                            <Button icon='play-circle-filled' title="Video" onPress={this.onVideoPlayer} backgroundColor={COLORS.gray} borderRadius={25} />
                        }
                        <Button icon='share' title="Share" onPress={this.onSocialShare} backgroundColor={COLORS.gray} borderRadius={25} />
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
