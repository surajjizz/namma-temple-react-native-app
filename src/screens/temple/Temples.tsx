// import * as React from 'react';
// import { FlatList, Image, StatusBar, Text, TouchableNativeFeedback, View } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import { connect } from 'react-redux';
// import { Loader } from '../../components';
// import { Theme, Images } from '../../constants';
// import APIDetails from '../../defaults/APIDetails';
// import { getTemplesByDistrict, getTemplesByDistrictAndGod, getTemplesByGod } from '../../helpers/Temple';
// import { ITemple, ITemples } from '../../interface/ITemple';
// import styles from '../../styles/Home';

// const { COLORS } = Theme;
// const { noImage } = Images;

// interface IProps {
//     navigation: any
//     route: any
//     templeStore: { temples: ITemples }
// }

// interface IState {
//     isLoader: boolean
// }

// class Temples extends React.Component<IProps, IState>{
//     temples: ITemples;
//     constructor(props: any) {
//         super(props);
//         this.temples = { count: 0, results: [] };
//         this.state = {
//             isLoader: false
//         }
//     }

//     componentDidMount() {
//         this.getTemplesData();
//     }

//     getTemplesData = async () => {
//         var { templeStore, route } = this.props;
//         if (route && route.params) {
//             this.setState({ isLoader: true });
//             if (route.params.distId && route.params.godId) {
//                 this.temples = await getTemplesByDistrictAndGod(route.params.distId, route.params.godId);
//             } else if (route.params.distId) {
//                 this.temples = await getTemplesByDistrict(route.params.distId);
//             } else if (route.params.godId) {
//                 this.temples = await getTemplesByGod(route.params.godId);
//             }
//             this.setState({ isLoader: false });
//         } else {
//             this.temples = templeStore.temples;
//             this.setState({});
//         }
//     }

//     navigateToTempleView(temple: ITemple) {
//         this.props.navigation.navigate('TempleViewScreen',
//             { templeId: temple.id, name: temple.nameEnglish })
//     }

//     viewImage() {
//         console.log("bbbbb")
//     }

//     renderItem = (temple: ITemple) => {
//         return (
//             <View >
//                 <View style={styles.itemContainer}>
//                     <TouchableNativeFeedback onPress={this.viewImage}>
//                         <View style={styles.leftContainer}>
//                             <Image source={temple.image ? { uri: APIDetails.BASE_URL + temple.image } : noImage}
//                                 defaultSource={noImage} style={styles.avatar} />
//                         </View>
//                     </TouchableNativeFeedback>
//                     <TouchableNativeFeedback onPress={() => this.navigateToTempleView(temple)}>
//                         <View style={{ flex: 10, flexDirection: 'row' }}>
//                             <View style={styles.midContainer}>
//                                 <Text style={styles.name}>{temple.nameEnglish}</Text>
//                                 <Text
//                                     numberOfLines={1}
//                                     style={styles.history}>
//                                     {temple.historyEnglish}
//                                 </Text>
//                             </View>
//                             <View style={styles.rightContainer}>
//                                 <Text>
//                                     <Icon name="chevron-right" size={22} color={COLORS.lightGray} />
//                                 </Text>
//                             </View>
//                         </View>
//                     </TouchableNativeFeedback>
//                 </View>
//                 <View style={styles.divider} />
//             </View>)
//     }

//     render() {
//         return (
//             <View style={{ flex: 1 }}>
//                 <StatusBar barStyle='default' backgroundColor={COLORS.secondary} />
//                 {this.temples && this.temples.results && this.temples.results.length > 0 ?
//                     <FlatList
//                         style={{ width: '100%' }}
//                         data={this.temples.results}
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
//         templeStore: state.templeReducer
//     }
// };

// export default connect(mapStateToProps)(Temples);

import * as React from 'react';
import { FlatList, Image, Text, TouchableNativeFeedback, View } from 'react-native';
import Loader from '../../components/Loader';
import { Images, Messages, Theme } from '../../constants';
import APIDetails from '../../defaults/APIDetails';
import styles from '../../styles/Home';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { inject, observer } from 'mobx-react';
import RootStore from '../../mobx-store/RootStore';
import { RootStackParams } from '../../navigation/StackNavigator';
import Nodata from '../../components/Nodata';
import Container from '../../components/Container';
import TempleStore from '../../mobx-store/TempleStore';
import { ITemple, ITemples } from '../../interface/ITemple';
import { action, makeObservable, observable } from 'mobx';
import { RouteProp } from '@react-navigation/native';
import TempleHelper from '../../helpers/TempleHelper';

const { COLORS } = Theme;
const { noImage } = Images;

interface IProps {
    navigation: NativeStackNavigationProp<RootStackParams>;
    route: RouteProp<RootStackParams, 'Temples'>;
    templeStore: TempleStore;
}

@inject(() => ({
    templeStore: RootStore.templeStore
}))

@observer
export default class Temples extends React.Component<IProps, {}>{
    @observable temples: ITemples = { count: 0, results: [] };

    constructor(props: any) {
        super(props);
        makeObservable(this);
    }

    componentDidMount() {
        this.getTemplesData();
    }

    @action getTemplesData = async () => {
        var { templeStore, route } = this.props;
        if (route && route.params) {
            if (route.params.districtId && route.params.godId) {
                await TempleHelper.getTemplesByDistrictAndGod(route.params.districtId, route.params.godId);
            } else if (route.params.districtId) {
                await TempleHelper.getTemplesByDistrict(route.params.districtId);
            } else if (route.params.godId) {
                await TempleHelper.getTemplesByGod(route.params.godId);
            }
            this.temples = templeStore.filteredTemples;
        } else {
            this.temples = templeStore.temples;
        }
    }

    navigateToDetailView = (god: ITemple) => {
        // this.props.navigation.navigate('DistrictDetail');
    }

    _renderItem = (temple: ITemple) => {

        return (
            <View >
                <View style={styles.itemContainer}>
                    <TouchableNativeFeedback>
                        <View style={styles.leftContainer}>
                            <Image style={styles.avatar}
                                source={temple.image ? { uri: APIDetails.BASE_URL + temple.image } : noImage} />
                        </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback onPress={() => this.navigateToDetailView(temple)}>
                        <View style={{ flex: 10, flexDirection: 'row' }}>
                            <View style={styles.midContainer}>
                                <Text style={styles.name}>{temple?.name_english}</Text>
                                <Text numberOfLines={1} style={styles.history}>
                                    {temple?.history_english}
                                </Text>
                            </View>
                        </View>
                    </TouchableNativeFeedback>
                </View>
                <View style={styles.divider} />
            </View>)
    }

    render() {
        var { isLoading } = this.props.templeStore;

        return (
            <Container statusBarBg={COLORS.secondary}>
                <FlatList
                    style={{ width: '100%' }}
                    data={this.temples?.results}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={(items) => this._renderItem(items.item)}
                    ListEmptyComponent={<Nodata isLoading={isLoading} message={Messages.noTempleFound} />}
                />
                <Loader visibility={isLoading} />
            </Container>
        )
    }
}
