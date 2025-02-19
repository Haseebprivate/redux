const intialStateCustomer = {
  fullname: "",
  nationalID: "",
  createdAt: "",
};

export default function customerReducer(state = intialStateCustomer, action) {
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
}

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

const updateName = (fullname) => {
  return {
    type: "customer/updateName",
    payLoad: fullname,
  };
};

export { createCustomer, updateName };
