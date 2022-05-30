import React from 'react';

const {
  Provider: SushiShopServiceProvider,
  Consumer: SushiShopServiceConsumer
// @ts-ignore
} = React.createContext()

export {
  SushiShopServiceProvider,
  SushiShopServiceConsumer
};