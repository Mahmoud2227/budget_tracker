import {useReducer, createContext} from "react";

import contextReducer from "./contextReducer";

const initialState = [];

export const ExpenseTrackerContext = createContext(initialState);

export const Provider = ({children}) => {
  const [transactions, dispatchTransactions] = useReducer(
    contextReducer,
    initialState
  );

  const deleteTransaction = (id) =>
    dispatchTransactions({type: "DELETE_TRANSACTION", id});

  const addTransaction = (transaction) =>
    dispatchTransactions({type: "ADD_TRANSACTION", item: transaction});

  console.log(transactions);
  return (
    <ExpenseTrackerContext.Provider value={{
      addTransaction,
      deleteTransaction,
      transactions,
    }} >
      {children}
    </ExpenseTrackerContext.Provider>
  );
};
