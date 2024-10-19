import React from 'react';
import { View, Animated } from 'react-native';
import { styled } from 'nativewind';

const SpinnerWrapper = styled(View);

const LoadingSpinner = () => {
  const bars = Array.from({ length: 5 }).map(() => new Animated.Value(0));

  // Create wave animation for each bar
  const startWaveAnimation = () => {
    const animations = bars.map((bar, index) => {
      return Animated.timing(bar, {
        toValue: 1,
        duration: 200,
        delay: index * 50, // Delay for each bar
        useNativeDriver: false,
      });
    });

    Animated.sequence(animations).start(() => {
      // Reset and repeat animation
      bars.forEach((bar) => bar.setValue(0));
      startWaveAnimation();
    });
  };

  React.useEffect(() => {
    startWaveAnimation();
  }, []);

  return (
    <SpinnerWrapper className="flex-1 justify-center items-center bg-[#0C0F14] w-full bg-opacity-80">
      <View className="flex-row items-end space-x-2">
        {bars.map((bar, index) => {
          const height = bar.interpolate({
            inputRange: [0, 1],
            outputRange: [10, 40], // Min and Max height for the wave effect
          });

          return (
            <Animated.View
              key={index}
              style={{
                width: 12,
                height: height,
                backgroundColor: '#3498db',
              }}
            />
          );
        })}
      </View>
    </SpinnerWrapper>
  );
};

export default LoadingSpinner;
