import { useContext, useLayoutEffect, useState } from "react";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { View, StyleSheet } from "react-native";
import { ExpensesContext } from "../store/expense-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { deleteExpense, storeExpense, updateExpense } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

function ManageExpenses({ navigation, route }) {
  const [loading, setLoading] = useState(false);
  const expenseId = route.params.expenseId;
  const isEditing = !!expenseId;

  const expensesContext = useContext(ExpensesContext);
  const [error, setError] = useState(null);


  const selectedExpense = expensesContext.expenses.find((e) => e.id === expenseId);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense"
    })
  }, [navigation, isEditing])

  async function deleteExpenseHandler() {
    setLoading(true);

    try {
      await deleteExpense(expenseId);
      expensesContext.deleteExpense(expenseId);

      //back handles loading false
      closeModal();
    }
    catch (e) {
      setLoading(false);
      setError("An error occurred deleting the expense");
    }
  }

  function cancelHandler() {
    closeModal();
  }

  async function confirmHandler(expenseData) {
    setLoading(true);

    try {
      if (isEditing) {
        expensesContext.updateExpense(expenseId, expenseData);
        await updateExpense(expenseId, expenseData);
      }
      else {
        //firebase created id
        const id = await storeExpense(expenseData);
        expensesContext.addExpense({ ...expenseData, id });
      }

      closeModal();
    } catch (e) {
      setLoading(false);
      setError("An error occurred modifying the expense")
    }
  }

  function errorHandler() {
    setError(null);
  }

  if (error && !loading)
    return <ErrorOverlay message={error} onConfirm={errorHandler} />


  function closeModal() {
    navigation.goBack();
  }

  if (loading)
    return <LoadingOverlay />

  return <View style={styles.container}>
    <ExpenseForm onCancel={cancelHandler} onSubmit={confirmHandler}
      defaultValues={selectedExpense}
      submitButtonLabel={isEditing ? "Update" : "Add"} />
    {isEditing && (
      <View style={styles.deleteContainer}>
        <IconButton icon="trash"
          color={GlobalStyles.colors.error500}
          size={36}
          onPress={deleteExpenseHandler}></IconButton>
      </View>
    )}
  </View>;
}
export default ManageExpenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center'
  },
})
