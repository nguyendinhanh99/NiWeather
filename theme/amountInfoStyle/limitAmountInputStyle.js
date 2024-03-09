import { StyleSheet, Dimensions, View } from 'react-native';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

const LimitAmountInputStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f7eef9",
        alignItems: "center"
    },
    textInputLimitAmount: {
        height: 50,
        width: Width-20,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "#636bf0",
        fontSize: 25,
        margin: 5,
        padding: 10
    },
    titleView : {
        height: 100,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 150
    },
    titleTextStyle : {
        fontSize: 30,
        fontWeight: "600",
        color:  "#636bf0"
    },
    titleTextScripStyle : {
        fontSize: 18,
        fontWeight: "300",
        padding: 5,
        marginTop: 5
    },
    saveButtomView : {
        height: 50,
        width: Width-20,
        backgroundColor: "#636bf0",
        marginTop: 25,
        borderRadius: 25,
        justifyContent: "center",
        alignItems : "center"
    },
    saveButtomText: {
        fontSize: 20,
        fontWeight: "500",
        color: "#FFF"
    }
})

export default LimitAmountInputStyle