import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import ShopPage from "../pages/shop-page";
import CartPage from "../pages/cart-page";
import OrderPage from "../pages/auth-page";
import AdminPage from "../pages/admin-page";
import AuthPage from "../pages/auth-page";

const useRoutes = isAuthenticated => {
  if (isAuthenticated) {
    return (
      <Switch>
        {/*<Route path="/links" exact>*/}
        {/*  <LinksPage/>*/}
        {/*</Route>*/}
        {/*<Route path="/create" exact>*/}
        {/*  <CreatePage/>*/}
        {/*</Route>*/}
        {/*<Route path="/detail/:id">*/}
        {/*  <DetailPage/>*/}
        {/*</Route>*/}
        <Route exact path="/" component={ AdminPage } />
        <Redirect to="/"/>
      </Switch>
    )
  }

  return (
    <Switch>
      <Route exact path='/' component={ ShopPage } />
      <Route exact path="/cart-page" component={ CartPage } />
      <Route exact path="/order-page" component={ OrderPage } />
      <Route exact path="/auth-page" component={ AuthPage } />
      <Redirect to="/"/>
    </Switch>
  )
};

export default useRoutes;