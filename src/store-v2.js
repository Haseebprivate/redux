import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from "redux-thunk";
import accountReducer from "./feature/accounts/accountSlice";
import customerReducer from "./feature/accounts/customers/customerSlice";
import { composeWithDevTools } from "redux-devtools-extension";

composeWithDevTools;

const rootRducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(
  rootRducer,
  composeWithDevTools(applyMiddleware(thunk))
);
store.subscribe(() => {
  console.log(store.getState());
});

export default store;
