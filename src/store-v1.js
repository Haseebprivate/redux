import { combineReducers, createStore } from "redux";

const intialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const intialStateCustomer = {
  fullname: "",
  nationalID: "",
  createdAt: "",
};

const accountReducer = (state = intialStateAccount, action) => {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };
    case "account/widthdraw":
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.loanPurpose,
        balance: state.balance + action.payload.amount,
      };
    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };

    default:
      return state;
  }
};

const customerReducer = (state = intialStateCustomer, action) => {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullname: action.payLoad.fullname,
        nationalID: action.payLoad.nationalID,
        createdAt: action.payLoad.createdAt,
      };
    case "customer/updateName":
      return { ...state, fullname: action.payLoad };
    default:
      return state;
  }
};

const deposit = (amount) => {
  return { type: "account/deposit", payload: amount };
};

const widthdraw = (amount) => {
  return { type: "account/widthdraw", payload: amount };
};

const requestLoan = (amount, loanPurpose) => {
  return {
    type: "account/requestLoan",
    payload: { amount, loanPurpose },
  };
};

const payLoan = () => {
  return {
    type: "account/payLoan",
  };
};

const createCustomer = (fullname, nationalID) => {
  return {
    type: "customer/createCustomer",
    payLoad: {
      fullname,
      nationalID,
      createdAt: new Date().toISOString(),
    },
  };
};

const updateName = (fullname, nationalID) => {
  return {
    type: "customer/updateName",
    payLoad: fullname,
  };
};

const rootRducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootRducer);
store.subscribe(() => {
  console.log(store.getState());
});

// store.dispatch({ type: "account/deposit", payload: 500 });
// store.dispatch({ type: "account/widthdraw", payload: 200 });
// store.dispatch({
//   type: "account/requestLoan",
//   payload: { amount: 1000, loanPurpose: "investing in a business" },
// });
// store.dispatch({
//   type: "account/payLoan",
// });

store.dispatch(deposit(500));
store.dispatch(widthdraw(200));
store.dispatch(requestLoan(1000, "investing in a business"));
store.dispatch(payLoan());

store.dispatch(createCustomer("Haseeb Khalid", "9087328090"));
store.dispatch(updateName("Haseeb Khalid Nawaz"));
