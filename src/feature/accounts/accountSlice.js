import { createSlice } from "@reduxjs/toolkit";

const intialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState: intialState,
  reducers: {
    deposit(state, action) {
      state.balance = state.balance + action.payload;
      state.isLoading = false;
    },
    widthdraw(state, action) {
      state.balance = state.balance - action.payload;
    },
    requestLoan: {
      prepare(amount, loanPurpose) {
        return {
          payload: { amount, loanPurpose },
        };
      },
      reducer(state, action) {
        if (state.loan > 0) return;
        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.loanPurpose;
        state.balance = state.balance + action.payload.amount;
      },
    },
    payLoan(state) {
      state.balance = state.balance - state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
    convertingCurrency(state) {
      state.isLoading = true;
    },
  },
});

export const deposit = (amount, currency) => {
  if (currency === "USD") return { type: "account/deposit", payload: amount };

  return async (dispatch, getState) => {
    dispatch({ type: "account/convertingCurrency" });
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();
    const converted = data.rates.USD;

    dispatch({ type: "account/deposit", payload: converted });
  };
};

export const { widthdraw, requestLoan, payLoan } = accountSlice.actions;
export default accountSlice.reducer;

// export default function accountReducer(state = intialState, action) {
//   switch (action.type) {
//     case "account/deposit":
//       return {
//         ...state,
//         balance: state.balance + action.payload,
//         isLoading: false,
//       };
//     case "account/widthdraw":
//       return { ...state, balance: state.balance - action.payload };
//     case "account/requestLoan":
//       if (state.loan > 0) return state;
//       return {
//         ...state,
//         loan: action.payload.amount,
//         loanPurpose: action.payload.loanPurpose,
//         balance: state.balance + action.payload.amount,
//       };
//     case "account/payLoan":
//       return {
//         ...state,
//         loan: 0,
//         loanPurpose: "",
//         balance: state.balance - state.loan,
//       };
//     case "account/convertingCurrency":
//       return {
//         ...state,
//         isLoading: true,
//       };

//     default:
//       return state;
//   }
// }

// const deposit = (amount, currency) => {
//   if (currency === "USD") return { type: "account/deposit", payload: amount };

//   return async (dispatch, getState) => {
//     dispatch({ type: "account/convertingCurrency" });
//     const res = await fetch(
//       `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
//     );
//     const data = await res.json();
//     const converted = data.rates.USD;

//     dispatch({ type: "account/deposit", payload: converted });
//   };
// };

// const widthdraw = (amount) => {
//   return { type: "account/widthdraw", payload: amount };
// };

// const requestLoan = (amount, loanPurpose) => {
//   return {
//     type: "account/requestLoan",
//     payload: { amount, loanPurpose },
//   };
// };

// const payLoan = () => {
//   return {
//     type: "account/payLoan",
//   };
// };

// export { deposit, widthdraw, requestLoan, payLoan };
