import CreateCustomer from "./feature/accounts/customers/CreateCustomer";
import Customer from "./feature/accounts/customers/Customer";
import AccountOperations from "./feature/accounts/AccountOperations";
import BalanceDisplay from "./feature/accounts/BalanceDisplay";
import { useSelector } from "react-redux";

function App() {
  const fullname = useSelector((state) => state.customer.fullname);
  return (
    <div>
      <h1>🏦 The React-Redux Bank ⚛️</h1>
      {fullname === "" ? <CreateCustomer /> : ""}
      {fullname && (
        <>
          <Customer />
          <AccountOperations />
          <BalanceDisplay />
        </>
      )}
    </div>
  );
}

export default App;
