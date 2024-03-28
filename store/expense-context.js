import { createContext } from "react";
import { useReducer } from "react";
import { storeExpense } from "../util/http";

export const ExpensesContext = createContext({
    expenses: [],
    setExpenses: (expenses) => { },
    addExpense: ({ description, amount, date }) => { },
    deleteExpense: (id) => { },
    updateExpense: (id, { description, amount, date }) => { },
});

function expensesReducer(state, action) {
    switch (action.type) {
        case "ADD":
            return [{ ...action.payload }, ...state]
        case "SET":
            //reverse firebase ordering for most recent first
            const invertedArray = action.payload.reverse();
            return invertedArray;
        case "UPDATE":
            const updatableExpenseIndex = state.findIndex((e) => e.id === action.payload.id);
            const updatableExpense = state[updatableExpenseIndex];
            const updatedItem = { ...updatableExpense, ...action.payload.data }
            const updatedExpenses = [...state];
            updatedExpenses[updatableExpenseIndex] = updatedItem

            return updatedExpenses;
        case "DELETE":
            return state.filter((e) => e.id !== action.payload)
        default:
            return state

    }
}

function ExpensesContextProvider({ children }) {

    //second value is the default value
    const [expensesState, dispatch] = useReducer(expensesReducer, []);

    function addExpense(expenseData) {
        dispatch({ type: 'ADD', payload: expenseData });
    }

    function setExpenses(expenses) {
        dispatch({ type: 'SET', payload: expenses });
    }

    function deleteExpense(id) {
        dispatch({ type: 'DELETE', payload: id });
    }

    function updateExpense(id, expenseData) {
        dispatch({ type: 'UPDATE', payload: { id: id, data: expenseData } });
    }

    const value = {
        expenses: expensesState,
        addExpense: addExpense,
        setExpenses: setExpenses,
        updateExpense: updateExpense,
        deleteExpense: deleteExpense,
    }

    return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>

}

export default ExpensesContextProvider;