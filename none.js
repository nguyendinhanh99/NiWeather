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