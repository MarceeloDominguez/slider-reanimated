import { Dimensions, ScrollView, StatusBar, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolateColor,
} from "react-native-reanimated";
import { SLIDER_ITEM } from "./src/data/sliderItem";
import Card from "./src/components/Card";

const { width } = Dimensions.get("window");

export default function App() {
  const translateX = useSharedValue(0);

  const handleOnScroll = useAnimatedScrollHandler({
    onScroll: ({ contentOffset: { x } }) => {
      translateX.value = x;
    },
  });

  const style = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      translateX.value,
      SLIDER_ITEM.map((_, i) => width * i),
      SLIDER_ITEM.map((item) => item.color)
    ),
  }));

  return (
    <Animated.View style={[styles.container, style]}>
      <StatusBar />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Animated.ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={width}
          decelerationRate="fast"
          onScroll={handleOnScroll}
          scrollEventThrottle={16}
        >
          {SLIDER_ITEM.map((item, index) => (
            <Card
              key={item.id}
              item={item}
              translateX={translateX}
              index={index}
            />
          ))}
        </Animated.ScrollView>
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});
