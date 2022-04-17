const contextReducer = ( state, action ) =>
{
  let transactions

  switch (action.type) {
    case 'DELETE_TRANSACTION':
      transactions = state.filter(transaction => transaction.id !== action.id)
      return transactions
    
    case 'ADD_TRANSACTION':
      transactions = [...state,action.item]
      return transactions
    
    default:
      return state
  }
};

export default contextReducer;