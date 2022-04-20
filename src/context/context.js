import {useReducer, createContext,useCallback} from "react";

import contextReducer from "./contextReducer";
const initialState = JSON.parse(window.localStorage.getItem('transactions')) || [];

export const ExpenseTrackerContext = createContext(initialState);

export const Provider = ({children}) => {
  const [transactions, dispatchTransactions] = useReducer(
    contextReducer,
    initialState
  );

  const deleteTransaction = (id) =>
    dispatchTransactions({type: "DELETE_TRANSACTION", id});

  const addTransaction = useCallback((transaction) =>
    dispatchTransactions( { type: "ADD_TRANSACTION", item: transaction } ), [] );
  
  const balance = transactions.reduce( ( acc, curr ) => curr.type === 'Income' ? acc + curr.amount : acc - curr.amount, 0 );
  
  return (
    <ExpenseTrackerContext.Provider value={{
      addTransaction,
      deleteTransaction,
      transactions,
      balance
    }} >
      {children}
    </ExpenseTrackerContext.Provider>
  );
};
