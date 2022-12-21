
import React from "react";
import { StatusBar, Text, View } from "react-native";
import { TextWidget } from "../../components/TextWidget";
import SplashStyle from "./SplashStyle";
import lottie from "../../resources/lottie";
import AnimatedLottieView from "lottie-react-native";
import { widthByScreen } from "../../utils/dimensions";

const SplashScreen = ({}) => {

    return (
      <View style={SplashStyle.container}>
        <StatusBar translucent={true} backgroundColor="rgba(0,0,0,0)" />
        <AnimatedLottieView
          source={lottie.weather
          }
          autoPlay
          loop
          style={{
            width: widthByScreen(90),
            height: widthByScreen(90),
          }}
        />
      </View>
    );
}
export default SplashScreen;