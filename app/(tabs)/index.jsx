import { View, Text, FlatList, ScrollView, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../../components/MovieCard";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  const [nowShowingMovies, setNowShowingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const categories = ["All", "Action", "Horror", "Comedy", "Drama", "Triller"];
  `1`;
  const getNowShowingMovies = async () => {
    try {
      const response = await axios.get(
        `${process.env.BASE_URL}/trending/movie/day?language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${process.env.API_READ_ACCESS_TOKEN}`,
          },
        }
      );
      setNowShowingMovies(response.data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getPopularMovies = async () => {
    try {
      const response = await axios.get(
        `${process.env.BASE_URL}/movie/popular?language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${process.env.API_READ_ACCESS_TOKEN}`,
          },
        }
      );
      setPopularMovies(response.data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getNowShowingMovies();
    getPopularMovies();
  }, []);

  return (
    <>
      <SafeAreaView className="bg-black px-3">
        <ScrollView>
          <Text className="text-white text-[24px] my-5">Welcome Tommy !</Text>

          <FlatList
            data={categories}
            renderItem={({ item }) => (
              <View
                className={` ${
                  item === "All" ? "bg-[#3F55C6]" : "bg-[#313135]"
                } p-2 rounded-full w-[78px] `}
              >
                <Text
                  className={` ${
                    item === "All" ? "text-white" : "text-[#A6A6A6]"
                  } text-center`}
                >
                  {item}
                </Text>
              </View>
            )}
            horizontal
            ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
            showsHorizontalScrollIndicator={false}
            className="mb-5"
          />

          <Text className="text-xl font-semibold text-white mb-2">
            Trending
          </Text>

          {nowShowingMovies.length > 0 ? (
            <FlatList
              data={nowShowingMovies}
              renderItem={({ item }) => <MovieCard item={item} />}
              horizontal
              keyExtractor={(item) => item.id.toString()}
              initialNumToRender={10}
              ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
              className="mb-8"
            />
          ) : (
            <View>
              <Text>Loading...</Text>
            </View>
          )}

          <Text className="text-xl font-semibold text-white mb-2">
            What's Popular
          </Text>
          {popularMovies.length > 0 ? (
            <FlatList
              data={popularMovies}
              renderItem={({ item }) => <MovieCard item={item} />}
              horizontal
              keyExtractor={(item) => item.id.toString()}
              initialNumToRender={10}
              ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
              className="mb-8"
            />
          ) : (
            <View>
              <Text>Loading...</Text>
            </View>
          )}

          <Text className="text-xl font-semibold text-white mb-2">For You</Text>
          {nowShowingMovies.length > 0 ? (
            <FlatList
              data={nowShowingMovies}
              renderItem={({ item }) => <MovieCard item={item} />}
              horizontal
              keyExtractor={(item) => item.id.toString()}
              initialNumToRender={10}
              ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
              className="mb-24"
            />
          ) : (
            <View>
              <Text>Loading...</Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
      <StatusBar barStyle="light-content" />
    </>
  );
};

export default Home;
