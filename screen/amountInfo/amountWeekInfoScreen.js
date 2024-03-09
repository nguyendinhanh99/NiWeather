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

export default function AmountWeekScreen() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const transactions = useSelector((state) => state.transactions.list);
    const consumptionLimitWeek = useSelector((state) => state.transactions.consumptionLimitWeek); // Lấy giá trị hạn mức từ Redux store
    const { startOfWeek, filteredByWeek, totalAmount, totalTransactions } = getThisWeekTransactions(transactions);
    const [selectedItemIndex, setSelectedItemIndex] = useState(null);

    useEffect(() => {
        checkConsumptionLimit(); // Kiểm tra hạn mức khi component được tạo ra hoặc khi giá trị thay đổi
    }, [consumptionLimitWeek, totalAmount]);

    function getThisWeekTransactions(transactions) {
        // Lấy ngày hiện tại
        const currentDate = new Date();
        // Lấy ngày đầu tiên của tuần (thứ 2) của tuần hiện tại
        const firstDayOfWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay() + (currentDate.getDay() === 0 ? -6 : 1));
        // Lấy ngày cuối cùng của tuần (Chủ nhật) của tuần hiện tại
        const lastDayOfWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), firstDayOfWeek.getDate() + 6);
    
        // Chuyển đổi ngày thành định dạng "DD/MM/YYYY"
        const formatDay = (date) => {
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            return `${day < 10 ? '0' : ''}${day}/${month < 10 ? '0' : ''}${month}/${year}`;
        };
    
        const formattedFirstDayOfWeek = formatDay(firstDayOfWeek);
        const formattedLastDayOfWeek = formatDay(lastDayOfWeek);
    
        // Lọc các giao dịch theo tuần từ danh sách transactions
        const filteredByWeek = transactions.filter(transaction => {
            // Chuyển đổi ngày trong giao dịch thành định dạng "DD/MM/YYYY"
            const transactionDateParts = transaction.date.split('/');
            const transactionDate = new Date(transactionDateParts[2], transactionDateParts[1] - 1, transactionDateParts[0]);
            const formattedTransactionDate = formatDay(transactionDate);
            // Kiểm tra nếu transactionDate nằm trong khoảng từ firstDayOfWeek đến lastDayOfWeek
            return formattedTransactionDate >= formattedFirstDayOfWeek && formattedTransactionDate <= formattedLastDayOfWeek;
        });
    
        // Tính toán tổng số tiền và số lần giao dịch
        const totalAmountWeek = filteredByWeek.reduce((total, transaction) => total + transaction.amount, 0);
        const totalTransactionsWeek = filteredByWeek.length;
    
        // In ra Console để kiểm tra giá trị của các biến
        console.log('First day of week:', formattedFirstDayOfWeek);
        console.log('Last day of week:', formattedLastDayOfWeek);
        console.log('Filtered transactions for the week:', filteredByWeek);
        console.log('Total amount for the week:', totalAmountWeek);
        console.log('Total transactions for the week:', totalTransactionsWeek);
    
        return { startOfWeek: firstDayOfWeek, filteredByWeek, totalAmount: totalAmountWeek, totalTransactions: totalTransactionsWeek };
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
        navigation.navigate('SetConsumptionLimitWeekScreen');
    };

    // Hàm để kiểm tra hạn mức và hiển thị cảnh báo 
    const checkConsumptionLimit = () => {
        if (consumptionLimitWeek !== null && totalAmount > consumptionLimitWeek) {
            const exceededAmount = totalAmount - consumptionLimitWeek;
            Alert.alert(
                "Cảnh Báo",
                `Chi tiêu trong tuần vượt quá hạn mức ${exceededAmount.toLocaleString()} ₫!`,
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
                            Thống kê tuần: {startOfWeek.toLocaleDateString()}
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
                            (Hạn mức: {consumptionLimitWeek !== null ? consumptionLimitWeek.toLocaleString() + "₫" : 'Chưa đặt hạn mức'})
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
                {filteredByWeek.length > 0 ? (
                    filteredByWeek.map((transaction, index) => (
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
                                    onPress={() => handleDeleteItemRedux(index)} // Fix lỗi: Thiếu hàm xử lý khi nhấn vào nút Xoá
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
                            Không có giao dịch nào trong tuần này
                        </Text>
                    </View>
                )}
            </ScrollView>
        </View>
    );
}
