import { useContext } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expense-context";
import { getDateMinusDays } from "../util/date";
function RecentExpenses() {

    const expensesContext = useContext(ExpensesContext)
    const today = new Date();

    const recentExpenses = expensesContext.expenses.filter((e) => e.date > getDateMinusDays(today, 7))
    return <ExpensesOutput expenses={recentExpenses} expensesPeriod={"Last 7 Days"} 
        fallbackText={"No recent expenses"}
    />;
}
export default RecentExpenses;