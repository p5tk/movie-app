import {
    View,
    Text,
    Image,
    ScrollView,
    FlatList,
    Pressable,
    ActivityIndicator,
    TouchableOpacity,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import { SafeAreaView } from "react-native-safe-area-context";
  import { useLocalSearchParams } from "expo-router";
  import axios from "axios";
  import MovieCard from "../components/MovieCard";
  import { useRouter } from "expo-router";
  import {
    MaterialIcons,
    FontAwesome,
    AntDesign,
    Foundation,
    Ionicons,
  } from "@expo/vector-icons";
  import dayjs from "dayjs";
  
  const character = () => {
    const { characterId } = useLocalSearchParams();
    const router = useRouter();
    const [characterData, setCharacterData] = useState({});
    const [moviesOfCharacter, setMoviesOfCharacter] = useState([]);
  
    const getCharacterDetail = async () => {
      const response = await axios.get(
        `${process.env.BASE_URL}/person/${characterId}?language=en-US&api_key=${process.env.API_KEY}`
      );
      setCharacterData(response.data);
    };
  
    const getMovies = async () => {
      const response = await axios.get(
        `${process.env.BASE_URL}/person/${characterId}/combined_credits?language=en-US&api_key=${process.env.API_KEY}`
      );
      setMoviesOfCharacter(response.data.cast);
    };
  
    useEffect(() => {
      getCharacterDetail();
      getMovies();
    }, []);
  
    return (
      <SafeAreaView className="bg-black h-full pb-8">
        {Object.keys(characterData).length > 0 && moviesOfCharacter.length > 0 ? (
          <ScrollView className="px-4">
            <TouchableOpacity className="mb-4" onPress={() => router.back()}>
              <Ionicons name="chevron-back" size={24} color="#fff" />
            </TouchableOpacity>
            <View className="flex-row  gap-3">
              <View>
                <Image
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500${characterData?.profile_path}`,
                  }}
                  className="w-[150px] h-[225px]"
                />
              </View>
              <View>
                <Text className="text-white text-xl font-bold mb-3">
                  {characterData?.name}
                </Text>
                <Text className="text-white text-lg font-semibold">
                  Known For
                </Text>
                <Text className="text-gray-300 mb-3">
                  {characterData?.known_for_department}
                </Text>
                <View className="flex flex-row space-x-1 items-center mb-3">
                  <MaterialIcons name="cake" size={24} color="#fff" />
                  <Text className="text-gray-300">
                    {dayjs(characterData?.birthday).format("D MMM, YYYY")}
                  </Text>
                </View>
                <Text className="text-white text-lg font-semibold">
                  Place of Birth
                </Text>
                <Text className="text-gray-300 mb-3">
                  {characterData.place_of_birth}
                </Text>
  
                <View className="flex-row gap-3">
                  <FontAwesome name="facebook-square" size={24} color="#fff" />
                  <AntDesign name="instagram" size={24} color="#fff" />
                  <AntDesign name="twitter" size={24} color="#fff" />
                </View>
              </View>
            </View>
            <Text className="text-xl font-semibold">Biography</Text>
            <Text className="text-gray-300 text-justify">
              {characterData.biography}
            </Text>
  
            <Text className="text-xl font-semibold text-white mt-3 mb-2">
              Known For
            </Text>
            <FlatList
              data={moviesOfCharacter}
              renderItem={({ item }) => <MovieCard item={item} />}
              horizontal
              ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
            />
          </ScrollView>
        ) : (
          <View className="flex h-full items-center justify-center">
            <ActivityIndicator size="large" />
          </View>
        )}
      </SafeAreaView>
    );
  };
  
  export default character;
  