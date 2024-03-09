import { StyleSheet, Dimensions } from 'react-native';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

const SelectMapScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f7eef9"
    },
    calendarView: {
        flex: 1,
    },
    noteView: {
        flex: 1,
    },
    modalView: {
        backgroundColor: "#fef7ff",
        flex: 1
    },
    modalBodyView: {
        backgroundColor: "#fef7ff",
        flex: 1
    },

    tabView: {
        height: 100,
        backgroundColor: "#8985f0",
        flexDirection: "row",
    },
    goButtomView: {
        flex: 1,
        justifyContent: "flex-end",
    },
    goButtomIcon: {
        height: 30,
        width: 30,
        tintColor: "#FFF",
        margin: 10
    },
    titleView: {
        flex: 9,
        justifyContent: "flex-end",
    },
    titleStyle: {
        fontSize: 23,
        paddingLeft: 20,
        fontWeight: "500",
        color: "#FFF"
    },
    titleDateStyle: {
        fontSize: 15,
        paddingLeft: 20,
        fontWeight: "300",
        color: "#FFF",
        marginBottom: 5
    },
    evenView: {
        padding: 5,
        margin: 5,
        borderRadius: 10
    },
    textInputNoteView: {
        borderWidth: 1,
        borderColor: "#aa81e1",
        borderRadius: 10,
        padding: 5,
        margin: 5,
        fontSize: 20,
        height: 100,
    },
    textInputTimeView: {
        borderWidth: 1,
        borderColor: "#aa81e1",
        borderRadius: 10,
        padding: 5,
        margin: 5,
        fontSize: 20,
        marginTop: 10
    },
    evenTextNoteStyle: {
        fontSize: 18,
        fontWeight: "400",
        color: "#21344d"
    },
    evenTextTimeStyle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#c76473"
    },
    deleteAllEven: {
        color: "#FFF",
        fontSize: 19,
        fontWeight : "500",
        padding: 5,
        paddingLeft: 10,
        paddingEnd: 10
    },
    saveEvenText: {
        color: "#FFF",
        fontSize: 19,
        fontWeight : "500",
        padding: 5,
        paddingLeft: 10,
        paddingEnd: 10
    },
    evenButtomView: {
        flexDirection: "row",
        justifyContent: "space-between",
    }
})

export default SelectMapScreenStyle