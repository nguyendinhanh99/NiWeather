import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";

export default function NoteCalendarScreen({ route, navigation }) {
    const { selectedDate, markedDates, setMarkedDates } = route.params;
    const [eventText, setEventText] = useState("");


    const saveEvent = () => {
        const updatedMarkedDates = { ...markedDates };

        updatedMarkedDates[selectedDate] = {
            selected: true,
            marked: true,
            event: { text: eventText },
        };

        setMarkedDates(updatedMarkedDates);

        navigation.goBack(); // Điều hướng quay lại màn hình trước đó
    };

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>Nhập thông tin sự kiện cho ngày {selectedDate}</Text>
            <TextInput
                placeholder="Nhập thông tin sự kiện"
                value={eventText}
                onChangeText={(text) => setEventText(text)}
                style={{ marginTop: 10, marginBottom: 10, borderWidth: 1, borderColor: "gray", borderRadius: 5, padding: 5, width: "80%" }}
            />
            <Text>
               dddd{eventText}
            </Text>
            <Button title="Lưu" onPress={saveEvent} />
        </View>
    );
}
