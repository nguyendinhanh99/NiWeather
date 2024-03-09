import React, { useState } from 'react';
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
import { addTransaction, deleteTransaction } from '../redux/slices/transactionSlice';

import AppStyle from '../theme';
import icons from '../assest/icon';

import moment from 'moment';
import { useNavigation } from '@react-navigation/native';

export default function TransactionScreen() {
    const transactions = useSelector((state) => state.transactions.list);
    const dispatch = useDispatch();
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalAmountWeek, setTotalAmountWeek] = useState(0);
    const [totalAmountMonth, setTotalAmountMonth] = useState(0);
    const [totalAmountYear, setTotalAmountYear] = useState(0);
    const [totalTransactionsYear, setTotalTransactionsYear] = useState(0);
    const [totalTransactionsMonth, setTotalTransactionsMonth] = useState(0);
    const [totalTransactionsWeek, setTotalTransactionsWeek] = useState(0);
    const [totalTransactions, setTotalTransactions] = useState(0);
    const [showInfo, setShowInfo] = useState(false);
    const [showInfoWeek, setShowInfoWeek] = useState(false);
    const [showInfoMonth, setShowInfoMonth] = useState(false);
    const [showInfoYear, setShowInfoYear] = useState(false);
    const [selectedItemIndex, setSelectedItemIndex] = useState(null);
    const navigation = useNavigation();

    const handleAddTransaction = () => {
        if (amount && description) {
            const currentDate = new Date();
            const hours = currentDate.getHours();
            const minutes = currentDate.getMinutes();
            const formattedTime = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
            const newTransaction = {
                amount: parseFloat(amount),
                description,
                date: currentDate.toLocaleDateString(),
                time: formattedTime,
            };
            dispatch(addTransaction(newTransaction));
            setAmount('');
            setDescription('');
            console.log('New transaction added:', newTransaction); // In ra console
        } else {
            alert('Bạn chưa nhập thông tin chi tiêu');
        }
    };
    //console.log('Transactions data in Redux:', transactions); // In ra console
    const handleNavigationDay = () => {
        // Lấy ngày hiện tại
        const currentDate = new Date();
        const currentDay = currentDate.toLocaleDateString();
        console.log('First day of day:', currentDay);


        // Lọc các giao dịch theo ngày hiện tại
        const filteredByDay = transactions.filter(transaction => {
            // Kiểm tra nếu transaction.date trùng với ngày hiện tại
            return transaction.date === currentDay;
        });

        // Tính toán tổng số tiền và số lần giao dịch
        const totalAmount = filteredByDay.reduce((total, transaction) => total + transaction.amount, 0);
        const totalTransactions = filteredByDay.length;

        // Set state cho tổng số tiền và số lần giao dịch
        setTotalAmount(totalAmount);
        console.log('Total amount for the day:', totalAmount);
        setTotalTransactions(totalTransactions);
        console.log('Total transactions for the day:', totalTransactions);
    };
    const handleNavigationWeek = () => {
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

        // Set state cho tổng số tiền và số lần giao dịch
        setTotalAmountWeek(totalAmountWeek);
        setTotalTransactionsWeek(totalTransactionsWeek);

        // In ra console để kiểm tra giá trị của các biến
        console.log('First day of week:', formattedFirstDayOfWeek);
        console.log('Last day of week:', formattedLastDayOfWeek);
        console.log('Filtered transactions for the week:', filteredByWeek);
        console.log('Total amount for the week:', totalAmountWeek);
        console.log('Total transactions for the week:', totalTransactionsWeek);
    };
    const handleNavigationMonth = () => {
        // Lấy ngày hiện tại
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear(); // Năm hiện tại
        const currentMonth = currentDate.getMonth() + 1; // Tháng bắt đầu từ 0, cần cộng thêm 1 để chính xác về tháng
        console.log('Giao dịch tháng' + currentMonth + "/" + currentYear)
        // Thực hiện lọc các giao dịch theo tháng từ danh sách transactions
        const filteredByMonth = transactions.filter(transaction => {
            // Chuyển đổi ngày trong giao dịch thành đối tượng ngày
            const transactionDateParts = transaction.date.split('/');
            const transactionYear = parseInt(transactionDateParts[2]); // Lấy phần năm của ngày trong giao dịch
            const transactionMonth = parseInt(transactionDateParts[1]); // Lấy phần tháng của ngày trong giao dịch
            // Kiểm tra nếu transactionYear và transactionMonth trùng với currentYear và currentMonth
            return transactionYear === currentYear && transactionMonth === currentMonth;
        });

        // Tính toán tổng số tiền và số lần giao dịch
        const totalAmountMonth = filteredByMonth.reduce((total, transaction) => total + transaction.amount, 0);
        const totalTransactionsMonth = filteredByMonth.length;

        // Set state cho tổng số tiền và số lần giao dịch
        setTotalAmountMonth(totalAmountMonth);
        console.log('Giao dịch tháng này')
        console.log(totalAmountMonth)
        setTotalTransactionsMonth(totalTransactionsMonth);
        console.log(totalTransactionsMonth)
    };

    const handleNavigationYear = () => {
        // Lấy năm hiện tại
        const currentYear = moment().year();

        // Thực hiện lọc các giao dịch theo năm từ danh sách transactions
        const filteredByYear = transactions.filter(transaction => {
            // Chuyển đổi ngày trong giao dịch thành đối tượng moment
            const transactionDate = moment(transaction.date, 'DD/MM/YYYY');
            // Kiểm tra nếu transactionDate nằm trong năm hiện tại
            return transactionDate.year() === currentYear;
        });

        // Tính toán tổng số tiền và số lần giao dịch
        const totalAmountYear = filteredByYear.reduce((total, transaction) => total + transaction.amount, 0);
        const totalTransactionsYear = filteredByYear.length;

        // In ra thông tin
        console.log('Giao dịch năm ' + currentYear);
        console.log('Tổng số tiền giao dịch trong năm: ' + totalAmountYear);
        console.log('Tổng số giao dịch trong năm: ' + totalTransactionsYear);

        // Set state cho tổng số tiền và số lần giao dịch
        setTotalAmountYear(totalAmountYear);
        setTotalTransactionsYear(totalTransactionsYear);
    };
    const handleToggleInfo = () => {
        setShowInfo(!showInfo);
        handleNavigationDay();
    };
    const handleToggleInfoWeek = () => {
        setShowInfoWeek(!showInfoWeek);
        handleNavigationWeek();
    };

    const handleToggleInfoMonth = () => {
        setShowInfoMonth(!showInfoMonth);
        handleNavigationMonth();
    };
    const handleToggleInfoYear = () => {
        setShowInfoYear(!showInfoYear);
        handleNavigationYear();
    };

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


    const getRecentExpenses = (transactions, count) => {
        // Sắp xếp danh sách giao dịch theo ngày giảm dần
        const sortedTransactions = transactions.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateB - dateA;
        });

        // Lấy số lượng mục mong muốn từ danh sách đã sắp xếp
        const recentExpenses = sortedTransactions.slice(0, count);

        return recentExpenses;
    };
    const recentExpenses = getRecentExpenses(transactions, 15); // Lấy 5 chi tiêu gần nhất
    //console.log(recentExpenses);

    return (
        <View style={AppStyle.TransactionScreenStyle.container}>
            <ScrollView
            pagingEnabled={false}
            showsHorizontalScrollIndicator={false}
            >
                <View style={AppStyle.TransactionScreenStyle.inputView}>
                    <View
                        style={AppStyle.TransactionScreenStyle.tabView}
                    >
                        <Image
                            source={icons.MapIcon}
                            style={{
                                height: 30,
                                width: 30,
                                marginLeft: 15
                            }}
                            tintColor={"#606bf0"}
                        />
                        <Text
                            style={AppStyle.TransactionScreenStyle.titleTabStyle}
                        >
                            Quản lý chi tiêu
                        </Text>
                    </View>
                    <View style={AppStyle.TransactionScreenStyle.inputViewFlex}>
                        <TextInput
                            placeholder="Amount"
                            value={amount}
                            onChangeText={(text) => setAmount(text)}
                            keyboardType="numeric"
                            style={AppStyle.TransactionScreenStyle.textInputAmountStyle}
                        />
                        <TextInput
                            placeholder="Description"
                            value={description}
                            onChangeText={(text) => setDescription(text)}
                            style={AppStyle.TransactionScreenStyle.textInputDescriptionStyle}
                            multiline={true} // Cho phép nhập nhiều dòng
                            numberOfLines={4} // Số dòng tối đa hiển thị trước khi xuống dòng
                        />
                        <TouchableOpacity
                            onPress={handleAddTransaction}
                            style={AppStyle.TransactionScreenStyle.addTransactionButtom}
                        >
                            <Text style={AppStyle.TransactionScreenStyle.addTransactionButtomText}>
                                Thêm
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View
                    style={{
                        marginTop: 15
                    }}
                >
                    <Text style={{
                        fontSize: 23,
                        fontWeight: "500",
                        paddingLeft: 10
                    }}>
                        Thống kê chi tiêu
                    </Text>
                </View>
                <View
                    style={AppStyle.TransactionScreenStyle.utilitiesView}
                >
                    <View style={AppStyle.TransactionScreenStyle.utilitiesButtomView}>
                        <View style={AppStyle.TransactionScreenStyle.utilitiesButtomChildView}>
                            <View style={AppStyle.TransactionScreenStyle.utilitiesButtomTitle}>
                                <Image
                                    source={icons.DayIcon}
                                    style={AppStyle.TransactionScreenStyle.utilitiesButtomInfoIconStyle}
                                />
                                <Text style={AppStyle.TransactionScreenStyle.utilitiesButtomTitleStyle}>
                                    Ngày
                                </Text>
                            </View>
                            <View style={AppStyle.TransactionScreenStyle.utilitiesButtomInfo}>
                                <View style={AppStyle.TransactionScreenStyle.utilitiesButtomInfoTextView}>

                                    <View style={AppStyle.TransactionScreenStyle.utilitiesButtomInfoTextView}>
                                        {showInfo ? (
                                            <>
                                                <Text style={AppStyle.TransactionScreenStyle.utilitiesButtomInfoTextStyle}>
                                                    Tổng: {totalAmount}
                                                </Text>
                                                <Text style={AppStyle.TransactionScreenStyle.utilitiesButtomInfoTextStyle}>
                                                    (VND)
                                                </Text>
                                                <Text style={AppStyle.TransactionScreenStyle.utilitiesButtomInfoTextStyle}>
                                                    Số giao dịch: {totalTransactions}
                                                </Text>
                                            </>
                                        ) : (
                                            <>
                                                <Text style={AppStyle.TransactionScreenStyle.utilitiesButtomInfoTextStyle}>
                                                    Tổng: ẩn (VND)
                                                </Text>
                                                <Text style={AppStyle.TransactionScreenStyle.utilitiesButtomInfoTextStyle}>
                                                    Số giao dịch: ẩn
                                                </Text>
                                            </>
                                        )}
                                    </View>


                                </View>
                            </View>

                            <View style={AppStyle.TransactionScreenStyle.utilitiesButtomSee}>
                                <TouchableOpacity
                                    onPress={handleToggleInfo}>
                                    <Image
                                        source={showInfo ? icons.HideIcon : icons.ShowIcon} // Chọn icon dựa vào trạng thái hiển thị
                                        style={AppStyle.TransactionScreenStyle.expandIconStyle}
                                        tintColor={"#5e6bf0"}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('AmountDay')}
                                >
                                    <Text style={AppStyle.TransactionScreenStyle.utilitiesButtomSeeTextStyle}>Xem chi tiết</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={AppStyle.TransactionScreenStyle.utilitiesButtomChildView}>
                            <View style={AppStyle.TransactionScreenStyle.utilitiesButtomTitle}>
                                <Image
                                    source={icons.WeekIcon}
                                    style={AppStyle.TransactionScreenStyle.utilitiesButtomInfoIconStyle}
                                />
                                <Text style={AppStyle.TransactionScreenStyle.utilitiesButtomTitleStyle}>
                                    Tuần
                                </Text>
                            </View>
                            <View style={AppStyle.TransactionScreenStyle.utilitiesButtomInfo}>
                                <View style={AppStyle.TransactionScreenStyle.utilitiesButtomInfoTextView}>
                                    {showInfoWeek ? (
                                        <>
                                            <Text style={AppStyle.TransactionScreenStyle.utilitiesButtomInfoTextStyle}>
                                                Tổng: {totalAmountWeek}
                                            </Text>
                                            <Text style={AppStyle.TransactionScreenStyle.utilitiesButtomInfoTextStyle}>
                                                (VND)
                                            </Text>
                                            <Text style={AppStyle.TransactionScreenStyle.utilitiesButtomInfoTextStyle}>
                                                Số giao dịch: {totalTransactionsWeek}
                                            </Text>
                                        </>
                                    ) : (
                                        <>
                                            <Text style={AppStyle.TransactionScreenStyle.utilitiesButtomInfoTextStyle}>
                                                Tổng: ẩn (VND)
                                            </Text>
                                            <Text style={AppStyle.TransactionScreenStyle.utilitiesButtomInfoTextStyle}>
                                                Số giao dịch: ẩn
                                            </Text>
                                        </>
                                    )}
                                </View>

                            </View>


                            <View style={AppStyle.TransactionScreenStyle.utilitiesButtomSee}>
                                <TouchableOpacity
                                    onPress={handleToggleInfoWeek}>
                                    <Image
                                        source={showInfoWeek ? icons.HideIcon : icons.ShowIcon} // Chọn icon dựa vào trạng thái hiển thị
                                        style={AppStyle.TransactionScreenStyle.expandIconStyle}
                                        tintColor={"#5e6bf0"}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('AmountWeek')}
                                >
                                    <Text style={AppStyle.TransactionScreenStyle.utilitiesButtomSeeTextStyle}>Xem chi tiết</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <View style={AppStyle.TransactionScreenStyle.utilitiesButtomView}>
                        <View style={AppStyle.TransactionScreenStyle.utilitiesButtomChildView}>
                            <View style={AppStyle.TransactionScreenStyle.utilitiesButtomTitle}>
                                <Image
                                    source={icons.MonthIcon}
                                    style={AppStyle.TransactionScreenStyle.utilitiesButtomInfoIconStyle}
                                />
                                <Text style={AppStyle.TransactionScreenStyle.utilitiesButtomTitleStyle}>
                                    Tháng
                                </Text>
                            </View>
                            <View style={AppStyle.TransactionScreenStyle.utilitiesButtomInfo}>
                                <View style={AppStyle.TransactionScreenStyle.utilitiesButtomInfoTextView}>

                                    <View style={AppStyle.TransactionScreenStyle.utilitiesButtomInfoTextView}>
                                        {showInfoMonth ? (
                                            <>
                                                <Text style={AppStyle.TransactionScreenStyle.utilitiesButtomInfoTextStyle}>
                                                    Tổng: {totalAmountMonth}
                                                </Text>
                                                <Text style={AppStyle.TransactionScreenStyle.utilitiesButtomInfoTextStyle}>
                                                    (VND)
                                                </Text>
                                                <Text style={AppStyle.TransactionScreenStyle.utilitiesButtomInfoTextStyle}>
                                                    Số giao dịch: {totalTransactionsMonth}
                                                </Text>
                                            </>
                                        ) : (
                                            <>
                                                <Text style={AppStyle.TransactionScreenStyle.utilitiesButtomInfoTextStyle}>
                                                    Tổng: ẩn (VND)
                                                </Text>
                                                <Text style={AppStyle.TransactionScreenStyle.utilitiesButtomInfoTextStyle}>
                                                    Số giao dịch: ẩn
                                                </Text>
                                            </>
                                        )}
                                    </View>


                                </View>
                            </View>

                            <View style={AppStyle.TransactionScreenStyle.utilitiesButtomSee}>
                                <TouchableOpacity
                                    onPress={handleToggleInfoMonth}>
                                    <Image
                                        source={showInfoMonth ? icons.HideIcon : icons.ShowIcon} // Chọn icon dựa vào trạng thái hiển thị
                                        style={AppStyle.TransactionScreenStyle.expandIconStyle}
                                        tintColor={"#5e6bf0"}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('AmountMonth')}
                                >
                                    <Text style={AppStyle.TransactionScreenStyle.utilitiesButtomSeeTextStyle}>Xem chi tiết</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={AppStyle.TransactionScreenStyle.utilitiesButtomChildView}>
                            <View style={AppStyle.TransactionScreenStyle.utilitiesButtomTitle}>
                                <Image
                                    source={icons.YearIcon}
                                    style={AppStyle.TransactionScreenStyle.utilitiesButtomInfoIconStyle}
                                />
                                <Text style={AppStyle.TransactionScreenStyle.utilitiesButtomTitleStyle}>
                                    Năm
                                </Text>
                            </View>
                            <View style={AppStyle.TransactionScreenStyle.utilitiesButtomInfo}>
                                <View style={AppStyle.TransactionScreenStyle.utilitiesButtomInfoTextView}>
                                    {showInfoYear ? (
                                        <>
                                            <Text style={AppStyle.TransactionScreenStyle.utilitiesButtomInfoTextStyle}>
                                                Tổng: {totalAmountYear}
                                            </Text>
                                            <Text style={AppStyle.TransactionScreenStyle.utilitiesButtomInfoTextStyle}>
                                                (VND)
                                            </Text>
                                            <Text style={AppStyle.TransactionScreenStyle.utilitiesButtomInfoTextStyle}>
                                                Số giao dịch: {totalTransactionsYear}
                                            </Text>
                                        </>
                                    ) : (
                                        <>
                                            <Text style={AppStyle.TransactionScreenStyle.utilitiesButtomInfoTextStyle}>
                                                Tổng: ẩn (VND)
                                            </Text>
                                            <Text style={AppStyle.TransactionScreenStyle.utilitiesButtomInfoTextStyle}>
                                                Số giao dịch: ẩn
                                            </Text>
                                        </>
                                    )}
                                </View>

                            </View>


                            <View style={AppStyle.TransactionScreenStyle.utilitiesButtomSee}>
                                <TouchableOpacity
                                    onPress={handleToggleInfoYear}>
                                    <Image
                                        source={showInfoYear ? icons.HideIcon : icons.ShowIcon} // Chọn icon dựa vào trạng thái hiển thị
                                        style={AppStyle.TransactionScreenStyle.expandIconStyle}
                                        tintColor={"#5e6bf0"}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('AmountYear')}
                                >
                                    <Text style={AppStyle.TransactionScreenStyle.utilitiesButtomSeeTextStyle}>Xem chi tiết</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={{ marginTop: 15 }}>
                    <Text style={{ fontSize: 23, fontWeight: "500", paddingLeft: 10 }}>
                        Danh sách chi tiêu gần đây
                    </Text>
                </View>
                <View style={AppStyle.TransactionScreenStyle.recentExpensesView}>
                    {recentExpenses.map((expense, index) => (
                        <View key={index} style={AppStyle.TransactionScreenStyle.recentExpensesItemView}>
                            <View
                                style={AppStyle.TransactionScreenStyle.leftBackGroundView}
                            >

                            </View>
                            <View
                                style={AppStyle.TransactionScreenStyle.recentExpensesInfoView}
                            >
                                <View
                                    style={AppStyle.TransactionScreenStyle.recentExpensesInfoFlex}
                                >
                                    <View
                                        style={AppStyle.TransactionScreenStyle.recentExpensesInfoAmountView}
                                    >
                                        <View 
                                        style = {{
                                            flex : 1
                                        }}
                                        >
                                            <Text
                                                style={AppStyle.TransactionScreenStyle.recentExpensesInfoAmountTextStyle}
                                            > $ {expense.amount} VND</Text>
                                        </View>
                                        <TouchableOpacity
                                            style={{
                                                justifyContent: "flex-end"
                                            }}
                                            onPress={() => handleDeleteItemRedux(index)} // Truyền index vào hàm handleDeleteItemRedux
                                            >
                                            <Text 
                                            style = {AppStyle.TransactionScreenStyle.deleteButtomText}
                                            >
                                                Xoá
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View
                                        style={AppStyle.TransactionScreenStyle.recentExpensesInfoDescriptionView}
                                    >
                                        <Text
                                            style={AppStyle.TransactionScreenStyle.recentExpensesInfoTextStyle}
                                        >Nội dung: {expense.description}</Text>
                                    </View>
                                    <View
                                        style={AppStyle.TransactionScreenStyle.recentExpensesInfoDateView}
                                    >
                                        <Text
                                            style={AppStyle.TransactionScreenStyle.recentExpensesInfoDateTextStyle}
                                        >{expense.date}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>

            </ScrollView>
        </View>
    );
}
