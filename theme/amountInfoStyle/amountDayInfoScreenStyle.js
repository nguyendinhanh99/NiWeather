import { StyleSheet, Dimensions, View } from 'react-native';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

const AmountDayScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f7eef9"
    },
    TotalAmountView: {
        height: 200,
        backgroundColor: "#606bf0",
        margin: 5,
        borderRadius: 20,
        shadowColor: "#606bf0",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.7,
        shadowRadius: 3,
        elevation: 5,
    },
    goBackIcon: {
        height: 25,
        width: 25,
        marginLeft: 10
    },
    TotalAmountFlex: {
        flex: 1
    },
    TotalAmountTitleView: {
        flex: 3,
        justifyContent: "center"
    },
    TotalAmountInfoView: {
        flex: 7,
        alignItems: "center",
        justifyContent: "center"
    },
    TotalAmountDateView: {
        flex: 2,
        justifyContent: "center",
        alignItems: "flex-end",
        marginEnd: 20,
        flexDirection: "row"
    },
    dayIconStyle: {
        height: 30,
        width: 30
    },
    TotalAmountTitleStyle: {
        fontSize: 20,
        color: "#FFF",
        marginLeft: 20
    },
    TotalAmountInfoTextStyle: {
        fontSize: 45,
        color: "#FFF",
        fontWeight: "400"
    },
    TotalAmountInfoTransactionsTextStyle: {
        fontSize: 20,
        color: "#FFF",
        fontWeight: "500"
    },
    listDayTitleView: {
        height: 45,
        justifyContent: "center",
    },
    listDayInfoView: {
        margin: 5,
        backgroundColor: "#FFF",
        minHeight: 80,
        borderColor: "#5e6bf0",
        borderWidth: 1,
        borderBottomEndRadius: 20,
        borderTopEndRadius: 20
    },
    listDayTitleStyle: {
        fontSize: 23,
        fontWeight: "600",
        marginLeft: 5
    },
    listDayInfoFlex: {
        flex: 1,
        flexDirection: "row"
    },
    marginDayInfo: {
        flex: 0.3,
        backgroundColor: "#5e6bf0"
    },
    listDayInfoBody: {
        flex: 8.2,

    },
    deleteButtomView: {
        flex: 1.5,
        backgroundColor: "#f1def5",
        borderBottomEndRadius: 20,
        borderTopEndRadius: 20,
        justifyContent: "center",
        alignItems: "center"
    },
    deleteButtomTextStyle: {
        fontSize: 18,
        color: "#747167"
    },
    listDayInfoTextAmountStyle: {
        fontSize: 20,
        color: "#fc7a75",
        padding: 5,
        fontWeight: "600",
        paddingLeft: 10
    },
    listDayInfoTextDescriptionStyle: {
        fontSize: 18,
        color: "#3a3934",
        paddingLeft: 10,
        paddingBottom: 10
    },
    noTransactionsView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    noTransactionsText: {
        fontSize: 18,
        color: "red"
    },
    consumptionLimitView: {
        flex: 1,
    },
    consumptionLimitButtomView: {
        flexDirection: "row",
        alignItems: "baseline"
    },
    consumptionLimitIconView: {
        height: 30,
        width: 30,
        margin: 10
    },
    consumptionLimitText: {
        fontSize: 18,
        color : "#FFF"
    },
})

export default AmountDayScreenStyle