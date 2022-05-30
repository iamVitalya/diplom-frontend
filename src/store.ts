import { createStore } from "redux";
import reduces from "./reducer";

const store = createStore(reduces);

export default store;