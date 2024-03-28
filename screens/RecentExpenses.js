import { useContext, useEffect } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expense-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";
import { useState } from "react";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

function RecentExpenses() {
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState(null);
    const expensesContext = useContext(ExpensesContext)
    const today = new Date();

    useEffect(() => {
        async function getExpenses() {
            try {
                setIsFetching(true);
                const expenses = (await fetchExpenses());
                expensesContext.setExpenses(expenses);
            }
            catch (e) {
                setError('Could not fetch expenses');
            }

            setIsFetching(false);
        }

        getExpenses();
    }, [])

    function errorHandler() {
        setError(null);
    }

    if (error && !isFetching)
        return <ErrorOverlay message={error} onConfirm={errorHandler} />

    if (isFetching) {
        return <LoadingOverlay />
    }

    const recentExpenses = expensesContext.expenses.filter((e) => e.date > getDateMinusDays(today, 7))
    return <ExpensesOutput expenses={recentExpenses} expensesPeriod={"Last 7 Days"}
        fallbackText={"No recent expenses"}
    />;
}
export default RecentExpenses;