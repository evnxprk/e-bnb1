import { restoreCSRF, csrfFetch } from "./csrf";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import spotsReducer from "./spot-reducer";
import reviewReducer from "./review-reducer";
import  bookingReducer from "./bookings";
import searchReducer from "./search";

const rootReducer = combineReducers({
  session: sessionReducer,
  spots: spotsReducer,
  review: reviewReducer,
  booking: bookingReducer,
  // search: searchReducer,
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};


const store = configureStore();

if (process.env.NODE_ENV !== "production") {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
}

export default configureStore;
