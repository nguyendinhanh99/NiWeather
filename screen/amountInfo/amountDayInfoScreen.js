import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Image,
    Alert
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import {deleteTransaction } from '../../redux/slices/transactionSlice.js';
import AppStyle from '../../theme';
import icons from '../../assest/icon';
import TabView from '../../constants/tabView';
import LinearGradient from 'react-native-linear-gradient';

export default function AmountDayScreen() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const transactions = useSelector((state) => state.transactions.list);
    const consumptionLimit = useSelector((state) => state.transactions.consumptionLimit); // Lấy giá trị hạn mức từ Redux store
    const { currentDay, filteredByDay, totalAmount, totalTransactions } = getTodayTransactions(transactions);
    const [selectedItemIndex, setSelectedItemIndex] = useState(null);

    useEffect(() => {
        checkConsumptionLimit(); // Kiểm tra hạn mức khi component được tạo ra hoặc khi giá trị thay đổi
    }, [consumptionLimit, totalAmount]);

    function getTodayTransactions(transactions) {
        const currentDate = new Date();
        const currentDay = currentDate.toLocaleDateString();

        // Lọc các giao dịch theo ngày hiện tại
        const filteredByDay = transactions.filter(transaction => {
            // Kiểm tra nếu transaction.date trùng với ngày hiện tại
            return transaction.date === currentDay;
        });

        // Tính toán tổng số tiền và số lần giao dịch
        const totalAmount = filteredByDay.reduce((total, transaction) => total + transaction.amount, 0);
        const totalTransactions = filteredByDay.length;

        return { currentDay, filteredByDay, totalAmount, totalTransactions };
    }

    const handleDeleteItemRedux = (index) => {
        setSelectedItemIndex(index); // Lưu index của mục dữ liệu cần xoá vào state
        showAlert(); // Hiển thị cửa sổ cảnh báo trước khi xoá
    };

    const showAlert = () => {
        Alert.alert(
            "Bạn có chắc chắn muốn xoá?",
            "Nội dung sau khi xoá sẽ không thể khôi phục !",
            [
                {
                    text: "Hủy",
                    onPress: () => setSelectedItemIndex(null), // Hủy bỏ việc xoá
                    style: "cancel"
                },
                {
                    text: "Xoá",
                    onPress: () => {
                        dispatch(deleteTransaction(selectedItemIndex)); // Xoá mục dữ liệu khi người dùng xác nhận
                        setSelectedItemIndex(null);
                    }
                }
            ],
            { cancelable: false }
        );
    };

    const goToSetLimitScreen = () => {
        navigation.navigate('SetConsumptionLimitScreen');
    };

    // Hàm để kiểm tra hạn mức và hiển thị cảnh báo 
    const checkConsumptionLimit = () => {
        if (consumptionLimit !== null && totalAmount > consumptionLimit) {
            const exceededAmount = totalAmount - consumptionLimit;
            Alert.alert(
                "Cảnh Báo",
                `Chi tiêu trong ngày vượt quá hạn mức ${exceededAmount.toLocaleString()} ₫!`,
                [{ text: "OK", style: "cancel" }]
            );
            return(
                <View>
                    <Text>
                        hello
                    </Text>
                </View>
            )
        }
    };
    
    return (
        <View style={AppStyle.AmountDayScreenStyle.container}>
            <TabView />
            <TouchableOpacity
                onPress={() => navigation.goBack('')}
            >
                <Image
                    source={icons.GoBackButtomIcon}
                    style={AppStyle.AmountDayScreenStyle.goBackIcon}
                    tintColor={"#626bf0"}
                />
            </TouchableOpacity>
            <LinearGradient
                colors={['#df6ce6', '#9d6beb', '#626bf0']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={AppStyle.AmountDayScreenStyle.TotalAmountView}>
                <View style={AppStyle.AmountDayScreenStyle.TotalAmountFlex}>
                    <View style={AppStyle.AmountDayScreenStyle.TotalAmountTitleView}>
                        <Text style={AppStyle.AmountDayScreenStyle.TotalAmountTitleStyle}>
                            Thống kê ngày: {currentDay}
                        </Text>
                    </View>
                    <View style={AppStyle.AmountDayScreenStyle.TotalAmountInfoView}>
                        <Text
                            style={AppStyle.AmountDayScreenStyle.TotalAmountInfoTextStyle}
                        >{totalAmount.toLocaleString()}
                            <Text
                                style={{ fontSize: 25 }}
                            > ₫</Text>
                        </Text>

                        <Text
                            style={AppStyle.AmountDayScreenStyle.consumptionLimitText}>
                            (Hạn mức: {consumptionLimit !== null ? consumptionLimit.toLocaleString() + "₫" : 'Chưa đặt hạn mức'})
                        </Text>
                    </View>
                    <View style={AppStyle.AmountDayScreenStyle.TotalAmountDateView}>
                        <View style={AppStyle.AmountDayScreenStyle.consumptionLimitView}>
                            <TouchableOpacity
                                onPress={goToSetLimitScreen}
                                style={AppStyle.AmountDayScreenStyle.consumptionLimitButtomView}
                            >
                                <Image
                                    source={icons.SetMoney}
                                    style={AppStyle.AmountDayScreenStyle.consumptionLimitIconView}
                                    tintColor={"#FFF"}
                                />
                                <Text
                                    style={AppStyle.AmountDayScreenStyle.consumptionLimitText}>
                                    Đặt lại hạn mức
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{
                            flex: 1,
                            alignItems: "flex-end",
                            marginBottom: 5
                        }}>
                            <Text
                                style={AppStyle.AmountDayScreenStyle.TotalAmountInfoTransactionsTextStyle}
                            >{totalTransactions} giao dịch</Text>
                        </View>

                    </View>
                </View>
            </LinearGradient>

            <View style={AppStyle.AmountDayScreenStyle.listDayTitleView}>
                <Text
                    style={AppStyle.AmountDayScreenStyle.listDayTitleStyle}
                >
                    Danh sách giao dịch
                </Text>
            </View>
            <ScrollView>
                {filteredByDay.length > 0 ? (
                    filteredByDay.map((transaction, index) => (
                        <View style={AppStyle.AmountDayScreenStyle.listDayInfoView} key={index}>
                            <View style={AppStyle.AmountDayScreenStyle.listDayInfoFlex}>
                                <View style={AppStyle.AmountDayScreenStyle.marginDayInfo}>

                                </View>
                                <View style={AppStyle.AmountDayScreenStyle.listDayInfoBody}>
                                    <Text
                                        style={AppStyle.AmountDayScreenStyle.listDayInfoTextAmountStyle}
                                    >{transaction.amount.toLocaleString()}
                                        <Text
                                            style={{ fontSize: 17 }}
                                        > ₫</Text>
                                    </Text>
                                    <Text
                                        style={AppStyle.AmountDayScreenStyle.listDayInfoTextDescriptionStyle}
                                    >Mô tả: {transaction.description}</Text>
                                </View>
                                <TouchableOpacity
                                    onPress={handleDeleteItemRedux}
                                    style={AppStyle.AmountDayScreenStyle.deleteButtomView}>
                                    <Text
                                        style={AppStyle.AmountDayScreenStyle.deleteButtomTextStyle}>
                                        Xoá
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))
                ) : (
                    <View style={AppStyle.AmountDayScreenStyle.noTransactionsView}>
                        <Text
                            style={AppStyle.AmountDayScreenStyle.noTransactionsText}
                        >
                            Không có giao dịch nào trong ngày hôm nay
                        </Text>
                    </View>
                )}
            </ScrollView>
        </View>
    );
}
