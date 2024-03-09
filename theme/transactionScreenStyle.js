import { StyleSheet, Dimensions } from 'react-native';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

const TransactionScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f7eef9"
    },
    tabView: {
        flex: 2,
        flexDirection: "row",
        alignItems: "center"
    },
    titleTabStyle :{
        padding: 10,
        fontSize: 25,
        fontWeight : "600",
        color : "#606bf0"
    },
    inputView: {
        height: 280,
        backgroundColor : "#FFF",
        marginTop: 50,
        flex: 1,
        margin: 8,
        borderRadius: 10,
        shadowColor: "#5a6af1",
        shadowOffset: {
            width: 3,
            height: 3,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        elevation: 5,
        borderWidth: 1, 
        borderColor: '#cddcf6', 
    },
    inputViewFlex : {
        flex: 8,
    },
    textInputAmountStyle : {
        borderWidth: 1, 
        borderColor: '#cddcf6', 
        padding: 5, 
        marginBottom: 10,
        margin: 5,
        borderRadius: 15,
        fontSize: 20,
        paddingLeft: 10
    },
    textInputDescriptionStyle : {
        borderWidth: 1, 
        borderColor: '#cddcf6', 
        padding: 5, 
        marginBottom: 10,
        margin: 5,
        borderRadius: 15,
        fontSize: 20,
        paddingLeft: 10,
        height : 100
    },
    addTransactionButtom :{ 
        backgroundColor : "#5660c1",
        margin: 5,
        justifyContent : "center",
        alignItems : "center",
        borderRadius: 15
    },
    addTransactionButtomText :{ 
        fontSize : 20,
        padding : 8,
        fontWeight : "500",
        color : "#FFF"
    },
    utilitiesView : {
        height : 350,
        flex: 1,
        margin: 5,
        marginTop: 10
    },
    utilitiesButtomView : {
        flex : 1,
        flexDirection : "row",
        marginBottom: 10
    },
    utilitiesButtomChildView : {
        flex : 1,
        marginLeft: 4,
        marginEnd: 4,
        borderRadius: 20,
        shadowColor: "#606bf0",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 5,
        backgroundColor : "#FFF"
    },
    utilitiesButtomTitle : {
        flex : 3,
        alignItems : "center",
        flexDirection : "row"
    },
    utilitiesButtomTitleStyle: {
        fontSize: 20,
        color: "#5f6bf0",
        fontWeight: "600",
        textDecorationLine: "underline",
      },
      
    utilitiesButtomInfo : {
        flex: 4.5,
        flexDirection : "row"
    },
    utilitiesButtomSee : {
        flex: 2.5,
        flexDirection : "row",
        justifyContent : "center",
        alignItems : "center"
    },
    utilitiesButtomSeeTextStyle : {
        fontSize : 15,
        color : "#56585d",
        paddingEnd: 10,
        marginLeft: 10
    },
    utilitiesButtomInfoTextView : {
        flex: 1,
       justifyContent: "center",
       alignItems : "center"
    },
    utilitiesButtomInfoIconStyle : {
        height : 25,
        width:25,
        marginLeft: 10,
        marginEnd: 10
    },
    utilitiesButtomInfoTextStyle : {
        fontSize : 18,
        color : "#646673",
        fontWeight : "500"
    },
    expandIconStyle : {
        height : 35,
        width: 35,
        margin: 5,
        marginEnd: 15
    },
    recentExpensesView : {
        marginBottom: 200,
        marginTop: 10,
        flex : 1,
        minHeight: 150
    },
    recentExpensesItemView : {
        minHeight: 50,
        backgroundColor : "#FFF",
        margin: 5,
        borderRadius: 10,
        shadowColor: "#606bf0",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 5,
        flex:1,
        flexDirection : "row"
    },
    leftBackGroundView : {
        flex: 0.3,
        backgroundColor : "#606bf0"
    },
    recentExpensesInfoView : {
        flex: 9.7
    },
    recentExpensesInfoFlex : {
        flex: 1
    },
    recentExpensesInfoAmountView: {
        flex : 1,
        flexDirection: "row"
    },
    recentExpensesInfoDescriptionView: {
        flex : 8
    },
    recentExpensesInfoDateView: {
        flex : 1,
        alignItems: "flex-end"
    },
    recentExpensesInfoAmountTextStyle : {
        fontSize: 20,
        padding: 2,
        fontWeight: "600",
        color: "#fc7c77"
    },
    recentExpensesInfoTextStyle : {
        fontSize: 18,
        padding: 3,
        paddingLeft: 5,
        fontWeight: "300",
        color : "#646673",
    },
    recentExpensesInfoDateTextStyle : {
        fontSize: 15,
        padding: 5,
        color : "#fda3a0",
        paddingEnd: 10
    },
    deleteButtomText : {
        fontSize : 18,
        color: "#8b8ea0",
        paddingEnd: 20,
        fontWeight : "500"
    }
    
})

export default TransactionScreenStyle