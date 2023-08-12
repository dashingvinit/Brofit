import { Animated, Easing } from 'react-native';

// Custom slide animation
function customSlideTransition({ current, next, layouts }) {
  const slideAnimation = Animated.timing(current.progress, {
    toValue: next ? 0 : 1,
    duration: 400, // Animation duration in milliseconds
    easing: Easing.out(Easing.cubic), // Easing function for smooth animation
    useNativeDriver: true,
  });

  const slideFromRight = {
    transform: [{ translateX: Animated.multiply(current.progress, 100) }],
  };
  const slideFromLeft = {
    transform: [{ translateX: Animated.multiply(current.progress, -100) }],
  };

  const slideToRight = {
    transform: [{ translateX: Animated.multiply(next.progress, -100) }],
  };
  const slideToLeft = {
    transform: [{ translateX: Animated.multiply(next.progress, 100) }],
  };

  const slideAnimationStyle = {
    cardStyle: {
      transform: [slideFromRight, slideFromLeft, slideToRight, slideToLeft],
    },
  };

  return slideAnimationStyle;
}
