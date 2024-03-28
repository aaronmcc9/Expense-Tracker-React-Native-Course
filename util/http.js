import axios from "axios";

const URL = "https://react-native-course-9ff8c-default-rtdb.firebaseio.com"
export async function storeExpense(expenseData) {
    const response = await axios.post(URL + '/expenses.json', expenseData);
    const id = response.data.name
    return id;
}

export async function updateExpense(id, expenseData) {
   await axios.put(URL + `/expenses/${id}.json`, expenseData);
}

export async function deleteExpense(id) {
    await axios.delete(URL + `/expenses/${id}.json`);
}

export async function fetchExpenses() {
    const response = await axios.get(URL + '/expenses.json');

    const expenses = [];

    for (const key in response.data) {
        const expense = {
            id: key,
            amount: response.data[key].amount,
            date: new Date(response.data[key].date),
            description: response.data[key].description
        }

        expenses.push(expense);
    }

    return expenses;
}