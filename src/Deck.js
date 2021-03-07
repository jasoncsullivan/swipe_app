import React, { useRef, useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  Animated,
  PanResponder,
  Dimensions,
  LayoutAnimation,
  UIManager,
} from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

const Deck = ({
  data,
  renderCard,
  onSwipeLeft,
  onSwipeRight,
  renderNoMoreCards,
}) => {
  const [position, setPosition] = useState(new Animated.ValueXY());
  const [index, setIndex] = useState(0);

  // animate change on all component updates
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
  LayoutAnimation.spring();

  const resetPosition = () => {
    Animated.spring(position, {
      useNativeDriver: false,
      toValue: { x: 0, y: 0 },
    }).start();
  };

  const onSwipeComplete = (toRight) => {
    const item = data[index];
    // toRight ? onSwipeRight(item) : onSwipeLeft(item);
    position.setValue({ x: 0, y: 0 });

    // NOTE must use this form rather than setIndex(index + 1)
    setIndex((prev) => prev + 1);
  };

  const forceSwipe = (toRight) => {
    Animated.timing(position, {
      useNativeDriver: false,
      toValue: { x: (toRight ? 1 : -1) * SCREEN_WIDTH, y: 0 },
      duration: SWIPE_OUT_DURATION,
    }).start(() => onSwipeComplete(toRight));
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          forceSwipe(true);
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          forceSwipe(false);
        } else {
          resetPosition();
        }
      },
    })
  ).current;

  const getCardStyle = () => {
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ["-120deg", "0deg", "120deg"],
    });
    return {
      ...position.getLayout(),
      transform: [{ rotate }],
    };
  };

  const renderCards = () => {
    if (index >= data.length) {
      return renderNoMoreCards();
    }

    return data
      .map((item, idx) => {
        if (idx < index) {
          return null;
        }
        if (idx === index) {
          return (
            <Animated.View
              {...panResponder.panHandlers}
              style={[getCardStyle(), styles.cardStyle]}
              key={idx}
            >
              {renderCard(item)}
            </Animated.View>
          );
        }
        return (
          <Animated.View
            style={[
              styles.cardStyle,
              { top: 5 * (idx - index), left: 1.5 * (idx - index) },
            ]}
            key={idx}
          >
            {renderCard(item)}
          </Animated.View>
        );
      })
      .reverse();
  };

  return <View>{renderCards()}</View>;
};

const styles = StyleSheet.create({
  cardStyle: {
    position: "absolute",
    width: SCREEN_WIDTH,
  },
});

export default Deck;
