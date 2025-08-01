import { Dimensions, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RouteProp, ParamListBase } from "@react-navigation/native";
import { ComponentType } from "react";
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import LibraryScreen from "../screens/LibraryScreen";
import Index from "../Index";

const { width } = Dimensions.get("window");
const TAB_BAR_WIDTH = width;

const TabsArr = [
    {
        route: 'HomeScreen',
        label: 'Home',
        activeIcon: (
            <Ionicons
                name='home'
                color='#2de07f'
                size={30}
            />
        ),
        inactiveIcon: (
            <Ionicons
                name='home-outline'
                color='#fff'
                size={30}
            />
        ),
        component: () => <Index currentScreen={'Home'}><HomeScreen /></Index>,
    },
    {
        route: 'SearchScreen',
        label: 'Explore',
        activeIcon: (
            <AntDesign
                name='search1'
                color='#2de07f'
                size={30}
            />
        ),
        inactiveIcon: (
            <AntDesign
                name='search1'
                color='#fff'
                size={30}
            />
        ),
        component: () => <Index currentScreen={'Search'}><SearchScreen /></Index>,
    },
    {
        route: 'LibraryScreen',
        label: 'My Library',
        activeIcon: (
            <FontAwesome
                name='bookmark'
                color='#2de07f'
                size={30}
            />
        ),
        inactiveIcon: (
            <FontAwesome
                name='bookmark-o'
                color='#fff'
                size={30}
            />
        ),
        component: () => <Index currentScreen={'Library'}><LibraryScreen /></Index>,
    }
];

function MyTabBar({ state, descriptors, navigation, insets }: BottomTabBarProps) {

    const height = Platform.select({
        ios: 60,
        android: 80
    }) || 0

    return (
        <View style={[styles.tabBarContainer, { height: insets.bottom + height }]}>
            <View
                style={{
                    ...styles.iconsContainer,
                    bottom: Platform.OS === 'android' ? insets.bottom + 10 : insets.bottom
                }}
            >
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const label =
                        options.tabBarLabel !== undefined
                            ? options.tabBarLabel
                            : options.title !== undefined
                                ? options.title
                                : route.name;

                    const isFocused = state.index === index;
                    const tabBarIcon = options.tabBarIcon;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: "tabPress",
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name, route.params);
                        }
                    };

                    const onLongPress = () => {
                        navigation.emit({
                            type: "tabLongPress",
                            target: route.key,
                        });
                    };

                    return (
                        <TouchableOpacity
                            key={index}
                            accessibilityRole="button"
                            accessibilityState={isFocused ? { selected: true } : {}}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarTestID}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            style={{
                                flex: 1,
                                alignItems: "center"
                            }}
                            activeOpacity={1}
                        >
                            <View style={{ alignItems: 'center' }}>
                                {isFocused ? tabBarIcon?.activeIcon : tabBarIcon?.inactiveIcon}
                                <Text
                                    style={{
                                        ...styles.label,
                                        color: isFocused ? '#2de07f' : '#fff'
                                    }}
                                >
                                    {label}
                                </Text>
                            </View >
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
}

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
            }}
            tabBar={(props) => <MyTabBar {...props} />}
        >
            {TabsArr?.map((item: { route: unknown; component: ComponentType<{}> | ComponentType<{ route: RouteProp<ParamListBase, any>; navigation: any; }>; label: string; activeIcon: any; inactiveIcon: any; }, index: number) => {
                return (
                    <Tab.Screen
                        key={index}
                        name={item.route}
                        options={{
                            tabBarIcon: { activeIcon: item.activeIcon, inactiveIcon: item.inactiveIcon },
                            tabBarLabel: item.label,
                            unmountOnBlur: false
                        }}
                    >
                        {item.component}
                    </Tab.Screen>
                );
            })}
        </Tab.Navigator>
    );
};

export default BottomNavigation;

const styles = StyleSheet.create({
    tabBarContainer: {
        width: TAB_BAR_WIDTH,
        backgroundColor: '#04324d',
        borderTopWidth: 1,
        borderTopColor: '#04324d',
    },
    iconsContainer: {
        flexDirection: "row",
        width: TAB_BAR_WIDTH,
        alignItems: "center",
        justifyContent: "space-around",
        position: "absolute",
    },
    label: {
        fontSize: 12,
        textAlign: 'center'
    },
});