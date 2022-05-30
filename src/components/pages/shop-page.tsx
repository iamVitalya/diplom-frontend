import React from "react";
import Category from "../category/category";
import Sorting from "../sorting";
import SushiList from "../sushi-list/sushi-list";
import { connect } from "react-redux";
import Hamburger from "../hamburger";

type ShopPageProps = {
  mobileActiveMenu: boolean
}

const ShopPage: React.FC<ShopPageProps>  = ({ mobileActiveMenu }: ShopPageProps) => {
  return (
    <React.Fragment>
      <Hamburger />
      <div className={`app-content-top ${mobileActiveMenu ? 'app-content-top-mobile' : ''}`}>
        <Category/>
        <Sorting/>
      </div>

      <div className="app-content-bottom">
        <SushiList/>
      </div>
    </React.Fragment>
  )
};

const mapStateToProps = ({ currentState: { mobileActiveMenu } }: { currentState: { mobileActiveMenu: boolean } }) => {
  return { mobileActiveMenu };
}

export default connect(mapStateToProps)(ShopPage);