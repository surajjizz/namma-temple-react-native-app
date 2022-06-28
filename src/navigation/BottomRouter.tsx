// import * as React from "react";
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import AnimatedTab from '../components/BottomTab';
// import DistrictHistoryScreen from "../screens/district/DistrictHistory";
// import DistrictTourismScreen from "../screens/district/DistrictTourism";
// import DistrictFestivalScreen from "../screens/district/DistrictFestival";
// import DistrictFoodScreen from "../screens/district/DistrictFood";

// const Tab = createBottomTabNavigator();

// export const DistrictBottomRouter = (props: any) => {
//     var params;
//     if (props && props.route) {
//         params = props.route.params;
//     }
//     return (
//         <Tab.Navigator initialRouteName="DistrictHistory">
//             <Tab.Screen name="DistrictHistory" component={DistrictHistoryScreen} initialParams={params}
//                 options={{
//                     tabBarButton: (props: any) => <AnimatedTab index="1" label="History" icon="auto-stories" {...props} />,
//                 }} />
//             <Tab.Screen name="DistrictTourism" component={DistrictTourismScreen} initialParams={params}
//                 options={{
//                     tabBarButton: (props: any) => <AnimatedTab index="2" label="Tourism" icon="airport-shuttle" {...props} />,
//                 }} />
//             <Tab.Screen name="DistrictFestival" component={DistrictFestivalScreen} initialParams={params}
//                 options={{
//                     tabBarButton: (props: any) => <AnimatedTab index="3" label="Festival" icon="celebration" {...props} />,
//                 }} />
//             <Tab.Screen name="DistrictFood" component={DistrictFoodScreen} initialParams={params}
//                 options={{
//                     tabBarButton: (props: any) => <AnimatedTab index="4" label="Foods" icon="restaurant-menu" {...props} />,
//                 }} />
//         </Tab.Navigator>
//     );
// }
