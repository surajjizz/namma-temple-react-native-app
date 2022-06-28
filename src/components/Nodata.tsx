import * as React from "react"
import { Image, Text, View } from "react-native"
import { Images, Messages } from "../constants"
import { height } from "../constants/Theme";

interface IProps {
    message?: string
    isLoading: boolean
}

const Nodata = (props: IProps) => {
    var message = Messages.noDataFound;
    if (props?.message) {
        message = props.message;
    }

    return (
        <>
            {props.isLoading === false &&
                <View style={{ justifyContent: 'center', alignItems: 'center', height: height - 120 }}>
                    <Image source={Images.noData} resizeMode='contain' style={{ height: 250, width: 250 }} />
                    <Text>{message}</Text>
                </View>
            }
        </>
    )
}

export default Nodata;
