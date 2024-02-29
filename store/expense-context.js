import { createContext } from "react";
import { useReducer } from "react";

const DUMMY_EXPENSES = [
    {
        id: 'e1',
        description: "Driving Lesson",
        amount: 70.00,
        date: new Date('2024-02-22')
    },
    {
        id: 'e2',
        description: "Groceries",
        amount: 30.00,
        date: new Date('2024-02-24')
    },
    {
        id: 'e3',
        description: "Cinema Ticket",
        amount: 9.99,
        date: new Date('2024-02-25')
    },
    {
        id: 'e4',
        description: "Japan Flights",
        amount: 829.00,
        date: new Date('2024-02-22')
    },
    {
        id: 'e5',
        description: "New Book",
        amount: 14.99,
        date: new Date('2024-02-12')
    }
];

export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({ description, amount, date }) => { },
    deleteExpense: (id) => { },
    updateExpense: (id, { description, amount, date }) => { },
});

function expensesReducer(state, action) {
    switch (action.type) {
        case "ADD":
            const id = new Date().toString() + Math.random().toString()
            return [{ ...action.payload, id: id }, ...state]
        case "UPDATE":
            const updatableExpenseIndex = state.findIndex((e) => { e.id === action.payload.id });
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
    const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);
    
    function addExpense(expenseData) {
        dispatch({ type: 'ADD', payload: expenseData });
    }

    function deleteExpense(id) {
        dispatch({ type: 'DELETE', payload: id });
    }

    function updateExpense(id, expenseData) {
        dispatch({ type: 'UPDATE', payload: {id:id , data: expenseData}});
    }

    const value = {
        expenses: expensesState,
        addExpense: addExpense,
        updateExpense: updateExpense,
        deleteExpense: deleteExpense,
    }

    return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>

}

export default ExpensesContextProvider;