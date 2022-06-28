import * as React from 'react';
import { Alert, BackHandler, FlatList, Image, Text, TouchableNativeFeedback, View } from 'react-native';
import Loader from '../../components/Loader';
import { Images, Messages, Theme } from '../../constants';
import APIDetails from '../../defaults/APIDetails';
import { IReligion } from '../../interface/IReligion';
import styles from '../../styles/Home';
import AppStorage from '../../storage/AppStorage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { inject, observer } from 'mobx-react';
import RootStore from '../../mobx-store/RootStore';
import { RootStackParams } from '../../navigation/StackNavigator';
import ReligionStore from '../../mobx-store/ReligionStore';
import ReligionHelper from '../../helpers/ReligionHelper';
import DistrictHelper from '../../helpers/DistrictHelper';
import GodHelper from '../../helpers/GodHelper';
import TempleHelper from '../../helpers/TempleHelper';
import DistrictStore from '../../mobx-store/DistrictStore';
import Nodata from '../../components/Nodata';
import Container from '../../components/Container';
import { action } from 'mobx';
import Function from '../../utils/Function';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const { COLORS } = Theme;
const { noImage } = Images;

interface IProps {
    navigation: NativeStackNavigationProp<RootStackParams>;
    religionStore: ReligionStore;
    districtStore: DistrictStore;
}

@inject(() => ({
    religionStore: RootStore.religionStore,
    districtStore: RootStore.districtStore
}))

@observer
export default class Religions extends React.Component<IProps, {}>{

    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.backAction);
        this.getAllReligions();
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

    getAllReligions = async () => {
        var religions: IReligion[] = [];
        religions = await AppStorage.getReligions() || [];
        if (religions.length > 0) {
            this.props.religionStore.religions = religions;
        } else {
            await ReligionHelper.getReligions();
        }
    }

    getPendingDatas = async () => {
        this.props.religionStore.isLoading = true;
        if (this.props.districtStore.districts.length === 0) {
            await DistrictHelper.getDistricts();
        }
        await GodHelper.getGods();
        await TempleHelper.getAllTemples();
        this.props.religionStore.isLoading = false;
    }

    @action onSelectReligion = async (religion: IReligion) => {
        var isReligionChanged: boolean = false;
        var { religionStore } = this.props;
        if (religionStore.selectedReligion.id !== religion.id) {
            isReligionChanged = true;
        } else {
            isReligionChanged = false;
        }
        religionStore.selectedReligion = religion;
        if (isReligionChanged) {
            await this.getPendingDatas();
        }
        this.navigateToHome();
    }

    navigateToHome = () => {
        this.props.navigation.reset({ index: 0, routes: [{ name: 'DrawerNavigator' }] });
    }

    viewImage = () => {

    }

    _renderItem = (religion: IReligion) => {
        var { selectedReligion } = this.props.religionStore;
        var numTemples: any = religion?.num_temples;
        if (religion?.num_temples && religion?.num_temples > 999) {
            numTemples = '999+'
        }

        return (
            <View >
                <View style={styles.itemContainer}>
                    <TouchableNativeFeedback onPress={this.viewImage}>
                        <View style={styles.leftContainer}>
                            <Image style={styles.avatar}
                                source={religion.image ? { uri: APIDetails.BASE_URL + religion.image } : noImage} />
                        </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback onPress={() => this.onSelectReligion(religion)}>
                        <View style={{ flex: 10, flexDirection: 'row' }}>
                            <View style={styles.midContainer}>
                                <Text style={styles.name}>{religion?.name_english}</Text>
                            </View>
                            <View style={{ justifyContent: 'center' }}>
                                {religion.id === selectedReligion.id &&
                                    <MaterialCommunityIcon name='checkbox-marked-circle-outline' size={20} color={COLORS.lightGreen} />
                                }
                            </View>
                            <View style={styles.rightContainer}>
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
        var { religions, isLoading } = this.props.religionStore;

        return (
            <Container statusBarBg={COLORS.secondary}>
                <FlatList
                    style={{ width: '100%' }}
                    data={religions}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={(items) => this._renderItem(items.item)}
                    ListEmptyComponent={<Nodata isLoading={isLoading} message={Messages.noReligionFound} />}
                />
                <Loader visibility={isLoading} />
            </Container>
        )
    }
}
