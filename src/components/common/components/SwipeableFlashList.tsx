import React, { useRef, useState, useCallback } from 'react';
import { View, LayoutChangeEvent } from 'react-native';
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SwipeableItem, { SwipeableItemRef } from './SwipeableItem';
import useHomeSwipeListStyles from '@src/styles/homeSwipeList';

interface SwipeableFlashListProps<T> {
  data: T[];
  renderItem: (
    info: Partial<ListRenderItemInfo<T>>,
  ) => React.ReactElement | null;
  renderHiddenItem: (
    info: Partial<ListRenderItemInfo<T>>,
  ) => React.ReactElement | null;
  keyExtractor: (item: T, index: number) => string;
  onRowDidOpen: (
    rowKey: string,
    rowMap: Map<string, React.RefObject<SwipeableItemRef>>,
  ) => void;
}

const SwipeableFlashList = <T,>({
  data,
  renderItem,
  renderHiddenItem,
  keyExtractor,
  onRowDidOpen,
}: SwipeableFlashListProps<T>) => {
  const styles = useHomeSwipeListStyles();
  const [openRowMap] = useState<Map<string, React.RefObject<SwipeableItemRef>>>(
    new Map(),
  );
  const flashListRef = useRef(null);
  const [listDimensions, setListDimensions] = useState({ width: 0, height: 0 });
  const shouldRenderList =
    listDimensions.width > 0 && listDimensions.height > 0;

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setListDimensions({ width, height });
  }, []);

  const separator = () => <View style={styles.separator} />;

  const renderSwipeableItem = useCallback(
    (listRenderInfo: ListRenderItemInfo<T>) => {
      const { item, index } = listRenderInfo;
      const key = keyExtractor(item, index);
      const swipeableRef = React.createRef<SwipeableItemRef>();
      openRowMap.set(key, swipeableRef);
      const itemInfo = { item, index };

      return (
        <SwipeableItem
          ref={swipeableRef}
          itemKey={key}
          renderHiddenItem={() => renderHiddenItem(itemInfo)}
          onSwipeableOpen={(rowKey: string) => {
            if (onRowDidOpen) {
              onRowDidOpen(rowKey, openRowMap);
            }
          }}
          simultaneousHandlers={flashListRef}
        >
          {renderItem(itemInfo)}
        </SwipeableItem>
      );
    },
    [renderItem, renderHiddenItem, keyExtractor, onRowDidOpen, openRowMap],
  );

  return (
    <GestureHandlerRootView style={styles.container} onLayout={handleLayout}>
      {shouldRenderList ? (
        <FlashList
          ref={flashListRef}
          data={data}
          renderItem={renderSwipeableItem}
          keyExtractor={keyExtractor}
          estimatedItemSize={data.length}
          estimatedListSize={listDimensions}
          contentContainerStyle={{ paddingBottom: 200 }}
          ItemSeparatorComponent={separator}
          ListFooterComponent={separator}
        />
      ) : (
        <View style={styles.placeholderContainer} />
      )}
    </GestureHandlerRootView>
  );
};

export default SwipeableFlashList;
