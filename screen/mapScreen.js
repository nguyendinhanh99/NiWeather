import React, { useState } from 'react';
import { Text, View, TextInput, Button, FlatList } from 'react-native';

export default function FinanceManagerScreen() {
    const [transactions, setTransactions] = useState([]);
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');

    const addTransaction = () => {
        if (amount && description) {
            const currentDate = new Date();
            const hours = currentDate.getHours(); // Lấy giờ
            const minutes = currentDate.getMinutes(); // Lấy phút
            const formattedTime = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`; // Định dạng giờ và phút
            const newTransaction = {
                amount: parseFloat(amount),
                description,
                date: currentDate.toLocaleDateString(), // Ngày tháng năm
                time: formattedTime, // Kết hợp giờ và phút
            };
            setTransactions([...transactions, newTransaction]);
            setAmount('');
            setDescription('');
        } else {
            alert('Please enter both amount and description.');
        }
    };

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <Text style={{ fontSize: 24, marginBottom: 10 }}>Quản lý chi tiêu</Text>
            <View style={{ marginBottom: 20 }}>
                <TextInput
                    placeholder="Amount"
                    value={amount}
                    onChangeText={(text) => setAmount(text)}
                    keyboardType="numeric"
                    style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10 }}
                />
                <TextInput
                    placeholder="Description"
                    value={description}
                    onChangeText={(text) => setDescription(text)}
                    style={{ borderWidth: 1, borderColor: '#ccc', padding: 10 }}
                />
                <Button title="Tạo đơn chi tiêu" onPress={addTransaction} />
            </View>
            <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 20, marginBottom: 10 }}>Danh sách chi tiêu</Text>
                <FlatList
                    data={transactions}
                    renderItem={({ item }) => (
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                            <View>
                                <Text>{item.description}</Text>
                                <Text>{item.time} {item.date}</Text>
                            </View>
                            <Text>{item.amount}</Text>
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        </View>
    );
}
