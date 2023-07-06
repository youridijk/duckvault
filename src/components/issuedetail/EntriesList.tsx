import Separator from '../generic/Separator';
import { FlatList } from 'react-native';
import React from 'react';
import { EntryWithImages } from '../../types/db/Custom';
import ContentTileFullWidth from '../tiles/ContentTileFullWidth';

export default function({entries}: {entries: EntryWithImages[] }) {
  function _renderItem({ index, item }: { index: number; item: EntryWithImages }) {
    return (
      <ContentTileFullWidth
        title={item?.title ?? item?.storyversion?.story?.title}
        secondText={item.storyversion?.story?.firstpublicationdate}
        thirdText={item.storyversion?.storydescription[0]?.desctext}
        imageUri={item?.original_entry_urls?.[0]?.fullurl ?? item?.story_entry_urls?.[0]?.fullurl}
        imageDesiredWidth={100}
        imageProxyOptions={'200x'}
        imageFetchPriority={index < 3 ? 'high' : 'low'}
      />
    );
  }

  function _render() {
    return <FlatList
      data={entries}
      renderItem={_renderItem}
      ItemSeparatorComponent={Separator}
      scrollEnabled={false}
    />;
  }

  return _render();
}
