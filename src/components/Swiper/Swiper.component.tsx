import React, { PropsWithChildren } from 'react';
import SwipeableViews, { SwipeableViewsProps } from 'react-swipeable-views';

interface Props extends PropsWithChildren, Pick<SwipeableViewsProps, 'index' | 'onChangeIndex'> {}

export const Swiper = ({ children, index, onChangeIndex }: Props) => {
  return (
    <SwipeableViews
      style={{ height: '100%', overflowY: 'hidden' }}
      index={index}
      disableLazyLoading={false}
      onChangeIndex={onChangeIndex}
      enableMouseEvents>
      {children}
    </SwipeableViews>
  );
};
