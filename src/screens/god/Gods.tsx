// import * as React from 'react';
// import { FlatList, Image, StatusBar, Text, TouchableNativeFeedback, View } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import { connect } from 'react-redux';
// import { Loader } from '../../components';
// import { Theme, Images } from '../../constants';
// import APIDetails from '../../defaults/APIDetails';
// import { getGodsByDistrict } from '../../helpers/Gods';
// import { IGod, IGods } from '../../interface/IGod';
// import styles from '../../styles/God';

// const { COLORS } = Theme;
// const { noImage } = Images;

// interface IProps {
//     navigation: any
//     route: any
//     godStore: { gods: IGods }
//     languageStore: { language: any }
// }

// interface IState {
//     isLoader: boolean
// }

// class Gods extends React.Component<IProps, IState>{
//     gods: IGods;
//     constructor(props: IProps) {
//         super(props);
//         this.gods = { count: 0, results: [] };
//         this.state = {
//             isLoader: false
//         }
//     }

//     componentDidMount() {
//         this.getGodsData();
//     }

//     getGodsData = async () => {
//         if (this.props.route && this.props.route.params && this.props.route.params.distId) {
//             this.setState({ isLoader: true });
//             this.gods = await getGodsByDistrict(this.props.route.params.distId);
//             this.setState({ isLoader: false });
//         } else {
//             this.gods = this.props.godStore.gods;
//         }
//         this.setState({});
//     }

//     navigateToGodView(god: IGod) {
//         if (this.props.route && this.props.route.params && this.props.route.params.distId) {
//             this.props.navigation.navigate('GodViewScreen',
//                 {
//                     godId: god.id,
//                     name: `( ${this.props.route.params.name} ) ${god.nameEnglish}`,
//                     distId: this.props.route.params.distId
//                 }
//             );
//         } else {
//             this.props.navigation.navigate('GodViewScreen',
//                 {
//                     godId: god.id,
//                     name: god.nameEnglish,
//                 }
//             );
//         }
//     }

//     viewImage() {
//         console.log("bbbbb")
//     }

//     renderItem = (god: any) => {
//         var { languageStore } = this.props;
//         var { language } = languageStore;

//         return (
//             <View>
//                 <View style={styles.itemContainer}>
//                     <TouchableNativeFeedback onPress={this.viewImage}>
//                         <View style={styles.leftContainer}>
//                             <Image source={god.image1 ? { uri: APIDetails.BASE_URL + god.image1 } : noImage}
//                                 defaultSource={noImage} style={styles.avatar} />
//                         </View>
//                     </TouchableNativeFeedback>
//                     <TouchableNativeFeedback onPress={() => this.navigateToGodView(god)}>
//                         <View style={{ flex: 10, flexDirection: 'row' }}>
//                             <View style={styles.midContainer}>
//                                 <Text style={styles.name}>{god[language.name]}</Text>
//                                 <Text
//                                     numberOfLines={1}
//                                     style={styles.history}>
//                                     {god[language.history]}
//                                 </Text>
//                             </View>
//                             <View style={styles.rightContainer}>
//                                 <Text style={styles.count}>
//                                     {`(${god.num_temples})`}
//                                 </Text>
//                                 <Text>
//                                     <Icon name="chevron-right" size={22} color={COLORS.lightGray} />
//                                 </Text>
//                             </View>
//                         </View>
//                     </TouchableNativeFeedback>
//                 </View>
//                 <View style={styles.divider} />
//             </View>
//         )
//     }

//     render() {
//         console.log("this.props.godStore", this.props.godStore)
//         return (
//             <View style={{ flex: 1 }}>
//                 <StatusBar barStyle='default' backgroundColor={COLORS.secondary} />
//                 {this.gods && this.gods.results && this.gods.results.length > 0 ?
//                     <FlatList
//                         style={{ width: '100%' }}
//                         data={this.gods.results}
//                         keyExtractor={(item) => item.id.toString()}
//                         renderItem={(item) => this.renderItem(item.item)}
//                     />
//                     :
//                     this.state.isLoader === false &&
//                     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//                         <Text>No data</Text>
//                     </View>
//                 }
//                 <Loader isLoader={this.state.isLoader} />
//             </View>
//         )
//     }
// }

