import { StyleSheet, Dimensions } from 'react-native';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;


const WellcomeAppStyle = StyleSheet.create({
    linearGradient: {
        flex: 1,
    },
    container: {
        flex: 1
    },
    fadeView: {
        flex: 1
    },
    fadeBodyView: {
        flex: 1,
        backgroundColor: "#c397fb",
        justifyContent: "center",
        alignItems: "center"
    },
    loginButtomView: {
        flex: 3.5,
    },
    LogoStyle: {
        height: 150,
        width: 150,
    },
    loginButtomFlex: {
        justifyContent: "center",
        flex: 1,
        alignItems: "center"
    },
    buttomText: {
        fontSize: 25,
        color: "#FFF",
        fontWeight: "500"
    },
    loginButtomGoogle: {
        height: 50,
        backgroundColor: "#FFFF",
        margin: 15,
        borderRadius: 20,
        width: Width - 40,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
        flexDirection: "row"
    },
    logoGoogle: {
        height: 30,
        width: 30,
        marginEnd: 10
    },
    loginButtomGoogleText: {
        fontSize: 19,
        fontWeight: "600",
        color: "#585858"
    },
    appNameText: {
        fontSize: 40,
        fontWeight: "600",
        marginTop: 15,
        color: 'white', // Màu văn bản

    }
});



export default WellcomeAppStyle;
