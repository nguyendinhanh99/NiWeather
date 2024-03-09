import React, { useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, Animated, Image} from "react-native";
import { useNavigation } from "@react-navigation/native";
import LinearGradient from 'react-native-linear-gradient';
import icons from "../../assest/icon";
import AppStyle from "../../theme";



export default function WelcomeScreen() {
    const navigation = useNavigation();
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnimImage = useRef(new Animated.Value(-300)).current;
    const slideAnimLogin = useRef(new Animated.Value(200)).current;

    const fadeInAndSlide = () => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnimImage, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnimLogin, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true,
            }),
        ]).start(() => {
            // Sau khi hoàn thành hiệu ứng, chờ 1 giây trước khi chuyển sang màn hình Main
            setTimeout(() => {
                navigation.navigate('Main');
            }, 100);
        });
    };

    useEffect(() => {
        fadeInAndSlide();
    }, []);

    return (
        <LinearGradient colors={['#ebdafb', '#ebdafb', '#FFFFFF']} style={AppStyle.WellcomeAppStyle.linearGradient}>
            <View style={AppStyle.WellcomeAppStyle.container}>
                <Animated.View style={{ ...AppStyle.WellcomeAppStyle.fadeView, opacity: fadeAnim }}>
                    <Animated.View style={{ ...AppStyle.WellcomeAppStyle.fadeBodyView, transform: [{ translateY: slideAnimImage }] }}>
                        <Image
                            source={icons.AppIcon}
                            style={AppStyle.WellcomeAppStyle.LogoStyle}
                            resizeMode="cover"
                            tintColor={"#FFF"}
                        />
                        <Text style={AppStyle.WellcomeAppStyle.appNameText}>Ni Weather</Text>
                    </Animated.View>
                </Animated.View>
            </View>
        </LinearGradient>
    );
}
