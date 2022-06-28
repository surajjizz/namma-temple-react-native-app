// import * as React from "react";
// import { StyleSheet, View, StatusBar, BackHandler, Alert, Text } from "react-native";
// import { Theme, Images, Languages } from '../../constants';
// import Carousel from '../../components/Carousel';
// import PulseAnim from '../../components/PulseLoader';
// import { NativeStackNavigationProp } from "@react-navigation/native-stack";
// import { inject, observer } from "mobx-react";
// import RootStore from "../../mobx-store/RootStore";
// import { RootStackParams } from "../../navigation/StackNavigator";
// import CommonStore from "../../mobx-store/CommonStore";
// import { languageType } from "../../interface/ICommon";

// const { welcomeLogo1, welcomeLogo2, welcomeLogo3, welcomeLogo4, welcomeLogo5, welcomeLogo6 } = Images;
// const { COLORS, width } = Theme;

// interface IProps {
//     navigation: NativeStackNavigationProp<RootStackParams>;
//     commonStore: CommonStore;
// }

// @inject(() => ({
//     commonStore: RootStore.commonStore
// }))

// @observer
// export default class Onboarding extends React.Component<IProps, {}> {
//     backAction = () => {
//         if (this.props.navigation.isFocused()) {
//             Alert.alert('Confirm Exit', 'Do you want to exit the app', [
//                 {
//                     text: "Cancel",
//                     onPress: () => null,
//                     style: "cancel"
//                 },
//                 { text: "YES", onPress: () => BackHandler.exitApp() }
//             ]);
//             return true;
//         }
//         else {
//             return false;
//         }
//     };

//     componentDidMount() {
//         BackHandler.addEventListener("hardwareBackPress", this.backAction);
//     }

//     componentWillUnmount() {
//         BackHandler.removeEventListener("hardwareBackPress", this.backAction);
//     }

//     getContent = (language: languageType) => {
//         const {welcomeTitle1,welcomeTitle2,welcomeMessage1,welcomeMessage2 } = Languages[language];
//         const datas = [
//             {
//                 title: welcomeTitle1,
//                 image: welcomeLogo1,
//                 description: welcomeMessage1
//             },
//             {
//                 title: welcomeTitle2,
//                 image: welcomeLogo2,
//                 description: welcomeMessage2
//             },
//             {
//                 title: welcomeTitle1,
//                 image: welcomeLogo3,
//                 description: welcomeMessage1
//             },
//             {
//                 title: welcomeTitle2,
//                 image: welcomeLogo4,
//                 description: welcomeMessage2
//             },
//             {
//                 title: welcomeTitle1,
//                 image: welcomeLogo5,
//                 description: welcomeMessage1
//             },
//             {
//                 title: welcomeTitle2,
//                 image: welcomeLogo6,
//                 description: welcomeMessage2
//             }
//         ];
//         return datas;
//     }

//     navigateToGenerateOTP = () => {
//         this.props.navigation.navigate('Login');
//     }

//     render() {
//         var contentList: any[] = this.getContent(this.props.commonStore.language);

//         return (
//             <View style={styles.container} >
//                 <StatusBar barStyle='default' backgroundColor={COLORS.tertiary} />
//                 <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//                     <Text style={{ color: COLORS.white, fontWeight: 'bold', fontStyle: 'italic', fontSize: 25 }}>Namma Temple</Text>
//                 </View>
//                 <View style={{ flex: 5 }}>
//                     <Carousel isImageOnly={false} isUri={false} contentList={contentList} dotColor={COLORS.white} />
//                 </View>
//                 <View style={{ justifyContent: 'center', flexDirection: 'row', width: width, alignItems: 'center', flex: 1 }}>
//                     <PulseAnim
//                         isEnable={true}
//                         type='icon'
//                         avatar='navigate-next'
//                         borderColor={COLORS.primary}
//                         backgroundColor={COLORS.white}
//                         interval={2000}
//                         size={50}
//                         duration={10000}
//                         pulseMaxSize={100}
//                         onPress={this.navigateToGenerateOTP}
//                         avatarBackgroundColor={COLORS.primary}
//                     />
//                 </View>
//             </View>
//         );
//     }
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: COLORS.tertiary
//     }
// });