// const mapStateToProps = (state: any) => {
//     return {
//         godStore: state.godReducer,
//         languageStore: state.languageReducer
//     }
// };

// export default connect(mapStateToProps)(Gods);


import * as React from 'react';
import { FlatList, Image, Text, TouchableNativeFeedback, View } from 'react-native';
import Loader from '../../components/Loader';
import { Images, Messages, Theme } from '../../constants';
import APIDetails from '../../defaults/APIDetails';
import styles from '../../styles/Home';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { inject, observer } from 'mobx-react';
import RootStore from '../../mobx-store/RootStore';
import { RootStackParams } from '../../navigation/StackNavigator';
import Nodata from '../../components/Nodata';
import Container from '../../components/Container';
import GodStore from '../../mobx-store/GodStore';
import { IGod } from '../../interface/IGod';
import { action, makeObservable, observable } from 'mobx';
import GodHelper from '../../helpers/GodHelper';

const { COLORS } = Theme;
const { noImage } = Images;

interface IProps {
    navigation: NativeStackNavigationProp<RootStackParams>;
    route: RouteProp<RootStackParams, 'Gods'>;
    godStore: GodStore;
}

@inject(() => ({
    godStore: RootStore.godStore
}))

@observer
export default class Gods extends React.Component<IProps, {}>{
    @observable gods: IGod[] = [];

    constructor(props: any) {
        super(props);
        makeObservable(this);
    }

    componentDidMount() {
        this.getGodsData();
    }

    @action getGodsData = async () => {
        if (this.props.route?.params?.districtId) {
            await GodHelper.getGodsByDistrict(this.props.route?.params?.districtId);
            this.gods = this.props.godStore.districtBasedGods;
        } else {
            this.gods = this.props.godStore.gods;
        }
    }

    navigateToDetailView = (god: IGod) => {
        this.props.godStore.selectedGod = god;
        if (this.props.route?.params?.districtId) {
            this.props.navigation.navigate('GodDetail', { name: `${god.name_english} (${this.props.route.params.districtName})` });
        } else {
            this.props.navigation.navigate('GodDetail', { name: god.name_english });
        }
    }

    _renderItem = (god: IGod) => {
        var numTemples: any = god?.num_temples;
        if (god?.num_temples && god?.num_temples > 999) {
            numTemples = '999+'
        }

        return (
            <View >
                <View style={styles.itemContainer}>
                    <TouchableNativeFeedback>
                        <View style={styles.leftContainer}>
                            <Image style={styles.avatar}
                                source={god.image_1 ? { uri: APIDetails.BASE_URL + god.image_1 } : noImage} />
                        </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback onPress={() => this.navigateToDetailView(god)}>
                        <View style={{ flex: 10, flexDirection: 'row' }}>
                            <View style={styles.midContainer}>
                                <Text style={styles.name}>{god?.name_english}</Text>
                                <Text numberOfLines={1} style={styles.history}>
                                    {god?.history_english}
                                </Text>
                            </View>
                            <View style={[styles.rightContainer, { justifyContent: 'flex-end' }]}>
                                <View style={styles.count}>
                                    <Text style={styles.countText}>{numTemples}</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableNativeFeedback>
                </View>
                <View style={styles.divider} />
            </View>)
    }

    render() {
        var { isLoading } = this.props.godStore;

        return (
            <Container statusBarBg={COLORS.secondary}>
                <FlatList
                    style={{ width: '100%' }}
                    data={this.gods}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={(items) => this._renderItem(items.item)}
                    ListEmptyComponent={<Nodata isLoading={isLoading} message={Messages.noGodFound} />}
                />
                <Loader visibility={isLoading} />
            </Container>
        )
    }
}
