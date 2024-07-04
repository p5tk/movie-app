import React from "react";
import { Tabs } from "expo-router";
import CustomTabBar from "../../components/CustomTabBar";

const TabsLayout = () => {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        tabBarActiveTintColor: "blue",
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
