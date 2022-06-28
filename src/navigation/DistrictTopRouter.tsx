// import * as React from "react";
// import DistrictScreen from '../screens/district/Districts';
// import GodScreen from '../screens/god/Gods';
// import TempleScreen from '../screens/temple/Temples';
// import { COLORS } from "../constants/Theme";
// import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

// const MainTab = createMaterialTopTabNavigator();

// const DistrictTopRouter = (props: any) => {
//     return (
//         <MainTab.Navigator
//             initialRouteName="District"
//             tabBarOptions={{
//                 activeTintColor: COLORS.white,
//                 style: {
//                     backgroundColor: COLORS.primary,
//                 },
//                 indicatorStyle: {
//                     backgroundColor: COLORS.white,
//                     height: 3,
//                 },
//                 labelStyle: {
//                     fontWeight: 'bold'
//                 },
//                 showIcon: true
//             }}
//         >
//             <MainTab.Screen
//                 name="Districts" component={DistrictScreen} />
//             <MainTab.Screen
//                 name="Gods"
//                 component={GodScreen}
//             />
//             <MainTab.Screen
//                 name="Temples"
//                 component={TempleScreen}
//             />
//         </MainTab.Navigator>
//     );
// }

// export default DistrictTopRouter;
