import React, { forwardRef, useImperativeHandle } from 'react';
import { View } from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureType,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';

import useHomeSwipeListStyles from '@src/styles/homeSwipeList';
import { SWIPE_THRESHOLD, SWIPE_TRIGGER_THRESHOLD } from '../constants';

export interface SwipeableItemRef {
  closeRow: () => void;
}

interface SwipeableItemProps {
  children: React.ReactNode;
  renderHiddenItem: () => React.ReactNode;
  itemKey: string;
  onSwipeableOpen: (key: string) => void;
  simultaneousHandlers: React.RefObject<GestureType>;
}

const SwipeableItem = forwardRef<SwipeableItemRef, SwipeableItemProps>(
  (props: SwipeableItemProps, ref: React.Ref<SwipeableItemRef>) => {
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
      [closeRow]
    );

    const panGesture = Gesture.Pan()
      .activeOffsetX([-5, 5])
      .failOffsetY([-10, 10])
      .onStart(() => {
        startX.value = translateX.value;
      })
      .onUpdate((event: { translationX: number }) => {
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
  }
);

SwipeableItem.displayName = 'SwipeableItem';

export default SwipeableItem;
