import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Animated, {
  useAnimatedStyle,
  interpolate,
  SharedValue,
} from "react-native-reanimated";
import { Item } from "../interface/data";

const { width } = Dimensions.get("window");
const HEIGHT_CARD = width * 0.8;

type Prop = {
  item: Item;
  index: number;
  translateX: SharedValue<number>;
};

export default function Card({ item, translateX, index }: Prop) {
  const styleCard = useAnimatedStyle(() => {
    const inputRange = [
      width * (index - 1),
      width * index,
      width * (index + 1),
    ];

    const cardTranslateX = interpolate(translateX.value, inputRange, [
      width / 1,
      0,
      width / 2,
    ]);

    const scale = interpolate(translateX.value, inputRange, [0.7, 1, 0.7]);

    return {
      transform: [{ translateX: cardTranslateX }, { scale: scale }],
    };
  });

  return (
    <Animated.View style={[styles.containerCard, styleCard]}>
      <View style={[styles.card, { backgroundColor: item.color }]}>
        <Text>Hola</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  containerCard: {
    width,
    height: HEIGHT_CARD,
  },
  card: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
    margin: 30,
    flex: 1,
    elevation: 10,
  },
});
