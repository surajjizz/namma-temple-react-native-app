import React from 'react';
import { View, TouchableOpacity, Text, Modal, ScrollView, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { COLORS } from '../constants/Theme';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface IProps {
    modalVisible: boolean;
    modalBody: any;
    modalFooter?: any;
    title: string;
    setModalVisible: any;
    closeOnTouchOutside: boolean;
}

const AppModal = (props: IProps) => {
    return (
        <Modal visible={props.modalVisible} animationType="slide" transparent={true}>
            <TouchableOpacity
                onPress={() => {
                    if (props.closeOnTouchOutside) {
                        props.setModalVisible(false);
                    }
                }}
                style={styles.wrapper}>
                <View style={styles.modalView}>
                    <ScrollView>
                        <View style={styles.header}>
                            <Text style={styles.title}>
                                {props.title}
                            </Text>
                            <TouchableOpacity
                                onPress={() => {
                                    props.setModalVisible(false);
                                }}>
                                <Icon size={23} name="close" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.separator} />
                        <View style={styles.body}>
                            {props.modalBody}
                        </View>
                    </ScrollView>
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

AppModal.propTypes = {
    closeOnTouchOutside: PropTypes.bool,
};

AppModal.defaultProps = {
    closeOnTouchOutside: true,
};

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: 'rgba(0,0,0,0.4)',
        flex: 1,
        justifyContent: 'center',
    },

    modalView: {
        backgroundColor: COLORS.white,
        marginHorizontal: 20,
        borderRadius: 4,
        minHeight: 300,
    },

    header: {
        flexDirection: 'row',
        padding: 12,
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between',
    },

    title: {
        fontSize: 18,
    },

    body: {
        // minHeight: 300,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },

    footer: {
        justifyContent: 'space-evenly',
        paddingVertical: 7,
        alignItems: 'center',
        flexDirection: 'row',
    },

    termsView: {
        width: 5,
        height: 5,
        borderRadius: 100,
        backgroundColor: COLORS.gray,
    },

    separator: {
        height: 0.5,
        backgroundColor: COLORS.gray,
    },

    footerItems: {
        width: '100%',
        padding: 10,
    },

    footerText: {
        fontSize: 12,
    },
});

export default AppModal;