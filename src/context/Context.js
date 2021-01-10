import React, { useReducer, createContext } from 'react';
import ContextReducer from './ContextReducer';


const initialState = JSON.parse(localStorage.getItem('transactions')) || [];

export const ExpenseTrackerContext = createContext(initialState);

export const Provider = ({ children }) => {
    const [transactions, dispatch] = useReducer(ContextReducer,initialState);

    const addTransaction = (transaction) => {
         dispatch({ type: 'ADD_TRANSACTION', payload: transaction});
    }

    const deleteTransaction = (id) => {
         dispatch({ type: 'DELETE_TRANSACTION', payload: id});
    }

    const balance = transactions.reduce((acc,curVal) => {
        return (curVal === 'Expense' ? acc - curVal.amount : acc + curVal.amount);
    }, 0)

    return(
       <ExpenseTrackerContext.Provider value={{ addTransaction,deleteTransaction,transactions,balance}}>
           {children}
       </ExpenseTrackerContext.Provider>
    );
}