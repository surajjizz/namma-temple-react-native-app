// import * as React from 'react';
// import { ScrollView, Text, View } from 'react-native';
// import { connect } from 'react-redux';
// import { Carousel, Button } from '../../components';
// import AppFooter from '../../components/AppFooter';
// import { Theme } from '../../constants';
// import APIDetails from '../../defaults/APIDetails';
// import { ITemple, ITemples } from '../../interface/ITemple';
// import FunctionUtils from '../../utils/Function';

// const { COLORS } = Theme;

// interface IProps {
//     navigation: any
//     route: any
//     templeStore: { temples: ITemples }
// }

// interface IState {
//     selectedTab: number
//     isVideoPlayer: boolean
// }

// var imageList = [
//     {
//         image: '',
//     }
// ];

// class TempleView extends React.Component<IProps, IState>{
//     temples: ITemples;
//     temple: ITemple | undefined;
//     footerTabs: { label: string; icon: string; focused: boolean; }[];
//     constructor(props: any) {
//         super(props);
//         this.temples = { count: 0, results: [] };
//         this.temple = undefined;
//         this.footerTabs = [
//             {
//                 label: 'History',
//                 icon: 'auto-stories',
//                 focused: true
//             },
//             {
//                 label: 'Special',
//                 icon: 'volunteer-activism',
//                 focused: false
//             },
//             {
//                 label: 'Festivals',
//                 icon: 'celebration',
//                 focused: false
//             },
//             {
//                 label: 'Location',
//                 icon: 'place',
//                 focused: false
//             }
//         ];
//         this.state = {
//             selectedTab: 0,
//             isVideoPlayer: false
//         }
//     }

//     componentDidMount() {
//         this.temples = this.props.templeStore.temples;
//         if (this.props.route && this.props.route.params && this.props.route.params.templeId) {
//             if (this.temples && this.temples.results && this.temples.results.length > 0) {
//                 this.temple = this.temples.results.find(templeObj => templeObj.id === this.props.route.params.templeId);
//                 if (this.temple) {
//                     imageList[0].image = APIDetails.BASE_URL + this.temple.image;
//                 }
//             }
//         }
//         this.setState({});
//     }

//     onTabChange = (index: number) => {
//         this.footerTabs.forEach((tab, i) => i === index ? tab.focused = true : tab.focused = false);
//         this.setState({ selectedTab: index });
//     }

//     onVideoPlayer = () => {
//         this.props.navigation.navigate('YoutubePlayerScreen',
//             { id: 0, name: this.temple?.nameEnglish, videoId: this.temple?.videoId })
//     }

//     onSocialShare = async () => {
//         await FunctionUtils.socialShare();
//     }

//     navigateToMap = (latitute: string, longitute: string) => {
//         FunctionUtils.navigateToGoogleMap(latitute, longitute);
//     }

//     render() {
//         return (
//             <View style={{ flex: 1 }}>
//                 {this.temple ?
//                     <View style={{ flex: 1, }}>
//                         <View style={{ height: 280 }}>
//                             <Carousel isImageOnly={true} isUri={true} contentList={imageList} dotColor={COLORS.white} />
//                         </View>
//                         <View style={{ flexDirection: 'row', height: 45, justifyContent: 'space-evenly', alignItems: 'center' }}>
//                             {this.temple.videoId &&
//                                 <Button icon='play-circle-filled' title="Video" onPress={this.onVideoPlayer} backgroundColor={COLORS.gray} borderRadius={25} />
//                             }
//                             <Button icon='share' title="Share" onPress={this.onSocialShare} backgroundColor={COLORS.gray} borderRadius={25} />
//                             {(this.temple.latitude && this.temple.longitude) &&
//                                 <Button icon='place' title="Map" onPress={() => this.navigateToMap(this.temple!.latitude, this.temple!.longitude)}
//                                     backgroundColor={COLORS.gray} borderRadius={25} />
//                             }
//                         </View>
//                         <View style={{ flex: 3 }}>
//                             <ScrollView>
//                                 {this.state.selectedTab === 0 ?
//                                     <View>
//                                         <Text style={{ fontWeight: 'bold', fontSize: 17, padding: 4 }}>Deity Name</Text>
//                                         <Text style={{ fontSize: 15, padding: 6, fontStyle: 'italic' }}>{this.temple.deityNameEnglish}</Text>
//                                         <Text style={{ fontWeight: 'bold', fontSize: 17, padding: 4 }}>History</Text>
//                                         <Text style={{ fontSize: 15, padding: 6, fontStyle: 'italic' }}>{this.temple.historyEnglish}</Text>
//                                         <Text style={{ fontWeight: 'bold', fontSize: 17, padding: 4 }}>Contact</Text>
//                                         <Text style={{ fontSize: 15, padding: 6, fontStyle: 'italic' }}>{this.temple.contactEnglish}</Text>
//                                         <Text style={{ fontWeight: 'bold', fontSize: 17, padding: 4 }}>Open Time</Text>
//                                         <Text style={{ fontSize: 15, padding: 6, fontStyle: 'italic' }}>{this.temple.openTimeEnglish}</Text>
//                                     </View>
//                                     :
//                                     this.state.selectedTab === 1 ?
//                                         <View>
//                                             <Text style={{ fontWeight: 'bold', fontSize: 17, padding: 4 }}>Special</Text>
//                                             <Text style={{ fontSize: 15, padding: 6, fontStyle: 'italic' }}>{this.temple.specialEnglish}</Text>
//                                             <Text style={{ fontWeight: 'bold', fontSize: 17, padding: 4 }}>Prayer</Text>
//                                             <Text style={{ fontSize: 15, padding: 6, fontStyle: 'italic' }}>{this.temple.prayerEnglish}</Text>
//                                             <Text style={{ fontWeight: 'bold', fontSize: 17, padding: 4 }}>Consecration</Text>
//                                             <Text style={{ fontSize: 15, padding: 6, fontStyle: 'italic' }}>{this.temple.consecrationEnglish}</Text>
//                                         </View>
//                                         :
//                                         this.state.selectedTab === 2 ?
//                                             <View>
//                                                 <Text style={{ fontWeight: 'bold', fontSize: 17, padding: 4 }}>Festivals</Text>
//                                                 <Text style={{ fontSize: 15, padding: 6, fontStyle: 'italic' }}>{this.temple.festivalEnglish}</Text>
//                                             </View>
//                                             :
//                                             <View>
//                                                 <Text style={{ fontWeight: 'bold', fontSize: 17, padding: 4 }}>Location</Text>
//                                                 <Text style={{ fontSize: 15, padding: 6, fontStyle: 'italic' }}>{this.temple.locationEnglish}</Text>
//                                                 <Text style={{ fontWeight: 'bold', fontSize: 17, padding: 4 }}>Direction</Text>
//                                                 <Text style={{ fontSize: 15, padding: 6, fontStyle: 'italic' }}>{this.temple.directionEnglish}</Text>
//                                             </View>
//                                 }
//                             </ScrollView>
//                         </View>
//                         <AppFooter
//                             tabs={this.footerTabs}
//                             onTabChange={this.onTabChange}
//                             focused={true}
//                             bgColors={COLORS.white}
//                         />
//                     </View>
//                     :
//                     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//                         <Text>No Temple Data</Text>
//                     </View>
//                 }
//             </View>
//         )
//     }
// }

// const mapStateToProps = (state: any) => {
//     return {
//         templeStore: state.templeReducer
//     }
// };

// export default connect(mapStateToProps)(TempleView);
