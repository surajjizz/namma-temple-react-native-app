import React from "react";
import { View, Dimensions, StyleSheet, Image } from "react-native";

const { height, width } = Dimensions.get("window");
export const Slide = ({ imageUrl }) => {
    return (
        <View style={styles.container}>
            <Image
                style={{
                    resizeMode: "contain",
                    width: "96%",
                    height: height / 2,
                    borderRadius: 10
                }}
                source={imageUrl}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        marginTop: 45,
        flex: 1,
        width,
        alignItems: "center"
    },
});
