import { StyleSheet, Dimensions } from 'react-native';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

const HomeScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f7eef9"
    },
    toDayWeatherView: {
        height: 230,
        margin: 5,
        borderRadius: 20,
    },
    shadowContainer: {
        shadowColor: 'black',
        shadowOffset: {
            width: 2,
            height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        marginTop: 50
    },

    toDayWeatherViewFlex: {
        flex: 1,
    },
    iconWeathersView: {
        flex: 2.5,
    },
    weathersInfoView: {
        flex: 5.5,
    },
    weathersWarning: {
        flex: 2,
    },
    flexOneRow: {
        flex: 1,
        flexDirection: "row"
    },
    iconWeathersStyle: {
        height: 50,
        width: 50
    },
    iconWeathersBigStyle: {
        height: 60,
        width: 60
    },
    iconWeathersViewStyle: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center"
    },
    titleView: {
        flex: 8,
        justifyContent: "center",
    },
    titleStyle: {
        fontSize: 25,
        fontWeight: "400",
        color: "#FFF"
    },
    temperatureView: {
        flex: 4,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },
    otherInfoView: {
        flex: 6,
    },
    tempText: {
        fontSize: 80,
        fontWeight: "400",
        color: "#FFF"
    },
    ctempText: {
        fontSize: 45,
        fontWeight: "300",
        color: "#FFF"
    },
    humidityText: {
        fontSize: 18,
        color: "#FFF",
        fontWeight: "300",
        padding: 2
    },
    weekWeathersView: {
        height: 250,
    },
    rankWeathersView: {
        width: Width / 3 - 35,
        backgroundColor: "#FFF",
        flex: 1,
        margin: 5,
        borderRadius: 509,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    weekWeathersTitleView: {
        padding: 5,
        marginTop: 25
    },
    weekWeathersTitleStyle: {
        fontSize: 20,
        fontWeight: "500",
        color: "#191a1f"
    },
    rankWeathersDay: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20
    },
    rankWeathersDayOffTextStyle: {
        fontSize: 17,
        fontWeight: "500",
        color: "#FFF"
    },
    rankWeathersDayTextStyle: {
        fontSize: 13,
        fontWeight: "300",
        color: "#FFF"
    },
    rankWeathersDayTempTextStyle: {
        fontSize: 18,
        fontWeight: "400",
        color: "#FFF"
    },
    rankWeathersDayUVTextStyle: {
        fontSize: 20,
        fontWeight: "500",
        color: "#fba917"
    },
    rankWeathersDayUVView: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 15
    },
    rankWeathersDayTempView: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 15
    },
    warningView: {
        height: 170,
        margin: 5
        
    },
    warningTextStyle : {
        fontSize: 20,
        padding: 2
    },
    warningUVView : {
        flex: 1,
        margin:5,
        backgroundColor: 'rgba(255, 255, 255, 0.7)', 
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        justifyContent : "center",
        borderRadius : 20
    },
    warningPrecipView : {
        flex: 1,
        margin:5,
        backgroundColor: 'rgba(255, 255, 255, 0.7)', 
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        justifyContent : "center",
        borderRadius : 20
    },
    warningTitleView : {
        flex : 2,
        flexDirection : "row"
    },
    warningInfoView : {
        flex : 8,
    },
    warningInfoWaterView : {
        flex : 8,
        justifyContent: "center",
        alignItems: "center"
    },
    warningIconView : {
        flex : 3,
        justifyContent: "center",
        alignItems: "center"
    },
    warningIconStyle : {
        height : 30,
        width: 30,
        marginTop: 10
    },
    warningIconTitleView : {
        flex: 7,
        justifyContent: "center",
    },
    warningIconTitleStyle : {
        fontSize : 17,
        color: "#fba917",
        fontWeight: "500"
    },
    warningInfoTextStyle : {
        fontSize: 14,
        color: "#fba917",
        fontWeight: "400",
        paddingLeft: 10
    },
    warningInfoTextNumberStyle : {
        fontSize: 25,
        color: "#fba917",
        fontWeight: "700",
        textAlign : "center",
    },
    warningInfoTextNumberWaterStyle : {
        fontSize: 50,
        color: "#fba917",
        fontWeight: "700",
        textAlign : "center",
    },
    warningInfoTextNumbermmStyle : {
        fontSize: 20,
        color: "#fba917",
        fontWeight: "400",
        textAlign : "center",
    }

})

export default HomeScreenStyle