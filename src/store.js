import accountReducer from "./feature/accounts/accountSlice";
import customerReducer from "./feature/accounts/customers/customerSlice";

import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    account: accountReducer,
    customer: customerReducer,
  },
});

store.subscribe(() => {
  console.log(store.getState());
});

export default store;
