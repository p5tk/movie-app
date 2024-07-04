import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import dayjs from "dayjs";

const MovieCard = ({ item }) => {
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: "detail",
      params: { id: item.id },
    });
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View className="rounded-sm overflow-hidden w-[100px]">
        <View>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/original/${item.poster_path}`,
            }}
            className="h-[135px] w-[100px] mb-1"
          />
        </View>
        <View>
          <Text className="text-[14px] text-white mb-1" numberOfLines={2}>
            {item.title}
          </Text>
          <Text className="text-gray-300">
            {dayjs(item.release_date).format("MMM D, YYYY")}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MovieCard;
