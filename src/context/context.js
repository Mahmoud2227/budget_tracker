import {useReducer, createContext,useCallback} from "react";

import contextReducer from "./contextReducer";

const initialState = JSON.parse(window.localStorage.transactions) || [];
;

export const ExpenseTrackerContext = createContext(initialState);

export const Provider = ({children}) => {
  const [transactions, dispatchTransactions] = useReducer(
    contextReducer,
    initialState
  );

  const deleteTransaction = (id) =>
    dispatchTransactions({type: "DELETE_TRANSACTION", id});

  const addTransaction = useCallback((transaction) =>
    dispatchTransactions({type: "ADD_TRANSACTION", item: transaction}),[]);
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
