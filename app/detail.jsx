import {
    View,
    Text,
    Image,
    FlatList,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import axios from "axios";
  import { Link, useLocalSearchParams } from "expo-router";
  import { AntDesign, Ionicons } from "@expo/vector-icons";
  import SimilarMovies from "../components/SimilarMovies";
  import { SafeAreaView } from "react-native-safe-area-context";
  import { useRouter } from "expo-router";
  import TrailerModal from "../components/TrailerModal";
  import dayjs from "dayjs";
  
  const MovieDetail = () => {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const [movieData, setMovieData] = useState({});
    const [casts, setCasts] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
  
    const getMovieDetail = async () => {
      try {
        const response = await axios.get(
          `${process.env.BASE_URL}/movie/${id}?language=en-US&api_key=${process.env.API_KEY}`
        );
        setMovieData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    const getCasts = async () => {
      const response = await axios.get(
        `${process.env.BASE_URL}/movie/${id}/credits?language=en-US&api_key=${process.env.API_KEY}`
      );
      setCasts(response.data.cast);
    };
  
    useEffect(() => {
      getMovieDetail();
      getCasts();
    }, [id]);
  
    const CastsList = (item) => {
      const handlePress = () => {
        router.push({
          pathname: "character",
          params: { characterId: item.id },
        });
      };
  
      return (
        <TouchableOpacity onPress={handlePress}>
          <View className="w-24 h-auto">
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500${item.profile_path}`,
              }}
              className="w-24 h-24 rounded-full mb-2"
            />
            <Text className="text-center text-gray-300 w-auto">{item.name}</Text>
          </View>
        </TouchableOpacity>
      );
    };
  
    return (
      <SafeAreaView className="bg-black">
        {movieData && casts.length > 0 ? (
          <ScrollView>
            <View className="relative">
              <TouchableOpacity
                className="absolute left-4 top-4 z-10"
                onPress={() => router.back()}
              >
                <Ionicons name="chevron-back" size={24} color="#fff" />
              </TouchableOpacity>
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${movieData?.backdrop_path}`,
                }}
                className="w-full h-[200px]"
              />
              <View className="absolute top-[90px] left-[48%]">
                <AntDesign
                  name="play"
                  size={30}
                  color="#FFF"
                  onPress={() => setModalOpen(true)}
                />
              </View>
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/original/${movieData?.poster_path}`,
                }}
                className="h-[136px] w-[90px] absolute top-[150px] left-5"
              />
            </View>
  
            <View className="pl-32 pr-4">
              <View className="flex flex-row justify-between items-end">
                <View className="w-auto">
                  <Text className="text-white text-lg mt-2 font-semibold">
                    {movieData?.title}
                  </Text>
                  <View className="flex flex-row">
                    {movieData?.genres?.map((genre, index) => (
                      <Text className="text-gray-300" key={index}>
                        {genre.name}
                        {index < movieData.genres.length - 1 ? " / " : ""}
                      </Text>
                    ))}
                  </View>
  
                  <Text className="text-gray-300">
                    {dayjs(movieData?.release_date).format("MMM D, YYYY")}
                  </Text>
                </View>
  
                {modalOpen && (
                  <TrailerModal
                    modalOpen={modalOpen}
                    setModalOpen={setModalOpen}
                    movieId={id}
                  />
                )}
              </View>
            </View>
  
            <View className="px-4">
              <Text className="mt-8 text-xl font-semibold text-white mb-2">
                Overview
              </Text>
              <Text className="text-gray-300 mb-8 text-justify">
                {movieData?.overview}
              </Text>
  
              <Text className="text-xl font-semibold text-white mb-3">Casts</Text>
  
              <FlatList
                data={casts}
                renderItem={({ item }) => CastsList(item)}
                horizontal
                ItemSeparatorComponent={() => <View style={{ width: 15 }} />}
                keyExtractor={(item) => item.id.toString()}
                initialNumToRender={5}
                className="mb-8"
              />
  
              <SimilarMovies id={id} />
            </View>
          </ScrollView>
        ) : (
          <View className="h-full items-center justify-center">
            <ActivityIndicator size={"large"} />
          </View>
        )}
      </SafeAreaView>
    );
  };
  
  export default MovieDetail;
  