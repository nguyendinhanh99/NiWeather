import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Image,
    Alert
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { deleteTransaction } from '../../redux/slices/transactionSlice.js';
import AppStyle from '../../theme';
import icons from '../../assest/icon';
import TabView from '../../constants/tabView';
import LinearGradient from 'react-native-linear-gradient';

export default function AmountMonthScreen() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const transactions = useSelector((state) => state.transactions.list);
    const consumptionLimitMonth = useSelector((state) => state.transactions.consumptionLimitMonth); // Lấy giá trị hạn mức từ Redux store
    const {filteredByMonth, totalAmount, totalTransactions } = getMonthTransactions(transactions);
    const [selectedItemIndex, setSelectedItemIndex] = useState(null);

    useEffect(() => {
        checkConsumptionLimitMonth(); // Kiểm tra hạn mức khi component được tạo ra hoặc khi giá trị thay đổi
    }, [consumptionLimitMonth, totalAmount]);

    function getMonthTransactions(transactions) {
        // Lấy ngày hiện tại
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1; // Lấy tháng hiện tại (từ 1 đến 12)

        // Lọc các giao dịch theo tháng hiện tại
        const filteredByMonth = transactions.filter(transaction => {
            // Chuyển đổi ngày trong giao dịch thành định dạng "MM/YYYY"
            const transactionDateParts = transaction.date.split('/');
            const transactionMonth = parseInt(transactionDateParts[1]); // Lấy tháng trong giao dịch

            // Kiểm tra nếu transactionMonth trùng với tháng hiện tại
            return transactionMonth === currentMonth;
        });

        // Tính toán tổng số tiền và số lần giao dịch
        const totalAmount = filteredByMonth.reduce((total, transaction) => total + transaction.amount, 0);
        const totalTransactions = filteredByMonth.length;

        // Hiển thị thông tin ở Console
        console.log('Tháng hiện tại:', currentMonth);
        console.log('Danh sách giao dịch trong tháng:', filteredByMonth);
        console.log('Tổng số tiền trong tháng:', totalAmount);
        console.log('Tổng số giao dịch trong tháng:', totalTransactions);

        // Trả về cả giá trị currentMonth và các thông tin khác
        return { currentMonth, filteredByMonth, totalAmount, totalTransactions };
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

    const goToSetLimitMonthScreen = () => {
        navigation.navigate('SetConsumptionLimitMonthScreen');
    };

    // Hàm để kiểm tra hạn mức và hiển thị cảnh báo 
    const checkConsumptionLimitMonth = () => {
        if (consumptionLimitMonth !== null && totalAmount > consumptionLimitMonth) {
            const exceededAmount = totalAmount - consumptionLimitMonth;
            Alert.alert(
                "Cảnh Báo",
                `Chi tiêu trong ngày vượt quá hạn mức ${exceededAmount.toLocaleString()} ₫!`,
                [{ text: "OK", style: "cancel" }]
            );
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
                            Thống kê tháng {getMonthTransactions(transactions).currentMonth}
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
                            (Hạn mức: {consumptionLimitMonth !== null ? consumptionLimitMonth.toLocaleString() + "₫" : 'Chưa đặt hạn mức'})
                        </Text>
                    </View>
                    <View style={AppStyle.AmountDayScreenStyle.TotalAmountDateView}>
                        <View style={AppStyle.AmountDayScreenStyle.consumptionLimitView}>
                            <TouchableOpacity
                                onPress={goToSetLimitMonthScreen}
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
                {filteredByMonth.length > 0 ? (
                    filteredByMonth.map((transaction, index) => (
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
