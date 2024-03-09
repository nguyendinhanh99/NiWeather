import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setConsumptionLimitMonth } from '../../redux/slices/transactionSlice';
import AppStyle from '../../theme';

export default function SetConsumptionLimitMonthScreen() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [limitAmountMonth, setLimitAmountMonth] = useState(""); // State để lưu số tiền hạn mức

    // Hàm để lưu hạn mức và quay lại trang chính
    const saveAndGoBack = () => {
        dispatch(setConsumptionLimitMonth(limitAmountMonth)); // Lưu hạn mức vào Redux store
        console.log("Hạn mức đã lưu:", limitAmountMonth); // In ra console
        navigation.goBack(); // Quay lại màn hình chính
    };

    return (
        <View style={
            AppStyle.LimitAmountInputStyle.container
        }>
            <View style = {AppStyle.LimitAmountInputStyle.titleView}>
                <Text style = {AppStyle.LimitAmountInputStyle.titleTextStyle}>
                    Thiết lập hạn mức ngày
                </Text>
                <Text style = {AppStyle.LimitAmountInputStyle.titleTextScripStyle}>
                    Thiết lập hạn mức giúp bạn quản lý chi tiêu hiệu quả hơn
                </Text>
            </View>
            <TextInput
            placeholder='1000000 ₫'
                value={limitAmountMonth}
                onChangeText={text => setLimitAmountMonth(text)}
                keyboardType="numeric"
                style = {AppStyle.LimitAmountInputStyle.textInputLimitAmount}
            />
            <TouchableOpacity 
            style = {AppStyle.LimitAmountInputStyle.saveButtomView}
            onPress={saveAndGoBack}>
                <Text
                style = {AppStyle.LimitAmountInputStyle.saveButtomText}
                >Lưu hạn mức mới
                </Text>
            </TouchableOpacity>
        </View>
    );
}
