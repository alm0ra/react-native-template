import React, { useEffect } from "react";
import { SafeAreaView } from "@/components/ui/safe-area-view";
import { VStack } from "@/components/ui/vstack";
import { Text, View } from "react-native";
import { Image } from "expo-image";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
} from "react-native-reanimated";

const index = () => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0);

  useEffect(() => {
    // Fade in animation
    opacity.value = withTiming(1, { duration: 1000 });

    // Pulsing scale animation
    scale.value = withRepeat(
      withSequence(
        withTiming(1.05, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );
  }, []);

  const animatedLogoStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <SafeAreaView className="flex flex-col items-center justify-center w-full h-full bg-white">
      <View className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-blue-400/3 to-transparent" />

      <VStack className="p-8 items-center justify-center max-w-md z-10" space="2xl">
        <Animated.View style={animatedLogoStyle}>
          <Image
            source={{ uri: "https://0xminds.com/0xlogo.svg" }}
            style={{ width: 80, height: 80 }}
            contentFit="contain"
          />
        </Animated.View>

        <VStack className="items-center" space="md">
          <Text className="text-4xl font-bold text-center text-gray-900 tracking-tight">
            This is a Template
          </Text>
          <Text className="text-xl font-semibold text-center text-blue-600 mt-2">
            0xminds App Starter Kit
          </Text>
          <Text className="text-sm text-center text-gray-500 italic mt-1">
            (powered by Gluestack UI)
          </Text>
        </VStack>
      </VStack>
    </SafeAreaView>
  );
};

export default index;
