import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    ScrollView,
    Image,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";

//
import AppStyle from "../theme";
// tab view
import TabView from "../constants/tabView";
// Icon 
import icons from "../assest/icon";

export default function HomeScreen() {
    const [weatherData, setWeatherData] = useState(null);

    const fetchWeatherData = async () => {
        try {
            const API_KEY = 'e2b158aab211484486534423240203'; // Thay YOUR_API_KEY bằng API key của bạn từ WeatherAPI
            const city = 'Ha Tinh'; // Thành phố bạn muốn lấy dữ liệu thời tiết

            // Lấy dữ liệu thời tiết hiện tại
            const currentResponse = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&lang=vi`);
            if (!currentResponse.ok) {
                throw new Error('Failed to fetch current weather data');
            }
            const currentData = await currentResponse.json();

            // Lấy dữ liệu dự báo thời tiết cho các ngày tiếp theo
            const forecastResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=7&lang=vi`);
            if (!forecastResponse.ok) {
                throw new Error('Failed to fetch forecast weather data');
            }
            const forecastData = await forecastResponse.json();

            // Kết hợp dữ liệu thời tiết hiện tại và dự báo vào một đối tượng
            const combinedData = {
                current: currentData.current,
                forecast: forecastData.forecast,
            };

            setWeatherData(combinedData);
            console.log("bnnjnmkmmk"); // In dữ liệu ra console
            console.log(forecastData); // In dữ liệu ra console

        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    useEffect(() => {
        // Gọi fetchWeatherData lần đầu tiên khi component được render
        if (!weatherData) {
            fetchWeatherData();
        }

        // Thiết lập interval để cập nhật dữ liệu mỗi 5 phút
        const intervalId = setInterval(() => {
            fetchWeatherData();
            console.log('Dữ liệu thời tiết đã được cập nhật');
        }, 15 * 60 * 1000); // 5 phút

        // Xóa interval khi component bị unmount
        return () => clearInterval(intervalId);
    }, [weatherData]);
    const formatDate = (dateString) => {
        const dateObj = new Date(dateString);
        const day = dateObj.getDate();
        const month = dateObj.getMonth() + 1; // Tháng bắt đầu từ 0 nên cần cộng thêm 1
        return `${day}/${month}`;
    };
    const getDayOfWeek = (dateString) => {
        const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
        const dateObj = new Date(dateString);
        const dayOfWeek = days[dateObj.getDay()];
        return dayOfWeek;
    };
    const getWeatherIcon = (weatherCode) => {
        switch (weatherCode) {
            case 1000:
                return icons.SunIcon; // hoặc đường dẫn tương ứng với biểu tượng của trời nắng/
            case 1063:
                return icons.RainIcon; // hoặc đường dẫn tương ứng với biểu tượng của mưa
            // Các trường hợp khác
            default:
                return icons.CloudsIcon; // hoặc biểu tượng mặc định khi không có trạng thái thời tiết nào khớp
        }
    };



    return (
        <View style={AppStyle.HomeScreenStyle.container}>
            <ScrollView
            showsHorizontalScrollIndicator={false}
            >
                <View style={AppStyle.HomeScreenStyle.shadowContainer}>
                    {weatherData && weatherData.current && (
                        <>
                            <LinearGradient
                                colors={['#df6ce6', '#9d6beb', '#626bf0']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={AppStyle.HomeScreenStyle.toDayWeatherView}
                            >
                                <View style={AppStyle.HomeScreenStyle.toDayWeatherViewFlex}>
                                    <View style={AppStyle.HomeScreenStyle.iconWeathersView}>
                                        <View style={AppStyle.HomeScreenStyle.flexOneRow}>
                                            <View style={AppStyle.HomeScreenStyle.iconWeathersViewStyle}>
                                                <Image
                                                    style={AppStyle.HomeScreenStyle.iconWeathersBigStyle}
                                                    source={getWeatherIcon(weatherData.current.condition.code)}
                                                />
                                            </View>
                                            <View style={AppStyle.HomeScreenStyle.titleView}>
                                                <Text style={AppStyle.HomeScreenStyle.titleStyle}>
                                                    Thời tiết Hà Tĩnh
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={AppStyle.HomeScreenStyle.weathersInfoView}>
                                        <View style={AppStyle.HomeScreenStyle.flexOneRow}>

                                            <View style={AppStyle.HomeScreenStyle.temperatureView}>
                                                <Text
                                                    style={AppStyle.HomeScreenStyle.tempText}
                                                >
                                                    {Math.round(weatherData.current.temp_c)}
                                                </Text>
                                                <Text
                                                    style={AppStyle.HomeScreenStyle.ctempText}
                                                >
                                                    °
                                                </Text>
                                            </View>
                                            <View style={AppStyle.HomeScreenStyle.otherInfoView}>
                                                <Text style={AppStyle.HomeScreenStyle.humidityText}>Độ ẩm: {weatherData.current.humidity}%</Text>
                                                <Text style={AppStyle.HomeScreenStyle.humidityText}>Tốc độ gió: {weatherData.current.wind_kph} km/h</Text>
                                                <Text style={AppStyle.HomeScreenStyle.humidityText}>
                                                    Số UV: {weatherData?.current?.uv !== undefined ?
                                                        (weatherData.current.uv <= 2 ? `Thấp (${weatherData.current.uv})` :
                                                            (weatherData.current.uv <= 5 ? `Trung bình (${weatherData.current.uv})` :
                                                                (weatherData.current.uv <= 7 ? `Cao (${weatherData.current.uv})` :
                                                                    (weatherData.current.uv <= 10 ? `Rất cao (${weatherData.current.uv})` :
                                                                        `Cực cao (11+)`)))) : "Không có dữ liệu"}
                                                </Text>
                                                <Text style={AppStyle.HomeScreenStyle.humidityText}>Mây: {weatherData.current.cloud}%</Text>
                                                <Text style={{ fontSize: 20, color: "#f8b946", fontWeight: "500" }}>
                                                    ! {weatherData.current.condition.text}
                                                </Text>
                                            </View>

                                        </View>
                                    </View>
                                    <View style={AppStyle.HomeScreenStyle.weathersWarning}>
                                        <Text style={{ fontSize: 18, color: "#eea268" }}>

                                        </Text>
                                    </View>
                                </View>
                            </LinearGradient>
                        </>
                    )}
                </View>

                <View style={AppStyle.HomeScreenStyle.weekWeathersTitleView}>
                    <Text style={AppStyle.HomeScreenStyle.weekWeathersTitleStyle}>
                        Cảnh báo thiên tai
                    </Text>
                </View>

                <View style={AppStyle.HomeScreenStyle.warningView}>
                    {weatherData && weatherData.current && (
                        <>
                            <View style={AppStyle.HomeScreenStyle.flexOneRow}>
                                <View style={AppStyle.HomeScreenStyle.warningUVView}>
                                    <View style={AppStyle.HomeScreenStyle.warningTitleView}>
                                        <View style={AppStyle.HomeScreenStyle.warningIconView}>
                                            <Image
                                                source={icons.ProtectionIcon}
                                                style={AppStyle.HomeScreenStyle.warningIconStyle}
                                            />
                                        </View>
                                        <View style={AppStyle.HomeScreenStyle.warningIconTitleView}>
                                            <Text style={AppStyle.HomeScreenStyle.warningIconTitleStyle}>
                                                Chỉ số uv
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={AppStyle.HomeScreenStyle.warningInfoView}>
                                        <Text style={AppStyle.HomeScreenStyle.warningInfoTextNumberStyle}>
                                            {weatherData.current.uv}
                                        </Text>
                                        <Text style={AppStyle.HomeScreenStyle.warningInfoTextStyle}>
                                            {weatherData?.current?.uv !== undefined ?
                                                (weatherData.current.uv <= 2 ? `ít có nguy cơ cháy nắng, ngay cả đối với những làn da nhạy cảm ` :
                                                    (weatherData.current.uv <= 5 ? `Bạn nên có biện pháp chống nắng đúng cách vào khung giờ có chỉ số UV từ 3-5.` :
                                                        (weatherData.current.uv <= 7 ? `Thời điểm da dễ cháy nắng nếu tiếp xúc quá lâu ngoài trời mà không có bất kì biện pháp chống nắng thích hợp.` :
                                                            (weatherData.current.uv <= 10 ? `Tình trạng cháy nắng rất dễ xảy ra.` :
                                                                `Da có thể cháy nắng chỉ trong vài phút dưới ánh nắng mặt trời. Hạn chế tiếp xúc với ánh nắng hết sức có thể.`)))) : 
                                                                "Không có dữ liệu"}
                                        </Text>
                                    </View>
                                </View>
                                <View style={AppStyle.HomeScreenStyle.warningPrecipView}>
                                    <View style={AppStyle.HomeScreenStyle.warningTitleView}>
                                        <View style={AppStyle.HomeScreenStyle.warningIconView}>
                                            <Image
                                                source={icons.WaterIcon}
                                                style={AppStyle.HomeScreenStyle.warningIconStyle}
                                            />
                                        </View>
                                        <View style={AppStyle.HomeScreenStyle.warningIconTitleView}>
                                            <Text
                                                style={AppStyle.HomeScreenStyle.warningIconTitleStyle}
                                            >
                                                Lượng mưa
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={AppStyle.HomeScreenStyle.warningInfoWaterView}>
                                        <Text
                                        style={AppStyle.HomeScreenStyle.warningInfoTextNumberWaterStyle}
                                        >
                                            {weatherData.current.precip_mm}
                                        </Text>
                                        <Text
                                        style={AppStyle.HomeScreenStyle.warningInfoTextNumbermmStyle}
                                        >
                                            (mm)
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </>
                    )}
                </View>

                <View style={AppStyle.HomeScreenStyle.weekWeathersTitleView}>
                    <Text style={AppStyle.HomeScreenStyle.weekWeathersTitleStyle}>
                        Thời tiết 7 ngày tiếp theo
                    </Text>
                </View>
                <View style={AppStyle.HomeScreenStyle.weekWeathersView}>
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}>
                        {weatherData?.forecast?.forecastday.map((day, index) => (

                            <View key={index} >
                                <LinearGradient
                                    colors={['#df6ce6', '#9d6beb', '#626bf0']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    style={AppStyle.HomeScreenStyle.rankWeathersView}
                                >

                                    <View style={AppStyle.HomeScreenStyle.rankWeathersDay}>
                                        <Text
                                            style={AppStyle.HomeScreenStyle.rankWeathersDayOffTextStyle}
                                        >
                                            {getDayOfWeek(day.date)}
                                        </Text>
                                        <Text
                                            style={AppStyle.HomeScreenStyle.rankWeathersDayTextStyle}

                                        >
                                            {formatDate(day.date)}
                                        </Text>
                                    </View>
                                    <View
                                        style={AppStyle.HomeScreenStyle.rankWeathersDayTempView}
                                    >
                                        <Image
                                            style={AppStyle.HomeScreenStyle.iconWeathersStyle}
                                            source={getWeatherIcon(day.day.condition.code)}
                                        />

                                    </View>

                                    <View
                                        style={AppStyle.HomeScreenStyle.rankWeathersDayTempView}
                                    >
                                        <Text
                                            style={AppStyle.HomeScreenStyle.rankWeathersDayTempTextStyle}
                                        >C: {Math.round(day.day.maxtemp_c)}°C</Text>
                                        
                                        <Text
                                            style={AppStyle.HomeScreenStyle.rankWeathersDayTempTextStyle}
                                        >T: {Math.round(day.day.mintemp_c)}°C</Text>

                                    </View>

                                    <View
                                        style={AppStyle.HomeScreenStyle.rankWeathersDayUVView}
                                    >
                                        <Text
                                            style={AppStyle.HomeScreenStyle.rankWeathersDayTextStyle}

                                        >
                                            Chỉ số UV
                                        </Text>
                                        <Text
                                            style={AppStyle.HomeScreenStyle.rankWeathersDayUVTextStyle}
                                        >{Math.round(day.day.uv)}</Text>
                                    </View>

                                    {/* <Text>{day.day.condition.text}</Text>*/}
                                </LinearGradient>
                            </View>
                        ))}
                    </ScrollView>

                </View>

                <View style = {{
                    marginTop: 200
                }}>

                </View>
            </ScrollView>
        </View>
    );
}
