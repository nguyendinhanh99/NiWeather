import React, { useState } from "react";
import {
    View,
    Text,
    Modal,
    TextInput,
    Button,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    Image
} from "react-native";
import { Calendar } from "react-native-calendars";
import AppStyle from "../theme";
import { useNavigation } from "@react-navigation/native";
import TabView from "../constants/tabView";
import moment from "moment";

import icons from "../assest/icon";
export default function SelectMapScreen() {
    const [markedDates, setMarkedDates] = useState({});
    const [selectedDate, setSelectedDate] = useState(null);
    const [eventModalVisible, setEventModalVisible] = useState(false);
    const [eventText, setEventText] = useState("");
    const [eventTime, setEventTime] = useState("");
    const Width = Dimensions.get('window').width;
    const navigation = useNavigation();

    // Mảng chứa tên các tháng
    const monthNames = [
        "Tháng 1",
        "Tháng 2",
        "Tháng 3",
        "Tháng 4",
        "Tháng 5",
        "Tháng 6",
        "Tháng 7",
        "Tháng 8",
        "Tháng 9",
        "Tháng 10",
        "Tháng 11",
        "Tháng 12"
    ];

    const handleDayPress = (day) => {
        setSelectedDate(day.dateString);
        if (markedDates[day.dateString] && markedDates[day.dateString].event) {
            setEventText(markedDates[day.dateString].event.text);
            setEventTime(markedDates[day.dateString].event.text);
        } else {
            setEventText("");
            setEventTime("");
        }
        setEventModalVisible(true);
    };
    const saveEvent = () => {
        const updatedMarkedDates = { ...markedDates };

        // Kiểm tra xem đã có mảng sự kiện cho ngày đã chọn hay chưa
        if (updatedMarkedDates[selectedDate]) {
            // Nếu đã có, thêm sự kiện mới vào mảng sự kiện đó
            updatedMarkedDates[selectedDate] = {
                ...updatedMarkedDates[selectedDate],
                marked: true,
                events: [
                    ...(updatedMarkedDates[selectedDate].events || []),
                    { text: eventText, time: eventTime }, // Lưu cả thông tin sự kiện và thời gian
                ],
            };
        } else {
            // Nếu chưa có, tạo một mảng mới chứa sự kiện mới
            updatedMarkedDates[selectedDate] = {
                selected: true,
                marked: true,
                events: [{ text: eventText, time: eventTime }], // Lưu cả thông tin sự kiện và thời gian
            };
        }

        setMarkedDates(updatedMarkedDates);

        setEventModalVisible(false);
        setSelectedDate(null);
        setEventText("");
        setEventTime("");
    };



    const removeEvent = () => {
        const updatedMarkedDates = { ...markedDates };

        // Xoá mảng sự kiện của ngày đã chọn
        delete updatedMarkedDates[selectedDate].events;

        // Kiểm tra nếu không còn sự kiện nào, thì xoá các thuộc tính marked và selected để trả về trạng thái ban đầu
        if (!updatedMarkedDates[selectedDate].events) {
            delete updatedMarkedDates[selectedDate].marked;
            delete updatedMarkedDates[selectedDate].selected;
        }

        setMarkedDates(updatedMarkedDates);
        setEventModalVisible(false);
        setSelectedDate(null);
        setEventText("");
        setEventTime("");
    };

    const eventColors = ["#e2d4f1", "#FFE4E1"];
    const eventBorderColors = ["#a16beb", "#FFCC99"];

    return (
        <View style={AppStyle.SelectMapScreenStyle.container}>
            <View style={AppStyle.SelectMapScreenStyle.calendarView}>
                <Calendar
                    onDayPress={handleDayPress}
                    markedDates={markedDates}
                    theme={{
                        dayTextColor: "gray",
                        calendarBackground: "#fef7ff",
                        todayTextColor: "#5e6bf0",
                        textSectionTitleColor: "blue",
                        monthTextColor: "red",
                        textMonthFontSize: 18
                    }}
                    monthFormat={'MM'} // Hiển thị tháng dưới dạng số
                    renderHeader={(date) => (
                        <Text style={{ textAlign: 'center', padding: 10, color: "red", fontWeight: "500", fontSize: 20 }}>
                            {monthNames[date.getMonth()]} năm {date.getFullYear()}
                        </Text>
                    )}
                    style={{
                        width: Width - 10,
                        marginTop: 50,
                        backgroundColor: "#e4d6f0",
                        padding: 10,
                        borderRadius: 10,
                        marginLeft: 5,
                        marginEnd: 5
                    }}
                />
                <Modal
                    visible={eventModalVisible}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={() => setEventModalVisible(false)}
                >
                    <View style={AppStyle.SelectMapScreenStyle.modalView}>
                        <View style={AppStyle.SelectMapScreenStyle.tabView}>
                            <View style={AppStyle.SelectMapScreenStyle.goButtomView}>
                                <TouchableOpacity
                                    onPress={() => setEventModalVisible(false)} // Đặt eventModalVisible thành false khi button được nhấn

                                >
                                    <Image
                                        source={icons.GoBackButtomIcon}
                                        style={AppStyle.SelectMapScreenStyle.goButtomIcon}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={AppStyle.SelectMapScreenStyle.titleView}>
                                <Text style={AppStyle.SelectMapScreenStyle.titleStyle}>
                                    {selectedDate ? moment(selectedDate).format('DD-MM-YYYY') : ''}
                                </Text>
                                <Text style={AppStyle.SelectMapScreenStyle.titleDateStyle}>
                                    Sự kiện trong ngày
                                </Text>
                            </View>
                        </View>

                        <ScrollView>
                            <View style={AppStyle.SelectMapScreenStyle.modalBodyView}>


                                <View >
                                    <TextInput
                                        placeholder="Thời gian"
                                        value={eventTime}
                                        onChangeText={(time) => setEventTime(time)}
                                        style={AppStyle.SelectMapScreenStyle.textInputTimeView}
                                    />
                                    <TextInput
                                        placeholder="Thông tin sự kiện"
                                        value={eventText}
                                        onChangeText={(text) => setEventText(text)}
                                        style={[AppStyle.SelectMapScreenStyle.textInputNoteView, { textAlignVertical: 'top' }]} // textAlignVertical: 'top' để cho phép text input tự động xuống hàng
                                        multiline={true} // Cho phép nhập nhiều dòng
                                        numberOfLines={4} // Số dòng tối đa hiển thị trước khi xuống dòng
                                    />


                                </View>

                                <View
                                    style={AppStyle.SelectMapScreenStyle.evenButtomView}>
                                    <TouchableOpacity
                                        onPress={saveEvent}
                                        style={{
                                            backgroundColor: "#8985f0",
                                            borderRadius: 20,
                                            margin: 5,
                                            marginLeft: 15
                                        }}
                                    >
                                        <Text
                                            style={AppStyle.SelectMapScreenStyle.saveEvenText}
                                        >
                                            Lưu
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={removeEvent}
                                        style={{
                                            backgroundColor: "#fc7a75",
                                            borderRadius: 20,
                                            margin: 5,
                                            marginEnd: 15
                                        }}
                                    >
                                        <Text
                                            style={AppStyle.SelectMapScreenStyle.deleteAllEven}
                                        >
                                            Xoá
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                                {markedDates[selectedDate] && markedDates[selectedDate].events && markedDates[selectedDate].events.map((event, index) => (
                                    <View style={[AppStyle.SelectMapScreenStyle.evenView, { backgroundColor: eventColors[index % eventColors.length], borderColor: eventBorderColors[index % eventColors.length], borderWidth: 1 }]} key={index}>
                                        <Text
                                            style={AppStyle.SelectMapScreenStyle.evenTextTimeStyle}
                                        >
                                            {event.time}
                                        </Text>
                                        <Text
                                            style={AppStyle.SelectMapScreenStyle.evenTextNoteStyle}
                                        >
                                            {event.text}
                                        </Text>
                                    </View>
                                ))}
                            </View>
                        </ScrollView>
                    </View>

                </Modal>
            </View>
            <View style={AppStyle.SelectMapScreenStyle.noteView}>


            </View>

        </View>
    );
}
