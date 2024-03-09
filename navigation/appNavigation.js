import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';

// Import các màn hình
import HomeScreen from '../screen/homeScreen';
import SelectMapScreen from '../screen/selectMapScreen';
import NoteCalendarScreen from '../screen/noteCalendarScreen';
import TransactionScreen from '../screen/transactionScreen';
import AmountDayScreen from '../screen/amountInfo/amountDayInfoScreen';
import SetConsumptionLimitScreen from '../screen/amountInfo/setConsumptionLimitScreen';
import SetConsumptionLimitWeekScreen from '../screen/amountInfo/setConsumptionLimitWeekScreen';
import AmountWeekScreen from '../screen/amountInfo/amountWeekInfoScreen';
import SetConsumptionLimitMonthScreen from '../screen/amountInfo/setConsumptionLimitMonthScreen';
import AmountMonthScreen from '../screen/amountInfo/amountMonthInfoScreen';
import SetConsumptionLimitYearScreen from '../screen/amountInfo/setConsumptionLimitYearScreen';
import AmountYearScreen from '../screen/amountInfo/amountYearInfoScreen';
import WelcomeScreen from '../screen/wellcomeApp/wellcomeScreen';

// Icon
import icons from '../assest/icon';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Hàm tạo biểu tượng cho các tab
const getTabIcon = (route, focused) => {
    let iconName;

    if (route.name === 'Thời tiết') {
        iconName = focused ? icons.HomeIcon : icons.HomeIcon;
    } else if (route.name === 'Chi tiêu') {
        iconName = focused ? icons.MapIcon : icons.MapIcon;
    } else if (route.name === 'Lịch') {
        iconName = focused ? icons.CalenderIcon : icons.CalenderIcon;
    }


    return <Image source={iconName} style={{ width: 20, height: 20, tintColor: focused ? '#696bf0' : 'gray' }} />;
};

// Stack cho mỗi màn hình
function HomeStack() {
    return (
        <Stack.Navigator initialRouteName="HomeScreen">
            <Stack.Screen options={{ headerShown: false }} name="HomeScreen" component={HomeScreen} />
        </Stack.Navigator>
    );
}

function SelectMapStack() {
    return (
        <Stack.Navigator initialRouteName="SelectMap">
            <Stack.Screen options={{ headerShown: false }} name="SelectMap" component={SelectMapScreen} />
            <Stack.Screen options={{ headerShown: false, presentation: "modal" }} name="NoteCalendar" component={NoteCalendarScreen} />
        </Stack.Navigator>
    );
}

function TransactionStack() {
    return (
        <Stack.Navigator initialRouteName="TransactionScreen">
            <Stack.Screen options={{ headerShown: false }} name="TransactionScreen" component={TransactionScreen} />
            <Stack.Screen
                options={{ headerShown: false }}
                name='AmountDay'
                component={AmountDayScreen}
            />

            <Stack.Screen
                options={{ headerShown: false, presentation: "modal" }}
                name='SetConsumptionLimitScreen'
                component={SetConsumptionLimitScreen}
            />
            <Stack.Screen
                options={{ headerShown: false, presentation: "modal" }}
                name='SetConsumptionLimitWeekScreen'
                component={SetConsumptionLimitWeekScreen}
            />
            <Stack.Screen
                options={{ headerShown: false }}
                name='AmountWeek'
                component={AmountWeekScreen}
            />
            <Stack.Screen
                options={{ headerShown: false }}
                name='SetConsumptionLimitMonthScreen'
                component={SetConsumptionLimitMonthScreen}
            />
            <Stack.Screen
                options={{ headerShown: false }}
                name='AmountMonth'
                component={AmountMonthScreen}
            />
            <Stack.Screen
                options={{ headerShown: false }}
                name='SetConsumptionLimitYearScreen'
                component={SetConsumptionLimitYearScreen}
            />
            <Stack.Screen
                options={{ headerShown: false }}
                name='AmountYear'
                component={AmountYearScreen}
            />
        </Stack.Navigator>
    );
}

// Component chứa TabNavigator
const MainAppComponent = () => {
    return (
        <Tab.Navigator
            initialRouteName='Thời tiết'
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => getTabIcon(route, focused),
                tabBarActiveTintColor: '#696bf0',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: {
                    position: 'absolute',
                    borderRadius: 40,
                    borderTopWidth: 0,
                    backgroundColor: "rgba(240, 227, 245, 0.8)",
                },
            })}
        >
            <Tab.Screen options={{ headerShown: false }} name='Lịch' component={SelectMapStack} />
            <Tab.Screen options={{ headerShown: false }} name='Thời tiết' component={HomeStack} />
            <Tab.Screen options={{ headerShown: false }} name='Chi tiêu' component={TransactionStack} />
        </Tab.Navigator>
    );
};

// Component chứa AppNavigation
function AppNavigation() {
    return (
        <Stack.Navigator initialRouteName="Welcome">
            <Stack.Screen options={{ headerShown: false }} name="Welcome" component={WelcomeScreen} />
            <Stack.Screen options={{ headerShown: false, }} name='Main' component={MainAppComponent} />
        </Stack.Navigator>
    );
}

export default AppNavigation;
