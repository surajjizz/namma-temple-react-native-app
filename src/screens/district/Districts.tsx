import * as React from 'react';
import { Alert, BackHandler, FlatList, Image, Text, TouchableNativeFeedback, View } from 'react-native';
import Loader from '../../components/Loader';
import { Images, Messages, Theme } from '../../constants';
import APIDetails from '../../defaults/APIDetails';
import styles from '../../styles/Home';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { inject, observer } from 'mobx-react';
import RootStore from '../../mobx-store/RootStore';
import { RootStackParams } from '../../navigation/StackNavigator';
import DistrictStore from '../../mobx-store/DistrictStore';
import Nodata from '../../components/Nodata';
import Container from '../../components/Container';
import { IDistrict } from '../../interface/IDistrict';
import Function from '../../utils/Function';

const { COLORS } = Theme;
const { noImage } = Images;

interface IProps {
    navigation: NativeStackNavigationProp<RootStackParams>;
    districtStore: DistrictStore;
}

@inject(() => ({
    districtStore: RootStore.districtStore
}))

@observer
export default class Districts extends React.Component<IProps, {}>{
    constructor(props: any) {
        super(props);
    }

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
    }

    navigateToDetailView = (district: IDistrict) => {
        this.props.districtStore.selectedDistrict = district;
        this.props.navigation.navigate('DistrictDetail', { name: district.name_english });
    }

    viewImage = () => {

    }

    _renderItem = (district: IDistrict) => {
        var numTemples: any = district?.num_temples;
        if (district?.num_temples && district?.num_temples > 999) {
            numTemples = '999+'
        }

        return (
            <View >
                <View style={styles.itemContainer}>
                    <TouchableNativeFeedback onPress={this.viewImage}>
                        <View style={styles.leftContainer}>
                            <Image style={styles.avatar}
                                source={district.image_1 ? { uri: APIDetails.BASE_URL + district.image_1 } : noImage} />
                        </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback onPress={() => this.navigateToDetailView(district)}>
                        <View style={{ flex: 10, flexDirection: 'row' }}>
                            <View style={styles.midContainer}>
                                <Text style={styles.name}>{district?.name_english}</Text>
                                <Text numberOfLines={1} style={styles.history}>
                                    {district?.history_english}
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
        var { districts, isLoading } = this.props.districtStore;

        return (
            <Container statusBarBg={COLORS.secondary}>
                <FlatList
                    style={{ width: '100%' }}
                    data={districts}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={(items) => this._renderItem(items.item)}
                    ListEmptyComponent={<Nodata isLoading={isLoading} message={Messages.noDistrictFound} />}
                />
                <Loader visibility={isLoading} />
            </Container>
        )
    }
}
