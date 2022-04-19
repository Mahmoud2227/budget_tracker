import { useContext } from "react";
import { ExpenseTrackerContext } from "../context/context";

import { incomeCategories, expenseCategories, resetCategories } from "../constants/constants";

const useTransactions = ( title ) =>
{
  resetCategories();
  const { transactions } = useContext( ExpenseTrackerContext );
  const transactionsPerType = transactions.filter( transaction => transaction.type === title );
  const total = transactionsPerType.reduce( ( acc, curr ) => acc + curr.amount, 0 );
  const categories = title === 'Income' ? incomeCategories : expenseCategories;
  
  transactionsPerType.forEach( transaction =>
  {
    const category = categories.find( category => category.type === transaction.category );
    if ( category )
    {
      category.amount += transaction.amount;
    }
  } );
    
  const filteredCategories = categories.filter( category => category.amount > 0 );
  
  const chartData = {
    datasets: [ {
      data: filteredCategories.map( category => category.amount ),
      backgroundColor: filteredCategories.map( category => category.color),
    } ],
    labels: filteredCategories.map(category => category.type)
  }
  return {chartData, total}
};

export default useTransactions;