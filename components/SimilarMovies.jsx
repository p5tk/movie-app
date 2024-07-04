import { View, Text, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";

const SimilarMovies = ({ id }) => {
  const [similarMovies, setSimilarMovies] = useState([]);

  const getSimilarMovies = async (id) => {
    const response = await axios.get(
      `${process.env.BASE_URL}/movie/${id}/similar?language=en-US&page=1&api_key=${process.env.API_KEY}`
    );
    setSimilarMovies(response.data.results);
  };

  useEffect(() => {
    getSimilarMovies(id);
  }, [id]);

  return (
    <View className="pb-5">
      <Text className="text-xl font-semibold text-white mb-2">Similar Movies</Text>
      <FlatList
        data={similarMovies}
        renderItem={({ item }) => <MovieCard item={item} />}
        horizontal
        ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
        initialNumToRender={5}
      />
    </View>
  );
};

export default SimilarMovies;
