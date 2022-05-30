import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import { BrowserRouter, Switch } from "react-router-dom";

import App from "./components/App";
import { SushiShopServiceProvider } from './components/sushi-shop-service-contex';
import store from "./store";
import SushiShopService from "./service/sushiShopService";

const sushiShopService = new SushiShopService();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <Provider store={store}>
    <SushiShopServiceProvider value={sushiShopService}>
     <BrowserRouter>
       <Switch>
        <App />
       </Switch>
     </BrowserRouter>
    </SushiShopServiceProvider>
  </Provider>
);