import * as React from 'react';
import { StyleSheet, View, ScrollView, Image, Text, Animated } from 'react-native';
import { Theme } from '../constants';
import APIDetails from '../defaults/APIDetails';

const { COLORS, SIZES, width } = Theme;

interface IProps {
    contentList: any
    isImageOnly: boolean
    isUri: boolean
    dotColor: string
}

interface IState {
    scrollRef: any
}

export default class Carousel extends React.Component<IProps, IState>{
    state: IState;
    scrollX: Animated.Value;

    constructor(props: IProps) {
        super(props);
        this.scrollX = new Animated.Value(0);
        this.state = {
            scrollRef: React.createRef()
        }
    }

    render() {
        const { contentList } = this.props;
        const dotPosition = Animated.divide(this.scrollX, SIZES.width);

        return (
            <View>
                <View style={this.props.isImageOnly === true ? { height: 280 } : { flex: 6 }}>
                    <ScrollView
                        onScroll={Animated.event([
                            { nativeEvent: { contentOffset: { x: this.scrollX } } },
                        ], { useNativeDriver: false })}
                        horizontal
                        pagingEnabled
                        ref={this.state.scrollRef}
                        showsHorizontalScrollIndicator={false}>
                        {contentList.map((contentObj: any, i: number) => {
                            return (<View key={i} style={styles.container}>
                                <View style={styles.imageStyle}>
                                    {this.props.isUri === true ?
                                        <Image
                                            resizeMode='stretch'
                                            source={{ uri: APIDetails.BASE_URL + contentObj.image }}
                                            style={{
                                                width: width, height: 280, backgroundColor: COLORS.secondary
                                            }}
                                        />
                                        :
                                        <Image
                                            resizeMode='stretch'
                                            source={contentObj.image ? contentObj.image : ''}
                                            style={{
                                                width: width, height: 280, backgroundColor: COLORS.secondary
                                            }}
                                        />
                                    }
                                </View>
                                {this.props.isImageOnly === false &&
                                    <View style={styles.messageStyle}>
                                        <Text style={styles.titleTextStyle}>{contentObj.title}</Text>
                                        <Text style={styles.descriptionTextStyle}>{contentObj.description}</Text>
                                    </View>
                                }
                            </View>)
                        })}
                    </ScrollView>
                </View>
                <View style={styles.circleDev}>
                    {contentList.map((item: any, index: number) => {
                        const opacity = dotPosition.interpolate({
                            inputRange: [index - 1, index, index + 1],
                            outputRange: [0.3, 1, 0.3],
                            extrapolate: "clamp"
                        });

                        const dotSize = dotPosition.interpolate({
                            inputRange: [index - 1, index, index + 1],
                            outputRange: [SIZES.base, 17, SIZES.base],
                            extrapolate: "clamp"
                        });

                        return (
                            <Animated.View
                                key={index}
                                // opacity={opacity}
                                style={[styles.whiteCircle, { width: dotSize, height: dotSize, backgroundColor: this.props.dotColor }]}
                            />
                        );
                    })}
                </View>
            </View >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        width: width,
    },
    imageStyle: {
        // height: '55%',
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    messageStyle: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15
    },
    titleTextStyle: {
        color: COLORS.white,
        textAlign: 'center',
        fontSize: 20,
        marginBottom: 20
    },
    descriptionTextStyle: {
        color: COLORS.darkGray,
        textAlign: 'center',
        fontSize: 14
    },
    circleDev: {
        flex: 1,
        height: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 15
    },
    whiteCircle: {
        width: 8,
        height: 8,
        borderRadius: SIZES.radius,
        margin: 5
    }
});
