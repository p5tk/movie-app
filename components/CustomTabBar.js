import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";

const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <BlurView intensity={5} style={styles.blurContainer}>
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
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
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tab}
              key={route.key}
            >
              <View
                className={`flex flex-row items-center space-x-1  p-2 rounded-full ${
                  isFocused ? "bg-[#3F55C6]" : ""
                }`}
              >
                <Ionicons
                  name={route.name === "index" ? "home" : "search"}
                  size={24}
                  color={isFocused ? "#fff" : "gray"}
                />
                <Text style={{ color: isFocused ? "#fff" : "gray" }}>
                  {label}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </BlurView>
  );
};

const styles = StyleSheet.create({
  blurContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: "rgba(0, 0, 0, 0.85)", 
  },
  tabBar: {
    flexDirection: "row",
    height: 80,
    paddingHorizontal: 50,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tabContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 25,
  },
  focusedTabContent: {
    backgroundColor: "#3F55C6",
  },
});

export default CustomTabBar;