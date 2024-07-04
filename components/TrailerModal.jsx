import { View, Modal, TouchableWithoutFeedback } from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import YoutubeIframe from "react-native-youtube-iframe";
import axios from "axios";

const TrailerModal = ({ modalOpen, setModalOpen, movieId }) => {
  const [trailer, setTrailer] = useState({});

  const getTrailers = async () => {
    const response = await axios.get(
      `${process.env.BASE_URL}/movie/${movieId}/videos?language=en-US&api_key=${process.env.API_KEY}`
    );
    const trailerVideo = response.data?.results?.filter(
      (video) => video.type === "Trailer"
    );
    setTrailer(trailerVideo[0]);
  };

  useEffect(() => {
    getTrailers();
  }, [movieId]);

  return (
    <Modal
      visible={modalOpen}
      animationType="fade"
      transparent={true}
      onRequestClose={() => setModalOpen(false)}
    >
      <TouchableWithoutFeedback onPress={() => setModalOpen(false)}>
        <View className="flex-1 justify-center items-center bg-black opacity-90">
          <TouchableWithoutFeedback>
            <View className="h-[250px] w-full bg-transparent rounded-lg relative">
              <View className="absolute right-2 top-2 mb-6">
                <AntDesign
                  name="close"
                  size={24}
                  color="#fff"
                  onPress={() => setModalOpen(false)}
                />
              </View>
              <View className="mb-10"></View>

              {trailer && <YoutubeIframe height={300} videoId={trailer.key} />}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default TrailerModal;
