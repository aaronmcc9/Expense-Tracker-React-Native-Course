import { useContext } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expense-context";

function AllExpenses() {
  const expensesContext = useContext(ExpensesContext)
  return <ExpensesOutput expenses={expensesContext.expenses} expensesPeriod={"Total"}
    fallbackText={"No expense history"}
  />;
}
export default AllExpenses;
