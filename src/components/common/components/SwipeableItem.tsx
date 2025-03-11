import React, { forwardRef, useImperativeHandle } from 'react';
import { StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import useHomeSwipeListStyles from '@src/styles/homeSwipeList';

const SWIPE_THRESHOLD = -100;
const SWIPE_TRIGGER_THRESHOLD = -40;

export interface SwipeableItemRef {
  closeRow: () => void;
}

interface SwipeableItemProps {
  children: React.ReactNode;
  renderHiddenItem: () => React.ReactNode;
  itemKey: string;
  onSwipeableOpen: (key: string) => void;
  simultaneousHandlers: React.RefObject<any>;
}

const SwipeableItem = forwardRef<SwipeableItemRef, SwipeableItemProps>(
  (props, ref) => {
    const {
      children,
      renderHiddenItem,
      itemKey,
      onSwipeableOpen,
      simultaneousHandlers,
    } = props;

    const styles = useHomeSwipeListStyles();
    const translateX = useSharedValue(0);
    const startX = useSharedValue(0);

    const closeRow = () => {
      translateX.value = withTiming(0);
    };

    useImperativeHandle(
      ref,
      () => ({
        closeRow,
      }),
      [],
    );

    const panGesture = Gesture.Pan()
      .activeOffsetX([-5, 5])
      .failOffsetY([-10, 10])
      .onStart(() => {
        startX.value = translateX.value;
      })
      .onUpdate((event) => {
        const dragX = startX.value + event.translationX;
        translateX.value = Math.min(0, dragX);
      })
      .onEnd(() => {
        const shouldOpen = translateX.value < SWIPE_TRIGGER_THRESHOLD;

        if (shouldOpen) {
          translateX.value = withTiming(SWIPE_THRESHOLD);
          if (onSwipeableOpen) {
            runOnJS(onSwipeableOpen)(itemKey);
          }
        } else {
          translateX.value = withTiming(0);
        }
      });

    if (simultaneousHandlers) {
      panGesture.simultaneousWithExternalGesture(simultaneousHandlers);
    }

    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ translateX: translateX.value }],
      };
    });

    const underlayStyle = useAnimatedStyle(() => {
      const width = Math.abs(translateX.value);
      return {
        width: width > 0 ? width : 0,
      };
    });

    return (
      <View style={styles.container}>
        <View style={styles.backgroundContainer}>
          <Animated.View style={[styles.underlayContainer, underlayStyle]}>
            <View style={styles.underlayContent}>{renderHiddenItem()}</View>
          </Animated.View>
        </View>
        <GestureDetector gesture={panGesture}>
          <Animated.View style={animatedStyle}>{children}</Animated.View>
        </GestureDetector>
      </View>
    );
  },
);

SwipeableItem.displayName = 'SwipeableItem';

export default SwipeableItem;
