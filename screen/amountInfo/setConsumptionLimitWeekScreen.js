import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setConsumptionLimitWeek } from '../../redux/slices/transactionSlice';
import AppStyle from '../../theme';

export default function SetConsumptionLimitWeekScreen() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [limitAmount, setLimitAmount] = useState(""); // State để lưu số tiền hạn mức
    //setConsumptionLimitWeek
    // Hàm để lưu hạn mức và quay lại trang chính
    const saveAndGoBack = () => {
        dispatch(setConsumptionLimitWeek(limitAmount)); // Lưu hạn mức vào Redux store
        console.log("Hạn mức Week đã lưu:", limitAmount); // In ra console
        navigation.goBack(); // Quay lại màn hình chính
    };

    return (
        <View style={
            AppStyle.LimitAmountInputStyle.container
        }>
            <View style = {AppStyle.LimitAmountInputStyle.titleView}>
                <Text style = {AppStyle.LimitAmountInputStyle.titleTextStyle}>
                    Thiết lập hạn mức tuần
                </Text>
                <Text style = {AppStyle.LimitAmountInputStyle.titleTextScripStyle}>
                    Thiết lập hạn mức giúp bạn quản lý chi tiêu hiệu quả hơn
                </Text>
            </View>
            <TextInput
            placeholder='1000000 ₫'
                value={limitAmount}
                onChangeText={text => setLimitAmount(text)}
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