import React, { useState, useRef, useEffect } from "react";
import {
    View,
    StyleSheet,
    Dimensions,
    Animated,
    StatusBar, Platform
} from "react-native";
//Slides
import { Slide } from "../../tempComponents/Slide";
import { SubSlide } from "../../tempComponents/SubSlide";
import { Ticker } from "../../tempComponents/TickerText";
import { Pagination } from "../../tempComponents/Pagination";
import { Images } from "../../constants";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../navigation/StackNavigator";

const { height, width } = Dimensions.get("window");
const slides = [
    {
        id: 1,
        lable: "Mua may mắn",
        subtitle: "Tìm loại đá yêu thích",
        des:
            "Việc lựa chọn một vòng đá phù hợp đem lại lợi ích rất lớn trong sự nghiệp, tình cảm, tiền tài",
        imageUrl: Images.welcomeLogo4,
    },
    {
        id: 2,
        lable: "Cầu bình an",
        subtitle: "Sản phẩm chất lượng",
        des:
            "Giúp  tăng sự tự tin, đầu óc minh mẫn sáng suốt, giải quyết vấn đề cách linh hoạt thông suốt",
        imageUrl: Images.welcomeLogo5,
    },
    {
        id: 3,
        lable: "Mang hạnh phúc về",
        subtitle: "Bạn còn chần chừ gì nữa?",
        des: "Hãy tìm ngay cho mình sự may mắn, hạnh phúc tại CatTuong ",
        imageUrl: Images.welcomeLogo6,
    },
];

interface IProps{
    navigation: NativeStackNavigationProp<RootStackParams>;
}

const Onboarding = (props:IProps) => {
    const scrollX = useRef(new Animated.Value(0)).current;
    const scrollClick = useRef(null);
    const unmounted = useRef(false);
    useEffect(() => {
        return () => {
            unmounted.current = true;
        };
    }, []);
    const backgroundColor = scrollX.interpolate({
        inputRange: [0, width, width * 2],
        outputRange: ["#BFEAF5", "#BEECC4", "#FFE4D9"],
        extrapolate: "clamp",
    });
    const textTranslate = scrollX.interpolate({
        inputRange: [0, width, width * 2],
        outputRange: [0, width * -1, width * -2],
        extrapolate: "clamp",
    });

    const EnterApp = () => {
        console.log("Enter")
        // setLoading(true);
        // await dispatch(CheckFirstTimeAction.firstOpen());
        // if (!unmounted.current) {
            // setLoading(false);
        // }
        props.navigation.navigate('Login');
    };

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.slider, { backgroundColor }]}>
                <Ticker scrollX={scrollX} />
                <Animated.ScrollView
                    ref={scrollClick}
                    horizontal
                    snapToInterval={width}
                    // scrollTo={{ x: scrollClick, animated: true }}
                    decelerationRate='fast'
                    showsHorizontalScrollIndicator={false}
                    bounces={false}
                    scrollEventThrottle={1}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        { useNativeDriver: false } //
                    )}
                >
                    {slides.map((slide: any) => {
                        return <Slide key={slide.id} imageUrl={slide.imageUrl} />;
                    })}
                </Animated.ScrollView>
            </Animated.View>
            <View style={styles.footer}>
                <Pagination slides={slides} scrollX={scrollX} />
                <Animated.View
                    style={[StyleSheet.absoluteFillObject, { backgroundColor }]}
                ></Animated.View>
                <Animated.View style={styles.footerContent}>
                    <Animated.View
                        style={{
                            flexDirection: "row",
                            width: width * slides.length,
                            transform: [{ translateX: textTranslate }],
                        }}
                    >
                        {slides.map(({ subtitle, des }, index: any) => {
                            return (
                                <SubSlide
                                    key={subtitle}
                                    last={index === slides.length - 1}
                                    EnterApp={EnterApp}
                                    subtitle={subtitle}
                                    des={des}
                                    // scrollX={scrollX}
                                    NextSlide={() => {
                                        if (scrollClick.current) {
                                            scrollClick.current.scrollTo({ x: width * (index + 1) });
                                        }
                                    }}
                                />
                            );
                        })}
                    </Animated.View>
                </Animated.View>
            </View>
        </View>
    );
};

export default Onboarding;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    slider: {
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 20,
        height: 0.61 * height,
        borderBottomStartRadius: 60
        // borderBottomEndRadius: 75,
    },
    footer: {
        flex: 1,
    },
    footerContent: {
        flex: 1,
        borderTopEndRadius: 60,
        // borderTopLeftRadius: 75,
        flexDirection: "row",
        backgroundColor: "#ffffff",
    },
});