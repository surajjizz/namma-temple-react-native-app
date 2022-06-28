import React from "react";
import {
    View,
    Text,
    Animated,
    StyleSheet,
    Dimensions,
    StatusBar,
    Platform,
} from "react-native";
//PropTypes check
import PropTypes from "prop-types";
import { Images } from "../constants";

const TICKER_HEIGHT = 60;
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

export const Ticker = ({ scrollX }) => {
    const inputRange = [0, width, width * 2];
    const translateY = scrollX.interpolate({
        inputRange,
        outputRange: [0, -TICKER_HEIGHT, -TICKER_HEIGHT * 2],
    });
    return (
        <View style={styles.tickerContainer}>
            <Animated.View style={{ transform: [{ translateY }] }}>
                {slides.map(({ lable }) => {
                    return (
                        <Text key={lable} style={styles.tickerText}>
                            {lable}
                        </Text>
                    );
                })}
            </Animated.View>
        </View>
    );
};

Ticker.propTypes = {
    scrollX: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
    tickerContainer: {
        position: "absolute",
        width,
        top:
            Platform.OS === "android"
                ? StatusBar.currentHeight || '' + 10
                : height > 667
                    ? 50
                    : 35,
        alignItems: "center",
        overflow: "hidden",
        height: TICKER_HEIGHT,
    },
    tickerText: {
        textAlign: "center",
        fontSize: 30,
        lineHeight: TICKER_HEIGHT,
        textTransform: "uppercase",
        fontWeight: "800",
        color: "#2CB9B0",
        fontFamily: "Roboto-Medium",
    },
});
