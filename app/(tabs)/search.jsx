import { View, Text, TextInput, Button, Image, ScrollView } from "react-native";
import React, { useState } from "react";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, Entypo } from "@expo/vector-icons";
import dayjs from "dayjs";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [activeTab, setActiveTab] = useState(1);

  const searchMovies = async () => {
    const response = await axios.get(
      `${process.env.BASE_URL}/search/movie?query=${keyword}&language=en-US&api_key=${process.env.API_KEY}`
    );
    // console.log("Response", response.data)
    setMovies(response.data.results);

    const seriesResponse = await axios.get(
      `${process.env.BASE_URL}/search/tv?query=${keyword}&language=en-US&api_key=${process.env.API_KEY}`
    );
    setSeries(seriesResponse.data.results);
  };

  const onKeywordChange = (value) => {
    if (!value) {
      clear();
    } else {
      setKeyword(value);
    }
  };

  const clear = () => {
    setKeyword("");
    setMovies([]);
    setSeries([]);
  };

  return (
    <SafeAreaView className="bg-black h-full p-4">
      <View className="border border-solid border-white flex flex-row items-center rounded-lg space-x-2 px-2 h-[48px] mb-5">
        <Ionicons name="search" size={24} color="white" />
        <TextInput
          className="text-white flex-1"
          onChangeText={(value) => onKeywordChange(value)}
          placeholder="Movies or Series"
          placeholderTextColor={"gray"}
          defaultValue={keyword}
          onSubmitEditing={() => searchMovies()}
        />
        {keyword.length > 0 && (
          <Entypo
            name="cross"
            size={24}
            color="white"
            onPress={() => clear()}
          />
        )}
      </View>
      {movies.length > 0 && series.length > 0 && (
        <View className="flex flex-row mb-5">
          <Text
            className={`w-1/2 text-center text-white ${
              activeTab === 1 && "underline font-bold"
            }`}
            onPress={() => setActiveTab(1)}
          >
            Movies
          </Text>
          <Text
            className={`w-1/2 text-center text-white ${
              activeTab === 2 && "underline font-bold"
            }`}
            onPress={() => setActiveTab(2)}
          >
            Series
          </Text>
        </View>
      )}

      {activeTab === 1 && (
          <ScrollView>
            {movies?.map((movie, index) => (
              <View key={index} className="flex flex-row mb-3">
                <Image
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
                  }}
                  className="w-[100px] h-[150px]"
                />
                <View className="px-3 flex-1">
                  <Text className="text-white text-lg" numberOfLines={2}>
                    {movie.title}
                  </Text>
                  <Text className="text-gray-300">
                    {dayjs(movie.release_date).format("D MMM, YYYY")}
                  </Text>

                  <Text
                    className="text-gray-300 text-justify"
                    numberOfLines={3}
                  >
                    {movie.overview}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
      )}
      {activeTab === 2 && (
        <ScrollView>
          {series?.map((movie, index) => (
            <View key={index} className="flex flex-row mb-3">
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
                }}
                className="w-[100px] h-[150px]"
              />
              <View className="px-3 flex-1">
                <Text className="text-white text-lg" numberOfLines={2}>
                  {movie.name}
                </Text>
                <Text className="text-gray-300">
                  {dayjs(movie.release_date).format("D MMM, YYYY")}
                </Text>
                <Text className="text-gray-300 text-justify" numberOfLines={3}>
                  {movie.overview}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Search;
